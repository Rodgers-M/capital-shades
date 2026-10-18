import { defineArrayMember, defineField, defineType, type ValidationContext } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { LEGACY_SOLUTION_SLUGS, isSolutionTypeId } from '../../src/lib/content/solutionTypes';
import { solutionId } from '../scripts/ids';
import { imageField } from './image';
import { SECTOR_OPTIONS } from './sectors';

/** Values must match MATERIALS in src/lib/enquiry.ts; unknown ones are ignored by the site. */
const MATERIAL_OPTIONS = [
	{ title: 'Shade mesh', value: 'mesh' },
	{ title: 'Waterproof PVC', value: 'pvc' },
	{ title: 'Metal roofing', value: 'metal' }
];

const hasText = (value: unknown) => typeof value === 'string' && value.trim() !== '';
// Alt text alone doesn't count: the photo itself must be there
const hasPhoto = (value: unknown) =>
	!!(value as { asset?: { _ref?: string } } | undefined)?.asset?._ref;

/** Copy a page can't do without, unless the solution has no page yet. */
const neededForPage =
	(isSet: (value: unknown) => boolean) =>
	(value: unknown, { document }: ValidationContext) =>
		document?.status === 'planned' || isSet(value)
			? true
			: 'Needed for the page. Set the status to Planned if it isn’t ready.';

export const solution = defineType({
	name: 'solution',
	title: 'Solution',
	type: 'document',
	icon: PackageIcon,
	orderings: [orderRankOrdering],
	groups: [
		{ name: 'page', title: 'Page', default: true },
		{ name: 'quote', title: 'Quote form' },
		{ name: 'search', title: 'Search' }
	],
	fields: [
		orderRankField({ type: 'solution' }),
		defineField({
			name: 'title',
			type: 'string',
			group: 'page',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'slug',
			title: 'Web address',
			type: 'slug',
			group: 'page',
			options: { source: 'title' },
			description:
				'Changing this changes the page URL. Locked for the eight main solutions: the quote form uses it.',
			// The quote form and project filters key on the taxonomy IDs (src/lib/content/solutionTypes.ts)
			// Locks only the records created by the import or migration, never a slug being typed
			readOnly: ({ document }) => {
				const slug = (document?.slug as { current?: string } | undefined)?.current;
				const id = document?._id.replace(/^drafts\./, '');
				return slug !== undefined && isSolutionTypeId(slug) && id === solutionId(slug);
			},
			validation: (r) =>
				r
					.required()
					.custom((slug?: { current?: string }) =>
						slug?.current && Object.hasOwn(LEGACY_SOLUTION_SLUGS, slug.current)
							? 'This old address redirects to another solution, so the page would never show.'
							: true
					)
		}),
		defineField({
			name: 'status',
			type: 'string',
			group: 'page',
			options: {
				list: [
					{ title: 'Published — has a page and is listed', value: 'published' },
					{ title: 'Planned — no page until its copy and photo are ready', value: 'planned' },
					{ title: 'Legacy — old page kept for existing links, not listed', value: 'legacy' }
				],
				layout: 'radio'
			},
			initialValue: 'published',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'eyebrow',
			title: 'Typical use',
			type: 'string',
			group: 'page',
			description: 'Short line above the title on cards, e.g. "Homes to shopping centres".'
		}),
		defineField({
			name: 'summary',
			type: 'text',
			rows: 2,
			group: 'page',
			description: 'One or two sentences, shown on cards and in search results.',
			validation: (r) => [r.custom(neededForPage(hasText)), r.max(200)]
		}),
		defineField({
			name: 'body',
			title: 'Description',
			type: 'array',
			group: 'page',
			description: 'One entry per paragraph.',
			of: [defineArrayMember({ type: 'text', rows: 4 })]
		}),
		imageField('image', 'Photo', {
			group: 'page',
			validation: (r) => r.custom(neededForPage(hasPhoto))
		}),
		defineField({
			name: 'applications',
			type: 'array',
			group: 'page',
			description:
				'Where or how it is used: places and variants, e.g. "Walkway covers", "Swimming-pool shades", "Hotels". Shown on the page.',
			of: [defineArrayMember({ type: 'string' })],
			options: { layout: 'tags' }
		}),
		defineField({
			name: 'features',
			type: 'array',
			group: 'page',
			of: [defineArrayMember({ type: 'string' })],
			validation: (r) => r.max(6)
		}),
		defineField({
			name: 'sectors',
			title: 'Customer sectors',
			type: 'array',
			group: 'page',
			description:
				'Who it is for. Not shown on the page yet. The first values came from each page’s applications list and still need the owner’s confirmation.',
			of: [defineArrayMember({ type: 'string' })],
			options: { list: SECTOR_OPTIONS, layout: 'grid' }
		}),
		defineField({
			name: 'quoteMaterials',
			title: 'Material choices in the quote form',
			type: 'array',
			group: 'quote',
			description:
				'Only materials this solution is really offered in. "Not sure yet" is always added. Leave all unticked to use the website’s built-in list.',
			of: [defineArrayMember({ type: 'string' })],
			options: { list: MATERIAL_OPTIONS, layout: 'grid' }
		}),
		defineField({
			name: 'aliases',
			title: 'Customer terms',
			type: 'array',
			group: 'search',
			description:
				'Words customers search with, e.g. "car shades", "carports". For search and future content, never listed on the page.',
			of: [defineArrayMember({ type: 'string' })],
			options: { layout: 'tags' }
		})
	],
	preview: {
		select: { title: 'title', status: 'status', eyebrow: 'eyebrow', media: 'image' },
		prepare: ({ title, status, eyebrow, media }) => ({
			title,
			subtitle: status && status !== 'published' ? `${status} · ${eyebrow ?? ''}` : eyebrow,
			media
		})
	}
});
