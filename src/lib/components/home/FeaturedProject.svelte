<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { SECTORS } from '$lib/content/sectors';
	import { projectHref, projectsHref, solutionHref } from '$lib/nav';
	import type { Product, Project } from '$lib/content/types';

	/*
	 * One deeper project story. Every detail is optional and only shown when
	 * the owner has confirmed it — nothing here is ever filled in by default.
	 */
	let { project, solutions }: { project: Project; solutions: Product[] } = $props();

	const solutionLinks = $derived(
		project.solutions
			.map((slug) => solutions.find((s) => s.slug === slug))
			.filter((s): s is Product => !!s)
	);
	const details = $derived(
		[
			{ label: 'Sector', value: SECTORS.find((s) => s.id === project.sector)?.label },
			{ label: 'Location', value: project.location },
			{ label: 'Completed', value: project.completed }
		].filter((d): d is { label: string; value: string } => !!d.value)
	);
	const story = $derived(
		[
			{ title: 'The requirement', text: project.requirement },
			{ title: 'What we delivered', text: project.deliveredSolution }
		].filter((s): s is { title: string; text: string } => !!s.text)
	);
	const gallery = $derived((project.gallery ?? []).slice(0, 2));
</script>

<section aria-labelledby="featured-project" class="container-page section-y">
	<div class="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
		<div class="lg:col-span-7">
			<div class="overflow-hidden rounded-sm bg-muted">
				<Picture
					image={project.heroImage}
					sizes="(min-width: 1024px) 55vw, 100vw"
					class="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[5/6]"
				/>
			</div>
			{#if gallery.length}
				<div class="mt-4 grid grid-cols-2 gap-4">
					{#each gallery as image (image.src)}
						<div class="overflow-hidden rounded-sm">
							<Picture
								{image}
								sizes="(min-width: 1024px) 27vw, 50vw"
								class="aspect-[4/3] w-full object-cover"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="lg:col-span-5 lg:pb-4">
			<EditorialHeading id="featured-project" eyebrow="Featured project" title={project.title} />

			<dl class="mt-10 border-t border-foreground/15">
				{#if solutionLinks.length}
					<div class="grid grid-cols-[8rem_1fr] gap-4 border-b border-foreground/15 py-4">
						<dt class="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
							Solution
						</dt>
						<dd class="flex flex-wrap gap-x-3">
							{#each solutionLinks as solution (solution.slug)}
								<a
									href={solutionHref(solution.slug)}
									class="underline decoration-primary underline-offset-4 hover:text-primary-strong"
								>
									{solution.title}
								</a>
							{/each}
						</dd>
					</div>
				{/if}
				{#each details as detail (detail.label)}
					<div class="grid grid-cols-[8rem_1fr] gap-4 border-b border-foreground/15 py-4">
						<dt class="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
							{detail.label}
						</dt>
						<dd>{detail.value}</dd>
					</div>
				{/each}
			</dl>

			{#each story as part (part.title)}
				<div class="mt-8">
					<h3 class="text-sm font-semibold">{part.title}</h3>
					<p class="mt-2 leading-relaxed text-muted-foreground">{part.text}</p>
				</div>
			{/each}

			<div class="mt-10 flex flex-wrap gap-x-8 gap-y-4">
				<TextLink href={projectHref(project.slug)}>View project</TextLink>
				{#if project.solutions[0]}
					<TextLink href={projectsHref({ solution: project.solutions[0] })}>
						More {solutionLinks[0]?.title.toLowerCase() ?? ''} projects
					</TextLink>
				{/if}
			</div>
		</div>
	</div>
</section>
