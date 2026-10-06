<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF, QUOTE_LABEL, solutionHref } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';
	import type { Product, PublicSiteSettings } from '$lib/content/types';

	/*
	 * Guidance for visitors who don't know which structure they need: each
	 * solution's own "typical use" line (its record's eyebrow) as a quick
	 * index, and a pre-filled WhatsApp message asking for advice.
	 */
	let { solutions, settings }: { solutions: Product[]; settings: PublicSiteSettings } = $props();

	const uses = $derived(solutions.filter((s) => s.eyebrow));
</script>

<section aria-labelledby="solution-finder" class="bg-ink section-y text-on-ink">
	<div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<EditorialHeading
				id="solution-finder"
				tone="ink"
				eyebrow="Not sure where to start?"
				title="Tell us about the space."
				description="Describe the area and how it is used, and we can talk through which structure and cover would suit it."
			/>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
				<Button
					href={whatsappHref(settings, { intent: 'advice' })}
					target="_blank"
					rel="noopener"
					variant="whatsapp"
					size="lg"
					class="px-5 sm:px-7"
				>
					<WhatsAppIcon class="size-4" />
					Get advice on WhatsApp
					<span class="sr-only">(opens in a new tab)</span>
				</Button>
				<Button href={QUOTE_HREF} variant="outline-on-ink" size="lg">{QUOTE_LABEL}</Button>
			</div>
		</div>

		{#if uses.length}
			<div class="lg:col-span-7">
				<h3 class="eyebrow text-on-ink-subtle">Typical uses</h3>
				<ul class="mt-4 border-t border-ink-border">
					{#each uses as solution (solution.slug)}
						<li class="border-b border-ink-border">
							<a
								href={solutionHref(solution.slug)}
								class="group grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
							>
								<span class="text-on-ink-muted">{solution.eyebrow}</span>
								<span
									class="inline-flex items-center gap-2 font-medium text-on-ink transition-colors group-hover:text-primary"
								>
									{solution.title}
									<ArrowRightIcon
										class="size-4 text-primary transition-transform group-hover:translate-x-0.5"
									/>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</section>
