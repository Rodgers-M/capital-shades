import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

const phoneFields = [
	defineField({
		name: 'display',
		title: 'Displayed as',
		type: 'string',
		description: 'How the number appears on the site, e.g. 0722 765 397',
		validation: (rule) => rule.required()
	}),
	defineField({
		name: 'number',
		title: 'International number (digits only)',
		type: 'string',
		description: 'Used for call and WhatsApp links, e.g. 254722765397',
		validation: (rule) =>
			rule.required().regex(/^254\d{9}$/, { name: 'Kenyan number starting 254' })
	})
];

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	icon: CogIcon,
	groups: [
		{ name: 'business', title: 'Business', default: true },
		{ name: 'contact', title: 'Contact' },
		{ name: 'quotes', title: 'Quotes & warranty' },
		{ name: 'proof', title: 'Stats & social proof' }
	],
	fields: [
		defineField({
			name: 'name',
			type: 'string',
			group: 'business',
			validation: (r) => r.required()
		}),
		defineField({ name: 'legalName', title: 'Legal name', type: 'string', group: 'business' }),
		defineField({ name: 'tagline', type: 'string', group: 'business' }),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			group: 'business',
			description: 'Used in search results and the footer.',
			validation: (r) => r.required().max(200)
		}),
		defineField({
			name: 'sectors',
			title: 'Who we build for',
			type: 'array',
			group: 'business',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'title', type: 'string' }),
						defineField({ name: 'text', type: 'text', rows: 2 })
					]
				})
			]
		}),
		defineField({
			name: 'primaryPhone',
			title: 'Main phone number',
			type: 'object',
			group: 'contact',
			description: 'The one number shown on the site: header, call buttons and footer.',
			fields: phoneFields,
			validation: (r) => r.required()
		}),
		defineField({
			name: 'phones',
			title: 'Other phone numbers',
			type: 'array',
			group: 'contact',
			description: 'Kept for reference only. Never shown on the site.',
			of: [defineArrayMember({ type: 'object', name: 'phone', fields: phoneFields })]
		}),
		defineField({
			name: 'whatsapp',
			title: 'WhatsApp number',
			type: 'object',
			group: 'contact',
			fields: phoneFields,
			validation: (r) => r.required()
		}),
		defineField({
			name: 'email',
			type: 'string',
			group: 'contact',
			validation: (r) => r.required().email()
		}),
		defineField({
			name: 'location',
			type: 'string',
			group: 'contact',
			description: 'Where the business is based, shown publicly, e.g. "Nairobi".'
		}),
		defineField({
			name: 'address',
			title: 'Street address',
			type: 'string',
			group: 'contact',
			description: 'Leave empty unless the business wants its premises published.'
		}),
		defineField({
			name: 'googleMapsUrl',
			title: 'Google Maps link',
			type: 'url',
			group: 'contact',
			description: 'Leave empty to hide.'
		}),
		defineField({
			name: 'serviceAreas',
			title: 'Service areas',
			type: 'array',
			group: 'contact',
			description: 'The main areas served, e.g. "Kiambu County". Shown on the site and to Google.',
			of: [defineArrayMember({ type: 'string' })],
			options: { layout: 'tags' }
		}),
		defineField({
			name: 'hours',
			title: 'Opening hours',
			type: 'string',
			group: 'contact',
			description: 'Leave empty to hide.'
		}),
		defineField({ name: 'facebookUrl', title: 'Facebook page', type: 'url', group: 'proof' }),
		defineField({
			name: 'instagramUrl',
			title: 'Instagram profile',
			type: 'url',
			group: 'proof',
			description: 'Only the official account. Leave empty to hide.'
		}),
		defineField({
			name: 'linkedinUrl',
			title: 'LinkedIn page',
			type: 'url',
			group: 'proof',
			description: 'Only the official account. Leave empty to hide.'
		}),
		defineField({
			name: 'facebookReviewsUrl',
			title: 'Facebook reviews page',
			type: 'url',
			group: 'proof',
			description:
				'Shows a "Highly recommended on Facebook" band with links to read and leave reviews. Leave empty to hide it.'
		}),
		defineField({
			name: 'stats',
			title: 'Stats bar',
			type: 'array',
			group: 'proof',
			description:
				'Up to 4 short facts shown under the home page hero. Avoid numbers that go out of date.',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'value', type: 'string' }),
						defineField({ name: 'label', type: 'string' })
					],
					preview: { select: { title: 'value', subtitle: 'label' } }
				})
			],
			validation: (r) => r.max(4)
		}),
		defineField({
			name: 'quoteNote',
			title: 'Estimate and quotation',
			type: 'text',
			rows: 3,
			group: 'quotes',
			description:
				'Shown with the quote request. Keep it clear that the final quotation follows the site visit and confirmed measurements.'
		}),
		defineField({
			name: 'siteVisitNote',
			title: 'Site visits',
			type: 'text',
			rows: 2,
			group: 'quotes',
			description: 'Don’t promise free visits everywhere: it depends on the distance from Nairobi.'
		}),
		defineField({
			name: 'warrantyNote',
			title: 'Warranty',
			type: 'text',
			rows: 3,
			group: 'quotes',
			description:
				'Keep it conditional ("selected structures… up to 10 years") until the warranty scope is confirmed. Leave empty to hide.'
		})
	],
	preview: { prepare: () => ({ title: 'Site settings' }) }
});
