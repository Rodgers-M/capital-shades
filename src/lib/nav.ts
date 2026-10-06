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

/** Pages where the phone action bar would duplicate the page's own actions. */
const NO_ACTION_BAR = [QUOTE_HREF, '/contact'];

/**
 * Pages that open with a hero marked `data-hero`. The phone action bar waits
 * until it has scrolled out of view; listing them here avoids a flash of the
 * bar before the page's script runs.
 */
const PAGES_WITH_HERO = ['/'];

export const hasHero = (pathname: string) => PAGES_WITH_HERO.includes(pathname);

export const showsMobileActionBar = (pathname: string) =>
	!NO_ACTION_BAR.some((href) => pathname === href || pathname.startsWith(`${href}/`));
