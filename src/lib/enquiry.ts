/** Shared between the enquiry forms and the /api/enquiry endpoint. */
import { SECTORS } from '$lib/content/sectors';
import { SOLUTION_TYPES, type SolutionTypeId } from '$lib/content/solutionTypes';

export interface EnquiryOption {
	value: string;
	label: string;
	hint?: string;
}

/** Structure choice for visitors who don't know which solution fits. */
export const NOT_SURE = 'not-sure';

export const STRUCTURES: EnquiryOption[] = [
	...SOLUTION_TYPES.map((type) => ({ value: type.id, label: type.label, hint: type.hint })),
	{
		value: NOT_SURE,
		label: 'Not sure — help me choose',
		hint: 'Describe the space and we’ll advise'
	}
];

/** Only this structure asks how many vehicles need cover. */
export const VEHICLE_STRUCTURE: SolutionTypeId = 'car-parking-shades';

export const SITE_TYPES: EnquiryOption[] = SECTORS.map((sector) => ({
	value: sector.id,
	label: sector.label,
	hint: sector.examples
}));

export const VEHICLE_COUNTS: EnquiryOption[] = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3-5', label: '3–5' },
	{ value: '6-10', label: '6–10' },
	{ value: '10+', label: '10+' },
	{ value: NOT_SURE, label: 'Not sure' }
];

/** Every material choice; which ones a structure offers is in MATERIALS_BY_SOLUTION. */
export const MATERIALS: EnquiryOption[] = [
	{ value: 'mesh', label: 'Shade mesh', hint: 'Breathable shade netting' },
	{ value: 'pvc', label: 'Waterproof PVC', hint: 'Coated membrane for sun and rain' },
	{ value: 'metal', label: 'Metal roofing' },
	{ value: NOT_SURE, label: 'Not sure yet', hint: 'We can advise during the site visit' }
];

/*
 * Only materials the published solution copy confirms for that structure.
 * Structures left out don't ask about material until the owner confirms
 * options (docs/content-to-confirm.md — "Quote material options").
 */
const MATERIALS_BY_SOLUTION = new Map<string, readonly string[]>([
	['car-parking-shades', ['mesh', 'pvc', 'metal', NOT_SURE]],
	['shade-sails', ['mesh', NOT_SURE]],
	['canopies', ['pvc', NOT_SURE]],
	['tensile-custom-structures', ['pvc', NOT_SURE]]
] satisfies [SolutionTypeId, readonly string[]][]);

/** Material choices for a STRUCTURES value; empty when the question shouldn't be asked. */
export function materialOptionsForSolution(structure: string): EnquiryOption[] {
	const allowed = MATERIALS_BY_SOLUTION.get(structure);
	return allowed ? MATERIALS.filter((m) => allowed.includes(m.value)) : [];
}

/** The material if the structure offers it, otherwise empty. */
export const materialFor = (structure: string, material: string): string =>
	isOption(materialOptionsForSolution(structure), material) ? material : '';

export const CONTACT_METHODS: EnquiryOption[] = [
	{ value: 'phone', label: 'Phone call' },
	{ value: 'whatsapp', label: 'WhatsApp' },
	{ value: 'email', label: 'Email' }
];

/**
 * Site photos are attached to the enquiry email and never stored or published.
 * The browser downsizes photos before upload so the whole request stays within
 * typical serverless body limits (about 4.5 MB on Vercel). The picker needs
 * JavaScript, so photos never arrive at full size from a native form post.
 */
export const PHOTO_LIMITS = {
	count: 6,
	accept: 'image/jpeg,image/png,image/webp,image/heic,image/heif',
	/** Longest edge after downsizing in the browser */
	maxEdge: 1600,
	/** Combined size the browser aims to send */
	uploadBudget: 3.5 * 1024 * 1024,
	/** Largest single photo sent without downsizing (HEIC outside Safari) */
	maxBytes: 3 * 1024 * 1024,
	/** Server-side cap on all attached photos */
	totalBytes: 4 * 1024 * 1024
} as const;

