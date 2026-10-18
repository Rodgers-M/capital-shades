<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import QuoteFlow from '$lib/components/quote/QuoteFlow.svelte';
	import QuoteAside from '$lib/components/quote/QuoteAside.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_LABEL } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';

	/*
	 * Request a Quote: a short editorial header, then the three-step flow with
	 * expectations and other contact routes alongside. The phone action bar is
	 * hidden here, so phones get Call/WhatsApp in the header instead.
	 */
	let { data } = $props();
	const settings = $derived(data.settings);
</script>

<Seo
	title={QUOTE_LABEL}
	description="Tell {settings.name} what you need and where the site is, and add site photos if you have them. A final quotation follows a site visit and confirmed measurements."
/>

<section aria-labelledby="quote-title" class="container-page pt-10 md:pt-14">
	<div class="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-16">
		<div class="lg:col-span-7">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				{QUOTE_LABEL}
			</p>
			<h1
				id="quote-title"
				class="mt-5 text-[2.125rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:mt-6 sm:text-6xl"
			>
				Tell us about your project.
			</h1>
		</div>
		<p class="max-w-xl leading-relaxed text-muted-foreground sm:text-lg lg:col-span-5">
			Three short steps. Project details and site photos help us make an initial assessment; your
			final quotation follows a site visit and confirmed measurements.
		</p>
	</div>

	<!-- Phones and tablets: the aside with these routes sits below the form -->
	<p
		class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-foreground/15 pt-4 text-sm text-muted-foreground lg:hidden"
	>
		Prefer to talk?
		<a
			href="tel:+{settings.primaryPhone.number}"
			class="inline-flex min-h-11 items-center font-semibold text-foreground underline decoration-primary underline-offset-4"
		>
			Call {settings.primaryPhone.display}
		</a>
		<a
			href={whatsappHref(settings)}
			target="_blank"
			rel="noopener"
			class="inline-flex min-h-11 items-center gap-1.5 font-semibold text-foreground underline decoration-primary underline-offset-4"
		>
			<WhatsAppIcon class="size-4 text-brand-strong" />
			WhatsApp
			<span class="sr-only">(opens in a new tab)</span>
		</a>
	</p>
</section>

<div class="container-page pt-10 pb-20 md:pt-14 md:pb-28">
	<div class="grid gap-16 lg:grid-cols-12 lg:gap-16">
		<div class="min-w-0 lg:col-span-7">
			<QuoteFlow {settings} quoteMaterials={data.quoteMaterials} />
		</div>
		<div class="lg:col-span-4 lg:col-start-9">
			<QuoteAside {settings} />
		</div>
	</div>
</div>
