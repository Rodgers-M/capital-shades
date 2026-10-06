import { getContent } from '$lib/server/content';
import type { Img } from '$lib/content/types';

/** Project photos shown beside each solution as proof. */
const PROOF_PHOTOS = 3;

export async function load() {
	const { products, projects } = await getContent();

	// Each photo appears once on the page, and never one used as a solution image
	const used = new Set(products.map((p) => p.image.src));
	const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

	const proof: Record<string, Img[]> = {};
	for (const solution of products) {
		proof[solution.slug] = ordered
			.filter((p) => p.solutions.includes(solution.slug) && !used.has(p.heroImage.src))
			.slice(0, PROOF_PHOTOS)
			.map((p) => {
				used.add(p.heroImage.src);
				return p.heroImage;
			});
	}

	return {
		proof,
		// Solutions with any project, so the page links to the gallery only when it isn't empty
		withProjects: products
			.filter((s) => projects.some((p) => p.solutions.includes(s.slug)))
			.map((s) => s.slug)
	};
}
