<script lang="ts">
	import { ArrowRightIcon, ArrowUpRightIcon, MailIcon, PhoneIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import ServiceArea from '$lib/components/ServiceArea.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { PROJECTS_HREF, QUOTE_HREF, QUOTE_LABEL, SOLUTIONS_HREF } from '$lib/nav';
	import { whatsappHref } from '$lib/whatsapp';

	/*
	 * Contact: the three main routes (call, WhatsApp, quote) first and above the
	 * fold — the phone action bar is hidden on this page — then email, the
	 * message form, and where the business works. Every detail comes from
	 * public settings and only renders when set.
	 */
	let { data } = $props();
	const settings = $derived(data.settings);

	const actions = $derived([
		{
			label: 'Call',
			value: settings.primaryPhone.display,
			href: `tel:+${settings.primaryPhone.number}`,
			icon: PhoneIcon,
			external: false
		},
		{
			label: 'WhatsApp',
			value: settings.whatsapp.display,
			href: whatsappHref(settings),
			icon: WhatsAppIcon,
			external: true
		},
		{
			label: QUOTE_LABEL,
			value: 'Start online',
			href: QUOTE_HREF,
			icon: ArrowRightIcon,
			external: false
		}
	]);

	const hasLocationDetails = $derived(
		!!(
			settings.location ||
			settings.serviceAreas.length ||
			settings.address ||
			settings.hours ||
			settings.googleMapsUrl
		)
	);
</script>

<Seo
	title="Contact"
	description="Call, WhatsApp or email {settings.name}, or request a quote for car park shades, shade sails, canopies and tensile structures."
/>

<section aria-labelledby="contact-title" class="container-page pt-10 md:pt-14">
	<div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
		<div class="lg:col-span-7">
			<p class="flex items-center gap-3 eyebrow text-primary-strong">
				<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
				Contact
			</p>
			<h1
				id="contact-title"
				class="mt-5 text-[2.125rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:mt-6 sm:text-6xl"
			>
				Talk to us about your project.
			</h1>
		</div>
		<!-- Phones: the actions below say the same thing; keep them above the fold -->
		<p class="hidden max-w-xl text-lg leading-relaxed text-muted-foreground sm:block lg:col-span-5">
			Call or WhatsApp to talk it through, request a quote online, or send a message below.
		</p>
	</div>

	<!-- Primary routes: equal weight, large targets, no cards -->
	<ul class="mt-8 grid gap-x-8 md:mt-12 md:grid-cols-3">
		{#each actions as action (action.label)}
			<li class="border-t-2 border-primary">
				<a
					href={action.href}
					target={action.external ? '_blank' : undefined}
					rel={action.external ? 'noopener' : undefined}
					class="group flex min-h-16 items-center justify-between gap-4 py-3.5 md:py-6"
				>
					<span>
						<span class="block eyebrow text-muted-foreground">{action.label}</span>
						<span
							class="mt-1.5 block text-xl font-medium tracking-tight transition-colors group-hover:text-primary-strong md:mt-2 md:text-2xl"
						>
							{action.value}
						</span>
						{#if action.external}<span class="sr-only">(opens in a new tab)</span>{/if}
					</span>
					<span
						class="flex size-11 shrink-0 items-center justify-center rounded-sm border border-foreground/20 transition-colors group-hover:border-foreground"
						aria-hidden="true"
					>
						<action.icon class="size-5 {action.label === 'WhatsApp' ? 'text-brand-strong' : ''}" />
					</span>
				</a>
			</li>
		{/each}
	</ul>
	<p
		class="flex flex-wrap items-center gap-x-3 gap-y-1 border-t py-4 text-sm text-muted-foreground"
	>
		<MailIcon class="size-4" aria-hidden="true" />
		Prefer email?
		<a
			href="mailto:{settings.email}"
			class="font-medium text-foreground underline decoration-primary underline-offset-4"
		>
			{settings.email}
		</a>
	</p>
</section>

<section aria-labelledby="contact-form" class="container-page section-y">
	<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-7">
			<EditorialHeading
				id="contact-form"
				eyebrow="Message"
				title="Send a message."
				description="For general questions. To describe a project and get a quote, use Request a Quote."
			/>
			<div class="mt-10">
				<ContactForm {settings} products={data.products} />
			</div>
		</div>

		<aside aria-label="Location and more" class="space-y-12 lg:col-span-5 lg:pt-4">
			{#if hasLocationDetails}
				<div>
					<h2 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
						Location
					</h2>
					<ServiceArea {settings} class="mt-5" />
					{#if settings.address || settings.hours || settings.googleMapsUrl}
						<dl class="mt-6 border-t border-foreground/15">
							{#if settings.address}
								<div class="grid grid-cols-[6rem_1fr] gap-4 border-b border-foreground/15 py-3">
									<dt class="eyebrow text-muted-foreground">Address</dt>
									<dd>{settings.address}</dd>
								</div>
							{/if}
							{#if settings.hours}
								<div class="grid grid-cols-[6rem_1fr] gap-4 border-b border-foreground/15 py-3">
									<dt class="eyebrow text-muted-foreground">Hours</dt>
									<dd>{settings.hours}</dd>
								</div>
							{/if}
						</dl>
						{#if settings.googleMapsUrl}
							<a
								href={settings.googleMapsUrl}
								target="_blank"
								rel="noopener"
								class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-primary underline-offset-4"
							>
								Open in Google Maps <ArrowUpRightIcon class="size-3.5" />
								<span class="sr-only">(opens in a new tab)</span>
							</a>
						{/if}
					{/if}
				</div>
			{/if}

			<div>
				<h2 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
					Before you get in touch
				</h2>
				<ul class="mt-5 flex flex-col items-start gap-4">
					<li><TextLink href={PROJECTS_HREF}>See completed projects</TextLink></li>
					<li><TextLink href={SOLUTIONS_HREF}>Explore solutions</TextLink></li>
					{#if settings.facebookReviewsUrl}
						<li>
							<a
								href={settings.facebookReviewsUrl}
								target="_blank"
								rel="noopener"
								class="inline-flex items-center gap-2 text-sm font-semibold tracking-wide underline decoration-primary decoration-1 underline-offset-[6px] hover:text-primary-strong"
							>
								Read reviews on Facebook <ArrowUpRightIcon class="size-4" />
								<span class="sr-only">(opens in a new tab)</span>
							</a>
						</li>
					{/if}
				</ul>
			</div>
		</aside>
	</div>
</section>
