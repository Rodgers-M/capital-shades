import { redirect } from '@sveltejs/kit';
import { currentSolutionSlug } from '$lib/content/solutionTypes';
import { solutionHref } from '$lib/nav';

// Retired solution slug — permanent redirect keeps links and search ranking
export const prerender = false;
// Old WordPress links end in a slash: answer it here, so there is no slash-stripping hop first
export const trailingSlash = 'ignore';
export const GET = ({ params }) => redirect(301, solutionHref(currentSolutionSlug(params.legacy)));
