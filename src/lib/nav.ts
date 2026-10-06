import type { Sector } from '$lib/content/types';

/** Primary navigation (header and mobile menu). */
export const NAV_LINKS = [
	{ label: 'Solutions', href: '/solutions' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
] as const;

export const QUOTE_HREF = '/request-a-quote';
export const QUOTE_LABEL = 'Request a Quote';

/** Footer "Company" column. Blog is out of the primary nav but stays reachable here. */
export const COMPANY_LINKS = [
	{ label: 'Projects', href: '/projects' },
	{ label: 'About', href: '/about' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' }
] as const;

export const SOLUTIONS_HREF = '/solutions';

/** Detail page for one solution. */
export const solutionHref = (slug: string) => `${SOLUTIONS_HREF}/${slug}`;

export const PROJECTS_HREF = '/projects';

/** Detail page for one project. */
export const projectHref = (slug: string) => `${PROJECTS_HREF}/${slug}`;

const SECTOR_IDS: readonly Sector[] = ['residential', 'commercial', 'institutional'];

export type ProjectFilters = { sector?: Sector; solution?: string };

/** Shareable /projects URL for a filter, e.g. /projects?solution=car-park-shades */
export function projectsHref({ sector, solution }: ProjectFilters = {}) {
	const params = new URLSearchParams();
	if (solution) params.set('solution', solution);
	if (sector) params.set('sector', sector);
	const query = params.toString();
	return query ? `${PROJECTS_HREF}?${query}` : PROJECTS_HREF;
}

/**
 * Reads the filter from a /projects URL. Also accepts the earlier
 * `?filter=<sector-or-solution>` form so old links keep working.
 */
export function readProjectFilters(params: URLSearchParams): ProjectFilters {
	const isSector = (v: string | null): v is Sector => !!v && SECTOR_IDS.includes(v as Sector);
	const legacy = params.get('filter');
	const sector = params.get('sector') ?? (isSector(legacy) ? legacy : null);
	const solution = params.get('solution') ?? (legacy && !isSector(legacy) ? legacy : null);
	return {
		...(isSector(sector) && { sector }),
		...(solution && { solution })
	};
}

/** Pages where the quick-contact controls (phone bar, floating WhatsApp) would duplicate the page's own. */
const NO_QUICK_CONTACT = [QUOTE_HREF, '/contact'];

const matches = (pathname: string, href: string) =>
	pathname === href || pathname.startsWith(`${href}/`);

export const showsQuickContact = (pathname: string) =>
	!NO_QUICK_CONTACT.some((href) => matches(pathname, href));

/**
 * Pages that open with a hero marked `data-hero`. The phone action bar waits
 * until it has scrolled out of view; listing them here avoids a flash of the
 * bar before the page's script runs.
 */
export const hasHero = (pathname: string) =>
	pathname === '/' ||
	pathname.startsWith(`${SOLUTIONS_HREF}/`) ||
	pathname.startsWith(`${PROJECTS_HREF}/`);

/** Pages that end with their own quote section, so the footer skips its band. */
export const hasClosingCta = (pathname: string) =>
	pathname === '/' ||
	pathname.startsWith(`${SOLUTIONS_HREF}/`) ||
	pathname.startsWith(`${PROJECTS_HREF}/`);
