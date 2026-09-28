<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	/*
	 * One row of items: a sideways-swipe strip on phones and tablets (one item
	 * fills most of the width, the next peeks in), a plain grid row on desktop.
	 */
	let {
		items,
		item,
		label,
		desktopCols,
		key
	}: {
		items: T[];
		item: Snippet<[T, number]>;
		/** Accessible name for the list */
		label: string;
		desktopCols: 3 | 6;
		key: (item: T) => string;
	} = $props();
</script>

<ul
	aria-label={label}
	class={cn(
		'-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-3 overflow-x-auto px-4 pb-2 md:-mx-6 md:scroll-px-6 md:px-6 lg:mx-0 lg:grid lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden',
		desktopCols === 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-3'
	)}
>
	{#each items as entry, i (key(entry))}
		<li class="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
			{@render item(entry, i)}
		</li>
	{/each}
</ul>
