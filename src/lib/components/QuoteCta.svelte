<script lang="ts">
	import { ArrowRightIcon, ArrowUpRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import { whatsappHref, type WhatsAppContext } from '$lib/whatsapp';
	import { cn } from '$lib/utils';
	import type { Img, PublicSiteSettings } from '$lib/content/types';

	// Closing call to action for pages that end with their own quote section
	// (see hasClosingCta in $lib/nav — the footer skips its band there). A WhatsApp
	// button only appears with a page context: a generic one would repeat the
	// floating control (docs/decisions.md — "Mobile conversion").
	let {
		settings,
		image,
		whatsapp,
		title = 'Tell us about your space.',
		text = 'Share a few details about the site and what you would like covered, and we will get back to you to arrange a site visit.',
		compact = false
	}: {
		settings: PublicSiteSettings;
		image?: Img;
		title?: string;
		text?: string;
		/** What the page is about, for a contextual WhatsApp button and message */
		whatsapp?: WhatsAppContext;
		/** Phones: no photo, smaller heading, tighter spacing; Quote and WhatsApp side by side when both show */
		compact?: boolean;
	} = $props();

	// Phones (compact, with WhatsApp): both buttons share a row; labels may wrap if text is enlarged
	const sideBySide = $derived(compact && !!whatsapp);
	const phoneButtonClass = $derived(
		sideBySide
			? 'max-sm:h-auto max-sm:min-h-12 max-sm:min-w-0 max-sm:px-3 max-sm:py-2 max-sm:text-sm max-sm:whitespace-normal'
			: undefined
	);
</script>

<section
	aria-labelledby="quote-cta"
	class={cn('container-page section-y', compact && 'max-md:py-12')}
>
	<div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
		{#if image}
			<div class={cn('overflow-hidden rounded-sm lg:col-span-6', compact && 'max-md:hidden')}>
				<Picture
					{image}
					alt=""
					sizes="(min-width: 1024px) 45vw, 100vw"
					class="aspect-[4/3] w-full object-cover"
				/>
			</div>
		{/if}

		<div class={image ? 'lg:col-span-6' : 'lg:col-span-8'}>
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				Planning a shade project?
			</p>
			<h2
				id="quote-cta"
				class={cn(
					'mt-5 text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-5xl lg:text-6xl',
					compact && 'max-md:mt-3 max-md:text-3xl'
				)}
			>
				{title}
			</h2>
			<p
				class={cn(
					'mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground',
					compact && 'max-md:mt-3 max-md:text-base'
				)}
			>
				{text}
			</p>
			<div
				class={cn(
					'mt-9 flex flex-col gap-3 sm:flex-row',
					compact && 'max-md:mt-6',
					sideBySide && 'max-sm:grid max-sm:grid-cols-[1fr_auto]'
				)}
			>
				<Button href={QUOTE_HREF} size="lg" class={phoneButtonClass}>
					{QUOTE_LABEL}
					<ArrowRightIcon class={cn(sideBySide && 'max-sm:hidden')} />
				</Button>
				{#if whatsapp}
					<Button
						href={whatsappHref(settings, whatsapp)}
						data-hides-floating-whatsapp
						target="_blank"
						rel="noopener"
						variant="outline"
						size="lg"
						class={phoneButtonClass}
					>
						<WhatsAppIcon class="size-4 text-brand-strong" />
						WhatsApp
						<span class="sr-only">(opens in a new tab)</span>
					</Button>
				{/if}
			</div>
			<p class={cn('mt-6 text-sm text-muted-foreground', compact && 'max-md:mt-4')}>
				Or call
				<a
					href="tel:+{settings.primaryPhone.number}"
					class="font-semibold text-foreground underline decoration-primary underline-offset-4"
				>
					{settings.primaryPhone.display}
				</a>
			</p>
			{#if settings.facebookReviewsUrl}
				<p
					class={cn(
						'mt-8 border-t pt-6 text-sm text-muted-foreground',
						compact && 'max-md:mt-6 max-md:pt-4'
					)}
				>
					Recommended by customers on Facebook.
					<a
						href={settings.facebookReviewsUrl}
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-primary underline-offset-4"
					>
						Read reviews <ArrowUpRightIcon class="size-3.5" />
						<span class="sr-only">(opens in a new tab)</span>
					</a>
				</p>
			{/if}
		</div>
	</div>
</section>
