<script lang="ts">
	import { page } from '$app/state';
	import { Dialog } from 'bits-ui';
	import { ArrowRightIcon, MenuIcon, PhoneIcon, XIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import SiteLogo from './SiteLogo.svelte';
	import { NAV_LINKS, QUOTE_HREF, QUOTE_LABEL } from '$lib/nav';
	import { cn, whatsappLink } from '$lib/utils';
	import type { SiteSettings } from '$lib/content/types';

	let { settings }: { settings: SiteSettings } = $props();
	let open = $state(false);

	const phone = $derived(settings.phones[0]);
	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<header class="sticky top-0 z-40 w-full">
	<div class="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
		<div class="container-page flex h-16 items-center justify-between gap-6 md:h-20">
			<SiteLogo />

			<nav aria-label="Main" class="hidden items-center gap-1 lg:flex">
				{#each NAV_LINKS as link (link.href)}
					<a
						href={link.href}
						aria-current={isActive(link.href) ? 'page' : undefined}
						class={cn(
							'relative rounded-md px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground',
							isActive(link.href) &&
								'text-foreground after:absolute after:inset-x-3.5 after:-bottom-[22px] after:h-[3px] after:rounded-full after:bg-primary'
						)}
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2 lg:gap-3">
				<!-- Tablets and up: labelled number -->
				<a
					href="tel:+{phone.number}"
					class="group hidden items-center gap-2.5 rounded-md py-1.5 pr-2 md:inline-flex"
				>
					<span
						class="flex size-9 items-center justify-center rounded-full bg-primary/15 text-accent-strong transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
						aria-hidden="true"
					>
						<PhoneIcon class="size-4" />
					</span>
					<span class="leading-tight">
						<span class="block text-[11px] font-semibold text-muted-foreground">Call us</span>
						<span class="block text-sm font-bold whitespace-nowrap">{phone.display}</span>
					</span>
				</a>
				<Button href={QUOTE_HREF} class="hidden sm:inline-flex">
					{QUOTE_LABEL}
					<ArrowRightIcon />
				</Button>

				<!-- Phones: compact call button beside the menu (number shown, "Call" under 340px) -->
				<a
					href="tel:+{phone.number}"
					aria-label="Call {phone.display}"
					class="inline-flex h-11 items-center gap-1.5 rounded-md bg-primary/15 px-3 text-sm font-bold whitespace-nowrap text-foreground transition-colors hover:bg-primary md:hidden"
				>
					<PhoneIcon class="size-4 text-accent-strong" />
					<span class="max-[339px]:hidden">{phone.display}</span>
					<span class="min-[340px]:hidden">Call</span>
				</a>

				<Dialog.Root bind:open>
					<Dialog.Trigger
						class="inline-flex size-11 items-center justify-center rounded-md border bg-card text-foreground lg:hidden"
						aria-label="Open menu"
					>
						<MenuIcon class="size-5" />
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay
							class="fixed inset-0 z-50 bg-ink/60 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
						/>
						<Dialog.Content
							class="fixed inset-y-0 right-0 z-50 flex w-[88%] flex-col bg-card shadow-2xl data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in sm:max-w-sm"
						>
							<div class="flex items-center justify-between border-b p-5">
								<Dialog.Title class="sr-only">Menu</Dialog.Title>
								<SiteLogo />
								<Dialog.Close
									class="rounded-md p-2 text-muted-foreground hover:bg-muted"
									aria-label="Close menu"
								>
									<XIcon class="size-5" />
								</Dialog.Close>
							</div>
							<nav aria-label="Mobile" class="flex flex-col p-3">
								{#each NAV_LINKS as link (link.href)}
									<a
										href={link.href}
										onclick={() => (open = false)}
										aria-current={isActive(link.href) ? 'page' : undefined}
										class={cn(
											'flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-semibold transition-colors hover:bg-muted',
											isActive(link.href) && 'bg-primary/10'
										)}
									>
										{link.label}
										<ArrowRightIcon class="size-4 text-muted-foreground" />
									</a>
								{/each}
							</nav>
							<div class="mt-auto space-y-3 border-t p-5">
								<Button href={QUOTE_HREF} onclick={() => (open = false)} class="h-12 w-full">
									{QUOTE_LABEL}
								</Button>
								<div class="grid grid-cols-2 gap-2">
									<Button href="tel:+{phone.number}" variant="outline">
										<PhoneIcon /> Call
									</Button>
									<Button
										href={whatsappLink(settings.whatsapp.number)}
										target="_blank"
										rel="noopener"
										variant="whatsapp"
									>
										<WhatsAppIcon class="size-4" /> WhatsApp
									</Button>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</div>
		</div>
	</div>
</header>
