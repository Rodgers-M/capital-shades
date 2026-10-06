<script lang="ts">
	import '@fontsource-variable/plus-jakarta-sans';
	import './layout.css';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import MobileActionBar from '$lib/components/layout/MobileActionBar.svelte';
	import FloatingWhatsApp from '$lib/components/layout/FloatingWhatsApp.svelte';
	import { SITE_URL } from '$lib/config';
	import { jsonLdTag } from '$lib/seo';

	let { data, children } = $props();

	const settings = $derived(data.settings);

	// Business details for Google (local search / knowledge panel). Only fields set
	// in settings are published — unconfirmed ones (address, areas) stay out.
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
		// One number only: publishing both conflicting numbers confuses Google
		telephone: `+${settings.primaryPhone.number}`,
		email: settings.email,
		...(settings.address && {
			address: { '@type': 'PostalAddress', streetAddress: settings.address, addressCountry: 'KE' }
		}),
		...(settings.googleMapsUrl && { hasMap: settings.googleMapsUrl }),
		...(settings.serviceAreas.length > 0 && {
			areaServed: settings.serviceAreas.map((name) => ({ '@type': 'Place', name }))
		}),
		sameAs: [settings.facebookUrl, settings.instagramUrl, settings.linkedinUrl].filter(Boolean)
	});
</script>

<svelte:head>
	<!-- Logo symbol on a white tile so it reads on light and dark tabs -->
	<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
	<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#171717" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialised JSON from our own data -->
	{@html jsonLdTag(organization)}
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-sm bg-primary px-4 py-2 font-bold text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
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
	<FloatingWhatsApp {settings} />
</div>
