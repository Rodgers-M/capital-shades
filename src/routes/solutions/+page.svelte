<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import SolutionFeature from '$lib/components/solutions/SolutionFeature.svelte';
	import SolutionFinder from '$lib/components/solutions/SolutionFinder.svelte';
	import SolutionGuide from '$lib/components/solutions/SolutionGuide.svelte';

	// Solutions index: every solution record, in catalogue order, then guidance
	// for visitors who don't yet know which structure they need.
	let { data } = $props();
</script>

<Seo
	title="Solutions"
	description="Car park shades, shade sails, canopies, tensile membrane structures, parasols and pool shades — custom designed and installed in Kenya."
	image={data.products[0]?.image}
/>

<section aria-labelledby="solutions-title" class="border-b">
	<div
		class="container-page grid gap-10 pt-10 pb-12 md:pt-14 md:pb-16 lg:grid-cols-12 lg:items-end lg:gap-16"
	>
		<div class="lg:col-span-7">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				Solutions
			</p>
			<h1
				id="solutions-title"
				class="mt-6 text-[2.5rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-6xl"
			>
				Find the right shade structure for your space.
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
				Shade structures designed around different spaces and requirements — in shade mesh,
				waterproof PVC or metal roofing.
			</p>
		</div>
		<nav aria-label="Solutions on this page" class="lg:col-span-5">
			<ol class="border-t border-foreground/15 text-sm">
				{#each data.products as solution, i (solution.slug)}
					<li class="border-b border-foreground/15">
						<a
							href="#{solution.slug}"
							class="flex items-baseline gap-4 py-2.5 transition-colors hover:text-primary-strong"
						>
							<span class="font-mono text-xs text-primary-strong">
								{String(i + 1).padStart(2, '0')}
							</span>
							{solution.title}
						</a>
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</section>

<div class="container-page space-y-20 section-y md:space-y-28 lg:space-y-32">
	{#each data.products as solution, i (solution.slug)}
		<SolutionFeature
			{solution}
			index={i}
			proof={data.proof[solution.slug] ?? []}
			hasProjects={data.withProjects.includes(solution.slug)}
			settings={data.settings}
		/>
	{/each}
</div>

<SolutionFinder solutions={data.products} settings={data.settings} />

<SolutionGuide />
