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
	pathname === '/' || pathname.startsWith(`${SOLUTIONS_HREF}/`);

/** Pages that end with their own quote section, so the footer skips its band. */
export const hasClosingCta = (pathname: string) =>
	pathname === '/' || pathname.startsWith(`${SOLUTIONS_HREF}/`);
