import { redirect } from '@sveltejs/kit';

// Old WordPress URL — permanent redirect keeps its search ranking
export const prerender = false;
export const GET = () => redirect(301, '/solutions/car-park-shades');
