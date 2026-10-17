import { json, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { PHOTO_LIMITS, parseEnquiry, summarise, type Enquiry } from '$lib/enquiry';
// Static seed settings, not the CMS: sending must never depend on a content fetch
import { settings } from '$lib/content/seed/settings';
import { whatsappLink } from '$lib/utils';

export const prerender = false;

/*
 * Receives the contact form and the quote request. JS clients ask for JSON;
 * plain HTML form posts (no JS) get redirected to /thank-you. Email is sent
 * through Resend's REST API:
 *   RESEND_API_KEY  – API key (required in production)
 *   ENQUIRY_TO      – inbox for enquiries (default: the email in the seed site settings)
 *   ENQUIRY_FROM    – verified sender, e.g. "Capital Shades Website <web@capitalshades.co.ke>"
 *
 * Quote requests may include site photos (`photos`). They are attached to the
 * email only — never stored or given a public URL. Photos that are the wrong
 * type or over the limits are left off rather than failing the enquiry, and
 * the email says so.
 */
export async function POST({ request }) {
	const wantsJson = request.headers.get('accept')?.includes('application/json');
	const form = await request.formData();

	// Honeypot: real visitors never see this field
	if (String(form.get('website') ?? '')) {
		return wantsJson ? json({ ok: true }) : redirect(303, '/thank-you');
	}

	const parsed = parseEnquiry(form);
	if (!parsed.ok) {
		if (wantsJson) return json({ ok: false, errors: parsed.errors }, { status: 400 });
		if (form.get('kind') !== 'quote') redirect(303, '/contact');
		// Without JS a redirect would lose the visitor's answers; Back keeps them
		const message = [
			"We couldn't send your quote request yet:",
			...Object.values(parsed.errors).map((error) => `- ${error}`),
			'',
			"Use your browser's Back button to correct this. Your answers should still be there.",
			`Or call ${settings.primaryPhone.display}, or WhatsApp ${whatsappLink(settings.whatsapp.number)}`
		].join('\n');
		return new Response(message, {
			status: 400,
			headers: { 'content-type': 'text/plain; charset=utf-8' }
		});
	}

	const photos = parsed.enquiry.kind === 'quote' ? await acceptPhotos(form.getAll('photos')) : null;
	const sent = await deliver(parsed.enquiry, photos);
	if (!sent) {
		const message = "Sorry, we couldn't send your request right now. Please call or WhatsApp us.";
		return wantsJson
			? json({ ok: false, message }, { status: 503 })
			: new Response(message, { status: 503, headers: { 'content-type': 'text/plain' } });
	}

	return wantsJson ? json({ ok: true }) : redirect(303, '/thank-you');
}

interface Photo {
	file: File;
	/** Detected from the file's content, not the type the browser declared */
	type: (typeof PHOTO_TYPES)[number]['type'];
}

interface Photos {
	files: Photo[];
	/** Uploaded but left off: wrong type, too large, or over the count */
	skipped: number;
}

/** File signatures of the accepted photo formats. */
const PHOTO_TYPES = [
	{ type: 'jpg', matches: (b: Uint8Array) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
	{ type: 'png', matches: (b: Uint8Array) => ascii(b, 1, 4) === 'PNG' },
	{
		type: 'webp',
		matches: (b: Uint8Array) => ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP'
	},
	{
		type: 'heic',
		matches: (b: Uint8Array) =>
			ascii(b, 4, 8) === 'ftyp' &&
			['heic', 'heix', 'heif', 'mif1', 'msf1'].includes(ascii(b, 8, 12))
	}
] as const;

const ascii = (bytes: Uint8Array, start: number, end: number) =>
	String.fromCharCode(...bytes.subarray(start, end));

async function acceptPhotos(entries: FormDataEntryValue[]): Promise<Photos> {
	const uploads = entries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
	const files: Photo[] = [];
	let total = 0;
	for (const file of uploads) {
		const fits =
			files.length < PHOTO_LIMITS.count &&
			file.size <= PHOTO_LIMITS.maxBytes &&
			total + file.size <= PHOTO_LIMITS.totalBytes;
		if (!fits) continue;
		const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
		const type = PHOTO_TYPES.find((format) => format.matches(head))?.type;
		if (!type) continue;
		files.push({ file, type });
		total += file.size;
	}
	return { files, skipped: uploads.length - files.length };
}

/** Base64 without Node's Buffer, so the endpoint stays host-agnostic. */
async function toBase64(file: File) {
	const bytes = new Uint8Array(await file.arrayBuffer());
	let binary = '';
	for (let i = 0; i < bytes.length; i += 0x8000) {
		binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
	}
	return btoa(binary);
}

async function deliver(enquiry: Enquiry, photos: Photos | null): Promise<boolean> {
	let text = summarise(enquiry, { photos: photos?.files.length ?? 0 });
	if (photos?.skipped) {
		text += `\n\nNote: ${photos.skipped} photo(s) could not be attached (unsupported type or too large). Ask the customer to send them on WhatsApp or by email.`;
	}

	if (!env.RESEND_API_KEY) {
		if (dev) {
			console.info(`[enquiry] RESEND_API_KEY not set — not emailed:\n${text}`);
			return true;
		}
		console.error('[enquiry] RESEND_API_KEY is not configured');
		return false;
	}

	const subject =
		enquiry.kind === 'quote'
			? `Quote request — ${enquiry.name}${enquiry.location ? `, ${enquiry.location}` : ''}`
			: `Website enquiry — ${enquiry.name}`;

	try {
		const attachments = photos?.files.length
			? await Promise.all(
					// Neutral names instead of whatever the visitor's device called them
					photos.files.map(async ({ file, type }, i) => ({
						filename: `site-photo-${i + 1}.${type}`,
						content: await toBase64(file)
					}))
				)
			: undefined;

		const to = env.ENQUIRY_TO || settings.email;
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${env.RESEND_API_KEY}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				from: env.ENQUIRY_FROM ?? 'Capital Shades Website <onboarding@resend.dev>',
				to: [to],
				reply_to: enquiry.email || undefined,
				subject,
				text,
				attachments
			})
		});
		if (!response.ok) {
			console.error('[enquiry] Resend error', response.status, await response.text());
		}
		return response.ok;
	} catch (error) {
		console.error('[enquiry] Resend request failed', error);
		return false;
	}
}
