<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	import { solutionHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Product } from '$lib/content/types';

	/*
	 * Numbered editorial index of solutions: title, summary and a small photo
	 * per row, separated by thin rules. `start` continues numbering from a
	 * lead entry shown elsewhere.
	 */
	let {
		solutions,
		start = 1,
		class: className
	}: { solutions: Product[]; start?: number; class?: string } = $props();

	const number = (i: number) => String(i + start).padStart(2, '0');
</script>

<ol class={cn('border-t border-foreground/15', className)}>
	{#each solutions as solution, i (solution.slug)}
		<li class="border-b border-foreground/15">
			<a
				href={solutionHref(solution.slug)}
				class="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-6"
			>
				<span class="pt-1 font-mono text-sm text-primary-strong">{number(i)}</span>
				<span>
					<span
						class="block text-xl font-medium tracking-tight transition-colors group-hover:text-primary-strong"
					>
						{solution.title}
					</span>
					<span class="mt-2 line-clamp-3 block text-sm leading-relaxed text-muted-foreground">
						{solution.summary}
					</span>
				</span>
				<span class="w-20 overflow-hidden rounded-sm sm:w-28">
					<Picture
						image={solution.image}
						alt=""
						sizes="112px"
						class="aspect-[4/3] w-full object-cover"
					/>
				</span>
			</a>
		</li>
	{/each}
</ol>
