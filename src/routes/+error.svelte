<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | Capital Shades</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="container-page flex flex-col items-center py-24 text-center">
	<p class="font-mono text-6xl font-extrabold text-primary">{page.status}</p>
	<h1 class="mt-4 text-3xl font-extrabold md:text-4xl">
		{page.status === 404 ? "We couldn't find that page." : 'Something went wrong.'}
	</h1>
	<p class="mt-3 max-w-md text-muted-foreground">
		{page.status === 404
			? 'It may have moved when we rebuilt the site. Try one of these instead:'
			: 'Please try again in a moment.'}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<Button href="/">Home</Button>
		<Button href="/products" variant="outline">Products</Button>
		<Button href="/projects" variant="outline">Projects</Button>
		<Button href="/contact" variant="outline">Contact</Button>
	</div>
</section>
