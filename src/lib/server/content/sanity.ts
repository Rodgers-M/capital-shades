import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { escapeHTML, toHTML } from '@portabletext/to-html';
import type { Img, Post, Product, Project, SiteSettings } from '$lib/content/types';
import type { Content } from './index';

/*
 * Reads content from Sanity (schemas live in /studio). Uses process.env
 * rather than $env so the site still builds when Sanity isn't configured yet.
 */

type PortableText = Parameters<typeof toHTML>[0];

const WIDTHS = [640, 1024, 1600, 2400];
const WORDS_PER_MINUTE = 200;

export function sanityConfig() {
	const projectId = process.env.SANITY_PROJECT_ID;
	if (!projectId) return null;
	return {
		projectId,
		dataset: process.env.SANITY_DATASET ?? 'production',
		apiVersion: '2025-10-01',
		useCdn: false,
		// Never serve unpublished drafts, even when a token is configured
		perspective: 'published' as const,
		token: process.env.SANITY_READ_TOKEN
	};
}

interface SanityImage {
	asset: { _ref: string; metadata: { dimensions: { width: number; height: number } } };
	crop?: unknown;
	hotspot?: unknown;
	alt?: string;
}

const IMAGE = `{ ..., "asset": asset->{ _id, "_ref": _id, metadata { dimensions } } }`;

export const QUERY = `{
	"settings": *[_type == "siteSettings"][0]{
		name, legalName, tagline, description, phones, whatsapp, email, location, hours,
		facebookUrl, facebookReviews, stats, sectors
	},
	"products": *[_type == "product"] | order(orderRank asc, title asc){
		"slug": slug.current, title, eyebrow, summary, body, features, applications, image ${IMAGE}
	},
	"projects": *[_type == "project"] | order(featured desc, _createdAt desc){
		"slug": slug.current, title, "product": product->slug.current, sector, location,
		material, completed, featured, image ${IMAGE}
	},
	"posts": *[_type == "post" && defined(publishedAt)]{
		"slug": slug.current, title, excerpt, tag, "date": publishedAt, author,
		image ${IMAGE}, body[]{ ..., _type == "image" => ${IMAGE} }
	}
}`;

export async function loadSanityContent(): Promise<Content> {
	const config = sanityConfig()!;
	const data = await createClient(config).fetch(QUERY);
	return mapSanityContent(data, config);
}

/** Map the QUERY result onto the site's content types (separate for testing). */
export function mapSanityContent(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw GROQ result
	data: any,
	config: { projectId: string; dataset: string }
): Content {
	const builder = createImageUrlBuilder({ projectId: config.projectId, dataset: config.dataset });

	const toImg = (image: SanityImage, alt: string): Img => {
		const { width, height } = image.asset.metadata.dimensions;
		const url = (w: number) => builder.image(image).width(w).fit('max').auto('format').url();
		const widths = WIDTHS.filter((w) => w <= width);
		return {
			src: url(Math.min(width, 1600)),
			srcset: (widths.length ? widths : [width]).map((w) => `${url(w)} ${w}w`).join(', '),
			width,
			height,
			alt: image.alt ?? alt
		};
	};

	const settings: SiteSettings = data.settings;
	if (!settings) throw new Error('Sanity: missing "siteSettings" document');

	const products: Product[] = data.products.map(
		(p: Omit<Product, 'image'> & { image: SanityImage }) => ({
			...p,
			body: p.body ?? [],
			features: p.features ?? [],
			applications: p.applications ?? [],
			image: toImg(p.image, p.title)
		})
	);

	const projects: Project[] = data.projects.map(
		(p: Omit<Project, 'image'> & { image: SanityImage }) => ({
			...p,
			location: p.location ?? null,
			material: p.material ?? null,
			completed: p.completed ?? null,
			featured: p.featured ?? false,
			image: toImg(p.image, p.title)
		})
	);

	const posts: Post[] = data.posts.map(
		(
			p: Omit<Post, 'image' | 'html' | 'readMinutes'> & { image: SanityImage; body?: PortableText }
		) => {
			const html = toHTML(p.body ?? [], {
				components: {
					types: {
						image: ({ value }: { value: SanityImage }) => {
							const img = toImg(value, '');
							return `<img src="${img.src}" srcset="${img.srcset}" sizes="(min-width: 768px) 720px, 100vw" width="${img.width}" height="${img.height}" alt="${escapeHTML(img.alt)}" loading="lazy" />`;
						},
						// @sanity/table: first row is the header
						table: ({ value }: { value: { rows?: { cells?: string[] }[] } }) => {
							const [head, ...rows] = value.rows ?? [];
							const cells = (row: { cells?: string[] } | undefined, tag: 'th' | 'td') =>
								(row?.cells ?? []).map((c) => `<${tag}>${escapeHTML(c)}</${tag}>`).join('');
							return `<table><thead><tr>${cells(head, 'th')}</tr></thead><tbody>${rows
								.map((row) => `<tr>${cells(row, 'td')}</tr>`)
								.join('')}</tbody></table>`;
						}
					}
				}
			});
			const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
			return {
				...p,
				date: p.date.slice(0, 10),
				readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
				image: toImg(p.image, p.title),
				html
			};
		}
	);

	return { settings, products, projects, posts };
}
