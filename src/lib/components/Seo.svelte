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
		noindex = false,
		jsonLd
	}: {
		/** Page title without the site name; omit on the home page */
		title?: string;
		description: string;
		image?: Img;
		type?: 'website' | 'article';
		/** Utility pages with no search value (thank-you); they still get a canonical */
		noindex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	} = $props();

	const fullTitle = $derived(
		title
			? `${title} | Capital Shades`
			: 'Capital Shades | Car Parking Shades & Shade Structures, Nairobi'
	);
	// The path only: filtered views such as /projects?solution=… canonicalise to the page itself
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);
	const schemas = $derived(jsonLd ? [jsonLd].flat() : []);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content="Capital Shades" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="en_KE" />
	{#if image}
		<meta property="og:image" content={new URL(image.src, SITE_URL).href} />
		{#if image.alt}
			<meta property="og:image:alt" content={image.alt} />
		{/if}
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	{#each schemas as schema, i (i)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialised JSON from our own data -->
		{@html jsonLdTag(schema)}
	{/each}
</svelte:head>
