<script lang="ts">
	import { ArrowUpRightIcon, ThumbsUpIcon } from '@lucide/svelte';
	import Button from './ui/Button.svelte';

	// No counts or ratings on purpose: they go out of date. Facebook shows the live figures.
	let { reviewsUrl }: { reviewsUrl: string } = $props();
</script>

<div
	class="flex flex-col gap-5 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
>
	<div class="flex items-start gap-4">
		<span
			class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
			aria-hidden="true"
		>
			<ThumbsUpIcon class="size-6" />
		</span>
		<div>
			<p class="eyebrow text-accent-strong">Customer reviews</p>
			<h2 class="mt-1 text-xl font-extrabold tracking-tight md:text-2xl">
				Highly recommended on Facebook
			</h2>
			<p class="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
				See what our customers say about their shades. Worked with us? Please leave a review — it
				helps others choose with confidence.
			</p>
		</div>
	</div>
	<div class="flex shrink-0 flex-col gap-2 sm:items-end">
		<Button href={reviewsUrl} target="_blank" rel="noopener">
			Leave a review <ArrowUpRightIcon />
		</Button>
		<a
			href={reviewsUrl}
			target="_blank"
			rel="noopener"
			class="text-center text-sm font-semibold text-accent-strong underline-offset-4 hover:underline"
		>
			Read our reviews
		</a>
	</div>
</div>
