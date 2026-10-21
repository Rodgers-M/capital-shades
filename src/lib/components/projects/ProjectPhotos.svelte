<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import ImageLightbox from './ImageLightbox.svelte';
	import type { Img } from '$lib/content/types';

	// Additional project photos (never the hero). Each opens the full-screen viewer.
	let { images, title }: { images: Img[]; title: string } = $props();

	let viewing = $state<number | null>(null);
</script>

<section aria-labelledby="project-photos" class="container-page section-y">
	<EditorialHeading id="project-photos" eyebrow="Gallery" title="More photos" />
	<ul class="mt-10 gap-x-6 sm:columns-2 lg:columns-3">
		{#each images as image, i (image.src)}
			<li class="mb-6 break-inside-avoid">
				<button
					type="button"
					onclick={() => (viewing = i)}
					class="group block w-full overflow-hidden rounded-sm"
					aria-label="Open photo {i + 1} of {images.length}: {image.alt || title}"
				>
					<Picture
						{image}
						sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
						class="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
					/>
				</button>
			</li>
		{/each}
	</ul>
</section>

<ImageLightbox {images} {title} bind:index={viewing} />
