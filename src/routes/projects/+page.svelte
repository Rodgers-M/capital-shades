<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import ProjectFilters from '$lib/components/projects/ProjectFilters.svelte';
	import ProjectTile from '$lib/components/projects/ProjectTile.svelte';
	import { sectorLabel } from '$lib/content/sectors';
	import {
		PROJECTS_HREF,
		QUOTE_HREF,
		QUOTE_LABEL,
		readProjectFilters,
		solutionHref
	} from '$lib/nav';

	/*
	 * The portfolio: real project photos as the site's proof. Filters live in
	 * the URL (?solution=…&sector=…). The page is prerendered, so the query is
	 * read once the browser has the page — until then everything shows.
	 */
	let { data } = $props();

	let mounted = $state(false);
	onMount(() => (mounted = true));

	const filters = $derived(mounted ? readProjectFilters(page.url.searchParams) : {});
	const visible = $derived(
		data.projects.filter(
			(p) =>
				(!filters.solution || p.solutions.includes(filters.solution)) &&
				(!filters.sector || p.sector === filters.sector)
		)
	);
	const lead = $derived(visible[0]);
	const rest = $derived(visible.slice(1));

	const solutionTitle = (slug: string) => data.products.find((s) => s.slug === slug)?.title;
	// Describes the view in words for screen readers (no counts)
	const viewLabel = $derived(
		[
			filters.solution && (solutionTitle(filters.solution) ?? filters.solution),
			filters.sector && sectorLabel(filters.sector)
		]
			.filter(Boolean)
			.join(', ') || 'All projects'
	);
</script>

<Seo
	title="Projects"
	description="Selected car park shade, carport, shade sail, canopy and membrane structure projects by Capital Shades for homes and businesses."
	image={data.projects[0]?.heroImage}
/>

<section aria-labelledby="projects-title" class="container-page pt-10 md:pt-14">
	<div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
		<div class="lg:col-span-7">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				Projects
			</p>
			<h1
				id="projects-title"
				class="mt-6 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl"
			>
				Selected projects.
			</h1>
		</div>
		<p class="max-w-xl text-lg leading-relaxed text-muted-foreground lg:col-span-5">
			Selected shade and outdoor structure projects. Filter by solution or sector, or open a project
			to see it in more detail.
		</p>
	</div>

	<div class="mt-10 md:mt-12">
		<ProjectFilters
			active={filters}
			solutions={data.filterOptions.solutions}
			sectors={data.filterOptions.sectors}
		/>
		<p class="sr-only" aria-live="polite">Showing: {viewLabel}</p>
	</div>
</section>

<section aria-label="Project photos" class="container-page section-y">
	{#if lead}
		<ProjectTile
			project={lead}
			solutions={data.products}
			sizes="(min-width: 1024px) 66vw, 100vw"
			imageClass="aspect-[4/3] lg:aspect-[16/9]"
			priority
			class="mb-14 md:mb-20"
		/>

		{#if rest.length}
			<ul class="gap-x-6 sm:columns-2 lg:columns-3 lg:gap-x-8">
				{#each rest as project (project.slug)}
					<li class="mb-12 break-inside-avoid md:mb-16">
						<ProjectTile
							{project}
							solutions={data.products}
							sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
						/>
					</li>
				{/each}
			</ul>
		{/if}
	{:else}
		<div class="border-y py-16 text-center md:py-24">
			<p class="text-2xl font-medium tracking-tight">There are no projects in this view.</p>
			<p class="mx-auto mt-3 max-w-md text-muted-foreground">
				Try another solution or sector, or see every project.
			</p>
			<div class="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
				<TextLink href={PROJECTS_HREF}>Show all projects</TextLink>
				{#if filters.solution && solutionTitle(filters.solution)}
					<TextLink href={solutionHref(filters.solution)}>
						About {solutionTitle(filters.solution)?.toLowerCase()}
					</TextLink>
				{/if}
				<TextLink href={QUOTE_HREF}>{QUOTE_LABEL}</TextLink>
			</div>
		</div>
	{/if}
</section>
