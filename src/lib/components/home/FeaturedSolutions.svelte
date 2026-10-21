<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import SolutionIndexList from '$lib/components/solutions/SolutionIndexList.svelte';
	import { QUOTE_HREF, SOLUTIONS_HREF, solutionHref } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';
	import type { PublicSiteSettings, Solution } from '$lib/content/types';

	/*
	 * A short index of solutions, strongest portfolio evidence first; detailed
	 * guidance lives on /solutions. Visitors unsure what they need are pointed
	 * to the quote flow, which has "Not sure — help me choose", or to WhatsApp
	 * with an advice message. Phones get a swipe row of photo and title instead
	 * of the ruled index; links to all solutions and the prompt stay outside it.
	 */
	let { settings, solutions }: { settings: PublicSiteSettings; solutions: Solution[] } = $props();

	const number = (i: number) => String(i + 1).padStart(2, '0');
</script>

{#if solutions.length}
	<section aria-labelledby="featured-solutions" class="bg-muted section-y max-md:py-12">
		<!-- Phones: heading, list, then the prompt; desktop: list beside both -->
		<div
			class="container-page grid gap-6 md:gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16"
		>
			<EditorialHeading
				id="featured-solutions"
				eyebrow="Solutions"
				title="What we design and install."
				class="lg:col-span-5"
			/>

			<ul class="snap-rail md:hidden">
				{#each solutions as solution, i (solution.slug)}
					<li class="w-3/5">
						<a href={solutionHref(solution.slug)} class="group block">
							<div class="overflow-hidden rounded-sm bg-background">
								<Picture
									image={solution.image}
									alt=""
									sizes="60vw"
									class="aspect-[4/3] w-full object-cover"
								/>
							</div>
							<p class="mt-3 flex items-baseline gap-2 font-medium group-hover:text-primary-strong">
								<span class="font-mono text-xs text-primary-strong">{number(i)}</span>
								{solution.title}
							</p>
						</a>
					</li>
				{/each}
			</ul>

			<SolutionIndexList
				{solutions}
				summaries={false}
				class="max-md:hidden lg:col-span-7 lg:row-span-2 lg:self-start"
			/>

			<div class="lg:col-span-5 lg:row-start-2">
				<TextLink href={SOLUTIONS_HREF}>View all solutions</TextLink>
				<div class="mt-6 border-l-2 border-primary pl-4 md:mt-10">
					<p class="font-semibold">Not sure which structure suits your space?</p>
					<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
						Describe the site and how you’ll use it, and we’ll help you choose.
					</p>
					<div class="mt-4 flex flex-wrap gap-x-6 gap-y-3">
						<TextLink href={QUOTE_HREF}>Help me choose</TextLink>
						<a
							href={whatsappHref(settings, { intent: 'advice' })}
							data-hides-floating-whatsapp
							target="_blank"
							rel="noopener"
							class="text-sm font-semibold underline decoration-primary decoration-1 underline-offset-[6px] hover:text-primary-strong"
						>
							Ask on WhatsApp<span class="sr-only"> (opens in a new tab)</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
