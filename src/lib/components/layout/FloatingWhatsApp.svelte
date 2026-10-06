<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { showsQuickContact } from '$lib/nav';
	import { whatsappHref, whatsappLabel } from '$lib/whatsapp';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Tablet and desktop only: phones already have WhatsApp in the action bar,
	 * so the two never compete for space. Steps aside while the footer (which
	 * has its own WhatsApp link) is on screen, so it never covers footer content.
	 */
	let { settings }: { settings: PublicSiteSettings } = $props();

	let footerInView = $state(false);

	$effect(() => {
		void page.url.pathname;
		let observer: IntersectionObserver | undefined;
		let stale = false;
		tick().then(() => {
			const footer = document.querySelector('footer');
			if (stale || !footer) return;
			observer = new IntersectionObserver(([entry]) => (footerInView = entry.isIntersecting));
			observer.observe(footer);
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
		inert={footerInView}
		aria-label={whatsappLabel(context)}
		class="fixed right-6 bottom-6 z-30 hidden h-12 items-center gap-2.5 rounded-sm border border-ink-border bg-ink px-3.5 text-sm font-semibold text-on-ink shadow-md transition-[transform,opacity,background-color] duration-300 hover:bg-ink-raised md:inline-flex lg:px-4 {footerInView
			? 'pointer-events-none translate-y-4 opacity-0'
			: ''}"
	>
		<WhatsAppIcon class="size-5 text-whatsapp" />
		<span class="hidden lg:inline">WhatsApp</span>
	</a>
{/if}
