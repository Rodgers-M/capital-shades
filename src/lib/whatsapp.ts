import { whatsappLink } from '$lib/utils';
import type { PublicSiteSettings } from '$lib/content/types';

/**
 * What a WhatsApp enquiry is about, so the pre-filled message gives the team
 * context without the visitor having to type it.
 * - `topic`: a solution title, e.g. "Car Park Shades"
 * - `intent: 'advice'`: the visitor isn't sure which structure they need
 */
export type WhatsAppContext = { topic?: string; intent?: 'advice' };

export function whatsappMessage({ topic, intent }: WhatsAppContext = {}) {
	if (intent === 'advice')
		return "Hi Capital Shades, I'm not sure which shade structure I need and would like some advice.";
	if (topic)
		return `Hi Capital Shades, I'm interested in ${topic.toLowerCase()} and would like to discuss my project.`;
	return "Hi Capital Shades, I'd like to discuss a shade project.";
}

/** wa.me link to the public WhatsApp number with a contextual message. */
export const whatsappHref = (
	settings: Pick<PublicSiteSettings, 'whatsapp'>,
	context: WhatsAppContext = {}
) => whatsappLink(settings.whatsapp.number, whatsappMessage(context));
