<script lang="ts">
	import { PROCESS_HEADING, withStageTitles } from '$lib/content/process';
	import EditorialHeading from './EditorialHeading.svelte';
	import TextLink from './TextLink.svelte';

	/*
	 * Home page summary of the confirmed project process (docs/decisions.md —
	 * "Project process"), its eleven stages grouped into four. The full version
	 * is ProcessSection on /about.
	 *
	 * One connected progression: numbered markers joined by a thin gold rule,
	 * a vertical timeline below lg and a horizontal one from lg. The list order
	 * carries the sequence, so the numbers are decorative.
	 */
	const STEPS = withStageTitles([
		'Initial enquiry and discussion, by phone, WhatsApp or quote request.',
		'We review the site and confirm the measurements.',
		'The design or proposal is agreed and quoted, then fabricated after approval.',
		'Installation and handover, with after-sales support available.'
	]);
</script>

<!-- No fill: it follows the muted Solutions band on the home page -->
<section aria-labelledby="how-we-work" class="section-y max-md:py-12">
	<div class="container-page">
		<EditorialHeading id="how-we-work" eyebrow="How it works" title={PROCESS_HEADING}>
			{#snippet action()}
				<TextLink href="/about">More about us</TextLink>
			{/snippet}
		</EditorialHeading>

		<!--
			Connectors: below lg, a vertical rule from each marker down to the next;
			from lg, a horizontal rule from each marker across the column gap (gap-x-8),
			stopping short of the next marker.
		-->
		<ol class="mt-8 md:mt-12 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-x-8">
			{#each STEPS as step, i (step.title)}
				<li
					class="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-6 not-last:before:absolute not-last:before:top-12 not-last:before:bottom-2 not-last:before:left-5 not-last:before:w-px not-last:before:bg-primary/60 last:pb-0 lg:block lg:pb-0 lg:not-last:before:hidden lg:not-last:after:absolute lg:not-last:after:top-5 lg:not-last:after:-right-6 lg:not-last:after:left-12 lg:not-last:after:h-px lg:not-last:after:bg-primary/60"
				>
					<span
						class="flex size-10 items-center justify-center rounded-full border border-primary font-mono text-sm text-primary-strong"
						aria-hidden="true"
					>
						{String(i + 1).padStart(2, '0')}
					</span>
					<div class="pt-2 lg:mt-5 lg:pt-0">
						<h3 class="text-lg font-medium tracking-tight md:text-xl">{step.title}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
							{step.text}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
