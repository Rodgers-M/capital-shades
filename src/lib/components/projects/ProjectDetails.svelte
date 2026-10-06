<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { sectorLabel } from '$lib/content/sectors';
	import { solutionHref } from '$lib/nav';
	import type { Product, Project } from '$lib/content/types';

	/*
	 * Verified facts about the project. Location, completion date, requirement
	 * and delivered solution only appear once the owner has supplied them.
	 * Only project-specific content sits under the project heading: when there
	 * is no project story yet, the solution's general summary is shown in a
	 * separate block labelled "About this solution", never as a description of
	 * this installation.
	 */
	let {
		project,
		solutions
	}: { project: Project; solutions: Pick<Product, 'slug' | 'title' | 'summary'>[] } = $props();

	const facts = $derived(
		[
			{ label: 'Location', value: project.location },
			{ label: 'Completed', value: project.completed },
			{ label: 'Sector', value: sectorLabel(project.sector) }
		].filter((f): f is { label: string; value: string } => !!f.value)
	);
	const story = $derived(
		[
			{ title: 'The requirement', text: project.requirement },
			{ title: 'What was delivered', text: project.deliveredSolution }
		].filter((s): s is { title: string; text: string } => !!s.text)
	);
</script>

<section aria-labelledby="project-details" class="container-page section-y">
	<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<EditorialHeading
				id="project-details"
				eyebrow="Details"
				title={story.length ? 'About this project' : 'Project details'}
			/>
			<dl class="mt-10 border-t border-foreground/15">
				<div class="grid grid-cols-[7rem_1fr] gap-4 border-b border-foreground/15 py-4">
					<dt class="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
						{solutions.length > 1 ? 'Solutions' : 'Solution'}
					</dt>
					<dd class="flex flex-col gap-1">
						{#each solutions as solution (solution.slug)}
							<a
								href={solutionHref(solution.slug)}
								class="self-start underline decoration-primary underline-offset-4 hover:text-primary-strong"
							>
								{solution.title}
							</a>
						{/each}
					</dd>
				</div>
				{#each facts as fact (fact.label)}
					<div class="grid grid-cols-[7rem_1fr] gap-4 border-b border-foreground/15 py-4">
						<dt class="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
							{fact.label}
						</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="space-y-10 lg:col-span-7 lg:pt-16">
			{#each story as part (part.title)}
				<div>
					<h3 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
						{part.title}
					</h3>
					<p class="mt-4 text-lg leading-relaxed text-foreground/85">{part.text}</p>
				</div>
			{:else}
				<!-- General solution information, kept apart from the project's own facts -->
				<aside aria-labelledby="about-solution" class="border-l-2 border-primary pl-6">
					<h3 id="about-solution" class="eyebrow text-muted-foreground">About this solution</h3>
					{#each solutions as solution (solution.slug)}
						<div class="mt-5">
							<p class="text-xl font-medium tracking-tight">{solution.title}</p>
							<p class="mt-3 leading-relaxed text-muted-foreground">{solution.summary}</p>
							<TextLink href={solutionHref(solution.slug)} class="mt-5">
								Explore {solution.title.toLowerCase()}
							</TextLink>
						</div>
					{/each}
				</aside>
			{/each}
		</div>
	</div>
</section>
