import { redirect } from '@sveltejs/kit';

// Renamed to Solutions — permanent redirect keeps links and search ranking
export const prerender = false;
export const GET = () => redirect(301, '/solutions');
