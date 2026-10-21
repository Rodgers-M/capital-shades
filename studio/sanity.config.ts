import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { CogIcon } from '@sanity/icons/Cog';
import { schemaTypes } from './schemaTypes';

const SINGLETONS = new Set(['siteSettings']);
/** Read-only types that editors never create. TODO(after-c5-migration): drop with the product type. */
const NO_NEW_DOCUMENTS = new Set([...SINGLETONS, 'product']);

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
					// Projects and blog posts first: what the owner updates most (Phase C5)
					.items([
						S.documentTypeListItem('project').title('Projects'),
						S.documentTypeListItem('post').title('Blog posts'),
						orderableDocumentListDeskItem({ type: 'solution', title: 'Solutions', S, context }),
						S.divider(),
						S.listItem()
							.title('Site settings')
							.id('siteSettings')
							.icon(CogIcon)
							.child(S.document().schemaType('siteSettings').documentId('siteSettings')),
						S.divider(),
						S.documentTypeListItem('product').title('Legacy products (read-only)')
					])
		}),
		table(),
		visionTool()
	],

	schema: {
		types: schemaTypes,
		// Hide the singleton and legacy types from "New document"
		templates: (templates) =>
			templates.filter(({ schemaType }) => !NO_NEW_DOCUMENTS.has(schemaType))
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
