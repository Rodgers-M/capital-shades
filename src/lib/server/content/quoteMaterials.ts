import { createClient } from '@sanity/client';
import { toQuoteMaterials, type QuoteMaterials } from '$lib/enquiry';
import { solutions } from '$lib/content/seed/solutions';
import { sanityConfig } from './sanity';

/** Long enough for Sanity's API, short enough that a slow CMS can't hold up an enquiry. */
const TIMEOUT_MS = 3000;
// The client retries 5 times by default, which would multiply the timeout
const MAX_RETRIES = 0;
/** Caps Sanity calls from bursts of enquiries; the prerendered form only changes on rebuild anyway. */
const CACHE_MS = 5 * 60 * 1000;
/** After a failure, how long enquiries use the seed before Sanity is tried again. */
const RETRY_AFTER_MS = 30 * 1000;

let cache: { at: number; value: QuoteMaterials } | undefined;

/**
 * Quote material choices for /api/enquiry, which runs per request rather than
 * at build time. A small query of its own instead of getContent(), and never
 * throws: when Sanity is slow or down the enquiry still goes out, with the
 * seed's materials (and then the enquiry.ts fallback) deciding what is kept.
 * Between a Studio change and the rebuild, the form and the server can
 * disagree for a few minutes; a material the server no longer offers is left
 * off the email.
 */
export async function loadQuoteMaterials(): Promise<QuoteMaterials> {
	const config = sanityConfig();
	if (!config) return toQuoteMaterials(solutions);
	if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
	try {
		const records = await createClient({
			...config,
			timeout: TIMEOUT_MS,
			maxRetries: MAX_RETRIES
		}).fetch<{ slug: string; quoteMaterials: string[] | null }[]>(
			`*[_type == "solution" && defined(quoteMaterials)]{ "slug": slug.current, quoteMaterials }`
		);
		cache = { at: Date.now(), value: toQuoteMaterials(records) };
		return cache.value;
	} catch (error) {
		console.error('Quote materials: Sanity unavailable, using the seed', error);
		// Cached briefly, so an outage doesn't add the timeout to every enquiry
		cache = { at: Date.now() - CACHE_MS + RETRY_AFTER_MS, value: toQuoteMaterials(solutions) };
		return cache.value;
	}
}
