<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import SelectedProjects from '$lib/components/home/SelectedProjects.svelte';
	import FeaturedSolutions from '$lib/components/home/FeaturedSolutions.svelte';
	import SolutionGuide from '$lib/components/solutions/SolutionGuide.svelte';
	import SectorContext from '$lib/components/home/SectorContext.svelte';
	import FeaturedProject from '$lib/components/home/FeaturedProject.svelte';
	import ProcessStrip from '$lib/components/ProcessStrip.svelte';
	import QuoteCta from '$lib/components/QuoteCta.svelte';

	let { data } = $props();
</script>

<!--
	Home page: a routing and credibility layer (docs/design-direction.md).
	Hero → project proof → featured solutions → cover guidance → sectors →
	one project story → how we work → quote. Detail lives on /solutions,
	/projects and /about.
-->

<Seo description={data.settings.description} image={data.hero?.heroImage} />

<HeroSection settings={data.settings} project={data.hero} solutions={data.solutions} />

<SelectedProjects projects={data.selectedProjects} solutions={data.solutions} />

<FeaturedSolutions solutions={data.featuredSolutions} />

<SolutionGuide />

<SectorContext sectors={data.sectors} />

{#if data.featuredProject}
	<FeaturedProject project={data.featuredProject} solutions={data.solutions} />
{/if}

<ProcessStrip />

<QuoteCta settings={data.settings} image={data.closingImage} />
