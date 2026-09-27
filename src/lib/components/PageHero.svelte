<script lang="ts">
	import type { Snippet } from 'svelte';
	import Picture from './Picture.svelte';
	import type { Img } from '$lib/content/types';

	let {
		eyebrow,
		title,
		description,
		image,
		children
	}: {
		eyebrow: string;
		title: string;
		description: string;
		image?: Img;
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
	<div class="relative container-page py-14 md:py-20">
		<p class="inline-flex items-center gap-2 eyebrow text-primary">
			<span class="h-[2px] w-6 bg-primary"></span>
			{eyebrow}
		</p>
		<h1
			class="mt-3 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-6xl"
		>
			{title}
		</h1>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-on-ink-muted md:text-lg">
			{description}
		</p>
		{@render children?.()}
	</div>
</section>
