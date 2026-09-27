import { getContent } from '$lib/server/content';

export const prerender = true;

export async function load() {
	const { settings, products } = await getContent();
	return { settings, products };
}
