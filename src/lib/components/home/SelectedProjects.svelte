<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { SECTORS } from '$lib/content/sectors';
	import { projectHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Solution, Project } from '$lib/content/types';

	/*
	 * Early project proof: one large photo and two staggered portrait crops,
	 * captioned with verified metadata only (title, solution, sector). With
	 * `rail`, phones get a short swipe row of wide crops under a one-line
	 * heading, and the section is ruled off from the one above; md and up keep
	 * the editorial grid.
	 */
	let {
		projects,
		solutions,
		title = 'Selected projects',
		rail = false
	}: { projects: Project[]; solutions: Solution[]; title?: string; rail?: boolean } = $props();

	const meta = (p: Project) =>
		[
			solutions.find((s) => s.slug === p.solutions[0])?.title,
			SECTORS.find((s) => s.id === p.sector)?.label,
			p.location
		]
			.filter(Boolean)
			.join(' · ');

	// Grid placement per position: lead photo, then two offset portraits
	const LAYOUT = [
		{ item: 'col-span-2 lg:col-span-6', img: 'aspect-[4/3]' },
		{ item: 'lg:col-span-3 lg:mt-24', img: 'aspect-[3/4]' },
		{ item: 'mt-12 lg:col-span-3 lg:mt-48', img: 'aspect-[3/4]' }
	];
</script>

{#if projects.length}
	<section
		aria-labelledby="selected-projects"
		class={cn('container-page section-y', rail && 'border-t border-foreground/10 max-md:py-8')}
	>
		<EditorialHeading id="selected-projects" eyebrow="Projects" {title} compact={rail}>
			{#snippet action()}
				<TextLink href="/projects">View all projects</TextLink>
			{/snippet}
		</EditorialHeading>

		<ul
			class={cn(
				'mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:mt-16 lg:grid-cols-12',
				rail && 'max-md:snap-rail max-md:mt-4'
			)}
		>
			{#each projects as project, i (project.slug)}
				<!-- In the rail every photo takes the same wide crop and no offset -->
				<li class={cn(LAYOUT[i]?.item, rail && 'max-md:mt-0 max-md:w-2/3')}>
					<figure class="group relative">
						<div class="overflow-hidden rounded-sm bg-muted">
							<Picture
								image={project.heroImage}
								sizes={i === 0
									? `(min-width: 1024px) 50vw, ${rail ? '(min-width: 768px) 100vw, 70vw' : '100vw'}`
									: `(min-width: 1024px) 25vw, ${rail ? '(min-width: 768px) 50vw, 70vw' : '50vw'}`}
								class={cn('w-full object-cover', LAYOUT[i]?.img, rail && 'max-md:aspect-[16/10]')}
							/>
						</div>
						<figcaption class={cn('mt-4', rail && 'max-md:mt-2')}>
							<p class="text-base leading-snug font-medium md:text-lg">
								<a
									href={projectHref(project.slug)}
									class="after:absolute after:inset-0 hover:text-primary-strong">{project.title}</a
								>
							</p>
							<p
								class="mt-1.5 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
							>
								{meta(project)}
							</p>
						</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
	</section>
{/if}
