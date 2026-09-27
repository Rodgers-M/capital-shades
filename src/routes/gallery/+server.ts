import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const GET = () => redirect(301, '/projects');
