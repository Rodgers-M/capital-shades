import { getContent } from '$lib/server/content';

export async function load() {
	const { projects, posts } = await getContent();
	const featured = projects.filter((p) => p.featured);
	const bySlug = (slug: string) => projects.find((p) => p.slug === slug) ?? projects[0];
	return {
		heroImage: bySlug('green-cantilever-driveway').image,
		processImage: bySlug('pergola-structure').image,
		projects: (featured.length >= 6 ? featured : projects).slice(0, 6),
		posts: posts.slice(0, 3).map(({ html: _html, ...summary }) => summary)
	};
}
