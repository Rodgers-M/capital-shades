import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { escapeHTML, toHTML } from '@portabletext/to-html';
import { currentSolutionSlug } from '$lib/content/solutionTypes';
import { toQuoteMaterials } from '$lib/enquiry';
import type {
	Img,
	Post,
	Project,
	SiteSettings,
	Solution,
	SolutionStatus
} from '$lib/content/types';
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
		name, legalName, tagline, description, phones, primaryPhone, whatsapp, email, location,
		address, hours, facebookUrl, instagramUrl, linkedinUrl, googleMapsUrl, serviceAreas,
		facebookReviewsUrl, stats, sectors, warrantyNote, siteVisitNote, quoteNote
	},
	"solutions": *[_type == "solution"] | order(orderRank asc, title asc){
		"slug": slug.current, title, status, eyebrow, summary, body, features, applications,
		quoteMaterials, image ${IMAGE}
	},
	"legacyProducts": count(*[_type == "product"]),
	"projects": *[_type == "project"] | order(featured desc, _createdAt desc){
		"slug": slug.current, title, sector, "solutions": solutions[]->slug.current,
		"legacyProduct": product->slug.current, location, material, completionYear, completed,
		scope, requirement, deliveredSolution, featured, heroImage ${IMAGE}, image ${IMAGE},
		gallery[] ${IMAGE}
	},
	"posts": *[_type == "post" && defined(publishedAt)]{
		"slug": slug.current, title, excerpt, tag, "date": publishedAt, author,
		image ${IMAGE}, body[]{ ..., _type == "image" => ${IMAGE} }
	}
}`;

/** One solution from QUERY. Planned records may have no copy or image yet. */
interface SanitySolution extends Partial<Omit<Solution, 'slug' | 'title' | 'image'>> {
	slug: string;
	title: string;
	status?: SolutionStatus | null;
	quoteMaterials?: string[] | null;
	image?: SanityImage | null;
}

/**
 * One project from QUERY. `legacyProduct`, `image` and `completed` are the
 * pre-C5 fields, read until studio/scripts/migrate-solutions.ts has copied them
 * to `solutions`, `heroImage` and `completionYear`.
 * TODO(after-c5-migration): drop them once production projects are migrated.
 */
interface SanityProject {
	slug: string;
	title: string;
	sector: Project['sector'];
	solutions?: (string | null)[] | null;
	legacyProduct?: string | null;
	location?: string | null;
	material?: string | null;
	completionYear?: number | null;
	completed?: string | null;
	scope?: string | null;
	requirement?: string | null;
	deliveredSolution?: string | null;
	featured?: boolean | null;
	heroImage?: SanityImage | null;
	image?: SanityImage | null;
	gallery?: (SanityImage | null)[] | null;
}

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

	if (!data.settings) throw new Error('Sanity: missing "siteSettings" document');
	const primaryPhone = data.settings.primaryPhone ?? data.settings.phones?.[0];
	if (!primaryPhone) throw new Error('Sanity: site settings have no main phone number');
	// Fields missing from documents created before the schema had them read as
	// "not set"; the primary phone falls back to the first listed number.
	const settings: SiteSettings = {
		...data.settings,
		phones: data.settings.phones ?? [],
		primaryPhone,
		location: data.settings.location ?? null,
		address: data.settings.address ?? null,
		hours: data.settings.hours ?? null,
		facebookUrl: data.settings.facebookUrl ?? null,
		instagramUrl: data.settings.instagramUrl ?? null,
		linkedinUrl: data.settings.linkedinUrl ?? null,
		googleMapsUrl: data.settings.googleMapsUrl ?? null,
		serviceAreas: data.settings.serviceAreas ?? [],
		facebookReviewsUrl: data.settings.facebookReviewsUrl ?? null,
		warrantyNote: data.settings.warrantyNote ?? null,
		siteVisitNote: data.settings.siteVisitNote ?? null,
		quoteNote: data.settings.quoteNote ?? null
	};

	if (!data.solutions.length && data.legacyProducts > 0)
		throw new Error(
			'Sanity: only legacy "product" documents found. Run `npm run migrate-solutions` in studio/ (docs/implementation.md, Phase C5).'
		);

	const toSolution = (s: SanitySolution): Solution | null => {
		if (!s.image?.asset || !s.summary) {
			// The Studio blocks publishing these without a status of Planned; skip rather than fail the build
			console.warn(`Sanity: solution "${s.slug}" has no photo or summary, so it has no page`);
			return null;
		}
		return {
			slug: s.slug,
			title: s.title,
			eyebrow: s.eyebrow ?? '',
			summary: s.summary,
			body: s.body ?? [],
			features: s.features ?? [],
			applications: s.applications ?? [],
			image: toImg(s.image, s.title)
		};
	};
	const pages = (status: SolutionStatus) =>
		(data.solutions as SanitySolution[])
			.filter((s) => (s.status ?? 'published') === status)
			.map(toSolution)
			.filter((s) => s !== null);

	const projects: Project[] = (data.projects as SanityProject[]).flatMap((p) => {
		const heroImage = p.heroImage?.asset ? p.heroImage : p.image;
		if (!heroImage?.asset) {
			console.warn(`Sanity: project "${p.slug}" has no hero photo, so it is left out`);
			return [];
		}
		const linked = p.solutions?.filter((slug) => slug !== null) ?? [];
		const solutions = linked.length ? linked : p.legacyProduct ? [p.legacyProduct] : [];
		return {
			slug: p.slug,
			title: p.title,
			sector: p.sector,
			// Old slugs from legacy product references resolve to the migrated solution
			solutions: [...new Set(solutions.map(currentSolutionSlug))],
			location: p.location ?? null,
			material: p.material ?? null,
			completed: p.completionYear ? String(p.completionYear) : (p.completed ?? null),
			scope: p.scope ?? null,
			requirement: p.requirement ?? null,
			deliveredSolution: p.deliveredSolution ?? null,
			featured: p.featured ?? false,
			heroImage: toImg(heroImage, p.title),
			gallery: (p.gallery ?? [])
				.filter((img): img is SanityImage => !!img?.asset)
				.map((img) => toImg(img, p.title))
		};
	});

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

	return {
		settings,
		solutions: pages('published'),
		legacySolutions: pages('legacy'),
		quoteMaterials: toQuoteMaterials(data.solutions),
		projects,
		posts
	};
}
