import { getContent } from '$lib/server/content';
import { SECTORS } from '$lib/content/sectors';
import type { Project } from '$lib/content/types';

const isLandscape = (p: Project) => p.heroImage.width >= p.heroImage.height * 1.2;

export async function load() {
	const { projects, products } = await getContent();

	/*
	 * Photos chosen from content, not by slug: owner-featured projects first,
	 * each photo used once, and never one already shown as a solution thumbnail.
	 */
	const used = new Set(products.map((p) => p.image.src));
	const pool = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
	const take = (match: (p: Project) => boolean = () => true) => {
		const found = pool.find((p) => !used.has(p.heroImage.src) && match(p));
		if (found) used.add(found.heroImage.src);
		return found;
	};

	const hero = take(isLandscape) ?? take();
	const selected = [take(), take(), take()].filter((p): p is Project => !!p);
	const processImage = (take((p) => !isLandscape(p)) ?? take())?.heroImage;
	const closing = take((p) => isLandscape(p) && p.sector !== hero?.sector) ?? take(isLandscape);

	return {
		heroImage: hero?.heroImage,
		selectedProjects: selected,
		processImage,
		closingImage: closing?.heroImage,
		sectors: SECTORS.map((s) => ({ ...s, hasProjects: projects.some((p) => p.sector === s.id) }))
	};
}
