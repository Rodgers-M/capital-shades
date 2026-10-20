import { redirect } from '@sveltejs/kit';
import { PROJECTS_HREF, SOLUTIONS_HREF, solutionHref } from '$lib/nav';

/**
 * Old WordPress portfolio categories → the closest current page (mapping:
 * docs/implementation.md, Phase C7). Tents have no page: they aren't promoted
 * (docs/decisions.md — "Tents"). Anything else goes to the portfolio.
 */
const CATEGORIES: Readonly<Record<string, string>> = {
	canopies: solutionHref('canopies'),
	'car-park-shade': solutionHref('car-parking-shades'),
	services: SOLUTIONS_HREF,
	tents: SOLUTIONS_HREF
};

export const prerender = false;
// Old WordPress links end in a slash: answer it here, so there is no slash-stripping hop first
export const trailingSlash = 'ignore';
export const GET = ({ params }) => {
	const category = params.path.replace(/\/+$/, '');
	redirect(301, Object.hasOwn(CATEGORIES, category) ? CATEGORIES[category] : PROJECTS_HREF);
};
