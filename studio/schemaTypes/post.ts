import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { imageField } from './image';

export const post = defineType({
	name: 'post',
	title: 'Blog post',
	type: 'document',
	icon: DocumentTextIcon,
	fields: [
		defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'slug',
			title: 'Web address',
			type: 'slug',
			options: { source: 'title' },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'excerpt',
			type: 'text',
			rows: 2,
			description: 'Short summary for cards and search results.',
			validation: (r) => r.required().max(200)
		}),
		defineField({
			name: 'tag',
			type: 'string',
			options: {
				list: ['Buyers Guide', 'Case Study', 'Maintenance', 'Insights'],
				layout: 'radio',
				direction: 'horizontal'
			},
			validation: (r) => r.required()
		}),
		defineField({
			name: 'publishedAt',
			title: 'Publish date',
			type: 'datetime',
			description: 'Posts without a date are hidden from the site.'
		}),
		defineField({ name: 'author', type: 'string', initialValue: 'Capital Shades team' }),
		imageField('image', 'Cover photo'),
		defineField({
			name: 'body',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
						{ title: 'Subheading', value: 'h3' },
						{ title: 'Quote', value: 'blockquote' }
					]
				}),
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [defineField({ name: 'alt', title: 'Description (alt text)', type: 'string' })]
				}),
				defineArrayMember({ type: 'table' })
			]
		})
	],
	orderings: [
		{
			title: 'Newest first',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }]
		}
	],
	preview: {
		select: { title: 'title', date: 'publishedAt', media: 'image' },
		prepare: ({ title, date, media }) => ({
			title,
			subtitle: date ? new Date(date).toLocaleDateString('en-KE') : 'Draft — no publish date',
			media
		})
	}
});
