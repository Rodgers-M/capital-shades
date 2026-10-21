/**
 * Content model shared by the seed data and the Sanity source. Pages only ever
 * see these shapes, so the content source can change without touching markup.
 */

/** A responsive image, already resolved to URLs. */
export interface Img {
	src: string;
	/** `srcset` for the fallback <img> */
	srcset?: string;
	/** Extra <source> elements, e.g. { type: 'image/avif', srcset } */
	sources?: { type: string; srcset: string }[];
	width: number;
	height: number;
	alt: string;
}

export interface Phone {
	display: string;
	/** E.164 without the plus, e.g. 254722765397 */
	number: string;
}

export interface Stat {
	value: string;
	label: string;
}

export interface SiteSettings {
	name: string;
	legalName: string;
	tagline: string;
	description: string;
	/** Every known number, kept for reference. Public UI and structured data use `primaryPhone`. */
	phones: Phone[];
	/** The one number shown publicly (call buttons, footer, structured data). */
	primaryPhone: Phone;
	whatsapp: Phone;
	email: string;
	/** General area, e.g. "Westlands, Nairobi" — null until the owner confirms it. */
	location: string | null;
	/** Street address — null until the owner confirms one. */
	address: string | null;
	hours: string | null;
	facebookUrl: string | null;
	instagramUrl: string | null;
	linkedinUrl: string | null;
	googleMapsUrl: string | null;
	/** Confirmed service areas; empty until the owner confirms them. */
	serviceAreas: string[];
	/** Facebook reviews page — shown as "Highly recommended on Facebook". No counts, so it never goes stale. */
	facebookReviewsUrl: string | null;
	/** TODO(phase-b): review each stat with the owner before it is surfaced anywhere new. */
	stats: Stat[];
	/** Sectors the company builds for (from the current site). */
	sectors: { title: string; text: string }[];
	/** Approved warranty wording (docs/decisions.md — "Warranty wording"); null hides it */
	warrantyNote: string | null;
	/** Which site visits may be free; null hides it */
	siteVisitNote: string | null;
	/** Initial estimate vs final quotation, shown with the quote request; null hides it */
	quoteNote: string | null;
}

/**
 * The settings fields that are safe to send to the browser. An allowlist, so a
 * new internal field stays server-side unless it is deliberately added here.
 * Built by `toPublicSettings` (src/lib/server/content/public.ts).
 */
export const PUBLIC_SETTINGS_KEYS = [
	'name',
	'legalName',
	'tagline',
	'description',
	'primaryPhone',
	'whatsapp',
	'email',
	'location',
	'address',
	'hours',
	'facebookUrl',
	'instagramUrl',
	'linkedinUrl',
	'googleMapsUrl',
	'serviceAreas',
	'facebookReviewsUrl',
	'warrantyNote',
	'siteVisitNote',
	'quoteNote'
] as const satisfies readonly (keyof SiteSettings)[];

export type PublicSiteSettings = Pick<SiteSettings, (typeof PUBLIC_SETTINGS_KEYS)[number]>;

export type Sector = 'residential' | 'commercial' | 'institutional';

/**
 * Where a solution record stands in the taxonomy migration (docs/implementation.md,
 * Phase C5). Only `published` solutions are listed; `planned` ones are in the
 * taxonomy but have no page until their copy and photos are confirmed; `legacy`
 * ones keep serving their old page, unlisted, until the owner decides their fate.
 */
export type SolutionStatus = 'published' | 'planned' | 'legacy';

/** A solution with a page (car parking shades, shade sails, …). */
export interface Solution {
	slug: string;
	title: string;
	/** Typical-use label above the title, e.g. "Homes to shopping centres"; empty when not set */
	eyebrow: string;
	summary: string;
	/** One string per paragraph */
	body: string[];
	image: Img;
	/** Where and how it is used, e.g. "Walkway covers", "Hotels" */
	applications: string[];
	features: string[];
	/** Search-result title without the site name; null uses the default from `solutionSeo` */
	seoTitle: string | null;
	/** Search-result description; null uses the summary */
	seoDescription: string | null;
}

export interface Project {
	slug: string;
	title: string;
	sector: Sector;
	/** Slugs of the solutions this project showcases, main one first */
	solutions: string[];
	/** General area only, never a private address. Only set when confirmed by the owner */
	location: string | null;
	material: string | null;
	/** Completion year as shown, e.g. "2026" */
	completed: string | null;
	heroImage: Img;
	gallery?: Img[];
	/** What the project covered, without client details — only once confirmed by the owner */
	scope?: string | null;
	/** What the client needed — only once confirmed by the owner */
	requirement?: string | null;
	/** What was delivered — only once confirmed by the owner */
	deliveredSolution?: string | null;
	featured: boolean;
}

export type PostTag = 'Buyers Guide' | 'Case Study' | 'Maintenance' | 'Insights';

export interface Post {
	slug: string;
	title: string;
	excerpt: string;
	tag: PostTag;
	/** ISO date */
	date: string;
	readMinutes: number;
	author: string;
	image: Img;
	/** Rendered, trusted HTML (from markdown seed or Sanity Portable Text) */
	html: string;
}

/** A post without its body, for cards and listings. */
export type PostSummary = Omit<Post, 'html'>;
