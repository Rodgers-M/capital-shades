import { getContent } from '$lib/server/content';
import { SECTORS } from '$lib/content/sectors';
import type { Project } from '$lib/content/types';

/** Solutions featured on the home page; the rest live on /solutions. */
const FEATURED_SOLUTIONS = 4;

/** Optional, owner-confirmed fields that make a project worth telling as a story. */
const storyDetail = (p: Project) =>
	[p.location, p.completed, p.requirement, p.deliveredSolution].filter(Boolean).length +
	(p.gallery?.length ? 1 : 0);

const isLandscape = (p: Project) => p.heroImage.width >= p.heroImage.height * 1.2;

export async function load() {
	const { projects, products } = await getContent();

	// Solutions with real portfolio evidence first, most projects first
	const projectCount = (slug: string) => projects.filter((p) => p.solutions.includes(slug)).length;
	const featuredSolutions = products
		.filter((s) => projectCount(s.slug) > 0)
		.sort((a, b) => projectCount(b.slug) - projectCount(a.slug))
		.slice(0, FEATURED_SOLUTIONS);

	/*
	 * Each project photo appears once on the page, and never one already used
	 * by a featured solution. Owner-flagged `featured` projects are picked first.
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
	const story = [...pool]
		.filter((p) => !usedImages.has(p.heroImage.src))
		.sort((a, b) => storyDetail(b) - storyDetail(a))[0];
	if (story) usedImages.add(story.heroImage.src);
	// Close on a different sector from the hero, so the page isn't all one setting
	const closing =
		take((p) => isLandscape(p) && p.sector !== hero?.sector) ?? take(isLandscape) ?? take();

	return {
		hero,
		selectedProjects: selected,
		featuredSolutions,
		featuredProject: story,
		closingImage: closing?.heroImage,
		// Whether each sector has projects to link to — never a count
		sectors: SECTORS.map((s) => ({ ...s, hasProjects: projects.some((p) => p.sector === s.id) }))
	};
}
