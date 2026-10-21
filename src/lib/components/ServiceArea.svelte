<script lang="ts">
	import { cn } from '$lib/utils';
	import { SERVICE_REACH } from '$lib/content/geography';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Where the business works (docs/decisions.md — "Geographic positioning"):
	 * the Nairobi base and broad reach, then the main local market from
	 * settings (`serviceAreas`). Renders nothing until one of the two is set.
	 */
	let {
		settings,
		tone = 'light',
		class: className
	}: {
		settings: Pick<PublicSiteSettings, 'location' | 'serviceAreas'>;
		tone?: 'light' | 'ink';
		class?: string;
	} = $props();

	const onInk = $derived(tone === 'ink');
</script>

{#if settings.location || settings.serviceAreas.length}
	<div class={className}>
		<!-- Always states the wider reach, so the block never reads as local-only -->
		<p class={cn('text-lg', onInk ? 'text-on-ink' : 'text-foreground')}>
			{settings.location ? `Based in ${settings.location}, serving` : 'Serving'} projects across
			{SERVICE_REACH}.
		</p>
		{#if settings.serviceAreas.length}
			<p class={cn('mt-6 eyebrow', onInk ? 'text-on-ink-subtle' : 'text-muted-foreground')}>
				Main service area
			</p>
			<ul class={cn('mt-3 border-t', onInk ? 'border-ink-border' : 'border-foreground/15')}>
				{#each settings.serviceAreas as area (area)}
					<li
						class={cn(
							'border-b py-3',
							onInk ? 'border-ink-border text-on-ink' : 'border-foreground/15'
						)}
					>
						{area}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}
