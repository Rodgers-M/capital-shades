<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import { QUOTE_HREF, projectsHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Sector } from '$lib/content/types';

	/*
	 * Residential / Commercial / Institutional context. No counts; a sector
	 * links to its filtered portfolio only when it has projects, otherwise to
	 * a quote request — never to an empty gallery. With `compact`, phones get
	 * three ruled rows (label, customer types, arrow), each one whole-row link;
	 * md and up keep the columns.
	 */
	let {
		sectors,
		compact = false
	}: {
		sectors: {
			id: Sector;
			label: string;
			text: string;
			examples: string;
			hasProjects: boolean;
		}[];
		compact?: boolean;
	} = $props();
</script>

<section
	aria-labelledby="sectors"
	class={cn('bg-ink section-y text-on-ink', compact && 'max-md:py-12')}
>
	<div class="container-page">
		<EditorialHeading
			id="sectors"
			tone="ink"
			eyebrow="Sectors"
			title="Shade for homes, businesses and institutions."
		/>

		<ul
			class={cn(
				'mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16',
				compact && 'max-md:mt-6 max-md:gap-0 max-md:border-b max-md:border-primary/60'
			)}
		>
			{#each sectors as sector (sector.id)}
				<li
					class={cn(
						'flex flex-col border-t border-primary/60 pt-6',
						compact && 'max-md:relative max-md:py-4 max-md:pr-10'
					)}
				>
					<h3 class={cn('text-2xl font-medium tracking-tight', compact && 'max-md:text-xl')}>
						{sector.label}
					</h3>
					{#if compact}
						<p class="mt-1 text-sm leading-relaxed text-on-ink-muted md:hidden">
							{sector.examples}
						</p>
					{/if}
					<p
						class={cn('mt-3 flex-1 leading-relaxed text-on-ink-muted', compact && 'max-md:hidden')}
					>
						{sector.text}
					</p>
					<!-- Compact phones: the link covers the row and shows only its arrow -->
					<a
						href={sector.hasProjects ? projectsHref({ sector: sector.id }) : QUOTE_HREF}
						class={cn(
							'group mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-on-ink underline decoration-primary underline-offset-[6px] transition-colors hover:text-primary',
							compact &&
								'max-md:absolute max-md:inset-0 max-md:mt-0 max-md:justify-end max-md:self-stretch'
						)}
					>
						<span class={cn(compact && 'max-md:hidden')}>
							{sector.hasProjects ? `${sector.label} projects` : 'Discuss your project'}
						</span>
						{#if compact}
							<!-- The row's only name on phones, so it leads with the sector for voice control -->
							<span class="sr-only md:hidden">
								{sector.hasProjects
									? `${sector.label} projects`
									: `${sector.label}: discuss your project`}
							</span>
						{/if}
						<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
