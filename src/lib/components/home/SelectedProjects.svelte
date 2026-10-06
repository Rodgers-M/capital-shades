<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { SECTORS } from '$lib/content/sectors';
	import { cn } from '$lib/utils';
	import type { Product, Project } from '$lib/content/types';

	/*
	 * Early project proof: one large photo and two staggered portrait crops,
	 * captioned with verified metadata only (title, solution, sector).
	 */
	let { projects, solutions }: { projects: Project[]; solutions: Product[] } = $props();

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
	<section aria-labelledby="selected-projects" class="container-page section-y">
		<EditorialHeading id="selected-projects" eyebrow="Projects" title="Selected projects">
			{#snippet action()}
				<TextLink href="/projects">View all projects</TextLink>
			{/snippet}
		</EditorialHeading>

		<ul class="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:mt-16 lg:grid-cols-12">
			{#each projects as project, i (project.slug)}
				<li class={LAYOUT[i]?.item}>
					<figure>
						<div class="overflow-hidden rounded-sm bg-muted">
							<Picture
								image={project.heroImage}
								sizes={i === 0
									? '(min-width: 1024px) 50vw, 100vw'
									: '(min-width: 1024px) 25vw, 50vw'}
								class={cn('w-full object-cover', LAYOUT[i]?.img)}
							/>
						</div>
						<figcaption class="mt-4">
							<p class="text-base leading-snug font-medium md:text-lg">{project.title}</p>
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
