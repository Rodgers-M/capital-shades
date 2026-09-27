/**
 * One-off: copy the website's seed content (settings, products, projects,
 * blog posts and photos) into Sanity.
 *
 *   cd studio && npm run import-seed
 *
 * Safe to re-run — documents use fixed IDs and are replaced, and Sanity
 * de-duplicates identical image uploads.
 */
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';
import { settings } from '../../src/lib/content/seed/settings';
import { products } from '../../src/lib/content/seed/products';
import { projects } from '../../src/lib/content/seed/projects';
import { posts } from '../../src/lib/content/seed/posts';
import { markdownToPortableText } from './markdownToPortableText';

const client = getCliClient({ apiVersion: '2025-10-01' });
const PHOTOS = path.resolve(import.meta.dirname, '../../src/lib/assets/photos');

const uploaded = new Map<string, string>();

async function image(photo: string, alt: string) {
	if (!uploaded.has(photo)) {
		const asset = await client.assets.upload(
			'image',
			createReadStream(path.join(PHOTOS, `${photo}.jpg`)),
			{ filename: `${photo}.jpg` }
		);
		uploaded.set(photo, asset._id);
		console.log(`  uploaded ${photo}.jpg`);
	}
	return { _type: 'image', alt, asset: { _type: 'reference', _ref: uploaded.get(photo)! } };
}

const withKeys = <T extends object>(items: T[]) =>
	items.map((item, i) => ({ _key: `k${i}`, ...item }));

async function main() {
	console.log(`Importing into ${client.config().projectId}/${client.config().dataset}`);
	const tx = client.transaction();

	tx.createOrReplace({
		_id: 'siteSettings',
		_type: 'siteSettings',
		...settings,
		phones: withKeys(settings.phones),
		stats: withKeys(settings.stats),
		sectors: withKeys(settings.sectors)
	});

	for (const [i, p] of products.entries()) {
		tx.createOrReplace({
			_id: `product-${p.slug}`,
			_type: 'product',
			// Valid LexoRank values so drag-to-reorder works from the start
			orderRank: `0|${String((i + 1) * 100000).padStart(6, '0')}:`,
			title: p.title,
			slug: { _type: 'slug', current: p.slug },
			eyebrow: p.eyebrow,
			summary: p.summary,
			body: p.body,
			features: p.features,
			applications: p.applications,
			image: await image(p.photo, p.photoAlt)
		});
	}

	for (const p of projects) {
		tx.createOrReplace({
			_id: `project-${p.slug}`,
			_type: 'project',
			title: p.title,
			slug: { _type: 'slug', current: p.slug },
			product: { _type: 'reference', _ref: `product-${p.product}` },
			sector: p.sector,
			location: p.location,
			material: p.material,
			completed: p.completed,
			featured: p.featured ?? false,
			image: await image(p.photo, p.photoAlt)
		});
	}

	for (const p of posts) {
		tx.createOrReplace({
			_id: `post-${p.slug}`,
			_type: 'post',
			title: p.title,
			slug: { _type: 'slug', current: p.slug },
			excerpt: p.excerpt,
			tag: p.tag,
			author: p.author,
			// Drafts are imported without a date, which keeps them off the site
			publishedAt: p.draft ? undefined : `${p.date}T08:00:00Z`,
			image: await image(p.photo, p.title),
			body: markdownToPortableText(p.markdown)
		});
	}

	await tx.commit();
	console.log(
		`Done: settings, ${products.length} products, ${projects.length} projects, ${posts.length} posts.`
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
