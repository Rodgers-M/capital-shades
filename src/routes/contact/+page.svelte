<script lang="ts">
	import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { whatsappLink } from '$lib/utils';

	let { data } = $props();
	const settings = $derived(data.settings);

	const channels = $derived([
		{
			icon: PhoneIcon,
			label: 'Call us',
			value: settings.primaryPhone.display,
			href: `tel:+${settings.primaryPhone.number}`,
			external: false
		},
		{
			icon: WhatsAppIcon,
			label: 'WhatsApp',
			value: 'Chat with our team',
			href: whatsappLink(settings.whatsapp.number, "Hi Capital Shades, I'd like a quote"),
			external: true
		},
		{
			icon: MailIcon,
			label: 'Email',
			value: settings.email,
			href: `mailto:${settings.email}`,
			external: false
		}
	]);
</script>

<Seo
	title="Contact Us"
	description="Call, WhatsApp or email Capital Shades about car park shades, shade sails, canopies and tensile structures in Kenya."
/>

<PageHero
	eyebrow="Contact"
	title="Let's shade your space."
	description="Call, WhatsApp or send us your project details — we'll get back to you to talk it through."
/>

<section class="container-page grid gap-6 section-y lg:grid-cols-5">
	<div class="space-y-3 lg:col-span-2">
		{#each channels as channel (channel.href)}
			<a
				href={channel.href}
				target={channel.external ? '_blank' : undefined}
				rel={channel.external ? 'noopener' : undefined}
				class="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary"
			>
				<span
					class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-primary"
				>
					<channel.icon class="size-5" />
				</span>
				<span>
					<span class="block text-xs font-bold tracking-wider text-muted-foreground uppercase">
						{channel.label}
					</span>
					<span class="block font-bold">{channel.value}</span>
				</span>
			</a>
		{/each}
		{#if settings.location || settings.hours}
			<div class="space-y-2 rounded-2xl bg-ink p-5 text-sm text-on-ink-muted">
				{#if settings.location}
					<p class="flex items-center gap-2">
						<MapPinIcon class="size-4 text-primary" />
						{settings.location}
					</p>
				{/if}
				{#if settings.hours}
					<p class="flex items-center gap-2">
						<ClockIcon class="size-4 text-primary" />
						{settings.hours}
					</p>
				{/if}
			</div>
		{/if}
	</div>

	<div class="rounded-2xl border bg-card p-5 shadow-sm md:p-8 lg:col-span-3">
		<ContactForm {settings} products={data.products} />
	</div>
</section>
