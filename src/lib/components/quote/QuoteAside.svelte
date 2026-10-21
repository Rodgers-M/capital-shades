<script lang="ts">
	import { MailIcon, PhoneIcon } from '@lucide/svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { whatsappHref } from '$lib/whatsapp';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Expectations beside the quote flow: what happens after sending (from the
	 * confirmed project process), the site-visit and warranty wording from site
	 * settings, and the other ways to get in touch — the floating WhatsApp
	 * control is hidden on this page.
	 */
	let { settings }: { settings: PublicSiteSettings } = $props();

	const NEXT_STEPS = [
		{
			title: 'Initial discussion',
			text: 'We review your details and get in touch. Project details and site photos can help us make an initial assessment.'
		},
		{
			title: 'Site visit and measurements',
			text: 'We visit the site and take the measurements ourselves, so rough figures are fine for now.'
		},
		{
			title: 'Design or proposal, then quotation',
			text: 'Your final quotation follows the site visit and confirmed measurements.'
		}
	];

	const link =
		'group flex min-h-12 items-center gap-3 border-b border-foreground/15 py-3 text-sm transition-colors hover:text-primary-strong';
</script>

<aside aria-label="What happens next" class="space-y-10">
	<div>
		<h2 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
			What happens next
		</h2>
		<ol class="mt-5 space-y-5">
			{#each NEXT_STEPS as item, i (item.title)}
				<li class="grid grid-cols-[2rem_1fr] gap-3">
					<span class="text-sm font-semibold text-primary-strong tabular-nums" aria-hidden="true">
						{String(i + 1).padStart(2, '0')}
					</span>
					<div>
						<p class="font-semibold">{item.title}</p>
						<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
					</div>
				</li>
			{/each}
		</ol>
		{#if settings.siteVisitNote || settings.warrantyNote}
			<dl class="mt-6 space-y-4 border-t border-foreground/15 pt-5 text-sm leading-relaxed">
				{#if settings.siteVisitNote}
					<div>
						<dt class="font-semibold">Site visits</dt>
						<dd class="mt-1 text-muted-foreground">{settings.siteVisitNote}</dd>
					</div>
				{/if}
				{#if settings.warrantyNote}
					<div>
						<dt class="font-semibold">Warranty</dt>
						<dd class="mt-1 text-muted-foreground">{settings.warrantyNote}</dd>
					</div>
				{/if}
			</dl>
		{/if}
	</div>

	<div>
		<h2 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
			Prefer to talk?
		</h2>
		<ul class="mt-2">
			<li>
				<a href="tel:+{settings.primaryPhone.number}" class={link}>
					<PhoneIcon class="size-4 shrink-0" aria-hidden="true" />
					<span>Call <span class="font-semibold">{settings.primaryPhone.display}</span></span>
				</a>
			</li>
			<li>
				<a href={whatsappHref(settings)} target="_blank" rel="noopener" class={link}>
					<WhatsAppIcon class="size-4 shrink-0 text-brand-strong" />
					<span>
						WhatsApp <span class="font-semibold">{settings.whatsapp.display}</span>
						<span class="sr-only">(opens in a new tab)</span>
					</span>
				</a>
			</li>
			<li>
				<a href="mailto:{settings.email}" class={link}>
					<MailIcon class="size-4 shrink-0" aria-hidden="true" />
					<span class="min-w-0 break-words">
						Email <span class="font-semibold">{settings.email}</span>
					</span>
				</a>
			</li>
		</ul>
	</div>
</aside>
