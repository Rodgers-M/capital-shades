<script lang="ts">
	import { CheckCircle2Icon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { data } = $props();
</script>

<Seo title="Thank You" description="We've received your enquiry." />
<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<section class="container-page flex flex-col items-center py-24 text-center">
	<CheckCircle2Icon class="size-16 text-success" />
	<h1 class="mt-5 text-3xl font-extrabold md:text-4xl">Thank you — we've got your message.</h1>
	<p class="mt-3 max-w-md text-muted-foreground">
		Our team will get back to you shortly. If it's urgent, call us on
		<a href="tel:+{data.settings.primaryPhone.number}" class="font-bold text-foreground underline"
			>{data.settings.primaryPhone.display}</a
		>.
	</p>
	<div class="mt-8 flex gap-3">
		<Button href="/projects" variant="outline">See our projects</Button>
		<Button href="/">Back to home</Button>
	</div>
</section>
