import type { Post, Product, Project, SiteSettings } from '$lib/content/types';
import { loadSeedContent } from './seed';
import { loadSanityContent, sanityConfig } from './sanity';

export interface Content {
	settings: SiteSettings;
	products: Product[];
	projects: Project[];
	/** Published posts only, newest first */
	posts: Post[];
}

let cached: Promise<Content> | undefined;

/**
 * All site content. Pages are prerendered, so this runs at build time; with
 * Sanity connected, publishing in the Studio triggers a rebuild via a deploy hook.
 */
export function getContent(): Promise<Content> {
	cached ??= load();
	return cached;
}

async function load(): Promise<Content> {
	const content = sanityConfig() ? await loadSanityContent() : loadSeedContent();
	content.posts.sort((a, b) => b.date.localeCompare(a.date));
	return content;
}
