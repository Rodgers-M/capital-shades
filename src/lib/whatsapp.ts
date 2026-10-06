import { whatsappLink } from '$lib/utils';
import type { PublicSiteSettings } from '$lib/content/types';

/**
 * What a WhatsApp enquiry is about, so the pre-filled message gives the team
 * context without the visitor having to type it.
 * - `project`: a project title the visitor was looking at
 * - `topic`: a solution title, e.g. "Car Park Shades"
 * - `intent: 'advice'`: the visitor isn't sure which structure they need
 *
 * Pages pass one through their load data as `whatsapp`, and every shared
 * WhatsApp control (floating button, phone bar, menu, footer) picks it up.
 */
export type WhatsAppContext = { project?: string; topic?: string; intent?: 'advice' };

export function whatsappMessage({ project, topic, intent }: WhatsAppContext = {}) {
	if (intent === 'advice')
		return "Hi Capital Shades, I'm not sure which shade structure I need and would like some advice.";
	if (project)
		return `Hi Capital Shades, I was looking at the ${project} project on your website and would like to discuss something similar.`;
	if (topic)
		return `Hi Capital Shades, I'm interested in ${topic.toLowerCase()} and would like to discuss my project.`;
	return "Hi Capital Shades, I'd like to discuss a shade project.";
}

/** Accessible name for an icon-led WhatsApp control in this context. */
export function whatsappLabel({ project, topic }: WhatsAppContext = {}) {
	if (project) return `Ask about a project like ${project} on WhatsApp (opens in a new tab)`;
	if (topic) return `Ask about ${topic.toLowerCase()} on WhatsApp (opens in a new tab)`;
	return 'Chat with Capital Shades on WhatsApp (opens in a new tab)';
}

/** wa.me link to the public WhatsApp number with a contextual message. */
export const whatsappHref = (
	settings: Pick<PublicSiteSettings, 'whatsapp'>,
	context: WhatsAppContext = {}
) => whatsappLink(settings.whatsapp.number, whatsappMessage(context));
