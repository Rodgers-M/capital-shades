<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Select } from 'bits-ui';
	import { CheckIcon, ChevronDownIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { EnquiryOption } from '$lib/enquiry';

	/*
	 * A single choice from a long list, as a dropdown that shows each option's
	 * hint. Server-rendered as a native <select> so the form still posts without
	 * JavaScript; swapped for the styled listbox once mounted. Only one of the
	 * two renders, because the listbox's hidden input would post a second,
	 * empty value under the same name.
	 */
	let {
		id,
		name,
		label,
		options,
		placeholder = 'Choose one',
		hint,
		error,
		required = false,
		value = $bindable('')
	}: {
		id: string;
		name: string;
		label: string;
		options: readonly EnquiryOption[];
		placeholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		value?: string;
	} = $props();

	let mounted = $state(false);
	let native = $state<HTMLSelectElement>();

	// Carry over a choice or focus made in the native select before JavaScript loaded.
	// The select isn't bound: binding would reset it to `value` on hydration first.
	onMount(async () => {
		const hadFocus = native !== undefined && document.activeElement === native;
		if (native?.value) value = native.value;
		mounted = true;
		if (!hadFocus) return;
		await tick();
		document.getElementById(id)?.focus();
	});

	// bits-ui types `items` as mutable
	const items = $derived([...options]);
	const selected = $derived(options.find((o) => o.value === value));
	const describedBy = $derived(
		[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
	);
	const control = $derived(
		cn(
			'flex min-h-14 w-full scroll-mt-28 items-center gap-3 rounded-md border bg-card py-2 pr-3 pl-3.5 text-left text-base text-foreground transition-colors hover:border-foreground/40',
			'focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/40',
			error ? 'border-destructive' : 'border-input'
		)
	);
</script>

<div class="space-y-1.5">
	<label id="{id}-label" for={id} class="block text-base font-semibold">
		{label}
		{#if !required}<span class="font-normal text-muted-foreground">(optional)</span>{/if}
	</label>
	{#if hint}
		<p id="{id}-hint" class="text-sm text-muted-foreground">{hint}</p>
	{/if}

	{#if mounted}
		<Select.Root type="single" {name} {required} {items} bind:value>
			<Select.Trigger
				{id}
				aria-labelledby="{id}-label {id}-value"
				aria-describedby={describedBy}
				aria-invalid={error ? true : undefined}
				class={cn(control, 'data-[state=open]:border-foreground')}
			>
				<span id="{id}-value" class="min-w-0 flex-1">
					{#if selected}
						<span class="block leading-snug font-semibold">{selected.label}</span>
						{#if selected.hint}
							<span class="block text-sm text-muted-foreground">{selected.hint}</span>
						{/if}
					{:else}
						<span class="text-muted-foreground">{placeholder}</span>
					{/if}
				</span>
				<ChevronDownIcon class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					sideOffset={6}
					collisionPadding={16}
					class="z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) overflow-y-auto rounded-md border border-border bg-card p-1 shadow-xl outline-none data-[state=open]:animate-fade-in motion-reduce:animate-none"
				>
					<Select.Viewport>
						{#each options as option (option.value)}
							<Select.Item
								value={option.value}
								label={option.label}
								class="flex min-h-12 cursor-pointer items-start gap-3 rounded-sm px-3 py-2.5 outline-none select-none data-highlighted:bg-muted data-selected:bg-primary/10"
							>
								{#snippet children({ selected: isSelected })}
									<span class="min-w-0 flex-1">
										<span class="block text-sm leading-snug font-semibold sm:text-base">
											{option.label}
										</span>
										{#if option.hint}
											<span class="mt-0.5 block text-sm text-muted-foreground">{option.hint}</span>
										{/if}
									</span>
									<CheckIcon
										class={cn('mt-0.5 size-4 shrink-0', !isSelected && 'invisible')}
										aria-hidden="true"
									/>
								{/snippet}
							</Select.Item>
						{/each}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	{:else}
		<div class="relative">
			<select
				{id}
				{name}
				{required}
				bind:this={native}
				onchange={(event) => (value = event.currentTarget.value)}
				aria-describedby={describedBy}
				aria-invalid={error ? true : undefined}
				class={cn(control, 'appearance-none pr-11')}
			>
				<option value="">{placeholder}</option>
				{#each options as option (option.value)}
					<option value={option.value} selected={option.value === value}>
						{option.label}{option.hint ? ` — ${option.hint}` : ''}
					</option>
				{/each}
			</select>
			<ChevronDownIcon
				class="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-muted-foreground"
				aria-hidden="true"
			/>
		</div>
	{/if}

	{#if error}
		<p id="{id}-error" class="text-sm font-medium text-destructive">{error}</p>
	{/if}
</div>
