import { redirect } from '@sveltejs/kit';
import { currentSolutionSlug } from '$lib/content/solutionTypes';
import { solutionHref } from '$lib/nav';

// Renamed in the C5 taxonomy migration — permanent redirect keeps links and search ranking
export const prerender = false;
export const GET = ({ params }) => redirect(301, solutionHref(currentSolutionSlug(params.legacy)));
