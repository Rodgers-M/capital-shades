import { error } from '@sveltejs/kit';
import { getContent } from '$lib/server/content';
import type { Project } from '$lib/content/types';

const RELATED = 4;

export async function entries() {
	const { projects } = await getContent();
	return projects.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const { projects, products } = await getContent();
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');

	/*
	 * Related by actual content relationships: a shared solution first, then the
	 * same sector, then owner-featured projects. Never the project itself.
	 */
	const sharesSolution = (p: Project) => p.solutions.some((s) => project.solutions.includes(s));
	const score = (p: Project) =>
		(sharesSolution(p) ? 4 : 0) + (p.sector === project.sector ? 2 : 0) + (p.featured ? 1 : 0);
	const related = projects
		.filter((p) => p.slug !== project.slug)
		.map((p) => ({ p, s: score(p) }))
		.sort((a, b) => b.s - a.s)
		.slice(0, RELATED)
		.map(({ p }) => p);

	const relatedHeading = related.every(sharesSolution)
		? 'More work in this solution'
		: related.some((p) => sharesSolution(p) || p.sector === project.sector)
			? 'Related projects'
			: 'More projects';

	return {
		project,
		// The project's own solutions, in the project's order
		projectSolutions: project.solutions
			.map((slug) => products.find((s) => s.slug === slug))
			.filter((s) => s !== undefined),
		// Extra photos only — never the hero again
		gallery: (project.gallery ?? []).filter((img) => img.src !== project.heroImage.src),
		related,
		relatedHeading,
		whatsapp: { project: project.title }
	};
}
