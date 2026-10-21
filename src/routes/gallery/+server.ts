import { redirect } from '@sveltejs/kit';

export const prerender = false;
// Old WordPress links end in a slash: answer it here, so there is no slash-stripping hop first
export const trailingSlash = 'ignore';
export const GET = () => redirect(301, '/projects');
