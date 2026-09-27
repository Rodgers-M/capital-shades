<script lang="ts">
	import { ArrowRightIcon, CloudRainIcon, RulerIcon, StarIcon, SunIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { QUOTE_HREF } from '$lib/nav';
	import { whatsappLink } from '$lib/utils';
	import type { Img, Project, SiteSettings } from '$lib/content/types';

	let { settings, image, latest }: { settings: SiteSettings; image: Img; latest?: Project } =
		$props();

	const phone = $derived(settings.phones[0]);
</script>

<section class="relative overflow-hidden bg-ink text-on-ink">
	<Picture
		{image}
		alt=""
		loading="eager"
		fetchpriority="high"
		class="absolute inset-0 size-full object-cover"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/40 lg:bg-gradient-to-r lg:from-ink lg:via-ink/80 lg:to-transparent"
	></div>
	<div class="absolute inset-0 bg-grid text-on-ink opacity-[0.07]"></div>

	<div
		class="relative container-page grid gap-10 pt-6 pb-10 md:pt-12 md:pb-14 lg:grid-cols-12 lg:pt-12 lg:pb-16"
	>
		<div class="lg:col-span-7">
			{#if settings.facebookReviews}
				<a
					href={settings.facebookUrl}
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-2 rounded-full border border-on-ink/15 bg-on-ink/10 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-on-ink/15"
				>
					<span class="flex" aria-hidden="true">
						{#each { length: 5 }, i (i)}
							<StarIcon class="size-3.5 fill-primary text-primary" />
						{/each}
					</span>
					{settings.facebookReviews.percent}% recommend us · {settings.facebookReviews.count} Facebook
					reviews
				</a>
			{/if}

			<h1
				class="mt-5 text-[2.25rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.75rem]"
			>
				Custom shade & tensile structures
				<span class="relative inline-block text-primary">
					built to last
					<svg
						viewBox="0 0 300 12"
						class="absolute -bottom-2 left-0 h-3 w-full text-accent"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							d="M2 9C80 3 220 3 298 8"
							stroke="currentColor"
							stroke-width="4"
							fill="none"
							stroke-linecap="round"
						/>
					</svg>
				</span>
			</h1>

			<p class="mt-5 max-w-xl text-base leading-relaxed text-on-ink-muted md:text-lg">
				Car park shades, shade sails, canopies and membrane structures — designed, fabricated and
				installed by our own team. <span class="hidden sm:inline"
					>Choose <strong class="font-semibold text-on-ink">heavy-duty shade mesh</strong>
					or <strong class="font-semibold text-on-ink">100% waterproof PVC</strong>.</span
				>
			</p>

			<ul class="mt-4 hidden flex-wrap gap-x-5 gap-y-2 text-sm text-on-ink-muted sm:flex">
				<li class="inline-flex items-center gap-1.5">
					<SunIcon class="size-4 text-primary" /> UV protection
				</li>
				<li class="inline-flex items-center gap-1.5">
					<CloudRainIcon class="size-4 text-primary" /> Waterproof options
				</li>
				<li class="inline-flex items-center gap-1.5">
					<RulerIcon class="size-4 text-primary" /> Site evaluation & custom design
				</li>
			</ul>

			<div class="mt-7 flex flex-col gap-3 sm:flex-row">
				<Button href={QUOTE_HREF} size="lg" class="shadow-lg shadow-primary/30">
					Request Site Assessment <ArrowRightIcon class="!size-5" />
				</Button>
				<!-- On phones the fixed bottom bar already offers WhatsApp and Call -->
				<Button
					href={whatsappLink(settings.whatsapp.number, "Hi Capital Shades, I'd like a quote")}
					target="_blank"
					rel="noopener"
					size="lg"
					variant="outline-on-ink"
					class="hidden sm:inline-flex"
				>
					<WhatsAppIcon class="size-5" /> Chat on WhatsApp
				</Button>
			</div>
			<p class="mt-4 text-sm text-on-ink-muted">
				Or call
				<a
					href="tel:+{phone.number}"
					class="font-bold text-on-ink underline-offset-4 hover:underline">{phone.display}</a
				>
				<span aria-hidden="true" class="mx-1.5">·</span>
				<a href="/projects" class="font-semibold text-primary underline-offset-4 hover:underline"
					>See recent projects</a
				>
			</p>
		</div>

		{#if latest}
			<div class="hidden items-end justify-end lg:col-span-5 lg:flex">
				<a
					href="/projects"
					class="group w-full max-w-sm overflow-hidden rounded-2xl border border-on-ink/10 bg-ink/70 backdrop-blur-md"
				>
					<Picture
						image={latest.image}
						sizes="384px"
						class="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div class="p-5">
						<p class="eyebrow text-on-ink-subtle">Recent project</p>
						<p class="mt-2 text-lg font-bold">{latest.title}</p>
						<p class="mt-1 inline-flex items-center gap-1 text-sm text-primary">
							See all projects <ArrowRightIcon class="size-4" />
						</p>
					</div>
				</a>
			</div>
		{/if}
	</div>

	<div class="relative border-t border-on-ink/10 bg-ink/80 backdrop-blur">
		<dl class="container-page grid grid-cols-2 divide-on-ink/10 md:grid-cols-4 md:divide-x">
			{#each settings.stats as stat (stat.label)}
				<div class="px-2 py-5 md:px-6">
					<dt class="text-xs font-medium text-on-ink-subtle">{stat.label}</dt>
					<dd class="mt-1 text-2xl font-extrabold md:text-3xl">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