export type EnquiryKind = 'contact' | 'quote';

export interface Enquiry {
	kind: EnquiryKind;
	name: string;
	phone: string;
	email: string;
	location: string;
	/** Contact form: solution of interest (free text title) */
	product: string;
	/** Quote: a STRUCTURES value */
	structure: string;
	/** Quote: a SITE_TYPES value */
	siteType: string;
	/** Quote: intended use, in the visitor's words */
	use: string;
	/** Quote: approximate metres, normalised, e.g. "6.5" */
	width: string;
	length: string;
	/** Quote: a VEHICLE_COUNTS value — car parking shades only */
	vehicles: string;
	/** Quote: a MATERIALS value the structure offers (materialOptionsForSolution) */
	material: string;
	/** Quote: a CONTACT_METHODS value */
	contactMethod: string;
	message: string;
}

export type EnquiryField = keyof Omit<Enquiry, 'kind'>;

const LIMITS: Record<EnquiryField, number> = {
	name: 120,
	phone: 40,
	email: 200,
	location: 200,
	product: 80,
	structure: 40,
	siteType: 40,
	use: 300,
	width: 20,
	length: 20,
	vehicles: 20,
	material: 40,
	contactMethod: 20,
	message: 4000
};

export const EMPTY_ENQUIRY: Omit<Enquiry, 'kind'> = Object.freeze({
	name: '',
	phone: '',
	email: '',
	location: '',
	product: '',
	structure: '',
	siteType: '',
	use: '',
	width: '',
	length: '',
	vehicles: '',
	material: '',
	contactMethod: '',
	message: ''
});

export function labelFor(list: readonly EnquiryOption[], value: string): string | undefined {
	return list.find((o) => o.value === value)?.label;
}

const isOption = (list: readonly EnquiryOption[], value: string) =>
	list.some((o) => o.value === value);

/**
 * Accepts rough metres as typed — "6", "6.5", "6,5", "6 m" — and returns the
 * number as text, or null when it isn't a sensible measurement.
 */
export function parseMetres(input: string): string | null {
	const value = input
		.trim()
		.toLowerCase()
		.replace(/\s*(m|metres?|meters?)$/, '')
		.replace(',', '.');
	if (!/^\d{1,4}(\.\d{1,2})?$/.test(value)) return null;
	const metres = Number(value);
	return metres > 0 && metres <= 1000 ? String(metres) : null;
}

/** Local or international numbers, e.g. 0722 765 397, +254 722 765397, +256 (0)772 123456 */
function isPhone(value: string) {
	const digits = value.replace(/\D/g, '').length;
	return /^\+?[\d\s().-]+$/.test(value) && digits >= 7 && digits <= 15;
}

/** Field errors for an enquiry. Shared by the server and the quote steps. */
export function validateEnquiry(e: Enquiry): Partial<Record<EnquiryField, string>> {
	const errors: Partial<Record<EnquiryField, string>> = {};
	if (!e.name) errors.name = 'Please enter your name.';
	if (!isPhone(e.phone)) errors.phone = 'Please enter a valid phone number.';
	if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email))
		errors.email = 'Please enter a valid email address.';

	if (e.kind === 'quote') {
		if (!isOption(STRUCTURES, e.structure))
			errors.structure = 'Choose a structure type, or “Not sure — help me choose”.';
		if (!e.location) errors.location = 'Please tell us where the site is.';
		const metres = 'Enter metres as a number, e.g. 6 or 6.5 — or leave it blank.';
		if (e.width && !parseMetres(e.width)) errors.width = metres;
		if (e.length && !parseMetres(e.length)) errors.length = metres;
		if (!isOption(CONTACT_METHODS, e.contactMethod))
			errors.contactMethod = 'Choose how you’d like us to contact you.';
		if (e.contactMethod === 'email' && !e.email)
			errors.email = 'Please enter your email address so we can reply by email.';
	}
	return errors;
}

