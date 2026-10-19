import { getContent } from '$lib/server/content';
import { SECTORS } from '$lib/content/sectors';
import type { Project } from '$lib/content/types';

/** Solutions listed on the home page (4–6 per the C5.5 brief); the rest live on /solutions. */
const MIN_SOLUTIONS = 4;
const MAX_SOLUTIONS = 6;

const isLandscape = (p: Project) => p.heroImage.width >= p.heroImage.height * 1.2;

export async function load() {
	const { projects, solutions } = await getContent();

	// Solutions with portfolio proof, most first; ones without fill in only up to the minimum
	const projectCount = (slug: string) => projects.filter((p) => p.solutions.includes(slug)).length;
	const ranked = [...solutions].sort((a, b) => projectCount(b.slug) - projectCount(a.slug));
	const proven = ranked.filter((s) => projectCount(s.slug) > 0).length;
	const featuredSolutions = ranked.slice(
		0,
		Math.min(MAX_SOLUTIONS, Math.max(MIN_SOLUTIONS, proven))
	);

	/*
	 * Each project photo appears once on the page, and never one already used
	 * as a solution thumbnail. Owner-flagged `featured` projects are picked first.
	 */
	const usedImages = new Set(featuredSolutions.map((s) => s.image.src));
	const pool = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
	const take = (match: (p: Project) => boolean = () => true) => {
		const found = pool.find((p) => !usedImages.has(p.heroImage.src) && match(p));
		if (found) usedImages.add(found.heroImage.src);
		return found;
	};

	// The hero needs a wide photo; fall back to any if none is left
	const hero = take(isLandscape) ?? take();
	const selected = [take(), take(), take()].filter((p): p is Project => !!p);
	// Close on a different sector from the hero, so the page isn't all one setting
	const closing =
		take((p) => isLandscape(p) && p.sector !== hero?.sector) ?? take(isLandscape) ?? take();

	return {
		hero,
		selectedProjects: selected,
		featuredSolutions,
		closingImage: closing?.heroImage,
		// Whether each sector has projects to link to — never a count
		sectors: SECTORS.map((s) => ({ ...s, hasProjects: projects.some((p) => p.sector === s.id) }))
	};
}
