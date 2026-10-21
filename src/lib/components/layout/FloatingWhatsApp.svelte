<script lang="ts">
	import { tick } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { page } from '$app/state';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { showsQuickContact } from '$lib/nav';
	import { whatsappHref, whatsappLabel } from '$lib/whatsapp';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * The single persistent contact control on every screen size (docs/decisions.md
	 * — "Mobile conversion"): smaller on phones, never on Contact or Request a
	 * Quote. Steps aside while the footer (which has its own WhatsApp link) or a
	 * page's own primary WhatsApp button (marked `data-hides-floating-whatsapp`)
	 * is on screen, so it never covers either or shows a second WhatsApp button.
	 */
	let { settings }: { settings: PublicSiteSettings } = $props();

	let stepAside = $state(false);

	$effect(() => {
		void page.url.pathname;
		let observer: IntersectionObserver | undefined;
		let stale = false;
		tick().then(() => {
			if (stale) return;
			const onScreen = new SvelteSet<Element>();
			observer = new IntersectionObserver((entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) onScreen.add(entry.target);
					else onScreen.delete(entry.target);
				}
				stepAside = onScreen.size > 0;
			});
			for (const target of document.querySelectorAll('footer, [data-hides-floating-whatsapp]'))
				observer.observe(target);
		});
		return () => {
			stale = true;
			observer?.disconnect();
		};
	});

	const allowed = $derived(showsQuickContact(page.url.pathname));
	const context = $derived(page.data.whatsapp);
</script>

{#if allowed}
	<a
		href={whatsappHref(settings, context)}
		target="_blank"
		rel="noopener"
		inert={stepAside}
		aria-label={whatsappLabel(context)}
		class="fixed fixed-corner z-30 inline-flex size-12 items-center justify-center rounded-full bg-whatsapp-deep text-whatsapp-deep-foreground shadow-md transition-[transform,opacity,background-color] duration-300 hover:bg-whatsapp-deep-hover md:size-14 {stepAside
			? 'pointer-events-none translate-y-4 opacity-0'
			: ''}"
	>
		<WhatsAppIcon class="size-7 md:size-8" />
	</a>
{/if}
