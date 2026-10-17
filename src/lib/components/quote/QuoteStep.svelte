<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	/*
	 * One step of the quote flow: numbered heading, then the step's fields and
	 * navigation (children). Inactive steps are hidden with JavaScript; the noscript
	 * styles in QuoteFlow show them all when it is off.
	 */
	let {
		index,
		total,
		title,
		active,
		heading = $bindable(),
		children
	}: {
		index: number;
		total: number;
		title: string;
		active: boolean;
		/** The heading element, focused when the step opens */
		heading?: HTMLElement;
		children: Snippet;
	} = $props();

	const headingId = $derived(`q-step-${index + 1}`);
</script>

<section
	aria-labelledby={headingId}
	class={cn('quote-step data-inactive:hidden', index > 0 && 'mt-16')}
	data-inactive={!active || undefined}
>
	<p class="eyebrow text-primary-strong" aria-hidden="true">Step {index + 1} of {total}</p>
	<h2
		id={headingId}
		bind:this={heading}
		tabindex="-1"
		class="mt-3 text-2xl leading-tight font-medium tracking-tight outline-none sm:text-3xl"
	>
		<span class="sr-only">Step {index + 1} of {total}: </span>{title}
	</h2>
	<div class="mt-8">
		{@render children()}
	</div>
</section>
