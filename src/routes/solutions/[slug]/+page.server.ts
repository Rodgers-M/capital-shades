import { error } from '@sveltejs/kit';
import { getContent } from '$lib/server/content';

/** Related projects shown on the page; the rest are in the filtered gallery. */
const SHOWN_PROJECTS = 5;

export async function entries() {
	const { products } = await getContent();
	return products.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const { products, projects } = await getContent();
	// TODO: rename once the content source serves Solution records (Sanity schema migration)
	const solution = products.find((p) => p.slug === params.slug);
	if (!solution) error(404, 'Solution not found');

	// Photos already on the page (this hero, other solutions' thumbnails) aren't repeated
	const pagePhotos = new Set(products.map((p) => p.image.src));
	const related = projects
		.filter((p) => p.solutions.includes(solution.slug) && !pagePhotos.has(p.heroImage.src))
		.sort((a, b) => Number(b.featured) - Number(a.featured));
	const shown = related.slice(0, SHOWN_PROJECTS);
	const closing =
		related.slice(SHOWN_PROJECTS).find((p) => p.heroImage.width > p.heroImage.height) ??
		related[SHOWN_PROJECTS];

	return {
		solution,
		projects: shown,
		closingImage: closing?.heroImage,
		others: products.filter((p) => p.slug !== solution.slug),
		whatsappTopic: solution.title
	};
}
