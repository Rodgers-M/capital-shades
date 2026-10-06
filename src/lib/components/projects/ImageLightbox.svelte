<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import type { Img } from '$lib/content/types';

	/*
	 * Full-screen photo viewer. A dialog (focus trapped, Escape closes), with
	 * previous/next buttons and the arrow keys. `index` is null when closed.
	 */
	let {
		images,
		title,
		index = $bindable(null)
	}: { images: Img[]; title: string; index?: number | null } = $props();

	const current = $derived(index === null ? null : images[index]);

	function step(delta: number) {
		if (index === null) return;
		index = (index + delta + images.length) % images.length;
	}
</script>

<Dialog.Root
	open={index !== null}
	onOpenChange={(open) => {
		if (!open) index = null;
	}}
>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-ink/95 data-[state=open]:animate-fade-in" />
		<Dialog.Content
			class="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 text-on-ink outline-none md:p-12"
			onkeydown={(e) => {
				if (e.key === 'ArrowRight') step(1);
				if (e.key === 'ArrowLeft') step(-1);
			}}
		>
			{#if current}
				<Dialog.Title class="sr-only">{title}</Dialog.Title>
				<Picture
					image={current}
					sizes="100vw"
					loading="eager"
					class="max-h-[80dvh] w-auto max-w-full rounded-sm object-contain"
				/>
				<p class="mt-4 text-sm text-on-ink-subtle" aria-live="polite">
					{title} — photo {(index ?? 0) + 1} of {images.length}
				</p>
				{#if images.length > 1}
					<button
						type="button"
						onclick={() => step(-1)}
						class="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-sm bg-on-ink/10 hover:bg-on-ink/20 md:left-6"
						aria-label="Previous photo"
					>
						<ChevronLeftIcon class="size-6" />
					</button>
					<button
						type="button"
						onclick={() => step(1)}
						class="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-sm bg-on-ink/10 hover:bg-on-ink/20 md:right-6"
						aria-label="Next photo"
					>
						<ChevronRightIcon class="size-6" />
					</button>
				{/if}
			{/if}
			<Dialog.Close
				class="absolute top-4 right-4 flex size-11 items-center justify-center rounded-sm bg-on-ink/10 hover:bg-on-ink/20"
				aria-label="Close"
			>
				<XIcon class="size-5" />
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
