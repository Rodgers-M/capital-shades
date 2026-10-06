<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import SiteLogo from './SiteLogo.svelte';
	import {
		COMPANY_LINKS,
		QUOTE_HREF,
		QUOTE_LABEL,
		hasClosingCta,
		showsQuickContact,
		solutionHref
	} from '$lib/nav';
	import { cn } from '$lib/utils';
	import { whatsappHref } from '$lib/whatsapp';
	import type { Product, PublicSiteSettings } from '$lib/content/types';

	let { settings, products }: { settings: PublicSiteSettings; products: Product[] } = $props();

	// Only profiles set in settings — nothing unverified is linked
	const socials = $derived(
		[
			{ label: 'Facebook', href: settings.facebookUrl },
			{ label: 'Instagram', href: settings.instagramUrl },
			{ label: 'LinkedIn', href: settings.linkedinUrl }
		].filter((s): s is { label: string; href: string } => !!s.href)
	);

	// Only a confirmed address or location — never a default
	const place = $derived(settings.address ?? settings.location);

	// Pages that end with their own quote section skip the duplicate band
	const showCta = $derived(!hasClosingCta(page.url.pathname));
	const whatsapp = $derived(whatsappHref(settings, { topic: page.data.whatsappTopic }));

	const heading = 'eyebrow text-on-ink';
	const link = 'transition-colors hover:text-on-ink';
</script>

<footer class={cn('bg-ink text-on-ink-muted', showCta && 'mt-16 md:mt-24')}>
	<!-- Conversion band -->
	{#if showCta}
		<section aria-labelledby="footer-cta" class="border-b border-ink-border">
			<div
				class="container-page flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20"
			>
				<div class="max-w-2xl">
					<p class="flex items-center gap-3 eyebrow text-primary">
						<span class="h-px w-10 bg-primary" aria-hidden="true"></span>
						Planning a shade project?
					</p>
					<h2
						id="footer-cta"
						class="mt-4 text-2xl leading-tight font-semibold tracking-tight text-on-ink sm:text-3xl md:text-4xl"
					>
						Tell us about your site. We'll take it from there.
					</h2>
				</div>
				<div class="flex flex-col gap-3 sm:flex-row">
					<Button href={QUOTE_HREF} size="lg">
						{QUOTE_LABEL}
						<ArrowRightIcon />
					</Button>
					<Button href={whatsapp} target="_blank" rel="noopener" variant="outline-on-ink" size="lg">
						<WhatsAppIcon class="size-4 text-brand" />
						WhatsApp
						<span class="sr-only">(opens in a new tab)</span>
					</Button>
				</div>
			</div>
		</section>
	{/if}

	<div class="container-page">
		<div class="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:gap-10 md:py-16 lg:grid-cols-4">
			<div class="col-span-2 lg:col-span-1">
				<SiteLogo onInk />
				<p class="mt-5 hidden max-w-xs text-sm leading-relaxed text-on-ink-subtle sm:block">
					{settings.description}
				</p>
				{#if socials.length}
					<ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
						{#each socials as social (social.href)}
							<li>
								<a
									href={social.href}
									target="_blank"
									rel="noopener"
									class="text-on-ink underline decoration-primary/60 underline-offset-4 transition-colors hover:decoration-primary"
								>
									{social.label}<span class="sr-only"> (opens in a new tab)</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div>
				<h2 class={heading}>Solutions</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each products as product (product.slug)}
						<li>
							<a href={solutionHref(product.slug)} class={link}>{product.title}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class={heading}>Company</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each COMPANY_LINKS as item (item.href)}
						<li>
							<a href={item.href} class={link}>{item.label}</a>
						</li>
					{/each}
					<li>
						<a href={QUOTE_HREF} class={link}>{QUOTE_LABEL}</a>
					</li>
				</ul>
			</div>

			<div class="col-span-2 lg:col-span-1">
				<h2 class={heading}>Contact</h2>
				<ul class="mt-4 space-y-3 text-sm">
					<li>
						<a href="tel:+{settings.primaryPhone.number}" class="flex items-start gap-2.5 {link}">
							<PhoneIcon class="mt-0.5 size-4 shrink-0 text-brand" />
							{settings.primaryPhone.display}
						</a>
					</li>
					<li>
						<a
							href={whatsapp}
							target="_blank"
							rel="noopener"
							class="flex items-start gap-2.5 {link}"
						>
							<WhatsAppIcon class="mt-0.5 size-4 shrink-0 text-brand" />
							WhatsApp {settings.whatsapp.display}
							<span class="sr-only">(opens in a new tab)</span>
						</a>
					</li>
					<li>
						<a href="mailto:{settings.email}" class="flex items-start gap-2.5 {link}">
							<MailIcon class="mt-0.5 size-4 shrink-0 text-brand" />
							{settings.email}
						</a>
					</li>
					{#if place}
						<li class="flex items-start gap-2.5">
							<MapPinIcon class="mt-0.5 size-4 shrink-0 text-brand" />
							{#if settings.googleMapsUrl}
								<a href={settings.googleMapsUrl} target="_blank" rel="noopener" class={link}>
									{place}
									<span class="sr-only">(map, opens in a new tab)</span>
								</a>
							{:else}
								{place}
							{/if}
						</li>
					{/if}
					{#if settings.hours}
						<li class="flex items-start gap-2.5">
							<ClockIcon class="mt-0.5 size-4 shrink-0 text-brand" />
							{settings.hours}
						</li>
					{/if}
				</ul>
			</div>
		</div>

		<div
			class={cn(
				'flex flex-col gap-2 border-t border-ink-border py-6 text-xs text-on-ink-subtle md:flex-row md:justify-between',
				// Clear the fixed phone action bar where it shows
				showsQuickContact(page.url.pathname) && 'pb-24 md:pb-6'
			)}
		>
			<p>© {new Date().getFullYear()} {settings.legalName}. All rights reserved.</p>
			<p>{settings.tagline}</p>
		</div>
	</div>
</footer>
