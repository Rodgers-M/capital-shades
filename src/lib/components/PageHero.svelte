<script lang="ts">
	import type { Snippet } from 'svelte';
	import Picture from './Picture.svelte';
	import { cn } from '$lib/utils';
	import type { Img } from '$lib/content/types';

	let {
		eyebrow,
		title,
		description,
		image,
		compact = false,
		children
	}: {
		eyebrow: string;
		title: string;
		description: string;
		image?: Img;
		/** Shorter header for task pages, so the content starts above the fold */
		compact?: boolean;
		children?: Snippet;
	} = $props();
</script>

<section class="relative overflow-hidden bg-ink text-on-ink">
	{#if image}
		<Picture
			{image}
			alt=""
			loading="eager"
			fetchpriority="high"
			class="absolute inset-0 size-full object-cover opacity-35"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50"></div>
	{/if}
	<div class="absolute inset-0 bg-grid text-on-ink opacity-[0.06]"></div>
	<div
		class={cn(
			'relative container-page',
			compact ? 'pt-5 pb-12 md:pt-6 md:pb-14' : 'py-12 md:py-16'
		)}
	>
		<p class="inline-flex items-center gap-2 eyebrow text-primary">
			<span class="h-[2px] w-6 bg-primary"></span>
			{eyebrow}
		</p>
		<h1
			class={cn(
				'max-w-3xl leading-[1.05] font-extrabold tracking-tight text-balance',
				compact ? 'mt-2 text-3xl md:text-5xl' : 'mt-3 text-4xl md:text-6xl'
			)}
		>
			{title}
		</h1>
		<p
			class={cn(
				'max-w-2xl leading-relaxed text-on-ink-muted',
				compact ? 'mt-2 hidden text-sm sm:block md:text-base' : 'mt-4 text-base md:text-lg'
			)}
		>
			{description}
		</p>
		{@render children?.()}
	</div>
</section>
