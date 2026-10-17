<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowLeftIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { cn } from '$lib/utils';

	/**
	 * Back on the left (JavaScript only, as steps can't be hidden without it),
	 * the step's main action on the right.
	 */
	let {
		onback,
		class: className,
		children
	}: { onback?: () => void; class?: string; children: Snippet } = $props();
</script>

<div
	class={cn(
		'mt-10 flex flex-col-reverse gap-3 border-t border-foreground/15 pt-6 sm:flex-row sm:items-center sm:justify-between',
		className
	)}
>
	{#if onback}
		<Button type="button" variant="ghost" class="quote-js" onclick={onback}>
			<ArrowLeftIcon /> Back
		</Button>
	{:else}
		<span class="hidden sm:block"></span>
	{/if}
	{@render children()}
</div>
