<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/config';
	import { jsonLdTag } from '$lib/seo';
	import type { Img } from '$lib/content/types';

	let {
		title,
		description,
		image,
		type = 'website',
		jsonLd
	}: {
		/** Page title without the site name; omit on the home page */
		title?: string;
		description: string;
		image?: Img;
		type?: 'website' | 'article';
		jsonLd?: Record<string, unknown>;
	} = $props();

	const fullTitle = $derived(
		title
			? `${title} | Capital Shades`
			: 'Capital Shades | Car Park Shades & Tensile Structures in Kenya'
	);
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
	const imageUrl = $derived(image ? new URL(image.src, SITE_URL).href : undefined);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content="Capital Shades" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="en_KE" />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	{#if jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialised JSON from our own data -->
		{@html jsonLdTag(jsonLd)}
	{/if}
</svelte:head>
