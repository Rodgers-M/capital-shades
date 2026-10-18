import { defineArrayMember, defineField, type ImageRule } from 'sanity';

export const altField = defineField({
	name: 'alt',
	title: 'Description (alt text)',
	type: 'string',
	description:
		'Describe what the photo shows, e.g. "Green cantilever carport over a white SUV". Helps Google and screen readers.',
	validation: (rule) => rule.required()
});

interface ImageFieldOptions {
	description?: string;
	group?: string;
	/** Defaults to required */
	validation?: (rule: ImageRule) => ImageRule;
}

/** An image with hotspot/crop and required alt text. */
export function imageField(
	name = 'image',
	title = 'Photo',
	{ validation = (rule) => rule.required(), ...options }: ImageFieldOptions = {}
) {
	return defineField({
		name,
		title,
		type: 'image',
		...options,
		options: { hotspot: true },
		fields: [altField],
		validation
	});
}

/** One photo in an image array, such as a project gallery. */
export const imageMember = defineArrayMember({
	type: 'image',
	options: { hotspot: true },
	fields: [altField]
});
