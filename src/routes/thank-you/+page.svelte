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
		We'll be in touch to talk through your project. If it's urgent, call us on
		<a href="tel:+{data.settings.primaryPhone.number}" class="font-bold text-foreground underline"
			>{data.settings.primaryPhone.display}</a
		>.
	</p>
	<p class="mt-3 max-w-md text-muted-foreground">
		For quote requests, a final quotation follows the site visit and confirmed measurements.
	</p>
	<div class="mt-8 flex gap-3">
		<Button href="/projects" variant="outline">View projects</Button>
		<Button href="/">Back to home</Button>
	</div>
</section>
