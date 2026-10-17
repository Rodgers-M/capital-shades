<script lang="ts">
	import EditorialHeading from './EditorialHeading.svelte';
	import Picture from './Picture.svelte';
	import type { Img } from '$lib/content/types';

	/*
	 * How a project runs, described from the visitor's side. The site visit is
	 * supported by the current site's copy ("site visit — evaluation &
	 * measurement"); nothing here claims who fabricates or installs.
	 */
	let { image }: { image?: Img } = $props();

	const STEPS = [
		{
			title: 'Tell us about your project',
			text: 'Call, WhatsApp or send a few details about the space and what you would like covered.'
		},
		{
			title: 'Site visit',
			text: 'The site is measured and we look at how the space is used.'
		},
		{
			title: 'Design and specification',
			text: 'Layout, cover material and colours are agreed with you before work starts.'
		},
		{
			title: 'Installation and handover',
			text: 'The structure is installed and finished on site, then handed over.'
		}
	];
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
			<EditorialHeading
				id="process"
				eyebrow="How it works"
				title="A straightforward path from enquiry to completed project."
			/>
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
