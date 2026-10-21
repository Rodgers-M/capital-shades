<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Why choose Capital Shades: the owner-confirmed differentiators and the
	 * confirmed lifecycle (docs/decisions.md — "Business capability",
	 * "Materials and finishes"). No supplier names, certifications or figures.
	 * Warranty uses the editable, conditional settings wording only.
	 */
	let { settings }: { settings: PublicSiteSettings } = $props();

	const REASONS = [
		{
			title: 'Custom design',
			text: 'Each structure is designed around the site, how the space will be used and what the project needs.'
		},
		{
			title: 'Materials and finishes',
			text: 'High-end materials and finishes, sourced from suppliers in countries including South Africa and France.'
		},
		{
			title: 'Expert installation',
			text: 'We install the structures we design and fabricate.'
		},
		{
			title: 'Support after handover',
			text: 'Maintenance, repairs and after-sales support once the structure is handed over.'
		}
	];
</script>

<section aria-labelledby="why-us" class="container-page section-y-tight">
	<EditorialHeading
		id="why-us"
		eyebrow="Why Capital Shades"
		title="Designed for your site, installed by our team and supported after handover."
	/>

	<!-- Phones: a swipe row of short panels; from md, the two-column ruled list -->
	<!--
		Focusable so keyboards can scroll the phone rail, which has no links
		(scrollable-region-focusable); inset ring because the rail bleeds to the edges.
	-->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ol
		tabindex="0"
		aria-labelledby="why-us"
		class="mt-6 focus-visible:-outline-offset-2 max-md:snap-rail md:mt-10 md:grid md:grid-cols-2 md:gap-x-10 md:border-t md:border-foreground/15"
	>
		{#each REASONS as reason, i (reason.title)}
			<li
				class="border-foreground/15 max-md:w-4/5 max-md:border-t max-md:pt-4 max-md:pb-1 md:grid md:grid-cols-[3rem_1fr] md:gap-x-4 md:border-b md:py-6"
			>
				<span class="font-mono text-sm text-primary-strong md:pt-1" aria-hidden="true">
					{String(i + 1).padStart(2, '0')}
				</span>
				<div class="max-md:mt-2">
					<h3 class="text-lg font-medium tracking-tight md:text-xl">{reason.title}</h3>
					<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
						{reason.text}
					</p>
				</div>
			</li>
		{/each}
	</ol>
	<!-- Phones: ruled off and labelled, so it never reads as part of the swipe rail above -->
	{#if settings.warrantyNote}
		<div class="mt-8 border-t border-foreground/15 pt-5 md:mt-6 md:border-0 md:pt-0">
			<p class="eyebrow text-primary-strong md:hidden">Warranty</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-0">
				{settings.warrantyNote}
			</p>
		</div>
	{/if}
</section>
