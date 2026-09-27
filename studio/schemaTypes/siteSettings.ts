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
			name: 'phones',
			title: 'Phone numbers',
			type: 'array',
			group: 'contact',
			description: 'The first number is the main one (header, call buttons).',
			of: [defineArrayMember({ type: 'object', name: 'phone', fields: phoneFields })],
			validation: (r) => r.required().min(1)
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
			description: 'Shown publicly, e.g. "Nairobi, Kenya" or a full address.'
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
			name: 'facebookReviews',
			title: 'Facebook recommendations',
			type: 'object',
			group: 'proof',
			description: 'Copy from the Facebook page, e.g. 100% recommend (97 reviews).',
			fields: [
				defineField({ name: 'percent', type: 'number', validation: (r) => r.min(0).max(100) }),
				defineField({ name: 'count', title: 'Number of reviews', type: 'number' })
			]
		}),
		defineField({
			name: 'stats',
			title: 'Stats bar',
			type: 'array',
			group: 'proof',
			description:
				'Up to 4 facts shown under the home page hero. Only use numbers you can back up.',
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
		})
	],
	preview: { prepare: () => ({ title: 'Site settings' }) }
});
