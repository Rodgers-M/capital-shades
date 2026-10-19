<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import WhyCapitalShades from '$lib/components/home/WhyCapitalShades.svelte';
	import FeaturedSolutions from '$lib/components/home/FeaturedSolutions.svelte';
	import SelectedProjects from '$lib/components/home/SelectedProjects.svelte';
	import SectorContext from '$lib/components/home/SectorContext.svelte';
	import ProcessStrip from '$lib/components/ProcessStrip.svelte';
	import QuoteCta from '$lib/components/QuoteCta.svelte';

	let { data } = $props();
</script>

<!--
	Home page: introduction, trust, proof, routing and conversion
	(docs/implementation.md, Phase C5.5). Each section answers one visitor
	question: what and where → why us → what we build → how it works → real
	work → is it for me → start now. Detail lives on /solutions, /projects and /about.
-->

<Seo description={data.settings.description} image={data.hero?.heroImage} />

<HeroSection settings={data.settings} project={data.hero} solutions={data.solutions} />

<WhyCapitalShades settings={data.settings} />

<FeaturedSolutions settings={data.settings} solutions={data.featuredSolutions} />

<ProcessStrip />

<SelectedProjects
	projects={data.selectedProjects}
	solutions={data.solutions}
	title="Selected work"
	rail
/>

<SectorContext sectors={data.sectors} compact />

<QuoteCta
	settings={data.settings}
	image={data.closingImage}
	title="Tell us about your project."
	compact
	text="Rough dimensions and a few site photos are enough to start. Your final quotation follows a site visit and confirmed measurements."
/>
