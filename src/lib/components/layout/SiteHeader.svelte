<script lang="ts">
	import { page } from '$app/state';
	import { Dialog } from 'bits-ui';
	import { ArrowRightIcon, MenuIcon, PhoneIcon, XIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import SiteLogo from './SiteLogo.svelte';
	import { NAV_LINKS, QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import { cn } from '$lib/utils';
	import { whatsappHref } from '$lib/whatsapp';
	import type { PublicSiteSettings } from '$lib/content/types';

	let { settings }: { settings: PublicSiteSettings } = $props();
	let open = $state(false);

	const phone = $derived(settings.primaryPhone);
	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<header
	class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"
>
	<div class="container-page flex h-16 items-center justify-between gap-6 md:h-20">
		<SiteLogo />

		<nav aria-label="Main" class="hidden items-center gap-8 lg:flex">
			{#each NAV_LINKS as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link.href) ? 'page' : undefined}
					class={cn(
						'py-2 text-sm font-medium tracking-wide text-muted-foreground underline-offset-[10px] transition-colors hover:text-foreground',
						isActive(link.href) && 'text-foreground underline decoration-primary decoration-1'
					)}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2 lg:gap-3">
			<Button href={QUOTE_HREF} class="hidden sm:inline-flex">
				{QUOTE_LABEL}
				<ArrowRightIcon />
			</Button>

			<!-- Phones: compact call button beside the menu (number shown, "Call" under 340px) -->
			<a
				href="tel:+{phone.number}"
				aria-label="Call {phone.display}"
				class="inline-flex h-11 items-center gap-1.5 rounded-sm border border-foreground/20 px-3 text-sm font-semibold whitespace-nowrap text-foreground transition-colors hover:border-foreground md:hidden"
			>
				<PhoneIcon class="size-4 text-brand-strong" />
				<span class="max-[339px]:hidden">{phone.display}</span>
				<span class="min-[340px]:hidden">Call</span>
			</a>

			<Dialog.Root bind:open>
				<Dialog.Trigger
					class="inline-flex size-11 items-center justify-center rounded-sm border border-foreground/20 text-foreground transition-colors hover:border-foreground lg:hidden"
					aria-label="Open menu"
				>
					<MenuIcon class="size-5" />
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						class="fixed inset-0 z-50 bg-ink/60 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
					/>
					<Dialog.Content
						class="fixed inset-y-0 right-0 z-50 flex w-1/2 max-w-xs flex-col overflow-y-auto bg-background shadow-xl data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in"
					>
						<!-- Half-width panel: no room for the logo, which stays visible behind the overlay -->
						<div class="flex items-center justify-between border-b py-3 pr-2 pl-4">
							<Dialog.Title class="eyebrow text-muted-foreground">Menu</Dialog.Title>
							<Dialog.Close
								class="rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
								aria-label="Close menu"
							>
								<XIcon class="size-5" />
							</Dialog.Close>
						</div>
						<nav aria-label="Mobile" class="flex flex-col p-2">
							{#each NAV_LINKS as link (link.href)}
								<a
									href={link.href}
									onclick={() => (open = false)}
									aria-current={isActive(link.href) ? 'page' : undefined}
									class={cn(
										'flex items-center justify-between gap-2 border-l-2 border-transparent px-3 py-3 text-base font-medium transition-colors hover:bg-muted',
										isActive(link.href) && 'border-primary bg-muted'
									)}
								>
									{link.label}
									<ArrowRightIcon class="size-4 shrink-0 text-muted-foreground" />
								</a>
							{/each}
						</nav>
						<div class="mt-auto space-y-2 border-t p-3">
							<Button href={QUOTE_HREF} onclick={() => (open = false)} class="w-full px-3">
								{QUOTE_LABEL}
							</Button>
							<Button href="tel:+{phone.number}" variant="outline" class="w-full px-3">
								<PhoneIcon /> Call
							</Button>
							<Button
								href={whatsappHref(settings, page.data.whatsapp)}
								target="_blank"
								rel="noopener"
								variant="whatsapp"
								class="w-full px-3"
							>
								<WhatsAppIcon class="size-4" /> WhatsApp
							</Button>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	</div>
</header>
