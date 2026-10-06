<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowRightIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	// Quiet "View all …" style link: label, thin gold underline, arrow.
	let {
		href,
		tone = 'light',
		class: className,
		children
	}: { href: string; tone?: 'light' | 'ink'; class?: string; children: Snippet } = $props();
</script>

<a
	{href}
	class={cn(
		'group inline-flex items-center gap-2 self-start text-sm font-semibold tracking-wide underline decoration-primary decoration-1 underline-offset-[6px] transition-colors md:self-auto',
		tone === 'ink' ? 'text-on-ink hover:text-primary' : 'text-foreground hover:text-primary-strong',
		className
	)}
>
	{@render children()}
	<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-0.5" />
</a>
