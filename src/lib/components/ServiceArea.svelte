<script lang="ts">
	import { cn } from '$lib/utils';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Where the business works, from public settings only (`location`,
	 * `serviceAreas`). Nairobi-centred, not exclusive (docs/decisions.md), so
	 * other areas are mentioned as a possibility, never a blanket claim.
	 * Renders nothing until at least one of the two fields is set.
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
		{#if settings.location}
			<p class={cn('text-lg', onInk ? 'text-on-ink' : 'text-foreground')}>
				Based in {settings.location}.
			</p>
		{/if}
		{#if settings.serviceAreas.length}
			<p class={cn('mt-6 eyebrow', onInk ? 'text-on-ink-subtle' : 'text-muted-foreground')}>
				Areas served
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
			<p class={cn('mt-4 text-sm', onInk ? 'text-on-ink-muted' : 'text-muted-foreground')}>
				Projects elsewhere in Kenya may also be considered.
			</p>
		{/if}
	</div>
{/if}
