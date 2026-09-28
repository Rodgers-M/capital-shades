<script lang="ts">
	import {
		ArrowRightIcon,
		ClipboardCheckIcon,
		DraftingCompassIcon,
		FactoryIcon,
		HardHatIcon
	} from '@lucide/svelte';
	import SectionHeading from './SectionHeading.svelte';

	// Home page summary of the process; the full version is ProcessSection on /about
	const STEPS = [
		{ icon: ClipboardCheckIcon, title: 'Site evaluation', text: 'We visit and measure.' },
		{ icon: DraftingCompassIcon, title: 'Design', text: 'Layout, materials, colours.' },
		{ icon: FactoryIcon, title: 'Fabrication', text: 'Made by our own team.' },
		{ icon: HardHatIcon, title: 'Installation', text: 'Set up and tensioned on site.' }
	];
</script>

<section class="container-page py-14 md:py-20">
	<SectionHeading eyebrow="How we work" title="From site visit to handover, one team.">
		{#snippet action()}
			<a
				href="/about"
				class="inline-flex items-center gap-1 self-start text-sm font-semibold text-accent-strong underline-offset-4 hover:underline md:self-auto"
			>
				More about us <ArrowRightIcon class="size-4" />
			</a>
		{/snippet}
	</SectionHeading>
	<ol class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
		{#each STEPS as step, i (step.title)}
			<li class="rounded-xl border bg-card p-4">
				<div class="flex items-center gap-2.5">
					<span
						class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink text-primary"
						aria-hidden="true"
					>
						<step.icon class="size-4" />
					</span>
					<span class="font-mono text-xs font-bold text-accent-strong">0{i + 1}</span>
				</div>
				<p class="mt-3 font-bold">{step.title}</p>
				<p class="mt-0.5 text-sm text-muted-foreground">{step.text}</p>
			</li>
		{/each}
	</ol>
</section>
