<script lang="ts">
	import { MapPinIcon, PhoneIcon, RulerIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import QuoteEstimator from '$lib/components/forms/QuoteEstimator.svelte';

	let { data } = $props();

	const PERKS = [
		{ icon: RulerIcon, text: 'Site evaluation & measurement' },
		{ icon: MapPinIcon, text: 'Based in Nairobi' },
		{ icon: PhoneIcon, text: 'We call you back to arrange a visit' }
	];
</script>

<Seo
	title="Request a Site Assessment"
	description="Tell us about your shade project in three quick steps and we'll call you to arrange a site visit."
/>

<PageHero
	eyebrow="Site assessment"
	title="Plan your shade in three steps."
	description="Tell us where it's going, how big it is and your preferred material — then we'll call you to arrange a site evaluation."
	image={data.products[0]?.image}
>
	<ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-ink-muted">
		{#each PERKS as perk (perk.text)}
			<li class="inline-flex items-center gap-2">
				<perk.icon class="size-4 text-primary" />
				{perk.text}
			</li>
		{/each}
	</ul>
</PageHero>

<section class="relative container-page -mt-8 pb-8">
	<QuoteEstimator settings={data.settings} />
</section>
