<script lang="ts">
	import { ChevronLeftIcon, ChevronRightIcon, LayersIcon, MapPinIcon, XIcon } from '@lucide/svelte';
	import { Dialog } from 'bits-ui';
	import Picture from '$lib/components/Picture.svelte';
	import { cn } from '$lib/utils';
	import type { Product, Project, Sector } from '$lib/content/types';

	let {
		projects,
		products,
		limit,
		showFilters = true,
		tone = 'light'
	}: {
		projects: Project[];
		products: Product[];
		limit?: number;
		showFilters?: boolean;
		tone?: 'light' | 'ink';
	} = $props();

	const SECTOR_LABELS: Record<Sector, string> = {
		residential: 'Residential',
		commercial: 'Commercial',
		institutional: 'Schools & institutions'
	};

	const productTitle = (slug: string) => products.find((p) => p.slug === slug)?.title ?? '';

	type Filter = { id: string; label: string; match: (p: Project) => boolean };

	const filters = $derived.by((): Filter[] => {
		const usedProducts = products.filter((prod) => projects.some((p) => p.product === prod.slug));
		const usedSectors = (Object.keys(SECTOR_LABELS) as Sector[]).filter((s) =>
			projects.some((p) => p.sector === s)
		);
		return [
			{ id: 'all', label: 'All projects', match: () => true },
			...usedProducts.map((prod) => ({
				id: prod.slug,
				label: prod.title,
				match: (p: Project) => p.product === prod.slug
			})),
			...usedSectors.map((s) => ({
				id: s,
				label: SECTOR_LABELS[s],
				match: (p: Project) => p.sector === s
			}))
		];
	});

	let active = $state('all');
	let viewing = $state<number | null>(null);

	const visible = $derived.by(() => {
		const filter = filters.find((f) => f.id === active) ?? filters[0];
		const list = projects.filter(filter.match);
		return limit ? list.slice(0, limit) : list;
	});

	const current = $derived(viewing === null ? null : visible[viewing]);

	function step(delta: number) {
		if (viewing === null) return;
		viewing = (viewing + delta + visible.length) % visible.length;
	}
</script>

{#if showFilters}
	<div class="-mx-4 mb-6 [scrollbar-width:none] overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
		<div class="flex w-max gap-2" role="group" aria-label="Filter projects">
			{#each filters as filter (filter.id)}
				{@const isActive = active === filter.id}
				<button
					type="button"
					aria-pressed={isActive}
					onclick={() => (active = filter.id)}
					class={cn(
						'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors',
						isActive
							? 'border-ink bg-ink text-on-ink'
							: 'bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground'
					)}
				>
					{filter.label}
					<span
						class={cn(
							'rounded-full px-1.5 text-[11px] font-bold',
							isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
						)}
					>
						{projects.filter(filter.match).length}
					</span>
				</button>
			{/each}
		</div>
	</div>
{/if}

<ul class="columns-1 gap-4 sm:columns-2 lg:columns-3" aria-live="polite">
	{#each visible as project, i (project.slug)}
		<li class="mb-4 break-inside-avoid">
			<button
				type="button"
				onclick={() => (viewing = i)}
				class={cn(
					'group relative block w-full overflow-hidden rounded-2xl bg-ink text-left text-on-ink',
					tone === 'ink' && 'ring-1 ring-on-ink/10'
				)}
				aria-label="View photo: {project.title}"
			>
				<Picture
					image={project.image}
					sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
					class="h-auto w-full transition-transform duration-700 group-hover:scale-105"
				/>
				<span
					class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-4 pt-16"
				>
					<span class="block text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
						{productTitle(project.product)} · {SECTOR_LABELS[project.sector]}
					</span>
					<span class="mt-1 block text-lg leading-snug font-extrabold">{project.title}</span>
					{#if project.location || project.material}
						<span class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-ink-muted">
							{#if project.location}
								<span class="inline-flex items-center gap-1.5">
									<MapPinIcon class="size-3.5 text-primary" />
									{project.location}
								</span>
							{/if}
							{#if project.material}
								<span class="inline-flex items-center gap-1.5">
									<LayersIcon class="size-3.5 text-primary" />
									{project.material}
								</span>
							{/if}
						</span>
					{/if}
				</span>
			</button>
		</li>
	{/each}
</ul>

{#if visible.length === 0}
	<p class="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
		No projects in this category yet.
	</p>
{/if}

<Dialog.Root
	open={viewing !== null}
	onOpenChange={(open) => {
		if (!open) viewing = null;
	}}
>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-ink/95 data-[state=open]:animate-fade-in" />
		<Dialog.Content
			class="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 text-on-ink outline-none md:p-10"
			onkeydown={(e) => {
				if (e.key === 'ArrowRight') step(1);
				if (e.key === 'ArrowLeft') step(-1);
			}}
		>
			{#if current}
				<Dialog.Title class="sr-only">{current.title}</Dialog.Title>
				<Picture
					image={current.image}
					sizes="100vw"
					loading="eager"
					class="max-h-[80dvh] w-auto max-w-full rounded-xl object-contain"
				/>
				<div class="mt-4 text-center">
					<p class="font-bold">{current.title}</p>
					<p class="text-sm text-on-ink-subtle">
						{productTitle(current.product)} · {(viewing ?? 0) + 1} of {visible.length}
					</p>
				</div>
				{#if visible.length > 1}
					<button
						type="button"
						onclick={() => step(-1)}
						class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-on-ink/10 p-3 hover:bg-on-ink/20 md:left-6"
						aria-label="Previous photo"
					>
						<ChevronLeftIcon class="size-6" />
					</button>
					<button
						type="button"
						onclick={() => step(1)}
						class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-on-ink/10 p-3 hover:bg-on-ink/20 md:right-6"
						aria-label="Next photo"
					>
						<ChevronRightIcon class="size-6" />
					</button>
				{/if}
			{/if}
			<Dialog.Close
				class="absolute top-4 right-4 rounded-full bg-on-ink/10 p-2.5 hover:bg-on-ink/20"
				aria-label="Close"
			>
				<XIcon class="size-5" />
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
