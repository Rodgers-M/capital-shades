import { redirect } from '@sveltejs/kit';

// Renamed to Request a Quote — permanent redirect keeps links and search ranking
export const prerender = false;
export const GET = () => redirect(301, '/request-a-quote');
