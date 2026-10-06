import {
	PUBLIC_SETTINGS_KEYS,
	type PublicSiteSettings,
	type SiteSettings
} from '$lib/content/types';

/** Blank CMS strings count as "not set". */
const text = (value: string | null) => value?.trim() || null;

/**
 * The settings sent to the browser: only allowlisted fields, so internal data
 * such as the secondary phone numbers in `phones` never reaches page data.
 */
export function toPublicSettings(settings: SiteSettings): PublicSiteSettings {
	const pick = Object.fromEntries(
		PUBLIC_SETTINGS_KEYS.map((key) => [key, settings[key]])
	) as PublicSiteSettings;
	return {
		...pick,
		location: text(settings.location),
		address: text(settings.address),
		hours: text(settings.hours),
		facebookUrl: text(settings.facebookUrl),
		instagramUrl: text(settings.instagramUrl),
		linkedinUrl: text(settings.linkedinUrl),
		googleMapsUrl: text(settings.googleMapsUrl),
		facebookReviewsUrl: text(settings.facebookReviewsUrl),
		serviceAreas: settings.serviceAreas.map((area) => area.trim()).filter(Boolean)
	};
}
