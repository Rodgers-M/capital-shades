<script lang="ts">
	import { cn } from '$lib/utils';
	import logo from '$lib/assets/logo.png';

	// TODO: replace with a vector logo from the owner (current file is a 200×90 PNG).
	let {
		onInk = false,
		class: className,
		imgClass
	}: {
		/**
		 * On dark surfaces: the PNG's charcoal "Shades" disappears on ink, so it
		 * sits on a flat warm-white plate. Drop this once there's a light-on-dark logo.
		 */
		onInk?: boolean;
		class?: string;
		imgClass?: string;
	} = $props();
</script>

<a
	href="/"
	aria-label="Capital Shades home"
	class={cn(
		'inline-flex shrink-0 items-center',
		onInk && 'rounded-sm bg-on-ink px-3 py-2',
		className
	)}
>
	<img
		src={logo}
		alt="Capital Shades"
		width="200"
		height="90"
		class={cn('h-10 w-auto md:h-12', imgClass)}
	/>
</a>
