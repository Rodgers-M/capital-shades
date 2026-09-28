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
		error,
		multiline = false,
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
		error?: string;
		multiline?: boolean;
		value?: string;
		/** The input/textarea element, e.g. to focus it */
		input?: HTMLElement;
	} = $props();

	const control = $derived(
		cn(
			'w-full rounded-md border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40',
			error ? 'border-accent-strong' : 'border-input'
		)
	);
</script>

<div class="space-y-1.5">
	<label for={id} class="block text-sm font-semibold">
		{label}
		{#if !required}<span class="font-normal text-muted-foreground">(optional)</span>{/if}
	</label>
	{#if multiline}
		<textarea
			{id}
			{name}
			{required}
			{placeholder}
			rows="5"
			bind:value
			bind:this={input}
			aria-invalid={error ? true : undefined}
			aria-describedby={error ? `${id}-error` : undefined}
			class={cn(control, 'py-2.5')}></textarea>
	{:else}
		<input
			{id}
			{name}
			{type}
			{required}
			{placeholder}
			{autocomplete}
			bind:value
			bind:this={input}
			aria-invalid={error ? true : undefined}
			aria-describedby={error ? `${id}-error` : undefined}
			class={cn(control, 'h-11')}
		/>
	{/if}
	{#if error}
		<p id="{id}-error" class="text-sm font-medium text-accent-strong">{error}</p>
	{/if}
</div>
