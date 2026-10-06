import { SITE_URL } from '$lib/config';
import { getContent } from '$lib/server/content';
import { QUOTE_HREF, SOLUTIONS_HREF, solutionHref } from '$lib/nav';

export const prerender = true;

export async function GET() {
	const { products, posts } = await getContent();
	const pages = [
		'/',
		SOLUTIONS_HREF,
		...products.map((p) => solutionHref(p.slug)),
		'/projects',
		QUOTE_HREF,
		'/about',
		'/blog',
		...posts.map((p) => `/blog/${p.slug}`),
		'/contact'
	];
	const lastmod = new Map(posts.map((p) => [`/blog/${p.slug}`, p.date]));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map((path) => {
		const date = lastmod.get(path);
		return `\t<url><loc>${SITE_URL}${path}</loc>${date ? `<lastmod>${date}</lastmod>` : ''}</url>`;
	})
	.join('\n')}
</urlset>`;

	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
