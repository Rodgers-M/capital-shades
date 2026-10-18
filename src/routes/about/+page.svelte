<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import ProcessSection from '$lib/components/ProcessSection.svelte';
	import ServiceArea from '$lib/components/ServiceArea.svelte';
	import QuoteCta from '$lib/components/QuoteCta.svelte';
	import SectorContext from '$lib/components/home/SectorContext.svelte';
	import SelectedProjects from '$lib/components/home/SelectedProjects.svelte';
	import SolutionIndexList from '$lib/components/solutions/SolutionIndexList.svelte';
	import { PROJECTS_HREF, SOLUTIONS_HREF } from '$lib/nav';

	/*
	 * About: who Capital Shades is, what it builds, for whom, how a project
	 * runs, where it works, and the proof. Factual and concise — no founding
	 * year, counts or team claims. Location wording comes from settings.
	 */
	let { data } = $props();
	const settings = $derived(data.settings);

	const positioning = $derived(
		`${settings.location ? `${settings.location}-based shade` : 'Shade'} and outdoor structures for homes, businesses and institutions.`
	);
	const solutionList = $derived(
		data.solutions.map((s, i, all) =>
			i === all.length - 1 && all.length > 1
				? `and ${s.title.toLowerCase()}`
				: s.title.toLowerCase()
		)
	);
</script>

<Seo
	title="About"
	description="{settings.name} designs and installs car park shades, shade sails, canopies and tensile membrane structures{settings.location
		? ` and is based in ${settings.location}`
		: ''}."
	image={data.heroImage}
/>

<section aria-labelledby="about-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-10 pb-12 md:pt-14 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"
	>
		<div class="lg:col-span-6 xl:col-span-5">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				About
			</p>
			<h1
				id="about-title"
				class="mt-6 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl"
			>
				About {settings.name}.
			</h1>
			<p class="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				{positioning}
			</p>
			{#if settings.tagline}
				<p class="mt-6 border-l-2 border-primary pl-4 text-muted-foreground italic">
					{settings.tagline}
				</p>
			{/if}
		</div>
		{#if data.heroImage}
			<div class="-mx-5 overflow-hidden sm:mx-0 sm:rounded-sm lg:col-span-6 xl:col-span-7">
				<Picture
					image={data.heroImage}
					loading="eager"
					fetchpriority="high"
					sizes="(min-width: 1280px) 760px, (min-width: 1024px) 50vw, 100vw"
					class="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
				/>
			</div>
		{/if}
	</div>
</section>

<section aria-labelledby="who-we-are" class="container-page section-y">
	<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
		<EditorialHeading
			id="who-we-are"
			eyebrow="Who we are"
			title="Design and installation of shade structures."
			class="lg:col-span-5 lg:self-start"
		/>
		<div class="space-y-5 text-lg leading-relaxed text-foreground/85 lg:col-span-7 lg:pt-16">
			<p>
				{settings.legalName} designs and installs shade and outdoor structures: {solutionList.join(
					', '
				)}.
			</p>
			<p>
				Projects range from single-car carports and garden shade to car parks and outdoor areas for
				businesses, with covers in shade mesh, waterproof PVC or metal roofing.
			</p>
			<div class="flex flex-wrap gap-x-8 gap-y-4 pt-3">
				<TextLink href={PROJECTS_HREF}>See projects</TextLink>
				<TextLink href={SOLUTIONS_HREF}>Explore solutions</TextLink>
			</div>
		</div>
	</div>
</section>

<section aria-labelledby="what-we-help-with" class="bg-muted section-y">
	<div class="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
		<EditorialHeading
			id="what-we-help-with"
			eyebrow="Solutions"
			title="What we help with."
			class="lg:col-span-5 lg:self-start"
		/>
		<div class="lg:col-span-7">
			<SolutionIndexList solutions={data.solutions} />
			<TextLink href={SOLUTIONS_HREF} class="mt-8">View all solutions</TextLink>
		</div>
	</div>
</section>

<SectorContext sectors={data.sectors} />

<ProcessSection image={data.processImage} />

{#if settings.location || settings.serviceAreas.length}
	<section aria-labelledby="service-area" class="border-t">
		<div class="container-page grid gap-10 section-y lg:grid-cols-12 lg:gap-16">
			<EditorialHeading
				id="service-area"
				eyebrow="Service area"
				title="Where we work."
				class="lg:col-span-5 lg:self-start"
			/>
			<ServiceArea {settings} class="lg:col-span-7 lg:pt-16" />
		</div>
	</section>
{/if}

<div class="border-t">
	<SelectedProjects projects={data.selectedProjects} solutions={data.solutions} />
</div>

<div class="border-t">
	<QuoteCta {settings} image={data.closingImage} />
</div>
