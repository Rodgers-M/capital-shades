<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import QuoteCta from '$lib/components/QuoteCta.svelte';
	import SolutionHero from '$lib/components/solutions/SolutionHero.svelte';
	import SolutionDetails from '$lib/components/solutions/SolutionDetails.svelte';
	import RelatedProjects from '$lib/components/solutions/RelatedProjects.svelte';
	import SolutionIndexList from '$lib/components/solutions/SolutionIndexList.svelte';
	import { SITE_URL } from '$lib/config';
	import { SOLUTIONS_HREF } from '$lib/nav';

	/*
	 * Reusable solution template: hero → overview & verified lists → related
	 * projects → other solutions → quote. Sections without content are omitted.
	 */
	let { data } = $props();
	const solution = $derived(data.solution);
	const settings = $derived(data.settings);
</script>

<Seo
	title="{solution.title} in Kenya"
	description={solution.summary}
	image={solution.image}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: solution.title,
		description: solution.summary,
		serviceType: solution.title,
		// Only owner-confirmed areas (none yet), never an assumed region
		...(settings.serviceAreas.length > 0 && {
			areaServed: settings.serviceAreas.map((name) => ({ '@type': 'Place', name }))
		}),
		provider: { '@id': `${SITE_URL}/#business` }
	}}
/>

<SolutionHero {settings} {solution} />

<SolutionDetails {solution} />

{#if data.projects.length}
	<RelatedProjects
		projects={data.projects}
		solutionTitle={solution.title}
		galleryHref="/projects?filter={solution.slug}"
	/>
{/if}

<section aria-labelledby="other-solutions" class="container-page section-y">
	<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
		<EditorialHeading
			id="other-solutions"
			eyebrow="Solutions"
			title="Other shade solutions"
			class="lg:col-span-5 lg:self-start"
		/>
		<div class="lg:col-span-7">
			<SolutionIndexList solutions={data.others} />
			<TextLink href={SOLUTIONS_HREF} class="mt-8">Compare all solutions</TextLink>
		</div>
	</div>
</section>

<div class="border-t">
	<QuoteCta {settings} image={data.closingImage} topic={solution.title} />
</div>
