import { getContent } from '$lib/server/content';

const HERO_PROJECT = 'green-cantilever-driveway';

export async function load() {
	const { projects } = await getContent();
	const featured = projects.filter((p) => p.featured && p.slug !== HERO_PROJECT);
	const pool = featured.length >= 4 ? featured : projects.filter((p) => p.slug !== HERO_PROJECT);
	return {
		heroImage: (projects.find((p) => p.slug === HERO_PROJECT) ?? projects[0]).image,
		// Desktop hero card shows the first; the projects row shows the next three
		latestProject: pool[0],
		projects: pool.slice(1, 4)
	};
}
