import { json, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { parseEnquiry, summarise, type Enquiry } from '$lib/enquiry';

export const prerender = false;

/*
 * Receives both enquiry forms. JS clients ask for JSON; plain HTML form posts
 * (no JS) get redirected to /thank-you. Email is sent through Resend's REST API:
 *   RESEND_API_KEY  – API key (required in production)
 *   ENQUIRY_TO      – inbox for enquiries (default info@capitalshades.co.ke)
 *   ENQUIRY_FROM    – verified sender, e.g. "Capital Shades Website <web@capitalshades.co.ke>"
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
		return wantsJson
			? json({ ok: false, errors: parsed.errors }, { status: 400 })
			: redirect(303, '/contact');
	}

	const sent = await deliver(parsed.enquiry);
	if (!sent) {
		const message = "Sorry, we couldn't send your message right now. Please call or WhatsApp us.";
		return wantsJson
			? json({ ok: false, message }, { status: 503 })
			: new Response(message, { status: 503, headers: { 'content-type': 'text/plain' } });
	}

	return wantsJson ? json({ ok: true }) : redirect(303, '/thank-you');
}

async function deliver(enquiry: Enquiry): Promise<boolean> {
	const text = summarise(enquiry);

	if (!env.RESEND_API_KEY) {
		if (dev) {
			console.info(`[enquiry] RESEND_API_KEY not set — not emailed:\n${text}`);
			return true;
		}
		console.error('[enquiry] RESEND_API_KEY is not configured');
		return false;
	}

	const subject =
		enquiry.kind === 'assessment'
			? `Site assessment request — ${enquiry.name}${enquiry.location ? `, ${enquiry.location}` : ''}`
			: `Website enquiry — ${enquiry.name}`;

	try {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${env.RESEND_API_KEY}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				from: env.ENQUIRY_FROM ?? 'Capital Shades Website <onboarding@resend.dev>',
				to: [env.ENQUIRY_TO ?? 'info@capitalshades.co.ke'],
				reply_to: enquiry.email || undefined,
				subject,
				text
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
