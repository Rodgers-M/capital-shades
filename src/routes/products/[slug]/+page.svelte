<script lang="ts">
	import { ArrowRightIcon, CheckIcon, PhoneIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ProjectRow from '$lib/components/projects/ProjectRow.svelte';
	import ProductCards from '$lib/components/ProductCards.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF } from '$lib/nav';
	import { SITE_URL } from '$lib/config';
	import { whatsappLink } from '$lib/utils';

	let { data } = $props();
	const product = $derived(data.product);
	const settings = $derived(data.settings);
</script>

<Seo
	title="{product.title} in Kenya"
	description={product.summary}
	image={product.image}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: product.title,
		description: product.summary,
		serviceType: product.title,
		areaServed: { '@type': 'Country', name: 'Kenya' },
		provider: { '@id': `${SITE_URL}/#business` }
	}}
/>

<section class="relative overflow-hidden bg-ink text-on-ink">
	<div class="absolute inset-0 bg-grid text-on-ink opacity-[0.06]"></div>
	<div
		class="relative container-page grid gap-8 py-12 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-14"
	>
		<div>
			<nav aria-label="Breadcrumb" class="text-sm text-on-ink-subtle">
				<a href="/products" class="hover:text-primary">Products</a>
				<span aria-hidden="true" class="mx-1.5">/</span>
				<span aria-current="page" class="text-on-ink-muted">{product.title}</span>
			</nav>
			<p class="mt-6 inline-flex items-center gap-2 eyebrow text-primary">
				<span class="h-[2px] w-6 bg-primary"></span>
				{product.eyebrow}
			</p>
			<h1 class="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
				{product.title}
			</h1>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-on-ink-muted md:text-lg">
				{product.summary}
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<Button href={QUOTE_HREF} size="lg">
					Request Site Assessment <ArrowRightIcon class="!size-5" />
				</Button>
				<Button
					href={whatsappLink(
						settings.whatsapp.number,
						`Hi Capital Shades, I'm interested in ${product.title.toLowerCase()}.`
					)}
					target="_blank"
					rel="noopener"
					size="lg"
					variant="outline-on-ink"
				>
					<WhatsAppIcon class="size-5" /> Ask on WhatsApp
				</Button>
			</div>
		</div>
		<div class="overflow-hidden rounded-3xl ring-1 ring-on-ink/10">
			<Picture
				image={product.image}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width: 1024px) 600px, 100vw"
				class="aspect-[4/3] w-full object-cover"
			/>
		</div>
	</div>
</section>

<section class="container-page grid gap-10 section-y lg:grid-cols-12 lg:gap-16">
	<div class="prose prose-lg max-w-none lg:col-span-7">
		{#each product.body as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
	<aside class="space-y-6 lg:col-span-5">
		<div class="rounded-2xl border bg-card p-6">
			<h2 class="text-lg font-extrabold">Features</h2>
			<ul class="mt-4 space-y-2.5">
				{#each product.features as feature (feature)}
					<li class="flex items-center gap-2 text-sm font-medium">
						<span
							class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-accent-strong"
						>
							<CheckIcon class="size-3" strokeWidth={3} />
						</span>
						{feature}
					</li>
				{/each}
			</ul>
		</div>
		<div class="rounded-2xl border bg-card p-6">
			<h2 class="text-lg font-extrabold">Ideal for</h2>
			<ul class="mt-4 flex flex-wrap gap-2">
				{#each product.applications as application (application)}
					<li class="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold">{application}</li>
				{/each}
			</ul>
		</div>
		<div class="rounded-2xl bg-ink p-6 text-on-ink">
			<p class="font-bold">Questions about {product.title.toLowerCase()}?</p>
			<p class="mt-1 text-sm text-on-ink-subtle">Speak to our team directly.</p>
			<Button href="tel:+{settings.phones[0].number}" class="mt-4 w-full">
				<PhoneIcon /> Call {settings.phones[0].display}
			</Button>
		</div>
	</aside>
</section>

{#if data.projects.length}
	<section class="bg-ink section-y">
		<div class="container-page">
			<SectionHeading tone="ink" eyebrow="Projects" title="{product.title} we've built">
				{#snippet action()}
					<Button href="/projects?filter={product.slug}" class="self-start md:self-auto">
						{data.projectCount > data.projects.length
							? `See all ${data.projectCount}`
							: 'All projects'}
						<ArrowRightIcon />
					</Button>
				{/snippet}
			</SectionHeading>
			<div class="mt-8">
				<ProjectRow projects={data.projects} products={data.products} />
			</div>
		</div>
	</section>
{/if}

<section class="container-page section-y">
	<SectionHeading eyebrow="More products" title="Other shade solutions" />
	<div class="mt-8">
		<ProductCards products={data.others} desktopCols={5} label="Other products" />
	</div>
</section>
