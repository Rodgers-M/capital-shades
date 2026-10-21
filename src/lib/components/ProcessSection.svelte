<script lang="ts">
	import { PROCESS_HEADING, withStageTitles } from '$lib/content/process';
	import EditorialHeading from './EditorialHeading.svelte';
	import Picture from './Picture.svelte';
	import type { Img } from '$lib/content/types';

	/*
	 * How a project runs, from the visitor's side: the confirmed process
	 * (docs/decisions.md — "Project process") in the same four stages as the
	 * home page, with a little more detail.
	 */
	let { image }: { image?: Img } = $props();

	const STEPS = withStageTitles([
		'Call, WhatsApp or send a quote request with the location, rough size and a few site photos if you have them, and we discuss what you need.',
		'We visit the site and take the measurements ourselves. Photos and rough figures can support an initial estimate; the final quotation follows the visit.',
		'You receive a design or proposal and a quotation. Once you approve, fabrication is carried out according to the project, either at the workshop or on site where appropriate.',
		'We install the structure and hand it over, with maintenance, repairs and after-sales support available afterwards.'
	]);
</script>

<section aria-labelledby="process" class="container-page section-y">
	<div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
		{#if image}
			<div class="overflow-hidden rounded-sm lg:sticky lg:top-28 lg:col-span-5">
				<Picture
					{image}
					alt=""
					sizes="(min-width: 1024px) 40vw, 100vw"
					class="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
				/>
			</div>
		{/if}

		<div class={image ? 'lg:col-span-7' : 'lg:col-span-12'}>
			<EditorialHeading id="process" eyebrow="How it works" title={PROCESS_HEADING} />
			<ol class="mt-12 border-t border-foreground/15">
				{#each STEPS as step, i (step.title)}
					<li class="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-foreground/15 py-7">
						<span class="pt-1 font-mono text-sm text-primary-strong" aria-hidden="true">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div>
							<h3 class="text-xl font-medium tracking-tight">{step.title}</h3>
							<p class="mt-2 max-w-xl leading-relaxed text-muted-foreground">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
