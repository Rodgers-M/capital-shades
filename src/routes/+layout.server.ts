import { getContent } from '$lib/server/content';
import { toPublicSettings } from '$lib/server/content/public';

export const prerender = true;

export async function load() {
	const { settings, products } = await getContent();
	// Page data is serialised into the HTML, so only public fields go out
	return { settings: toPublicSettings(settings), products };
}
