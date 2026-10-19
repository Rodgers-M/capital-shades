<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { PROJECTS_HREF, QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';
	import { SERVICE_REACH } from '$lib/content/geography';
	import type { Solution, Project, PublicSiteSettings } from '$lib/content/types';

	/*
	 * Home hero: what Capital Shades does, for whom and where, in plain words,
	 * beside a real project photo. The page's one statement of geography lives
	 * here: the base from settings, then the wider scope from docs/decisions.md
	 * ("Geographic positioning").
	 */
	let {
		settings,
		project,
		solutions
	}: { settings: PublicSiteSettings; project?: Project; solutions: Solution[] } = $props();

	// The confirmed project lifecycle (docs/decisions.md — "Business capability")
	const CAPABILITIES = ['Design', 'Fabrication', 'Supply', 'Installation', 'Maintenance'];

	// Phones: Quote and WhatsApp share a row; the label may wrap if text is enlarged
	const phoneButtonClass =
		'max-sm:h-auto max-sm:min-h-12 max-sm:min-w-0 max-sm:px-3 max-sm:py-2 max-sm:text-sm max-sm:whitespace-normal';

	const solutionTitle = (slug: string) => solutions.find((s) => s.slug === slug)?.title;
	const caption = $derived(
		project && [project.title, solutionTitle(project.solutions[0])].filter(Boolean).join(' — ')
	);
</script>

<section aria-labelledby="hero-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-10 pb-12 max-sm:gap-6 max-sm:pt-4 max-sm:pb-8 md:pt-14 md:pb-16 lg:min-h-[min(46rem,calc(100svh-5rem))] lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"
	>
		<div class="lg:col-span-6">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 shrink-0 bg-primary" aria-hidden="true"></span>
				<!-- Balanced, so on phones the label splits evenly instead of orphaning a word -->
				<span class="min-w-0 text-balance">
					{[settings.name, settings.location && `Based in ${settings.location}`]
						.filter(Boolean)
						.join(' · ')}
				</span>
			</p>
			<h1
				id="hero-title"
				class="mt-3 text-3xl leading-[1.08] font-medium tracking-[-0.02em] text-balance sm:mt-6 sm:text-6xl sm:leading-[1.02] sm:tracking-[-0.025em] lg:text-5xl"
			>
				Shade structures designed, fabricated and installed for your space.
			</h1>
			<p
				class="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl"
			>
				Car parking shades, shade sails, canopies, awnings, pergolas, tensile structures and more —
				for homes, businesses and institutions across {SERVICE_REACH}.
			</p>
			<ul
				aria-label="What we handle"
				class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-foreground/15 pt-3 text-xs font-medium tracking-[0.14em] text-foreground uppercase sm:mt-7 sm:gap-x-3 sm:pt-4"
			>
				<!-- Separator after each label, so a wrapped line never starts with one -->
				{#each CAPABILITIES as capability, i (capability)}
					<li class="flex items-center gap-2 sm:gap-3">
						{capability}
						{#if i < CAPABILITIES.length - 1}
							<span class="text-primary-strong" aria-hidden="true">·</span>
						{/if}
					</li>
				{/each}
			</ul>
			<!-- Phones: Quote and WhatsApp side by side, so both show in the first screen -->
			<div
				class="mt-5 grid grid-cols-[1fr_auto] gap-3 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap sm:items-center"
			>
				<Button href={QUOTE_HREF} size="lg" class={phoneButtonClass}>
					{QUOTE_LABEL}
					<ArrowRightIcon class="max-sm:hidden" />
				</Button>
				<Button
					href={whatsappHref(settings)}
					data-hides-floating-whatsapp
					target="_blank"
					rel="noopener"
					variant="outline"
					size="lg"
					class={phoneButtonClass}
				>
					<WhatsAppIcon class="size-4 text-brand-strong" />
					WhatsApp
					<span class="sr-only">(opens in a new tab)</span>
				</Button>
				<TextLink href={PROJECTS_HREF} class="col-span-2 mt-1 sm:mt-0 sm:ml-3"
					>View projects</TextLink
				>
			</div>
		</div>

		{#if project}
			<figure class="lg:col-span-6">
				<div class="relative -mx-5 overflow-hidden sm:mx-0 sm:rounded-sm">
					<Picture
						image={project.heroImage}
						loading="eager"
						fetchpriority="high"
						sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
						class="aspect-[3/2] w-full object-cover sm:aspect-[4/3] lg:aspect-[5/4]"
					/>
				</div>
				<figcaption
					class="mt-3 flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
				>
					<span class="h-px w-6 bg-brand" aria-hidden="true"></span>
					{caption}
				</figcaption>
			</figure>
		{/if}
	</div>
</section>
