<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import { NavigationMenu } from 'bits-ui';
	import { ArrowRightIcon, ChevronDownIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import { unlistedSolutionTypes } from '$lib/content/solutionTypes';
	import {
		NAV_LINKS_AFTER_SOLUTIONS,
		PROJECTS_HREF,
		QUOTE_HREF,
		SOLUTIONS_HREF,
		QUOTE_LABEL,
		isActivePath,
		solutionHref
	} from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Solution } from '$lib/content/types';

	/*
	 * Desktop main navigation. Solutions opens a panel naming every structure, so
	 * visitors see what is offered without knowing what "Solutions" means. Types
	 * without a page yet are named as text only (no placeholder photos).
	 */
	let { solutions }: { solutions: Solution[] } = $props();

	const unlisted = $derived(unlistedSolutionTypes(solutions));
	const isActive = (href: string) => isActivePath(page.url.pathname, href);

	// The panel needs JS, so prerendered HTML links straight to /solutions and
	// the trigger takes over once hydrated. The fallback keeps the chevron so the
	// swap doesn't shift the layout; focus follows if the link had it.
	let hydrated = $state(false);
	let fallback = $state<HTMLAnchorElement | null>(null);
	let trigger = $state<HTMLButtonElement | null>(null);
	onMount(() => {
		const hadFocus = document.activeElement === fallback;
		hydrated = true;
		if (hadFocus) void tick().then(() => trigger?.focus());
	});

	const linkClass = (active: boolean) =>
		cn(
			'inline-flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-muted-foreground underline-offset-[10px] transition-colors hover:text-foreground data-[state=open]:text-foreground',
			active && 'text-foreground underline decoration-primary decoration-1'
		);
</script>

<NavigationMenu.Root aria-label="Main" class="hidden lg:block">
	<NavigationMenu.List class="flex items-center gap-8">
		<NavigationMenu.Item>
			{#if hydrated}
				<NavigationMenu.Trigger
					bind:ref={trigger}
					class={cn('group', linkClass(isActive(SOLUTIONS_HREF)))}
				>
					Solutions
					{#if isActive(SOLUTIONS_HREF)}<span class="sr-only">(current section)</span>{/if}
					<ChevronDownIcon
						class="size-4 transition-transform group-data-[state=open]:rotate-180"
						aria-hidden="true"
					/>
				</NavigationMenu.Trigger>
			{:else}
				<a
					bind:this={fallback}
					href={SOLUTIONS_HREF}
					aria-current={isActive(SOLUTIONS_HREF) ? 'page' : undefined}
					class={linkClass(isActive(SOLUTIONS_HREF))}
				>
					Solutions
					<ChevronDownIcon class="size-4" aria-hidden="true" />
				</a>
			{/if}
			<!-- Positioned against the header row (SiteHeader's `relative` container) -->
			<NavigationMenu.Content
				class="absolute inset-x-0 top-full rounded-b-sm border bg-background p-6 shadow-lg data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
			>
				<ul class="grid grid-cols-5 gap-6">
					{#each solutions as solution (solution.slug)}
						<li>
							<NavigationMenu.Link
								href={solutionHref(solution.slug)}
								active={isActive(solutionHref(solution.slug))}
								class="group block"
							>
								<div class="overflow-hidden rounded-sm bg-muted">
									<Picture
										image={solution.image}
										alt=""
										sizes="(min-width: 88rem) 16rem, 18vw"
										class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<p class="mt-3 font-medium group-hover:text-primary-strong">{solution.title}</p>
								{#if solution.eyebrow}
									<p class="mt-0.5 text-sm text-muted-foreground">{solution.eyebrow}</p>
								{/if}
							</NavigationMenu.Link>
						</li>
					{/each}
				</ul>

				<div
					class="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t pt-5 text-sm"
				>
					{#if unlisted.length}
						<p class="text-muted-foreground">
							We also install
							<span class="font-medium text-foreground"
								>{unlisted.map((type) => type.label).join(' · ')}</span
							>.
							<NavigationMenu.Link
								href={QUOTE_HREF}
								class="font-semibold text-foreground underline decoration-primary underline-offset-4 hover:text-primary-strong"
								>{QUOTE_LABEL}</NavigationMenu.Link
							>
						</p>
					{/if}
					<div class="flex gap-6 font-semibold">
						<NavigationMenu.Link
							href={SOLUTIONS_HREF}
							class="inline-flex items-center gap-1.5 hover:text-primary-strong"
						>
							Compare all solutions <ArrowRightIcon class="size-4" />
						</NavigationMenu.Link>
						<NavigationMenu.Link
							href={PROJECTS_HREF}
							class="inline-flex items-center gap-1.5 hover:text-primary-strong"
						>
							See finished projects <ArrowRightIcon class="size-4" />
						</NavigationMenu.Link>
					</div>
				</div>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		{#each NAV_LINKS_AFTER_SOLUTIONS as link (link.href)}
			<NavigationMenu.Item>
				<NavigationMenu.Link
					href={link.href}
					active={isActive(link.href)}
					class={linkClass(isActive(link.href))}
				>
					{link.label}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		{/each}
	</NavigationMenu.List>
</NavigationMenu.Root>
