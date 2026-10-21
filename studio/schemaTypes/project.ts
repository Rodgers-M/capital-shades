import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';
import { altField, imageField, imageMember } from './image';
import { SECTOR_OPTIONS } from './sectors';

interface ImageValue {
	asset?: { _ref?: string };
}

/** Sanity bound for typos, not a founding date. */
const EARLIEST_YEAR = 1990;

/** Shown only on documents that still hold a value from the pre-C5 schema. */
const legacyOnly = ({ document }: { document?: Record<string, unknown> }, name: string) =>
	document?.[name] === undefined;

/*
 * Fields follow the order an editor fills them in (docs/implementation.md,
 * Phase C5 — "Project workflow"). The legacy fields stay read-only until
 * studio/scripts/migrate-solutions.ts has copied them across.
 */
export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	icon: ImagesIcon,
	fieldsets: [
		{
			name: 'legacy',
			title: 'From the old website',
			description: 'Read-only. Copied into the fields above by the content migration.',
			options: { collapsible: true, collapsed: true }
		}
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Project title',
			type: 'string',
			description: 'Describe the work, e.g. "Cantilever carport" or "Office car parking shades".',
			validation: (r) => r.required()
		}),
		imageField('heroImage', 'Main photo', {
			description: 'The photo that leads the project page and its cards.'
		}),
		defineField({
			name: 'gallery',
			title: 'More photos',
			type: 'array',
			description: 'Drag to reorder. Don’t repeat the main photo here.',
			of: [imageMember],
			options: { layout: 'grid' },
			validation: (r) =>
				r.custom((gallery: ImageValue[] | undefined, { document }) => {
					const hero = (document?.heroImage as ImageValue | undefined)?.asset?._ref;
					return hero && gallery?.some((img) => img.asset?._ref === hero)
						? 'The main photo is already shown; remove it from the gallery.'
						: true;
				})
		}),
		defineField({
			name: 'solutions',
			title: 'Solution(s)',
			type: 'array',
			description: 'The main solution first. The project then appears on those solution pages.',
			of: [defineArrayMember({ type: 'reference', to: [{ type: 'solution' }] })],
			validation: (r) => r.required().min(1).unique()
		}),
		defineField({
			name: 'sector',
			type: 'string',
			options: { list: SECTOR_OPTIONS, layout: 'radio', direction: 'horizontal' },
			initialValue: 'residential',
			validation: (r) => r.required()
		}),
		defineField({
			name: 'location',
			title: 'General location',
			type: 'string',
			description:
				'Area or estate only, e.g. "Runda, Nairobi" or "Thika Road area". Never a street address, house number or anything that pinpoints a private home. Leave empty if unsure.'
		}),
		defineField({
			name: 'completionYear',
			title: 'Completion year',
			type: 'number',
			description: 'e.g. 2026. Leave empty if unknown.',
			validation: (r) =>
				r
					.integer()
					.min(EARLIEST_YEAR)
					.max(new Date().getFullYear() + 1)
		}),
		defineField({
			name: 'scope',
			title: 'Project scope',
			type: 'text',
			rows: 2,
			description:
				'What the project covered, e.g. "Cantilever shades over 12 staff parking bays". No client names.'
		}),
		defineField({
			name: 'requirement',
			title: 'Customer requirement',
			type: 'text',
			rows: 3,
			description: 'What the customer needed. No client names.'
		}),
		defineField({
			name: 'deliveredSolution',
			title: 'What we delivered',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'material',
			type: 'string',
			description: 'Optional, e.g. "Waterproof PVC".'
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			description: 'Show this project first on the home page and in the portfolio.',
			initialValue: false
		}),
		defineField({
			name: 'slug',
			title: 'Web address',
			type: 'slug',
			options: { source: 'title' },
			description: 'Generate it from the title. Changing it later breaks shared links.',
			validation: (r) => r.required()
		}),
		// TODO(after-c5-migration): remove these three once production projects are migrated
		defineField({
			name: 'image',
			title: 'Photo (old field)',
			type: 'image',
			fields: [altField],
			fieldset: 'legacy',
			readOnly: true,
			hidden: (ctx) => legacyOnly(ctx, 'image')
		}),
		defineField({
			name: 'product',
			title: 'Product (old field)',
			type: 'reference',
			to: [{ type: 'product' }],
			fieldset: 'legacy',
			readOnly: true,
			hidden: (ctx) => legacyOnly(ctx, 'product')
		}),
		defineField({
			name: 'completed',
			title: 'Completed (old field)',
			type: 'string',
			fieldset: 'legacy',
			readOnly: true,
			hidden: (ctx) => legacyOnly(ctx, 'completed')
		})
	],
	preview: {
		select: {
			title: 'title',
			sector: 'sector',
			location: 'location',
			media: 'heroImage',
			legacyMedia: 'image'
		},
		prepare: ({ title, sector, location, media, legacyMedia }) => ({
			title,
			subtitle: [SECTOR_OPTIONS.find((s) => s.value === sector)?.title, location]
				.filter(Boolean)
				.join(' · '),
			media: media ?? legacyMedia
		})
	}
});
