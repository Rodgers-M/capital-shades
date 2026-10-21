<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		id,
		name,
		label,
		type = 'text',
		required = false,
		placeholder,
		autocomplete,
		inputmode,
		hint,
		error,
		multiline = false,
		rows = 5,
		value = $bindable(''),
		input = $bindable()
	}: {
		id: string;
		name: string;
		label: string;
		type?: 'text' | 'tel' | 'email';
		required?: boolean;
		placeholder?: string;
		autocomplete?: import('svelte/elements').FullAutoFill;
		inputmode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'email';
		/** Helper text under the label */
		hint?: string;
		error?: string;
		multiline?: boolean;
		rows?: number;
		value?: string;
		/** The input/textarea element, e.g. to focus it */
		input?: HTMLElement;
	} = $props();

	const describedBy = $derived(
		[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
	);

	const control = $derived(
		cn(
			'w-full rounded-md border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40',
			error ? 'border-destructive' : 'border-input'
		)
	);
</script>

<div class="space-y-1.5">
	<label for={id} class="block text-sm font-semibold">
		{label}
		{#if !required}<span class="font-normal text-muted-foreground">(optional)</span>{/if}
	</label>
	{#if hint}
		<p id="{id}-hint" class="text-sm text-muted-foreground">{hint}</p>
	{/if}
	{#if multiline}
		<textarea
			{id}
			{name}
			{required}
			{placeholder}
			{rows}
			bind:value
			bind:this={input}
			aria-invalid={error ? true : undefined}
			aria-describedby={describedBy}
			class={cn(control, 'py-2.5')}></textarea>
	{:else}
		<input
			{id}
			{name}
			{type}
			{required}
			{placeholder}
			{autocomplete}
			{inputmode}
			bind:value
			bind:this={input}
			aria-invalid={error ? true : undefined}
			aria-describedby={describedBy}
			class={cn(control, 'h-11')}
		/>
	{/if}
	{#if error}
		<p id="{id}-error" class="text-sm font-medium text-destructive">{error}</p>
	{/if}
</div>
