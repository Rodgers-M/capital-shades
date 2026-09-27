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
	phones: Phone[];
	whatsapp: Phone;
	email: string;
	/** Shown publicly; keep to what the owner has confirmed. */
	location: string;
	hours: string | null;
	facebookUrl: string;
	/** Facebook recommendation summary — verifiable social proof. */
	facebookReviews: { percent: number; count: number } | null;
	stats: Stat[];
	/** Sectors the company builds for (from the current site). */
	sectors: { title: string; text: string }[];
}

export interface Product {
	slug: string;
	title: string;
	/** Short line shown above the title on cards, e.g. "Homes to malls" */
	eyebrow: string;
	summary: string;
	/** Longer copy for the product page, one string per paragraph */
	body: string[];
	features: string[];
	applications: string[];
	image: Img;
}

export type Sector = 'residential' | 'commercial' | 'institutional';

export interface Project {
	slug: string;
	title: string;
	/** Product slug this project showcases */
	product: string;
	sector: Sector;
	/** Only set when confirmed by the owner */
	location: string | null;
	material: string | null;
	completed: string | null;
	image: Img;
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
