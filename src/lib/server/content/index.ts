import type { QuoteMaterials } from '$lib/enquiry';
import { LEGACY_SOLUTION_SLUGS } from '$lib/content/solutionTypes';
import type { Post, Project, SiteSettings, Solution } from '$lib/content/types';
import { loadSeedContent } from './seed';
import { loadSanityContent, sanityConfig } from './sanity';

export interface Content {
	settings: SiteSettings;
	/** Published solutions, in display order: the ones listed and linked across the site */
	solutions: Solution[];
	/**
	 * Retired solutions whose old page is still served, unlisted. None in the
	 * seed: give a retired slug a redirect in LEGACY_SOLUTION_SLUGS instead.
	 */
	legacySolutions: Solution[];
	/** Quote material choices set in the solution records, any status */
	quoteMaterials: QuoteMaterials;
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
	// A legacy page whose slug now redirects is never built (e.g. a migrated Pool Shades record)
	content.legacySolutions = content.legacySolutions.filter(
		(s) => !Object.hasOwn(LEGACY_SOLUTION_SLUGS, s.slug)
	);
	return content;
}
