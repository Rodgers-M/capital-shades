<script lang="ts">
	import { cn } from '$lib/utils';
	import type { PostTag } from '$lib/content/types';

	let { tag, class: className }: { tag: PostTag; class?: string } = $props();
</script>

<span
	class={cn(
		'inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold tracking-wider text-accent-strong uppercase',
		className
	)}
>
	{tag}
</span>