/** Parse and validate form data. Returns field errors, or the enquiry. */
export function parseEnquiry(
	form: FormData
): { ok: true; enquiry: Enquiry } | { ok: false; errors: Partial<Record<EnquiryField, string>> } {
	const get = (key: EnquiryField) =>
		String(form.get(key) ?? '')
			.trim()
			.slice(0, LIMITS[key]);
	// Choices outside the known options are dropped rather than passed on
	const pick = (key: EnquiryField, list: readonly EnquiryOption[]) =>
		isOption(list, get(key)) ? get(key) : '';

	const kind: EnquiryKind = form.get('kind') === 'quote' ? 'quote' : 'contact';
	const structure = get('structure');
	const enquiry: Enquiry = {
		...EMPTY_ENQUIRY,
		kind,
		name: get('name'),
		phone: get('phone'),
		email: get('email'),
		location: get('location'),
		message: get('message'),
		...(kind === 'contact'
			? { product: get('product') }
			: {
					structure,
					siteType: pick('siteType', SITE_TYPES),
					use: get('use'),
					width: get('width'),
					length: get('length'),
					vehicles: structure === VEHICLE_STRUCTURE ? pick('vehicles', VEHICLE_COUNTS) : '',
					material: materialFor(structure, get('material')),
					contactMethod: get('contactMethod')
				})
	};

	const errors = validateEnquiry(enquiry);
	if (Object.keys(errors).length) return { ok: false, errors };
	return {
		ok: true,
		enquiry: {
			...enquiry,
			width: enquiry.width && (parseMetres(enquiry.width) ?? ''),
			length: enquiry.length && (parseMetres(enquiry.length) ?? '')
		}
	};
}

function dimensions(e: Pick<Enquiry, 'width' | 'length'>) {
	const width = parseMetres(e.width);
	const length = parseMetres(e.length);
	if (width && length) return `${width} m × ${length} m`;
	if (width) return `${width} m wide`;
	if (length) return `${length} m long`;
	return '';
}

export interface SummaryOptions {
	/** Number of site photos attached (email) or ready to share (WhatsApp) */
	photos?: number;
	/** Shorten free text so a pre-filled WhatsApp message stays readable */
	compact?: boolean;
}

/** Plain-text summary, used for the email and the WhatsApp fallback. */
export function summarise(
	input: Pick<Enquiry, 'kind'> & Partial<Enquiry>,
	{ photos = 0, compact = false }: SummaryOptions = {}
): string {
	const e: Enquiry = { ...EMPTY_ENQUIRY, ...input };
	const clip = (text: string, max: number) =>
		compact && text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
	const structure = labelFor(STRUCTURES, e.structure);
	const photoLine =
		e.kind === 'quote' &&
		(compact
			? photos > 0 && `Site photos: I have ${photos} to share here`
			: `Site photos: ${photos > 0 ? `${photos} attached` : 'none'}`);

	const lines = [
		// A pre-filled WhatsApp message opens with its own greeting instead
		!compact && (e.kind === 'quote' ? 'Quote request' : 'Website enquiry'),
		`Name: ${e.name}`,
		`Phone: ${e.phone}`,
		e.email && `Email: ${e.email}`,
		e.contactMethod && `Preferred contact: ${labelFor(CONTACT_METHODS, e.contactMethod)}`,
		e.product && `Solution: ${e.product}`,
		structure && `Structure: ${structure}`,
		e.siteType && `Site type: ${labelFor(SITE_TYPES, e.siteType)}`,
		e.use && `Intended use: ${clip(e.use, 120)}`,
		e.location && `Location: ${e.location}`,
		dimensions(e) && `Approx. size: ${dimensions(e)}`,
		e.vehicles && `Vehicles: ${labelFor(VEHICLE_COUNTS, e.vehicles)}`,
		e.material && `Material: ${labelFor(MATERIALS, e.material)}`,
		photoLine,
		e.message && `\n${clip(e.message, 300)}`
	];
	return lines.filter(Boolean).join('\n');
}
