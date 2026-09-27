import { defineField } from 'sanity';

/** An image with hotspot/crop and required alt text. */
export function imageField(name = 'image', title = 'Photo') {
	return defineField({
		name,
		title,
		type: 'image',
		options: { hotspot: true },
		fields: [
			defineField({
				name: 'alt',
				title: 'Description (alt text)',
				type: 'string',
				description:
					'Describe what the photo shows, e.g. "Green cantilever carport over a white SUV". Helps Google and screen readers.',
				validation: (rule) => rule.required()
			})
		],
		validation: (rule) => rule.required()
	});
}
