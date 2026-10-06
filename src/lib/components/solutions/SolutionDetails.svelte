<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import type { Product } from '$lib/content/types';

	/*
	 * The solution's own copy plus its verified lists. Each part is optional:
	 * an empty list renders nothing, and the section disappears if all are empty.
	 */
	let { solution }: { solution: Product } = $props();

	const lists = $derived(
		[
			{ title: 'Applications', items: solution.applications },
			{ title: 'Features & materials', items: solution.features }
		].filter((l) => l.items.length > 0)
	);
</script>

{#if solution.body.length || lists.length}
	<section aria-labelledby="solution-overview" class="container-page section-y">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
			{#if solution.body.length}
				<div class="lg:col-span-7">
					<EditorialHeading
						id="solution-overview"
						eyebrow="Overview"
						title="About {solution.title.toLowerCase()}"
					/>
					<div class="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/85">
						{#each solution.body as paragraph (paragraph)}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>
			{:else}
				<h2 id="solution-overview" class="sr-only">About {solution.title.toLowerCase()}</h2>
			{/if}

			{#if lists.length}
				<div class="space-y-12 lg:col-span-5 lg:pt-16">
					{#each lists as list (list.title)}
						<div>
							<h3 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
								{list.title}
							</h3>
							<ul>
								{#each list.items as item (item)}
									<li class="flex gap-3 border-b py-3.5">
										<span class="mt-[0.7rem] h-px w-3 shrink-0 bg-brand" aria-hidden="true"></span>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>
{/if}
