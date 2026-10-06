<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF, QUOTE_LABEL, SOLUTIONS_HREF } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';
	import type { Product, PublicSiteSettings } from '$lib/content/types';

	// Solution page opener. `data-hero` keeps the phone action bar out of the way
	// while these calls to action are on screen.
	let { settings, solution }: { settings: PublicSiteSettings; solution: Product } = $props();
</script>

<section data-hero aria-labelledby="solution-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-8 pb-12 md:pt-10 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"
	>
		<div class="lg:col-span-6 xl:col-span-5">
			<nav aria-label="Breadcrumb">
				<ol class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<li>
						<a
							href={SOLUTIONS_HREF}
							class="underline-offset-4 hover:text-foreground hover:underline">Solutions</a
						>
					</li>
					<li aria-hidden="true">/</li>
					<li aria-current="page" class="text-foreground">{solution.title}</li>
				</ol>
			</nav>
			{#if solution.eyebrow}
				<p class="mt-10 flex items-center gap-3 eyebrow text-primary-strong">
					<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
					{solution.eyebrow}
				</p>
			{/if}
			<h1
				id="solution-title"
				class="mt-5 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl"
			>
				{solution.title}
			</h1>
			<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				{solution.summary}
			</p>
			<div class="mt-9 flex flex-col gap-3 sm:flex-row">
				<Button href={QUOTE_HREF} size="lg">
					{QUOTE_LABEL}
					<ArrowRightIcon />
				</Button>
				<Button
					href={whatsappHref(settings, { topic: solution.title })}
					target="_blank"
					rel="noopener"
					variant="outline"
					size="lg"
				>
					<WhatsAppIcon class="size-4 text-brand-strong" />
					Ask on WhatsApp
					<span class="sr-only">(opens in a new tab)</span>
				</Button>
			</div>
		</div>

		<div class="-mx-5 overflow-hidden sm:mx-0 sm:rounded-sm lg:col-span-6 xl:col-span-7">
			<Picture
				image={solution.image}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 100vw"
				class="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
			/>
		</div>
	</div>
</section>
