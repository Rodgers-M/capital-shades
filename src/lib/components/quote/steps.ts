import type { Enquiry, EnquiryField } from '$lib/enquiry';

/** The answers the quote steps edit; `kind` is fixed to "quote". */
export type QuoteValues = Omit<Enquiry, 'kind'>;

export type QuoteErrors = Partial<Record<EnquiryField, string>>;

/**
 * The steps, in order, and the fields each one asks for. Validation and the
 * error summary use `fields` to find which step an error belongs to.
 */
export const QUOTE_STEPS = [
	{ title: 'What do you need?', fields: ['structure', 'siteType', 'use'] },
	{
		title: 'Tell us about the site',
		fields: ['location', 'width', 'length', 'vehicles', 'material', 'message']
	},
	{ title: 'How should we contact you?', fields: ['name', 'phone', 'email', 'contactMethod'] }
] as const satisfies readonly { title: string; fields: readonly EnquiryField[] }[];

export const stepFields = (index: number): readonly EnquiryField[] => QUOTE_STEPS[index].fields;

/** Short names for fields that can have errors, used in the error summary */
export const FIELD_NAMES: Partial<Record<EnquiryField, string>> = {
	structure: 'Structure type',
	location: 'Site location',
	width: 'Approximate width',
	length: 'Approximate length',
	name: 'Full name',
	phone: 'Phone number',
	email: 'Email',
	contactMethod: 'Preferred contact method'
};

/** Element id of a field's control (or a choice group's fieldset). */
export const fieldId = (field: EnquiryField) => `q-${field}`;
