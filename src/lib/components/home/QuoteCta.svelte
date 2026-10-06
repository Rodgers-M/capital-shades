<script lang="ts">
	import { ArrowRightIcon, ArrowUpRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import { whatsappLink } from '$lib/utils';
	import type { Img, PublicSiteSettings } from '$lib/content/types';

	// Closing call to action. Replaces the footer's quote band on the home page.
	let { settings, image }: { settings: PublicSiteSettings; image?: Img } = $props();
</script>

<section aria-labelledby="quote-cta" class="container-page section-y">
	<div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
		{#if image}
			<div class="overflow-hidden rounded-sm lg:col-span-6">
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
				class="mt-5 text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-5xl lg:text-6xl"
			>
				Tell us about your space.
			</h2>
			<p class="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
				Share a few details about the site and what you would like covered, and we will get back to
				you to arrange a site visit.
			</p>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row">
				<Button href={QUOTE_HREF} size="lg">
					{QUOTE_LABEL}
					<ArrowRightIcon />
				</Button>
				<Button
					href={whatsappLink(settings.whatsapp.number, "Hi Capital Shades, I'd like a quote")}
					target="_blank"
					rel="noopener"
					variant="outline"
					size="lg"
				>
					<WhatsAppIcon class="size-4 text-brand-strong" />
					WhatsApp
					<span class="sr-only">(opens in a new tab)</span>
				</Button>
			</div>
			<p class="mt-6 text-sm text-muted-foreground">
				Or call
				<a
					href="tel:+{settings.primaryPhone.number}"
					class="font-semibold text-foreground underline decoration-primary underline-offset-4"
				>
					{settings.primaryPhone.display}
				</a>
			</p>
			{#if settings.facebookReviewsUrl}
				<p class="mt-8 border-t pt-6 text-sm text-muted-foreground">
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
