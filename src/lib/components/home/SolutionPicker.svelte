<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { SOLUTION_NEEDS, isSolutionTypeId } from '$lib/content/solutionTypes';
	import { QUOTE_HREF, SOLUTIONS_HREF, solutionHref } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';
	import type { PublicSiteSettings, Solution } from '$lib/content/types';

	/*
	 * "What do you need to shade?": routes visitors by their space rather than by
	 * product name. Each published solution gets a card naming a need (or, without
	 * one, its title) and the solution it leads to. Visitors
	 * whose need isn't listed get all solutions, the quote flow's "help me
	 * choose", or WhatsApp.
	 */
	let { settings, solutions }: { settings: PublicSiteSettings; solutions: Solution[] } = $props();

	const need = (slug: string): string | undefined =>
		isSolutionTypeId(slug) ? SOLUTION_NEEDS[slug] : undefined;
</script>

{#if solutions.length}
	<section aria-labelledby="solution-picker" class="bg-muted section-y max-md:py-12">
		<div class="container-page">
			<EditorialHeading
				id="solution-picker"
				eyebrow="Find your solution"
				title="What do you need to shade?"
			/>

			<!-- Phones: compact rows, photo beside the text; wider screens: cards, with
			     gutters as item padding so a short last row centres instead of trailing -->
			<ul
				class="mt-8 flex flex-wrap justify-center gap-y-3 sm:-mx-2 sm:gap-y-4 md:mt-14 lg:-mx-3 lg:gap-y-6"
			>
				{#each solutions as solution (solution.slug)}
					<li class="w-full sm:w-1/3 sm:px-2 lg:w-1/5 lg:px-3">
						<a
							href={solutionHref(solution.slug)}
							class="group flex h-full overflow-hidden rounded-sm border bg-background transition-shadow hover:shadow-lg sm:flex-col"
						>
							<div class="w-28 shrink-0 overflow-hidden sm:w-auto">
								<Picture
									image={solution.image}
									alt=""
									sizes="(min-width: 88rem) 16rem, (min-width: 1024px) 18vw, (min-width: 640px) 30vw, 7rem"
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[4/3] sm:h-auto"
								/>
							</div>
							<div class="flex flex-1 flex-col p-3 sm:p-4">
								<p class="mb-2 font-medium text-balance sm:mb-4">
									{need(solution.slug) ?? solution.title}
								</p>
								<p
									class="mt-auto border-t pt-3 text-sm text-muted-foreground group-hover:text-primary-strong"
								>
									<span class="sr-only">Leads to</span>
									{solution.title}
									<ArrowRightIcon class="ml-1 inline-block size-3.5" />
								</p>
							</div>
						</a>
					</li>
				{/each}
			</ul>

			<div class="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-start md:justify-between">
				<TextLink href={SOLUTIONS_HREF}>Something else? See all solutions</TextLink>
				<div class="border-l-2 border-primary pl-4 md:max-w-md">
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
