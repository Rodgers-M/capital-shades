<script lang="ts">
	import { page } from '$app/state';
	import { Collapsible } from 'bits-ui';
	import { ArrowRightIcon, ChevronDownIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import { unlistedSolutionTypes } from '$lib/content/solutionTypes';
	import { QUOTE_HREF, QUOTE_LABEL, SOLUTIONS_HREF, isActivePath, solutionHref } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Solution } from '$lib/content/types';

	/*
	 * Solutions inside the phone menu: open by default, so every structure is one
	 * tap from any page. `onnavigate` closes the menu sheet.
	 */
	let { solutions, onnavigate }: { solutions: Solution[]; onnavigate: () => void } = $props();

	const unlisted = $derived(unlistedSolutionTypes(solutions));
	const isCurrent = (href: string) => page.url.pathname === href;
	const inSolutions = $derived(isActivePath(page.url.pathname, SOLUTIONS_HREF));
	// Grey marks the page itself; on a solution page the grey goes to that row
	const onIndex = $derived(isCurrent(SOLUTIONS_HREF));
</script>

<Collapsible.Root open>
	<Collapsible.Trigger
		class={cn(
			'group flex w-full items-center justify-between gap-2 border-l-2 border-transparent px-3 py-3 text-base font-medium transition-colors hover:bg-muted',
			inSolutions && 'border-primary',
			onIndex && 'bg-muted'
		)}
	>
		Solutions
		<ChevronDownIcon
			class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</Collapsible.Trigger>
	<Collapsible.Content class="pb-2">
		<ul>
			{#each solutions as solution (solution.slug)}
				<li>
					<a
						href={solutionHref(solution.slug)}
						onclick={onnavigate}
						aria-current={isCurrent(solutionHref(solution.slug)) ? 'page' : undefined}
						class="flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:font-semibold"
					>
						<Picture
							image={solution.image}
							alt=""
							sizes="3rem"
							class="aspect-[4/3] w-10 shrink-0 rounded-sm object-cover"
						/>
						{solution.title}
					</a>
				</li>
			{/each}
		</ul>
		{#if unlisted.length}
			<p class="px-3 pt-2 text-sm text-muted-foreground">
				Also: {unlisted.map((type) => type.label).join(' · ')}.
				<a
					href={QUOTE_HREF}
					onclick={onnavigate}
					class="font-semibold text-foreground underline decoration-primary underline-offset-4"
					>{QUOTE_LABEL}</a
				>
			</p>
		{/if}
		<a
			href={SOLUTIONS_HREF}
			onclick={onnavigate}
			class="mt-2 flex items-center gap-1.5 px-3 py-2 text-sm font-semibold hover:text-primary-strong"
		>
			Compare all solutions <ArrowRightIcon class="size-4" />
		</a>
	</Collapsible.Content>
</Collapsible.Root>
