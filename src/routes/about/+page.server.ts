import { getContent } from '$lib/server/content';

export async function load() {
	const { projects } = await getContent();
	const bySlug = (slug: string) => projects.find((p) => p.slug === slug) ?? projects[0];
	return {
		heroImage: bySlug('office-car-park-blue').image,
		profileImage: bySlug('cantilever-carport-signboard').image,
		processImage: bySlug('pergola-structure').image
	};
}
