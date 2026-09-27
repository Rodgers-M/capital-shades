<script lang="ts">
	import { ArrowUpRightIcon } from '@lucide/svelte';
	import Picture from './Picture.svelte';
	import type { Product } from '$lib/content/types';

	let { products }: { products: Product[] } = $props();
</script>

<ul class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
	{#each products as product, i (product.slug)}
		<li>
			<a
				href="/products/{product.slug}"
				class="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-on-ink shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-xl sm:aspect-[4/5]"
			>
				<Picture
					image={product.image}
					sizes="(min-width: 1024px) 400px, 50vw"
					class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
				<span
					class="absolute top-3 left-3 rounded-md bg-on-ink/15 px-2 py-1 font-mono text-xs font-bold backdrop-blur sm:top-4 sm:left-4"
					aria-hidden="true"
				>
					0{i + 1}
				</span>
				<span
					class="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45 sm:top-4 sm:right-4 sm:size-10"
					aria-hidden="true"
				>
					<ArrowUpRightIcon class="size-5" />
				</span>
				<div class="relative p-4 sm:p-5">
					<p class="text-[10px] font-bold tracking-[0.16em] text-primary uppercase sm:text-[11px]">
						{product.eyebrow}
					</p>
					<h3 class="mt-1 text-base leading-tight font-extrabold sm:text-xl">{product.title}</h3>
					<p class="mt-1.5 hidden text-sm leading-relaxed text-on-ink-muted sm:block">
						{product.summary}
					</p>
				</div>
			</a>
		</li>
	{/each}
</ul>
