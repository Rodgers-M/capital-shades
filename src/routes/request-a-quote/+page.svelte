<script lang="ts">
	import { MapPinIcon, PhoneIcon, RulerIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import QuoteEstimator from '$lib/components/forms/QuoteEstimator.svelte';
	import { QUOTE_LABEL } from '$lib/nav';

	let { data } = $props();

	// The location perk only shows once the owner has confirmed a location
	const perks = $derived([
		{ icon: RulerIcon, text: 'Site evaluation & measurement' },
		...(data.settings.location
			? [{ icon: MapPinIcon, text: `Based in ${data.settings.location}` }]
			: []),
		{ icon: PhoneIcon, text: 'We call you back to arrange a visit' }
	]);
</script>

<Seo
	title={QUOTE_LABEL}
	description="Tell us about your shade project in a few taps and we'll call you to arrange a site visit."
/>

<PageHero
	eyebrow={QUOTE_LABEL}
	title="Plan your shade in a few taps."
	description="Three quick choices and your number — then we'll call you to arrange a site visit."
	image={data.products[0]?.image}
	compact
>
	<ul class="mt-4 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-on-ink-muted sm:flex">
		{#each perks as perk (perk.text)}
			<li class="inline-flex items-center gap-2">
				<perk.icon class="size-4 text-primary" />
				{perk.text}
			</li>
		{/each}
	</ul>
</PageHero>

<section class="relative container-page -mt-10 pb-8">
	<QuoteEstimator settings={data.settings} />
</section>
