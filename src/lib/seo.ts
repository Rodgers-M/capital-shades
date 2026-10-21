import { SITE_URL } from '$lib/config';
import { sectorLabel } from '$lib/content/sectors';
import type { Project, Solution } from '$lib/content/types';

/**
 * A JSON-LD <script> tag for {@html}. Built here rather than inline in markup:
 * a literal closing script tag inside a .svelte template trips the parser.
 */
export function jsonLdTag(data: Record<string, unknown>) {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</` + 'script>';
}

/** One step of a page's place in the site, e.g. { name: 'Solutions', path: '/solutions' }. */
export interface Crumb {
	name: string;
	path: string;
}

/** BreadcrumbList for a deep page; structured data only, the pages show no breadcrumb trail. */
export function breadcrumbList(crumbs: Crumb[]): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: new URL(crumb.path, SITE_URL).href
		}))
	};
}

/** Title (without the site name) and description for a solution page. */
export function solutionSeo(solution: Solution): { title: string; description: string } {
	return {
		title: solution.seoTitle ?? `${solution.title} in Kenya`,
		description: solution.seoDescription ?? solution.summary
	};
}

/**
 * Title (without the site name) and description for a project page, from its
 * verified fields only. The title stays the editorial name plus its general
 * location when known, so unconfirmed places are never implied.
 */
export function projectSeo(
	project: Project,
	solutions: Pick<Solution, 'title'>[]
): { title: string; description: string } {
	const kind = solutions.map((s) => s.title).join(' and ');
	const sector = sectorLabel(project.sector).toLowerCase();
	const where = project.location ? ` in ${project.location}` : '';
	const when = project.completed ? `, completed in ${project.completed}` : '';
	// "an institutional site"; solution titles all start with a consonant sound
	const site = `${/^[aeiou]/.test(sector) ? 'an' : 'a'} ${sector} site`;
	const lead = kind
		? `${project.title}${where}: a ${kind} project for ${site} by Capital Shades${when}.`
		: `${project.title}${where}: a project for ${site} by Capital Shades${when}.`;
	return {
		title: project.location ? `${project.title}, ${project.location}` : project.title,
		description: project.scope ? `${lead} ${project.scope}` : lead
	};
}
