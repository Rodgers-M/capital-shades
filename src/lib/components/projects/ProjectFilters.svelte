<script lang="ts">
	import { projectsHref, type ProjectFilters } from '$lib/nav';
	import { cn } from '$lib/utils';
	import type { Sector } from '$lib/content/types';

	/*
	 * Filters as plain links, so every view has a shareable URL
	 * (/projects?solution=…&sector=…) and works with the keyboard. Each group
	 * keeps the other group's choice. Only options with projects are passed in.
	 */
	let {
		active,
		solutions,
		sectors
	}: {
		active: ProjectFilters;
		solutions: { id: string; label: string }[];
		sectors: { id: Sector; label: string }[];
	} = $props();

	const groups = $derived([
		{
			label: 'Solution',
			current: active.solution,
			all: projectsHref({ sector: active.sector }),
			options: solutions.map((o) => ({
				...o,
				href: projectsHref({ sector: active.sector, solution: o.id })
			}))
		},
		{
			label: 'Sector',
			current: active.sector,
			all: projectsHref({ solution: active.solution }),
			options: sectors.map((o) => ({
				...o,
				href: projectsHref({ solution: active.solution, sector: o.id })
			}))
		}
	]);

	const link = (selected: boolean) =>
		cn(
			'inline-flex min-h-11 items-center border-b-2 py-2 text-sm transition-colors',
			selected
				? 'border-primary font-semibold text-foreground'
				: 'border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground'
		);
</script>

<nav
	aria-label="Filter projects"
	data-sveltekit-noscroll
	data-sveltekit-keepfocus
	data-sveltekit-replacestate
	class="grid gap-x-12 gap-y-2 border-y py-3 md:grid-cols-[auto_1fr]"
>
	{#each groups as group (group.label)}
		<div class="flex flex-col gap-x-6 sm:flex-row sm:items-baseline md:contents">
			<p
				class="pt-3 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:w-20 sm:shrink-0 md:w-auto"
			>
				{group.label}
			</p>
			<ul class="flex flex-wrap gap-x-5">
				<li>
					<a
						href={group.all}
						aria-current={group.current ? undefined : 'true'}
						class={link(!group.current)}
					>
						All
					</a>
				</li>
				{#each group.options as option (option.id)}
					<li>
						<a
							href={option.href}
							aria-current={group.current === option.id ? 'true' : undefined}
							class={link(group.current === option.id)}
						>
							{option.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
