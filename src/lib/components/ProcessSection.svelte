<script lang="ts">
	import {
		ClipboardCheckIcon,
		DraftingCompassIcon,
		FactoryIcon,
		HardHatIcon
	} from '@lucide/svelte';
	import Picture from './Picture.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import type { Img } from '$lib/content/types';

	let { image }: { image: Img } = $props();

	const STEPS = [
		{
			icon: ClipboardCheckIcon,
			title: 'Site evaluation',
			text: 'We visit your site, take measurements and understand how the space is used.'
		},
		{
			icon: DraftingCompassIcon,
			title: 'Design',
			text: 'We design a fit-for-purpose structure and agree the layout, materials and colours with you.'
		},
		{
			icon: FactoryIcon,
			title: 'Fabrication',
			text: 'Frames and covers are made by our own team, so quality stays under our control.'
		},
		{
			icon: HardHatIcon,
			title: 'Installation',
			text: 'Our installers set up, tension and finish the structure on site.'
		}
	];
</script>

<section class="container-page section-y">
	<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
		<div class="relative order-2 lg:order-1">
			<div
				class="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]"
			>
				<Picture {image} sizes="(min-width: 1024px) 600px, 100vw" class="size-full object-cover" />
			</div>
			<div
				class="absolute right-4 -bottom-5 left-4 flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-xl sm:right-6 sm:left-auto sm:w-72"
			>
				<span
					class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
					aria-hidden="true"
				>
					<HardHatIcon class="size-6" />
				</span>
				<span>
					<span class="block font-bold">One team, start to finish</span>
					<span class="block text-xs text-muted-foreground"
						>Designed, made and installed in-house</span
					>
				</span>
			</div>
		</div>

		<div class="order-1 lg:order-2">
			<SectionHeading
				eyebrow="How we work"
				title="From site visit to handover, one accountable team."
				description="We design, fabricate and install every structure ourselves — no middlemen between you and the people building your shade."
			/>
			<ol class="mt-8 space-y-3">
				{#each STEPS as step, i (step.title)}
					<li
						class="flex gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60"
					>
						<div
							class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-ink text-primary"
						>
							<step.icon class="size-5" />
						</div>
						<div>
							<p class="font-bold">
								<span class="mr-2 font-mono text-xs text-accent-strong">0{i + 1}</span>
								{step.title}
							</p>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
