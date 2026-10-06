<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { projectsHref, solutionHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import { whatsappHref } from '$lib/whatsapp';
	import type { Img, Product, PublicSiteSettings } from '$lib/content/types';

	/*
	 * One solution on the index: a large photo beside its name, summary and
	 * verified applications, a strip of real project photos when there are
	 * any, and two next steps — read more, or ask on WhatsApp.
	 */
	let {
		solution,
		index,
		proof,
		hasProjects,
		settings
	}: {
		solution: Product;
		index: number;
		proof: Img[];
		hasProjects: boolean;
		settings: PublicSiteSettings;
	} = $props();

	const flipped = $derived(index % 2 === 1);
	const headingId = $derived(`solution-${solution.slug}`);
</script>

<article
	id={solution.slug}
	aria-labelledby={headingId}
	class="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:items-center lg:gap-16"
>
	<a
		href={solutionHref(solution.slug)}
		tabindex="-1"
		aria-hidden="true"
		class={cn(
			'group overflow-hidden rounded-sm',
			flipped ? 'lg:order-2 lg:col-span-6 lg:col-start-7' : 'lg:col-span-7'
		)}
	>
		<Picture
			image={solution.image}
			sizes="(min-width: 1024px) 55vw, 100vw"
			class={cn(
				'w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]',
				flipped ? 'aspect-[4/3]' : 'aspect-[4/3] lg:aspect-[16/11]'
			)}
		/>
	</a>

	<div class={flipped ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-5'}>
		<p class="flex items-baseline gap-4">
			<span class="font-mono text-sm text-primary-strong">
				{String(index + 1).padStart(2, '0')}
			</span>
			{#if solution.eyebrow}
				<span class="eyebrow text-muted-foreground">{solution.eyebrow}</span>
			{/if}
		</p>
		<h2 id={headingId} class="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
			<a href={solutionHref(solution.slug)} class="hover:text-primary-strong">{solution.title}</a>
		</h2>
		<p class="mt-4 text-lg leading-relaxed text-muted-foreground">{solution.summary}</p>

		{#if solution.applications.length}
			<p class="mt-6 border-t pt-4 text-sm">
				<span
					class="mr-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
				>
					Used for
				</span>
				{solution.applications.join(' · ')}
			</p>
		{/if}

		{#if proof.length}
			<div class="mt-6 flex items-center gap-4">
				<ul class="flex gap-2" aria-label="{solution.title} project photos">
					{#each proof as image (image.src)}
						<li class="size-14 overflow-hidden rounded-sm sm:size-16">
							<Picture {image} sizes="64px" class="size-full object-cover" />
						</li>
					{/each}
				</ul>
				{#if hasProjects}
					<a
						href={projectsHref({ solution: solution.slug })}
						class="text-sm font-medium underline decoration-primary underline-offset-4 hover:text-primary-strong"
					>
						See projects
					</a>
				{/if}
			</div>
		{/if}

		<div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
			<a
				href={solutionHref(solution.slug)}
				class="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-primary decoration-1 underline-offset-[6px] hover:text-primary-strong"
			>
				Explore {solution.title.toLowerCase()}
				<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
			</a>
			<a
				href={whatsappHref(settings, { topic: solution.title })}
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<WhatsAppIcon class="size-4 text-brand-strong" />
				Ask on WhatsApp
				<span class="sr-only">about {solution.title.toLowerCase()} (opens in a new tab)</span>
			</a>
		</div>
	</div>
</article>
