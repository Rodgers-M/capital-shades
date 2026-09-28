<script lang="ts">
	import { ArrowRightIcon, CheckIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import MaterialComparison from '$lib/components/MaterialComparison.svelte';
	import { QUOTE_HREF } from '$lib/nav';
	import { cn } from '$lib/utils';

	let { data } = $props();
</script>

<Seo
	title="Products"
	description="Car park shades, shade sails, canopies, tensile membrane structures, parasols and pool shades — custom designed and installed in Kenya."
	image={data.products[0]?.image}
/>

<PageHero
	eyebrow="Products"
	title="Shade solutions for any space."
	description="Every structure is custom-designed for your site, then fabricated and installed by our own team — in shade mesh, waterproof PVC or metal roofing."
	image={data.products[2]?.image}
/>

<section class="container-page space-y-6 section-y md:space-y-10">
	{#each data.products as product, i (product.slug)}
		<article
			id={product.slug}
			class="grid scroll-mt-28 overflow-hidden rounded-3xl border bg-card md:grid-cols-2"
		>
			<div
				class={cn(
					'relative aspect-[4/3] md:aspect-auto md:min-h-[380px]',
					i % 2 === 1 && 'md:order-2'
				)}
			>
				<Picture
					image={product.image}
					sizes="(min-width: 768px) 50vw, 100vw"
					class="absolute inset-0 size-full object-cover"
				/>
			</div>
			<div class="flex flex-col justify-center p-6 md:p-10">
				<p class="font-mono text-xs font-bold text-accent-strong">0{i + 1} — {product.eyebrow}</p>
				<h2 class="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
					<a href="/products/{product.slug}" class="hover:text-accent-strong">{product.title}</a>
				</h2>
				<p class="mt-3 leading-relaxed text-muted-foreground">{product.summary}</p>
				<ul class="mt-5 space-y-2">
					{#each product.features as feature (feature)}
						<li class="flex items-center gap-2 text-sm font-medium">
							<span
								class="flex size-5 items-center justify-center rounded-full bg-primary/15 text-accent-strong"
							>
								<CheckIcon class="size-3" strokeWidth={3} />
							</span>
							{feature}
						</li>
					{/each}
				</ul>
				<div class="mt-7 flex flex-col gap-3 sm:flex-row">
					<Button href="/products/{product.slug}">
						Learn more <ArrowRightIcon />
					</Button>
					<Button href={QUOTE_HREF} variant="outline">Request site assessment</Button>
				</div>
			</div>
		</article>
	{/each}
</section>

<MaterialComparison />
