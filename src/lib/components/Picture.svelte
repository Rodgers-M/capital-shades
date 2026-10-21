<script lang="ts">
	import type { Img } from '$lib/content/types';

	let {
		image,
		sizes = '100vw',
		class: className,
		loading = 'lazy',
		fetchpriority,
		alt
	}: {
		image: Img;
		sizes?: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
		/** Override the image's own alt text, e.g. '' when purely decorative */
		alt?: string;
	} = $props();
</script>

<picture>
	{#each image.sources ?? [] as source (source.type)}
		<source type={source.type} srcset={source.srcset} {sizes} />
	{/each}
	<img
		src={image.src}
		srcset={image.srcset}
		{sizes}
		width={image.width}
		height={image.height}
		alt={alt ?? image.alt}
		{loading}
		{fetchpriority}
		decoding="async"
		class={className}
	/>
</picture>
