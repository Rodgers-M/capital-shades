<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import { QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import type { Product, Project, PublicSiteSettings } from '$lib/content/types';

	/*
	 * Home hero: an expressive line, then a literal one saying what Capital
	 * Shades provides, beside a real project photo. `data-hero` lets the phone
	 * action bar wait until the visitor has scrolled past it.
	 */
	let {
		settings,
		project,
		solutions
	}: { settings: PublicSiteSettings; project?: Project; solutions: Product[] } = $props();

	const solutionTitle = (slug: string) => solutions.find((s) => s.slug === slug)?.title;
	const caption = $derived(
		project && [project.title, solutionTitle(project.solutions[0])].filter(Boolean).join(' — ')
	);
</script>

<section data-hero aria-labelledby="hero-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-10 pb-12 md:pt-14 md:pb-16 lg:min-h-[min(46rem,calc(100svh-5rem))] lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"
	>
		<div class="lg:col-span-6 xl:col-span-5">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				{settings.name}
			</p>
			<h1
				id="hero-title"
				class="mt-6 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.025em] text-balance sm:text-6xl xl:text-7xl"
			>
				Shade, shaped around your space.
			</h1>
			<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				Car park shades, shade sails, canopies and tensile membrane structures — designed for your
				site and installed by {settings.name}.
			</p>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row">
				<Button href={QUOTE_HREF} size="lg">
					{QUOTE_LABEL}
					<ArrowRightIcon />
				</Button>
				<Button href="/projects" variant="outline" size="lg">View Projects</Button>
			</div>
		</div>

		{#if project}
			<figure class="lg:col-span-6 xl:col-span-7">
				<div class="relative -mx-5 overflow-hidden sm:mx-0 sm:rounded-sm">
					<Picture
						image={project.heroImage}
						loading="eager"
						fetchpriority="high"
						sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 100vw"
						class="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
					/>
				</div>
				<figcaption
					class="mt-3 flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
				>
					<span class="h-px w-6 bg-brand" aria-hidden="true"></span>
					{caption}
				</figcaption>
			</figure>
		{/if}
	</div>
</section>
