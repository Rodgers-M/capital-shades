import { defineArrayMember, defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { imageField } from './image';

/*
 * The pre-C5 solution model, kept read-only so existing documents stay
 * viewable and project references stay valid. studio/scripts/migrate-solutions.ts
 * copies them into `solution` documents without deleting them.
 * TODO(after-c5-migration): delete with its documents once production is migrated and verified.
 */
export const product = defineType({
	name: 'product',
	title: 'Legacy product',
	type: 'document',
	icon: PackageIcon,
	readOnly: true,
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: 'product' }),
		defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'slug',
			title: 'Web address',
			type: 'slug',
			options: { source: 'title' },
			description: 'Changing this changes the page URL.',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'eyebrow',
			title: 'Short label',
			type: 'string',
			description: 'Small line above the title on cards, e.g. "Homes to shopping centres".'
		}),
		defineField({
			name: 'summary',
			type: 'text',
			rows: 2,
			description: 'One or two sentences, shown on cards and in search results.',
			validation: (r) => r.required().max(200)
		}),
		defineField({
			name: 'body',
			title: 'Description',
			type: 'array',
			description: 'One entry per paragraph.',
			of: [defineArrayMember({ type: 'text', rows: 4 })]
		}),
		defineField({
			name: 'features',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			validation: (r) => r.max(6)
		}),
		defineField({
			name: 'applications',
			title: 'Ideal for',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			options: { layout: 'tags' }
		}),
		imageField()
	],
	preview: { select: { title: 'title', subtitle: 'eyebrow', media: 'image' } }
});
