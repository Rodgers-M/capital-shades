<script lang="ts">
	import { cn } from '$lib/utils';
	import logo from '$lib/assets/logo.png';

	// TODO: replace with a vector logo from the owner (current file is a 200×90 PNG).
	let { class: className }: { class?: string } = $props();
</script>

<a
	href="/"
	aria-label="Capital Shades home"
	class={cn('inline-flex shrink-0 items-center', className)}
>
	<img src={logo} alt="Capital Shades" width="200" height="90" class="h-10 w-auto md:h-12" />
</a>
