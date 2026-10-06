<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import { QUOTE_HREF, projectsHref } from '$lib/nav';
	import type { Sector } from '$lib/content/types';

	/*
	 * Residential / Commercial / Institutional context. No counts; a sector
	 * links to its filtered portfolio only when it has projects, otherwise to
	 * a quote request — never to an empty gallery.
	 */
	let {
		sectors
	}: { sectors: { id: Sector; label: string; text: string; hasProjects: boolean }[] } = $props();
</script>

<section aria-labelledby="sectors" class="bg-ink section-y text-on-ink">
	<div class="container-page">
		<EditorialHeading
			id="sectors"
			tone="ink"
			eyebrow="Sectors"
			title="Shade for homes, businesses and institutions."
		/>

		<ul class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
			{#each sectors as sector (sector.id)}
				<li class="flex flex-col border-t border-primary/60 pt-6">
					<h3 class="text-2xl font-medium tracking-tight">{sector.label}</h3>
					<p class="mt-3 flex-1 leading-relaxed text-on-ink-muted">{sector.text}</p>
					<a
						href={sector.hasProjects ? projectsHref({ sector: sector.id }) : QUOTE_HREF}
						class="group mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-on-ink underline decoration-primary underline-offset-[6px] transition-colors hover:text-primary"
					>
						{sector.hasProjects ? `${sector.label} projects` : 'Discuss your project'}
						<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
