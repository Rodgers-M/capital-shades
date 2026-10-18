import { redirect } from '@sveltejs/kit';
import { solutionHref } from '$lib/nav';

// Old WordPress URL — permanent redirect keeps its search ranking
export const prerender = false;
export const GET = () => redirect(301, solutionHref('car-parking-shades'));
