<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	import { sectorLabel } from '$lib/content/sectors';
	import { projectHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Product, Project } from '$lib/content/types';

	/*
	 * A project photo with a quiet caption: title (linking to the project page,
	 * stretched over the whole tile) and verified metadata only — solution,
	 * sector, and location when the owner has confirmed one.
	 */
	let {
		project,
		solutions,
		sizes,
		imageClass,
		priority = false,
		class: className
	}: {
		project: Project;
		/** All solutions, to name the project's own */
		solutions: Pick<Product, 'slug' | 'title'>[];
		sizes: string;
		/** e.g. an aspect ratio; defaults to the photo's own proportions */
		imageClass?: string;
		/** Above the fold: load straight away */
		priority?: boolean;
		class?: string;
	} = $props();

	const meta = $derived(
		[
			project.solutions
				.map((slug) => solutions.find((s) => s.slug === slug)?.title)
				.filter(Boolean)
				.join(' + '),
			sectorLabel(project.sector),
			project.location
		]
			.filter(Boolean)
			.join(' · ')
	);
</script>

<figure class={cn('group relative', className)}>
	<div class="overflow-hidden rounded-sm bg-muted">
		<Picture
			image={project.heroImage}
			{sizes}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : undefined}
			class={cn(
				'h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]',
				imageClass
			)}
		/>
	</div>
	<figcaption class="mt-3.5">
		<p class="leading-snug font-medium md:text-lg">
			<a
				href={projectHref(project.slug)}
				class="group-hover:text-primary-strong after:absolute after:inset-0"
			>
				{project.title}
			</a>
		</p>
		<p class="mt-1.5 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
			{meta}
		</p>
	</figcaption>
</figure>
