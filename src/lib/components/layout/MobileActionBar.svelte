<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { ArrowRightIcon, PhoneIcon } from '@lucide/svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF, QUOTE_LABEL, hasHero, showsMobileActionBar } from '$lib/nav';
	import { whatsappLink } from '$lib/utils';
	import type { PublicSiteSettings } from '$lib/content/types';

	let { settings }: { settings: PublicSiteSettings } = $props();

	/*
	 * Visibility (docs/decisions.md — "appear after hero, hide during form
	 * interaction"):
	 * - never on pages that are themselves the contact/quote route;
	 * - not while a page's `[data-hero]` section is on screen (the hero has
	 *   its own calls to action);
	 * - not while a form field has focus, so it never covers the keyboard or
	 *   the field being typed in.
	 */
	// Before the observer runs (first paint, no JS), assume the hero is showing
	let heroInView = $state(hasHero(page.url.pathname));
	let fieldFocused = $state(false);

	$effect(() => {
		heroInView = hasHero(page.url.pathname);
		let observer: IntersectionObserver | undefined;
		let stale = false;
		// Wait for the new page's DOM after client-side navigation
		tick().then(() => {
			const hero = document.querySelector('[data-hero]');
			if (stale) return;
			if (!hero) {
				heroInView = false;
				return;
			}
			observer = new IntersectionObserver(([entry]) => (heroInView = entry.isIntersecting));
			observer.observe(hero);
		});
		return () => {
			stale = true;
			observer?.disconnect();
		};
	});

	const isField = (target: EventTarget | null) =>
		target instanceof HTMLElement &&
		target.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"]');

	const allowed = $derived(showsMobileActionBar(page.url.pathname));
	const visible = $derived(allowed && !heroInView && !fieldFocused);

	// Call and WhatsApp: compact icon-over-label cells (48px tall, 72px wide), so
	// the quote action keeps most of the width even at 320px.
	const compact =
		'flex h-12 flex-col items-center justify-center gap-0.5 rounded-sm text-xs font-semibold transition-colors active:scale-[0.98]';
</script>

<svelte:window
	onfocusin={(e) => (fieldFocused = isField(e.target))}
	onfocusout={() => (fieldFocused = false)}
/>

{#if allowed}
	<nav
		aria-label="Quick contact"
		inert={!visible}
		class="fixed inset-x-0 bottom-0 z-40 grid transition-transform duration-300 {visible
			? 'translate-y-0'
			: 'translate-y-full'} grid-cols-[4.5rem_4.5rem_1fr] gap-2 border-t border-ink-border bg-ink/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
	>
		<a
			href="tel:+{settings.primaryPhone.number}"
			aria-label="Call {settings.primaryPhone.display}"
			class="{compact} border border-on-ink/30 text-on-ink hover:bg-on-ink/10"
		>
			<PhoneIcon class="size-4" />
			Call
		</a>
		<a
			href={whatsappLink(settings.whatsapp.number, "Hi Capital Shades, I'd like a quote")}
			target="_blank"
			rel="noopener"
			class="{compact} bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover"
		>
			<WhatsAppIcon class="size-4" />
			WhatsApp
			<span class="sr-only">(opens in a new tab)</span>
		</a>
		<a
			href={QUOTE_HREF}
			class="flex h-12 items-center justify-center gap-2 rounded-sm bg-primary px-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover active:scale-[0.98]"
		>
			{QUOTE_LABEL}
			<ArrowRightIcon class="size-4 shrink-0 max-[359px]:hidden" />
		</a>
	</nav>
{/if}
