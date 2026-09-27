/** Shared between the enquiry forms and the /api/enquiry endpoint. */

export const APPLICATIONS = [
	{ value: 'residential', label: 'Residential', hint: 'Homes, villas & apartments' },
	{ value: 'commercial', label: 'Commercial', hint: 'Offices, hotels & industrial' },
	{ value: 'school', label: 'School', hint: 'Parking, playgrounds & walkways' },
	{ value: 'shopping', label: 'Shopping centre', hint: 'Malls & retail parking' }
] as const;

export const SIZES = [
	{ value: 'small', label: '1–2 cars', hint: 'Approx. 15–30 m²' },
	{ value: 'medium', label: '3–6 cars', hint: 'Approx. 45–90 m²' },
	{ value: 'large', label: 'Large or custom', hint: '7+ bays or a bespoke design' }
] as const;

export const MATERIALS = [
	{
		value: 'mesh',
		label: 'Heavy-duty shade mesh',
		hint: 'Breathable shade netting',
		perks: ['Blocks most UV', 'Airflow keeps it cool', 'Wide colour range']
	},
	{
		value: 'pvc',
		label: '100% waterproof PVC',
		hint: 'Coated membrane',
		perks: ['Full sun & rain cover', 'Clean architectural finish', 'Wide colour range']
	},
	{
		value: 'unsure',
		label: 'Not sure yet',
		hint: "We'll recommend one on site",
		perks: []
	}
] as const;

export type EnquiryKind = 'contact' | 'assessment';

export interface Enquiry {
	kind: EnquiryKind;
	name: string;
	phone: string;
	email: string;
	location: string;
	product: string;
	application: string;
	size: string;
	material: string;
	message: string;
}

const LIMITS: Record<keyof Omit<Enquiry, 'kind'>, number> = {
	name: 120,
	phone: 40,
	email: 200,
	location: 200,
	product: 80,
	application: 40,
	size: 40,
	material: 40,
	message: 4000
};

export function labelFor(
	list: readonly { value: string; label: string }[],
	value: string
): string | undefined {
	return list.find((o) => o.value === value)?.label;
}

/** Parse and validate form data. Returns field errors, or the enquiry. */
export function parseEnquiry(
	form: FormData
): { ok: true; enquiry: Enquiry } | { ok: false; errors: Record<string, string> } {
	const get = (key: keyof typeof LIMITS) =>
		String(form.get(key) ?? '')
			.trim()
			.slice(0, LIMITS[key]);

	const enquiry: Enquiry = {
		kind: form.get('kind') === 'assessment' ? 'assessment' : 'contact',
		name: get('name'),
		phone: get('phone'),
		email: get('email'),
		location: get('location'),
		product: get('product'),
		application: get('application'),
		size: get('size'),
		material: get('material'),
		message: get('message')
	};

	const errors: Record<string, string> = {};
	if (!enquiry.name) errors.name = 'Please enter your name.';
	if (!/^\+?[\d\s()-]{7,}$/.test(enquiry.phone))
		errors.phone = 'Please enter a valid phone number.';
	if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email))
		errors.email = 'Please enter a valid email address.';
	if (enquiry.kind === 'assessment' && !enquiry.location)
		errors.location = 'Please tell us where the site is.';

	return Object.keys(errors).length ? { ok: false, errors } : { ok: true, enquiry };
}

/** Plain-text summary, used for the email and the WhatsApp fallback. */
export function summarise(e: Enquiry): string {
	const lines = [
		e.kind === 'assessment' ? 'Site assessment request' : 'Website enquiry',
		`Name: ${e.name}`,
		`Phone: ${e.phone}`,
		e.email && `Email: ${e.email}`,
		e.location && `Location: ${e.location}`,
		e.product && `Product: ${e.product}`,
		e.application && `Application: ${labelFor(APPLICATIONS, e.application) ?? e.application}`,
		e.size && `Size: ${labelFor(SIZES, e.size) ?? e.size}`,
		e.material && `Material: ${labelFor(MATERIALS, e.material) ?? e.material}`,
		e.message && `\n${e.message}`
	];
	return lines.filter(Boolean).join('\n');
}
