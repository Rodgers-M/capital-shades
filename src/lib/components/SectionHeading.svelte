<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		eyebrow,
		title,
		description,
		align = 'left',
		tone = 'light',
		level = 2,
		action,
		class: className
	}: {
		eyebrow?: string;
		title: string | Snippet;
		description?: string;
		align?: 'left' | 'center';
		/** `ink` for use on dark navy sections */
		tone?: 'light' | 'ink';
		level?: 1 | 2;
		action?: Snippet;
		class?: string;
	} = $props();

	const onInk = $derived(tone === 'ink');
</script>

<div
	class={cn(
		'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
		align === 'center' && 'items-center text-center md:flex-col md:items-center',
		className
	)}
>
	<div class={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
		{#if eyebrow}
			<p
				class={cn(
					'inline-flex items-center gap-2 eyebrow',
					onInk ? 'text-primary' : 'text-accent-strong'
				)}
			>
				<span class="h-[2px] w-6 bg-primary"></span>
				{eyebrow}
			</p>
		{/if}
		<svelte:element
			this={level === 1 ? 'h1' : 'h2'}
			class={cn(
				'mt-3 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance md:text-4xl',
				onInk ? 'text-on-ink' : 'text-foreground'
			)}
		>
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</svelte:element>
		{#if description}
			<p
				class={cn(
					'mt-3 text-base leading-relaxed md:text-lg',
					onInk ? 'text-on-ink-subtle' : 'text-muted-foreground'
				)}
			>
				{description}
			</p>
		{/if}
	</div>
	{@render action?.()}
</div>
