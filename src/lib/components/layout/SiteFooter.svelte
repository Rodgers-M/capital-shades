<script lang="ts">
	import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import logo from '$lib/assets/logo.png';
	import { NAV_LINKS, QUOTE_HREF } from '$lib/nav';
	import type { Product, SiteSettings } from '$lib/content/types';

	let { settings, products }: { settings: SiteSettings; products: Product[] } = $props();
</script>

<footer class="mt-24 bg-ink text-on-ink-muted">
	<div class="container-page">
		<div
			class="relative -translate-y-1/2 overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-xl md:flex md:items-center md:justify-between md:px-10"
		>
			<div
				class="pointer-events-none absolute inset-0 opacity-20"
				style="background-image: repeating-linear-gradient(135deg, var(--color-ink) 0 2px, transparent 2px 22px)"
			></div>
			<div class="relative">
				<p class="eyebrow">Planning a shade project?</p>
				<h2 class="mt-1 text-2xl leading-tight font-extrabold md:text-3xl">
					Tell us about your site. We'll take it from there.
				</h2>
			</div>
			<div class="relative mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
				<Button href={QUOTE_HREF} variant="ink" class="h-12 px-6">
					Request Site Assessment <ArrowRightIcon />
				</Button>
				<Button
					href="tel:+{settings.phones[0].number}"
					variant="outline"
					class="h-12 border-ink/30 bg-card/40 px-6 text-primary-foreground hover:bg-card/60"
				>
					<PhoneIcon />
					{settings.phones[0].display}
				</Button>
			</div>
		</div>

		<div class="-mt-6 grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<a
					href="/"
					class="inline-flex rounded-lg bg-card px-3 py-2"
					aria-label="Capital Shades home"
				>
					<img src={logo} alt="Capital Shades" width="200" height="90" class="h-10 w-auto" />
				</a>
				<p class="mt-4 max-w-xs text-sm leading-relaxed text-on-ink-subtle">
					{settings.description}
				</p>
				<a
					href={settings.facebookUrl}
					target="_blank"
					rel="noopener"
					class="mt-4 inline-block text-sm font-semibold text-on-ink hover:text-primary"
				>
					Follow us on Facebook →
				</a>
			</div>

			<div>
				<h2 class="text-sm font-bold tracking-wider text-on-ink uppercase">Products</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each products as product (product.slug)}
						<li>
							<a href="/products/{product.slug}" class="transition-colors hover:text-primary">
								{product.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class="text-sm font-bold tracking-wider text-on-ink uppercase">Company</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each NAV_LINKS as link (link.href)}
						<li>
							<a href={link.href} class="transition-colors hover:text-primary">{link.label}</a>
						</li>
					{/each}
					<li>
						<a href={QUOTE_HREF} class="transition-colors hover:text-primary">Site assessment</a>
					</li>
				</ul>
			</div>

			<div>
				<h2 class="text-sm font-bold tracking-wider text-on-ink uppercase">Contact</h2>
				<ul class="mt-4 space-y-3 text-sm">
					{#each settings.phones as phone (phone.number)}
						<li>
							<a href="tel:+{phone.number}" class="flex items-start gap-2.5 hover:text-primary">
								<PhoneIcon class="mt-0.5 size-4 text-primary" />
								{phone.display}
							</a>
						</li>
					{/each}
					<li>
						<a href="mailto:{settings.email}" class="flex items-start gap-2.5 hover:text-primary">
							<MailIcon class="mt-0.5 size-4 text-primary" />
							{settings.email}
						</a>
					</li>
					<li class="flex items-start gap-2.5">
						<MapPinIcon class="mt-0.5 size-4 text-primary" />
						{settings.location}
					</li>
					{#if settings.hours}
						<li class="flex items-start gap-2.5">
							<ClockIcon class="mt-0.5 size-4 text-primary" />
							{settings.hours}
						</li>
					{/if}
				</ul>
			</div>
		</div>

		<div
			class="flex flex-col gap-2 border-t border-ink-border py-6 pb-24 text-xs text-on-ink-subtle md:flex-row md:justify-between md:pb-6"
		>
			<p>© {new Date().getFullYear()} {settings.legalName}. All rights reserved.</p>
			<p>{settings.tagline}</p>
		</div>
	</div>
</footer>
