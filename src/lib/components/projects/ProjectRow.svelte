<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	import SwipeRow from '$lib/components/SwipeRow.svelte';
	import type { Product, Project } from '$lib/content/types';

	// Home page teaser: a few photos linking to the full gallery
	let { projects, products }: { projects: Project[]; products: Product[] } = $props();

	// A project's label names its main (first) solution
	const solutionTitle = (project: Project) =>
		products.find((p) => p.slug === project.solutions[0])?.title ?? '';
</script>

<SwipeRow items={projects} label="Recent projects" desktopCols={3} key={(p) => p.slug}>
	{#snippet item(project)}
		<a
			href="/projects"
			class="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink text-on-ink ring-1 ring-on-ink/10"
		>
			<Picture
				image={project.heroImage}
				sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 78vw"
				class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<span
				class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-12"
			>
				<span class="block text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
					{solutionTitle(project)}
				</span>
				<span class="mt-0.5 block font-extrabold">{project.title}</span>
			</span>
		</a>
	{/snippet}
</SwipeRow>
