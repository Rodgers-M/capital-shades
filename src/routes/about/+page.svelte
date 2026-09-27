<script lang="ts">
	import {
		ArrowRightIcon,
		BadgeDollarSignIcon,
		PaintbrushIcon,
		ShieldCheckIcon,
		WrenchIcon
	} from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ProcessSection from '$lib/components/ProcessSection.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { QUOTE_HREF } from '$lib/nav';

	let { data } = $props();

	const REASONS = [
		{
			icon: ShieldCheckIcon,
			title: 'Durable materials',
			text: 'Built to withstand the elements for long-lasting performance.'
		},
		{
			icon: PaintbrushIcon,
			title: 'Custom designs',
			text: 'Tailored to your site, your needs and your style.'
		},
		{
			icon: BadgeDollarSignIcon,
			title: 'Fair pricing',
			text: 'High-quality structures at competitive prices.'
		},
		{
			icon: WrenchIcon,
			title: 'Hassle-free installation',
			text: 'Our own professional team handles the installation.'
		}
	];
</script>

<Seo
	title="About Us"
	description="Capital Shades specialises in site evaluation, design, fabrication and installation of custom shade and tensile membrane structures in Kenya."
	image={data.heroImage}
/>

<PageHero
	eyebrow="About Capital Shades"
	title="The coolest solutions under the sun."
	description="We specialise in unique tensile structures — designing, fabricating and installing long-lasting fabric structures for homes, businesses and institutions."
	image={data.heroImage}
/>

<section class="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
	<div>
		<SectionHeading
			eyebrow="Our company"
			title="Fit-for-purpose shade, from site visit to handover."
		/>
		<div class="mt-6 space-y-4 leading-relaxed text-muted-foreground">
			<p>
				We specialise in site evaluation and in designing fit-for-purpose structures in a range of
				materials — from shade mesh and PVC to metal-roofed car park structures.
			</p>
			<p>
				We cater to a wide range of applications: small residential shade sails for your backyard,
				right up to large custom structures for schools, sports centres and commercial sites.
			</p>
			<p>
				Working with commercial clients, we have seen a marked difference in both how long shoppers
				stay and which centre they choose when shade and all-weather cover are available. We are
				always looking for ways shade can help our clients achieve their goals.
			</p>
		</div>
		<Button href={QUOTE_HREF} class="mt-8">
			Request Site Assessment <ArrowRightIcon />
		</Button>
	</div>
	<div class="overflow-hidden rounded-3xl">
		<Picture
			image={data.profileImage}
			sizes="(min-width: 1024px) 600px, 100vw"
			class="aspect-[4/3] w-full object-cover"
		/>
	</div>
</section>

<section class="bg-muted/60 py-16 md:py-24">
	<div class="container-page">
		<SectionHeading
			align="center"
			eyebrow="Why choose us"
			title="Built to last, designed for you."
		/>
		<ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each REASONS as reason (reason.title)}
				<li class="rounded-2xl border bg-card p-6">
					<span
						class="flex size-11 items-center justify-center rounded-lg bg-ink text-primary"
						aria-hidden="true"
					>
						<reason.icon class="size-5" />
					</span>
					<h3 class="mt-4 font-extrabold">{reason.title}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="container-page py-16 md:py-24">
	<SectionHeading
		eyebrow="Who we build for"
		title="Our shades are perfect for…"
		description="Cost-effective shade and UV protection for a wide variety of outdoor spaces."
	/>
	<ul class="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.settings.sectors as sector (sector.title)}
			<li class="border-l-2 border-primary pl-5">
				<h3 class="font-extrabold">{sector.title}</h3>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{sector.text}</p>
			</li>
		{/each}
	</ul>
</section>

<div class="border-t">
	<ProcessSection image={data.processImage} />
</div>
