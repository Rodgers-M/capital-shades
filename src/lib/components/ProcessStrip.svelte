<script lang="ts">
	import EditorialHeading from './EditorialHeading.svelte';
	import TextLink from './TextLink.svelte';

	// Home page summary of the process; the full version is ProcessSection on /about.
	// Describes the steps without claiming who fabricates (not yet confirmed).
	const STEPS = [
		{
			title: 'Site evaluation',
			text: 'A visit to measure the space and understand how it is used.'
		},
		{ title: 'Design', text: 'Layout, materials and colours, agreed with you.' },
		{ title: 'Fabrication', text: 'Frames and covers made to the agreed design.' },
		{ title: 'Installation', text: 'Set up, tensioned and finished on site.' }
	];
</script>

<section aria-labelledby="how-we-work" class="bg-muted section-y">
	<div class="container-page">
		<EditorialHeading
			id="how-we-work"
			eyebrow="How we work"
			title="A straightforward path from enquiry to completed project."
		>
			{#snippet action()}
				<TextLink href="/about">More about us</TextLink>
			{/snippet}
		</EditorialHeading>

		<ol class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
			{#each STEPS as step, i (step.title)}
				<li class="border-t border-foreground/20 pt-6">
					<span class="font-mono text-sm text-primary-strong" aria-hidden="true">
						{String(i + 1).padStart(2, '0')}
					</span>
					<h3 class="mt-4 text-xl font-medium tracking-tight">{step.title}</h3>
					<p class="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
