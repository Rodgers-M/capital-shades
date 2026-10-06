<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { sectorLabel } from '$lib/content/sectors';
	import { projectHref } from '$lib/nav';
	import type { Project } from '$lib/content/types';

	/*
	 * Real projects for one solution: a lead photo with its caption alongside,
	 * then a row of the rest. Captions use verified fields only. The page hides
	 * this section when a solution has no projects.
	 */
	let {
		projects,
		solutionTitle,
		galleryHref
	}: { projects: Project[]; solutionTitle: string; galleryHref: string } = $props();

	const lead = $derived(projects[0]);
	const rest = $derived(projects.slice(1));
	const meta = (p: Project) =>
		[sectorLabel(p.sector), p.location, p.completed].filter(Boolean).join(' · ');
</script>

<section aria-labelledby="related-projects" class="bg-muted section-y">
	<div class="container-page">
		<EditorialHeading id="related-projects" eyebrow="Projects" title="{solutionTitle} projects">
			{#snippet action()}
				<TextLink href={galleryHref}>View in the project gallery</TextLink>
			{/snippet}
		</EditorialHeading>

		<figure class="relative mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
			<div class="overflow-hidden rounded-sm lg:col-span-8">
				<Picture
					image={lead.heroImage}
					sizes="(min-width: 1024px) 60vw, 100vw"
					class="aspect-[4/3] w-full object-cover lg:aspect-[16/10]"
				/>
			</div>
			<figcaption class="lg:col-span-4 lg:pb-2">
				<p class="text-2xl font-medium tracking-tight">
					<a
						href={projectHref(lead.slug)}
						class="after:absolute after:inset-0 hover:text-primary-strong">{lead.title}</a
					>
				</p>
				<p class="mt-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
					{meta(lead)}
				</p>
				{#if lead.deliveredSolution}
					<p class="mt-4 leading-relaxed text-muted-foreground">{lead.deliveredSolution}</p>
				{/if}
			</figcaption>
		</figure>

		{#if rest.length}
			<ul class="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
				{#each rest as project, i (project.slug)}
					<li class={i % 2 === 1 ? 'mt-10 lg:mt-16' : ''}>
						<figure class="relative">
							<div class="overflow-hidden rounded-sm">
								<Picture
									image={project.heroImage}
									sizes="(min-width: 1024px) 22vw, 50vw"
									class="aspect-[3/4] w-full object-cover"
								/>
							</div>
							<figcaption class="mt-3">
								<p class="leading-snug font-medium">
									<a
										href={projectHref(project.slug)}
										class="after:absolute after:inset-0 hover:text-primary-strong"
										>{project.title}</a
									>
								</p>
								<p
									class="mt-1 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
								>
									{meta(project)}
								</p>
							</figcaption>
						</figure>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
