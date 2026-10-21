<script lang="ts">
	import { cn } from '$lib/utils';
	import type { EnquiryOption } from '$lib/enquiry';

	/*
	 * A set of native radio buttons drawn as selectable rows. Native radios keep
	 * arrow-key navigation, form posting without JavaScript and screen-reader
	 * semantics; the label carries the visible state.
	 */
	let {
		id,
		name,
		legend,
		options,
		hint,
		error,
		required = false,
		layout = 'list',
		columns = 2,
		value = $bindable('')
	}: {
		id: string;
		name: string;
		legend: string;
		options: readonly EnquiryOption[];
		hint?: string;
		error?: string;
		required?: boolean;
		/** `list`: rows, with hints from the small breakpoint up; `inline`: short labels in a wrapping row */
		layout?: 'list' | 'inline';
		/** Columns for the `list` layout from the small breakpoint up */
		columns?: 2 | 3;
		value?: string;
	} = $props();

	const describedBy = $derived(
		[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
	);
</script>

<!-- Hint and error are described on each radio, where screen readers announce them -->
<fieldset {id} class="scroll-mt-28">
	<legend class="text-base font-semibold">
		{legend}
		{#if !required}<span class="font-normal text-muted-foreground">(optional)</span>{/if}
	</legend>
	{#if hint}
		<p id="{id}-hint" class="mt-1 text-sm text-muted-foreground">{hint}</p>
	{/if}
	{#if error}
		<p id="{id}-error" class="mt-1 text-sm font-medium text-destructive">{error}</p>
	{/if}

	<div
		class={cn(
			'mt-3',
			layout === 'inline'
				? 'flex flex-wrap gap-2'
				: cn('grid gap-2', columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'),
			error && 'rounded-sm outline-1 outline-offset-4 outline-destructive'
		)}
	>
		{#each options as option (option.value)}
			<label
				class={cn(
					'flex cursor-pointer items-start gap-3 rounded-sm border border-foreground/15 bg-card transition-colors hover:border-foreground/40',
					'has-checked:border-foreground has-checked:bg-primary/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring',
					layout === 'list'
						? 'min-h-11 items-center px-3.5 py-2.5 sm:min-h-14 sm:items-start sm:p-3.5'
						: 'min-h-11 items-center px-4 py-2.5'
				)}
			>
				<input
					type="radio"
					{name}
					value={option.value}
					{required}
					bind:group={value}
					aria-describedby={describedBy}
					class="peer sr-only"
				/>
				<!-- Radio indicator: a ring that fills when chosen -->
				<span
					class={cn(
						'flex size-4 shrink-0 items-center justify-center rounded-full border border-foreground/40 peer-checked:border-foreground peer-checked:[&>span]:scale-100',
						layout === 'list' && 'sm:mt-0.5'
					)}
					aria-hidden="true"
				>
					<span class="size-2 scale-0 rounded-full bg-foreground transition-transform"></span>
				</span>
				<span class="min-w-0">
					<span class="block text-sm leading-snug font-semibold sm:text-base">{option.label}</span>
					{#if layout === 'list' && option.hint}
						<span class="mt-0.5 hidden text-sm text-muted-foreground sm:block">{option.hint}</span>
					{/if}
				</span>
			</label>
		{/each}
	</div>
</fieldset>
