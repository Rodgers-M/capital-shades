<script lang="ts">
	import { ArrowUpRightIcon } from '@lucide/svelte';
	import Picture from './Picture.svelte';
	import SwipeRow from './SwipeRow.svelte';
	import type { Product } from '$lib/content/types';

	// Teaser row: photo + name only; the detail lives on /products
	let {
		products,
		desktopCols = 6,
		label = 'Products'
	}: { products: Product[]; desktopCols?: 5 | 6; label?: string } = $props();
</script>

<SwipeRow items={products} {label} {desktopCols} key={(p) => p.slug}>
	{#snippet item(product)}
		<a
			href="/products/{product.slug}"
			class="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-on-ink ring-1 ring-ink/5 transition-shadow hover:shadow-xl"
		>
			<Picture
				image={product.image}
				sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 78vw"
				class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"></div>
			<span
				class="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45"
				aria-hidden="true"
			>
				<ArrowUpRightIcon class="size-4" />
			</span>
			<div class="relative p-4">
				<!-- Five or six tiles per row on desktop: the name alone reads better -->
				<p class="text-[10px] font-bold tracking-[0.14em] text-primary uppercase lg:hidden">
					{product.eyebrow}
				</p>
				<h3 class="mt-1 text-lg leading-tight font-extrabold lg:text-base">{product.title}</h3>
			</div>
		</a>
	{/snippet}
</SwipeRow>
