<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import ProductCards from '$lib/components/ProductCards.svelte';
	import ProjectRow from '$lib/components/projects/ProjectRow.svelte';
	import ReviewsBand from '$lib/components/ReviewsBand.svelte';
	import QuoteEstimator from '$lib/components/forms/QuoteEstimator.svelte';
	import ProcessStrip from '$lib/components/ProcessStrip.svelte';

	let { data } = $props();
</script>

<!--
	Home page: one job per section — what we do → real work → people recommend us
	→ ask for an assessment. Detail lives on /products, /projects and /about.
-->

<Seo description={data.settings.description} image={data.heroImage} />

<HeroSection settings={data.settings} image={data.heroImage} latest={data.latestProject} />

<section class="container-page section-y">
	<SectionHeading
		eyebrow="What we build"
		title="Shade solutions for every space."
		description="Regardless of how large, small or irregularly shaped your space is, we can build a shade solution for it."
	>
		{#snippet action()}
			<Button href="/products" variant="outline" class="self-start md:self-auto">
				All products <ArrowRightIcon />
			</Button>
		{/snippet}
	</SectionHeading>
	<div class="mt-8">
		<ProductCards products={data.products} />
	</div>
</section>

<section class="bg-ink section-y">
	<div class="container-page">
		<SectionHeading
			tone="ink"
			eyebrow="Recent projects"
			title="Built across Kenya."
			description="Real installations by our team — from single-car carports to commercial car parks."
		>
			{#snippet action()}
				<Button href="/projects" class="self-start md:self-auto">
					View all projects <ArrowRightIcon />
				</Button>
			{/snippet}
		</SectionHeading>
		<div class="mt-8">
			<ProjectRow projects={data.projects} products={data.products} />
		</div>
	</div>
</section>

{#if data.settings.facebookReviewsUrl}
	<section class="container-page section-y-tight">
		<ReviewsBand reviewsUrl={data.settings.facebookReviewsUrl} />
	</section>
{/if}

<section id="estimator" class="bg-muted/60 section-y">
	<div class="container-page">
		<SectionHeading
			eyebrow="Site assessment"
			title="Tell us about your project in 30 seconds."
			description="Three quick choices and your number — we'll call you to arrange a site visit."
		/>
		<div class="mt-8">
			<QuoteEstimator settings={data.settings} />
		</div>
	</div>
</section>

<ProcessStrip />
