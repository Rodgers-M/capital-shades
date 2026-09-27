<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from 'bits-ui';
	import { XIcon } from '@lucide/svelte';

	let {
		open = $bindable(false),
		title,
		description,
		onOpenChange,
		children
	}: {
		open?: boolean;
		title: string;
		description?: string;
		onOpenChange?: (open: boolean) => void;
		children: Snippet;
	} = $props();
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Dialog.Content
			class="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl data-[state=closed]:animate-fade-out data-[state=open]:animate-pop-in"
		>
			<Dialog.Title class="pr-8 text-xl font-extrabold">{title}</Dialog.Title>
			{#if description}
				<Dialog.Description class="mt-1.5 text-sm text-muted-foreground">
					{description}
				</Dialog.Description>
			{/if}
			<div class="mt-5">{@render children()}</div>
			<Dialog.Close
				class="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
				aria-label="Close"
			>
				<XIcon class="size-5" />
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
