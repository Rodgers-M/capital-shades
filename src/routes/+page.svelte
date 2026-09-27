<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import ProductCards from '$lib/components/ProductCards.svelte';
	import QuoteEstimator from '$lib/components/forms/QuoteEstimator.svelte';
	import ProcessSection from '$lib/components/ProcessSection.svelte';
	import ReviewsBand from '$lib/components/ReviewsBand.svelte';
	import ProjectGallery from '$lib/components/projects/ProjectGallery.svelte';
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';

	let { data } = $props();
</script>

<Seo description={data.settings.description} image={data.heroImage} />

<HeroSection settings={data.settings} image={data.heroImage} latest={data.projects[0]} />

<section class="border-b bg-card" aria-label="Who we build for">
	<div class="container-page flex flex-col items-center gap-4 py-6 md:flex-row md:gap-10">
		<p class="shrink-0 eyebrow text-muted-foreground">Built for</p>
		<ul
			class="grid w-full grid-cols-2 gap-x-6 gap-y-2 text-center sm:grid-cols-3 md:flex md:justify-between"
		>
			{#each data.settings.sectors as sector (sector.title)}
				<li class="text-sm font-extrabold tracking-tight text-foreground/60 md:text-base">
					{sector.title}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="container-page py-16 md:py-24">
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
	<div class="mt-8 md:mt-10">
		<ProductCards products={data.products} />
	</div>
	<!-- Reviews come after "what we do", as confirmation rather than the headline -->
	{#if data.settings.facebookReviewsUrl}
		<div class="mt-8 md:mt-10">
			<ReviewsBand reviewsUrl={data.settings.facebookReviewsUrl} />
		</div>
	{/if}
</section>

<section id="estimator" class="bg-muted/60 py-16 md:py-24">
	<div class="container-page">
		<SectionHeading
			eyebrow="Site assessment"
			title="Tell us about your project in 30 seconds."
			description="Answer three quick questions and we'll call you to arrange a site visit."
		/>
		<div class="mt-8 md:mt-10">
			<QuoteEstimator settings={data.settings} />
		</div>
	</div>
</section>

<ProcessSection image={data.processImage} />

<section class="bg-ink py-16 md:py-24">
	<div class="container-page">
		<SectionHeading
			tone="ink"
			eyebrow="Recent projects"
			title="Built across Kenya."
			description="From single-car carports to commercial car parks — real installations by our team."
		>
			{#snippet action()}
				<Button href="/projects" class="self-start md:self-auto">
					View all projects <ArrowRightIcon />
				</Button>
			{/snippet}
		</SectionHeading>
		<div class="mt-8 md:mt-10">
			<ProjectGallery
				projects={data.projects}
				products={data.products}
				showFilters={false}
				tone="ink"
			/>
		</div>
	</div>
</section>

{#if data.posts.length}
	<section class="container-page py-16 md:py-24">
		<SectionHeading eyebrow="Insights" title="Guides & advice.">
			{#snippet action()}
				<Button href="/blog" variant="outline" class="self-start md:self-auto">
					Read the blog <ArrowRightIcon />
				</Button>
			{/snippet}
		</SectionHeading>
		<ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<li><ArticleCard {post} /></li>
			{/each}
		</ul>
	</section>
{/if}
