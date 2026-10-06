import { getContent } from '$lib/server/content';
import { SECTORS } from '$lib/content/sectors';

export async function load() {
	const { projects, products } = await getContent();
	return {
		// Owner-flagged projects lead
		projects: [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
		// Only filters that have projects behind them (no dead filters, no counts)
		filterOptions: {
			solutions: products
				.filter((s) => projects.some((p) => p.solutions.includes(s.slug)))
				.map(({ slug, title }) => ({ id: slug, label: title })),
			sectors: SECTORS.filter((s) => projects.some((p) => p.sector === s.id)).map(
				({ id, label }) => ({ id, label })
			)
		}
	};
}
