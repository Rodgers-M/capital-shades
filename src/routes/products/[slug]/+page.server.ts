import { error } from '@sveltejs/kit';
import { getContent } from '$lib/server/content';

export async function entries() {
	const { products } = await getContent();
	return products.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const { products, projects } = await getContent();
	const product = products.find((p) => p.slug === params.slug);
	if (!product) error(404, 'Product not found');

	const related = projects.filter((p) => p.product === product.slug);
	return {
		product,
		// A row of three; the rest are one tap away in the filtered gallery
		projects: related.slice(0, 3),
		projectCount: related.length,
		others: products.filter((p) => p.slug !== product.slug)
	};
}
