import { getContent } from '$lib/server/content';

export async function load() {
	const { projects } = await getContent();
	return { projects };
}
