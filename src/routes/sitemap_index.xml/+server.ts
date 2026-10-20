import { redirect } from '@sveltejs/kit';

// The old site's sitemap (Yoast), still known to Google and possibly Search Console
export const prerender = false;
export const GET = () => redirect(301, '/sitemap.xml');
