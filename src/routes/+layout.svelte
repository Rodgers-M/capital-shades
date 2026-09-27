<script lang="ts">
	import '@fontsource-variable/plus-jakarta-sans';
	import './layout.css';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import MobileActionBar from '$lib/components/layout/MobileActionBar.svelte';
	import { SITE_URL } from '$lib/config';
	import { jsonLdTag } from '$lib/seo';

	let { data, children } = $props();

	const settings = $derived(data.settings);

	// Business details for Google (local search / knowledge panel)
	const organization = $derived({
		'@context': 'https://schema.org',
		'@type': 'HomeAndConstructionBusiness',
		'@id': `${SITE_URL}/#business`,
		name: settings.name,
		legalName: settings.legalName,
		description: settings.description,
		slogan: settings.tagline,
		url: SITE_URL,
		logo: `${SITE_URL}/logo.png`,
		telephone: settings.phones.map((p) => `+${p.number}`),
		email: settings.email,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Nairobi',
			addressCountry: 'KE'
		},
		areaServed: { '@type': 'Country', name: 'Kenya' },
		sameAs: [settings.facebookUrl]
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<meta name="theme-color" content="#0f172a" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialised JSON from our own data -->
	{@html jsonLdTag(organization)}
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
>
	Skip to content
</a>

<div class="flex min-h-dvh flex-col">
	<SiteHeader {settings} />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<SiteFooter {settings} products={data.products} />
	<MobileActionBar {settings} />
</div>
