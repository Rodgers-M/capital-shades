import { defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';
import { imageField } from './image';

export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	icon: ImagesIcon,
	fields: [
		imageField(),
		defineField({
			name: 'title',
			type: 'string',
			description: 'e.g. "Cantilever carport" or "Office car park shades".',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'slug',
			title: 'ID',
			type: 'slug',
			options: { source: 'title' },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'product',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (r) => r.required()
		}),
		defineField({
			name: 'sector',
			type: 'string',
			options: {
				list: [
					{ title: 'Residential', value: 'residential' },
					{ title: 'Commercial', value: 'commercial' },
					{ title: 'Schools & institutions', value: 'institutional' }
				],
				layout: 'radio',
				direction: 'horizontal'
			},
			initialValue: 'residential',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'location',
			type: 'string',
			description: 'Optional — e.g. "Karen, Nairobi". Leave empty if the client prefers.'
		}),
		defineField({
			name: 'material',
			type: 'string',
			description: 'Optional — e.g. "Waterproof PVC".'
		}),
		defineField({
			name: 'completed',
			type: 'string',
			description: 'Optional — e.g. "Mar 2026".'
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			description: 'Show on the home page (the first six featured projects are used).',
			initialValue: false
		})
	],
	preview: {
		select: { title: 'title', product: 'product.title', location: 'location', media: 'image' },
		prepare: ({ title, product, location, media }) => ({
			title,
			subtitle: [product, location].filter(Boolean).join(' · '),
			media
		})
	}
});
