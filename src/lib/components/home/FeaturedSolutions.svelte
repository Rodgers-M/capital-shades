<script lang="ts">
	import { ArrowRightIcon } from '@lucide/svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { SOLUTIONS_HREF, solutionHref } from '$lib/nav';
	import type { Product } from '$lib/content/types';

	/*
	 * A subset of solutions, strongest portfolio evidence first: one lead
	 * entry with a large photo, the rest as an editorial index. The full
	 * catalogue stays on /solutions.
	 */
	let { solutions }: { solutions: Product[] } = $props();

	const lead = $derived(solutions[0]);
	const rest = $derived(solutions.slice(1));
	const number = (i: number) => String(i + 1).padStart(2, '0');
</script>

{#if lead}
	<section aria-labelledby="featured-solutions" class="bg-muted section-y">
		<div class="container-page">
			<EditorialHeading
				id="featured-solutions"
				eyebrow="Solutions"
				title="What we design and install."
			>
				{#snippet action()}
					<TextLink href={SOLUTIONS_HREF}>View all solutions</TextLink>
				{/snippet}
			</EditorialHeading>

			<div class="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
				<a href={solutionHref(lead.slug)} class="group lg:col-span-7">
					<div class="overflow-hidden rounded-sm">
						<Picture
							image={lead.image}
							sizes="(min-width: 1024px) 55vw, 100vw"
							class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
						/>
					</div>
					<div class="mt-6 flex items-baseline gap-5">
						<span class="font-mono text-sm text-primary-strong">{number(0)}</span>
						<div>
							<h3 class="text-2xl font-medium tracking-tight md:text-3xl">{lead.title}</h3>
							<p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">{lead.summary}</p>
							<span
								class="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-primary underline-offset-[6px]"
							>
								Explore {lead.title.toLowerCase()}
								<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
							</span>
						</div>
					</div>
				</a>

				{#if rest.length}
					<ol class="border-t border-foreground/15 lg:col-span-5 lg:self-start">
						{#each rest as solution, i (solution.slug)}
							<li class="border-b border-foreground/15">
								<a
									href={solutionHref(solution.slug)}
									class="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-6"
								>
									<span class="pt-1 font-mono text-sm text-primary-strong">{number(i + 1)}</span>
									<span>
										<span
											class="block text-xl font-medium tracking-tight transition-colors group-hover:text-primary-strong"
										>
											{solution.title}
										</span>
										<span
											class="mt-2 line-clamp-3 block text-sm leading-relaxed text-muted-foreground"
										>
											{solution.summary}
										</span>
									</span>
									<span class="w-20 overflow-hidden rounded-sm sm:w-28">
										<Picture
											image={solution.image}
											alt=""
											sizes="112px"
											class="aspect-[4/3] w-full object-cover"
										/>
									</span>
								</a>
							</li>
						{/each}
					</ol>
				{/if}
			</div>
		</div>
	</section>
{/if}
