import { error } from '@sveltejs/kit';
import { getContent } from '$lib/server/content';

export async function entries() {
	const { products } = await getContent();
	return products.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const { products, projects } = await getContent();
	// TODO: rename once the content source serves Solution records (Sanity schema migration)
	const solution = products.find((p) => p.slug === params.slug);
	if (!solution) error(404, 'Solution not found');

	const related = projects.filter((p) => p.solutions.includes(solution.slug));
	return {
		solution,
		// A row of three; the rest are one tap away in the filtered gallery
		projects: related.slice(0, 3),
		projectCount: related.length,
		others: products.filter((p) => p.slug !== solution.slug)
	};
}
