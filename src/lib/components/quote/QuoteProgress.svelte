<script lang="ts">
	import { cn } from '$lib/utils';

	/*
	 * Step indicator. Completed steps are buttons for going back; later steps
	 * are reached with Continue so each step is checked first. Hidden without
	 * JavaScript, when every step shows at once.
	 */
	let {
		steps,
		current,
		onselect
	}: { steps: readonly string[]; current: number; onselect: (index: number) => void } = $props();
</script>

<nav aria-label="Quote request progress" class="quote-js">
	<ol class="grid grid-cols-3 gap-2 sm:gap-4">
		{#each steps as title, i (title)}
			{@const done = i < current}
			{@const active = i === current}
			<li>
				{#snippet label()}
					<span
						class={cn(
							'block h-0.5 transition-colors',
							active ? 'bg-primary' : done ? 'bg-foreground' : 'bg-foreground/15'
						)}
						aria-hidden="true"
					></span>
					<span class="mt-2.5 block eyebrow text-[0.6875rem] text-muted-foreground">
						Step {i + 1}
					</span>
					<span
						class={cn(
							'mt-1 hidden text-sm leading-snug font-medium sm:block',
							active ? 'text-foreground' : 'text-muted-foreground'
						)}
						aria-hidden="true"
					>
						{title}
					</span>
					<span class="sr-only">
						{title}{done ? ' (completed)' : ''}
					</span>
				{/snippet}
				{#if done}
					<button
						type="button"
						onclick={() => onselect(i)}
						class="block min-h-11 w-full text-left hover:[&>span:first-child]:bg-primary"
					>
						{@render label()}
						<span class="sr-only">— go back to this step</span>
					</button>
				{:else}
					<div aria-current={active ? 'step' : undefined} class="min-h-11">
						{@render label()}
					</div>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
