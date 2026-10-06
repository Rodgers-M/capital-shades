<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { sectorLabel } from '$lib/content/sectors';
	import { PROJECTS_HREF, QUOTE_HREF, QUOTE_LABEL, solutionHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import { whatsappHref } from '$lib/whatsapp';
	import type { Product, Project, PublicSiteSettings } from '$lib/content/types';

	/*
	 * Project opener: breadcrumb, title, its solutions (linked) and sector, the
	 * two next steps, and the hero photo. `data-hero` keeps the phone action bar
	 * out of the way while these calls to action are on screen.
	 */
	let {
		settings,
		project,
		solutions
	}: {
		settings: PublicSiteSettings;
		project: Project;
		solutions: Pick<Product, 'slug' | 'title'>[];
	} = $props();

	const portrait = $derived(project.heroImage.height > project.heroImage.width);
</script>

<section data-hero aria-labelledby="project-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-8 pb-12 md:pt-10 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"
	>
		<div class="lg:col-span-5">
			<nav aria-label="Breadcrumb">
				<ol class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<li>
						<a
							href={PROJECTS_HREF}
							class="underline-offset-4 hover:text-foreground hover:underline"
						>
							Projects
						</a>
					</li>
					<li aria-hidden="true">/</li>
					<li aria-current="page" class="text-foreground">{project.title}</li>
				</ol>
			</nav>

			<p class="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				{#each solutions as solution, i (solution.slug)}
					{#if i > 0}<span aria-hidden="true">+</span>{/if}
					<a
						href={solutionHref(solution.slug)}
						class="underline-offset-4 hover:text-foreground hover:underline"
					>
						{solution.title}
					</a>
				{/each}
				<span aria-hidden="true">·</span>
				<span>{sectorLabel(project.sector)}</span>
			</p>
			<h1
				id="project-title"
				class="mt-5 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl"
			>
				{project.title}
			</h1>
			{#if project.location}
				<p class="mt-5 text-lg text-muted-foreground">{project.location}</p>
			{/if}

			<div class="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
				<Button href={QUOTE_HREF} size="lg">
					{QUOTE_LABEL}
					<ArrowRightIcon />
				</Button>
				<Button
					href={whatsappHref(settings, { project: project.title })}
					target="_blank"
					rel="noopener"
					variant="outline"
					size="lg"
					class="px-5 sm:px-7"
				>
					<WhatsAppIcon class="size-4 text-brand-strong" />
					Ask about a similar project
					<span class="sr-only">(opens WhatsApp in a new tab)</span>
				</Button>
			</div>
		</div>

		<div class="-mx-5 overflow-hidden sm:mx-0 sm:rounded-sm lg:col-span-7">
			<Picture
				image={project.heroImage}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width: 1024px) 58vw, 100vw"
				class={cn('w-full object-cover', portrait ? 'aspect-[4/5]' : 'aspect-[4/3]')}
			/>
		</div>
	</div>
</section>
