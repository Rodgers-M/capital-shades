import { redirect } from '@sveltejs/kit';
import { currentSolutionSlug } from '$lib/content/solutionTypes';
import { solutionHref } from '$lib/nav';

// Renamed to Solutions — permanent redirect keeps links and search ranking. Renamed
// slugs go straight to their new page, so there is never a second hop.
export const prerender = false;
export const GET = ({ params }) => redirect(301, solutionHref(currentSolutionSlug(params.slug)));
