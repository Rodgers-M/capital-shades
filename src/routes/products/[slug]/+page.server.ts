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

	return {
		product,
		projects: projects.filter((p) => p.product === product.slug).slice(0, 6),
		others: products.filter((p) => p.slug !== product.slug)
	};
}
