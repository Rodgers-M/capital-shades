import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { CogIcon } from '@sanity/icons/Cog';
import { schemaTypes } from './schemaTypes';

const SINGLETONS = new Set(['siteSettings']);

export default defineConfig({
	name: 'capital-shades',
	title: 'Capital Shades',
	projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
	dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

	plugins: [
		structureTool({
			structure: (S, context) =>
				S.list()
					.title('Content')
					.items([
						S.documentTypeListItem('project').title('Projects'),
						orderableDocumentListDeskItem({ type: 'product', title: 'Products', S, context }),
						S.documentTypeListItem('post').title('Blog posts'),
						S.divider(),
						S.listItem()
							.title('Site settings')
							.id('siteSettings')
							.icon(CogIcon)
							.child(S.document().schemaType('siteSettings').documentId('siteSettings'))
					])
		}),
		table(),
		visionTool()
	],

	schema: {
		types: schemaTypes,
		// Settings is a single document — hide it from "New document"
		templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType))
	},

	document: {
		actions: (actions, { schemaType }) =>
			SINGLETONS.has(schemaType)
				? actions.filter(
						({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)
					)
				: actions
	}
});
