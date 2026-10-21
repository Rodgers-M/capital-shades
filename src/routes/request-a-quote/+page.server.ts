import { getContent } from '$lib/server/content';

export async function load() {
	const { quoteMaterials } = await getContent();
	return { quoteMaterials };
}
