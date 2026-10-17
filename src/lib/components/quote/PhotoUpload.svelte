<script lang="ts">
	import { onDestroy } from 'svelte';
	import { CameraIcon, ImageIcon, ImagePlusIcon, LoaderIcon, XIcon } from '@lucide/svelte';
	import { PHOTO_LIMITS } from '$lib/enquiry';
	import { cn } from '$lib/utils';
	import { isPhoto, preparePhoto, withinBudget, type SitePhoto } from './photos';

	/*
	 * Optional but prominent site-photo picker. Photos are downsized in the
	 * background as they are added, so choosing large phone photos never holds
	 * up the form. Without JavaScript the picker is hidden: full-size photos
	 * could push the post over the host's body limit and lose the enquiry.
	 */
	let { id, photos = $bindable([]) }: { id: string; photos?: SitePhoto[] } = $props();

	let nextId = 0;
	let announcement = $state('');
	let dragging = $state(false);
	let broken = $state<Record<number, boolean>>({});

	const full = $derived(photos.length >= PHOTO_LIMITS.count);
	const over = $derived(new Set(withinBudget(photos).over.map((p) => p.id)));

	function add(files: FileList | File[] | null | undefined) {
		const room = PHOTO_LIMITS.count - photos.length;
		const all = Array.from(files ?? []);
		const chosen = all.filter(isPhoto);
		const accepted = chosen.slice(0, Math.max(0, room));
		for (const file of accepted) {
			const photo: SitePhoto = { id: nextId++, blob: null, preview: null, status: 'preparing' };
			photos.push(photo);
			preparePhoto(file)
				.then((blob) =>
					update(photo.id, { blob, preview: URL.createObjectURL(blob), status: 'ready' })
				)
				.catch(() => update(photo.id, { status: 'failed' }));
		}
		const skipped = chosen.length - accepted.length;
		const unsupported = all.length - chosen.length;
		announcement = [
			accepted.length && `${accepted.length} photo${accepted.length === 1 ? '' : 's'} added.`,
			skipped && `${skipped} not added — the limit is ${PHOTO_LIMITS.count} photos.`,
			unsupported && `${unsupported} not added — not a photo file.`
		]
			.filter(Boolean)
			.join(' ');
	}

	function update(photoId: number, changes: Partial<SitePhoto>) {
		const photo = photos.find((p) => p.id === photoId);
		// Removed while it was being prepared
		if (!photo) {
			if (changes.preview) URL.revokeObjectURL(changes.preview);
			return;
		}
		Object.assign(photo, changes);
	}

	function remove(photo: SitePhoto, position: number) {
		if (photo.preview) URL.revokeObjectURL(photo.preview);
		photos = photos.filter((p) => p.id !== photo.id);
		announcement = `Photo ${position} removed.`;
	}

	onDestroy(() => photos.forEach((p) => p.preview && URL.revokeObjectURL(p.preview)));
</script>

<section
	aria-labelledby="{id}-title"
	class={cn(
		'border border-primary/60 bg-card p-5 transition-colors sm:p-6',
		dragging && 'border-foreground bg-primary/10'
	)}
	ondragover={(event) => {
		event.preventDefault();
		dragging = !full;
	}}
	ondragleave={() => (dragging = false)}
	ondrop={(event) => {
		event.preventDefault();
		dragging = false;
		if (!full) add(event.dataTransfer?.files);
	}}
>
	<div class="flex items-start gap-4">
		<span
			class="hidden size-11 shrink-0 items-center justify-center rounded-sm bg-primary/15 text-primary-strong sm:flex"
			aria-hidden="true"
		>
			<CameraIcon class="size-5" />
		</span>
		<div class="min-w-0">
			<p class="eyebrow text-primary-strong">Recommended</p>
			<h3 id="{id}-title" class="mt-1.5 text-lg font-medium tracking-tight sm:text-xl">
				Add photos of the site
				<span class="text-base font-normal text-muted-foreground">(optional)</span>
			</h3>
			<p id="{id}-hint" class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
				Photos help the team understand the space and may help us prepare an initial estimate before
				the site visit. Up to {PHOTO_LIMITS.count} photos.
			</p>
		</div>
	</div>

	<div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
		<input
			{id}
			type="file"
			name="photos"
			accept={PHOTO_LIMITS.accept}
			multiple
			disabled={full}
			aria-describedby="{id}-hint"
			class="quote-js peer sr-only"
			onchange={(event) => {
				add(event.currentTarget.files);
				// Clear so the same photo can be chosen again after removing it
				event.currentTarget.value = '';
			}}
		/>
		<label
			for={id}
			class={cn(
				'quote-js inline-flex h-12 cursor-pointer items-center gap-2 rounded-sm bg-ink px-5 text-sm font-semibold tracking-wide text-on-ink transition-colors hover:bg-ink-raised',
				'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring',
				'peer-disabled:cursor-not-allowed peer-disabled:opacity-40'
			)}
		>
			<ImagePlusIcon class="size-4" aria-hidden="true" />
			{full ? 'Photo limit reached' : photos.length ? 'Add more photos' : 'Choose photos'}
		</label>
		<span class="quote-js hidden text-sm text-muted-foreground md:inline">or drag them here</span>
	</div>

	{#if photos.length}
		<ul class="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Selected site photos">
			{#each photos as photo, i (photo.id)}
				{@const position = i + 1}
				<li class="relative">
					<div
						class="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground"
					>
						{#if photo.status === 'preparing'}
							<LoaderIcon
								class="size-5 animate-spin motion-reduce:animate-none"
								aria-hidden="true"
							/>
							<span class="sr-only">Photo {position}: preparing</span>
						{:else if photo.status === 'failed'}
							<span class="px-1.5 text-center text-xs leading-tight text-destructive">
								Can’t use this photo
							</span>
						{:else if photo.preview && !broken[photo.id]}
							<img
								src={photo.preview}
								alt="Site photo {position}"
								class={cn('size-full object-cover', over.has(photo.id) && 'opacity-40')}
								onerror={() => (broken[photo.id] = true)}
							/>
						{:else}
							<ImageIcon class="size-5" aria-hidden="true" />
							<span class="sr-only">Site photo {position}</span>
						{/if}
					</div>
					{#if over.has(photo.id)}
						<p class="mt-1 text-xs leading-tight text-destructive">Too large to send</p>
					{/if}
					<button
						type="button"
						onclick={() => remove(photo, position)}
						aria-label="Remove site photo {position}"
						class="absolute top-1 right-1 flex size-8 items-center justify-center rounded-sm bg-ink/80 text-on-ink transition-colors hover:bg-ink"
					>
						<XIcon class="size-4" aria-hidden="true" />
					</button>
				</li>
			{/each}
		</ul>
		{#if over.size}
			<p class="mt-3 text-sm text-muted-foreground">
				Some photos won’t fit in one request. Remove a few, or send them on WhatsApp after you
				submit.
			</p>
		{/if}
	{/if}

	<p class="mt-3 text-sm text-muted-foreground empty:hidden" role="status">{announcement}</p>
	<p class="quote-reveal mt-4 hidden text-sm font-medium">
		Send your photos to us on WhatsApp after submitting this form.
	</p>
</section>
