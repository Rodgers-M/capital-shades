<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	/*
	 * Section heading for the editorial layouts: a thin gold rule and small
	 * uppercase label, then a large medium-weight title. Gains impact through
	 * scale and spacing rather than weight (docs/design-direction.md).
	 */
	let {
		id,
		eyebrow,
		title,
		description,
		tone = 'light',
		action,
		compact = false,
		class: className
	}: {
		/** Lets the section use aria-labelledby */
		id?: string;
		eyebrow?: string;
		title: string;
		description?: string;
		/** `ink` on charcoal sections */
		tone?: 'light' | 'ink';
		action?: Snippet;
		/** Phones: no eyebrow, a smaller title and the action on the same row */
		compact?: boolean;
		class?: string;
	} = $props();

	const onInk = $derived(tone === 'ink');
</script>

<div
	class={cn(
		'flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10',
		compact && 'max-md:flex-row max-md:items-baseline max-md:justify-between max-md:gap-4',
		className
	)}
>
	<div class="max-w-3xl">
		{#if eyebrow}
			<p
				class={cn(
					'flex items-center gap-3 eyebrow',
					onInk ? 'text-primary' : 'text-primary-strong',
					compact && 'max-md:hidden'
				)}
			>
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				{eyebrow}
			</p>
		{/if}
		<h2
			{id}
			class={cn(
				'mt-5 text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl',
				compact && 'max-md:mt-0 max-md:text-2xl',
				onInk ? 'text-on-ink' : 'text-foreground'
			)}
		>
			{title}
		</h2>
		{#if description}
			<p
				class={cn(
					'mt-5 max-w-2xl text-base leading-relaxed md:text-lg',
					onInk ? 'text-on-ink-muted' : 'text-muted-foreground'
				)}
			>
				{description}
			</p>
		{/if}
	</div>
	{@render action?.()}
</div>
