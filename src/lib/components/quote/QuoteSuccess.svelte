<script lang="ts">
	import { onMount } from 'svelte';
	import { CheckCircle2Icon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { PROJECTS_HREF } from '$lib/nav';
	import type { Enquiry } from '$lib/enquiry';

	/** Confirmation after a quote request is sent. Takes focus when shown. */
	let {
		enquiry,
		photosLeftOut,
		whatsappHref,
		onreset
	}: {
		enquiry: Pick<Enquiry, 'name' | 'phone' | 'email' | 'contactMethod'>;
		/** Some chosen photos weren't sent (on request, failed or over the upload budget) */
		photosLeftOut: boolean;
		whatsappHref: string;
		onreset: () => void;
	} = $props();

	let heading = $state<HTMLElement>();
	onMount(() => heading?.focus({ preventScroll: true }));

	const firstName = $derived(enquiry.name.split(' ')[0]);
	const contactPromise = $derived(
		{
			phone: `by phone on ${enquiry.phone}`,
			whatsapp: `on WhatsApp at ${enquiry.phone}`,
			email: `by email at ${enquiry.email}`
		}[enquiry.contactMethod] ?? `on ${enquiry.phone}`
	);
</script>

<div class="border-t-2 border-primary pt-8">
	<CheckCircle2Icon class="size-10 text-success-strong" aria-hidden="true" />
	<h2
		bind:this={heading}
		tabindex="-1"
		class="mt-5 text-3xl leading-tight font-medium tracking-tight outline-none sm:text-4xl"
	>
		Thank you{firstName ? `, ${firstName}` : ''}. We’ve received your request.
	</h2>
	<p class="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
		We’ll be in touch {contactPromise} to talk through your project and arrange a site visit.
	</p>
	<p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">
		Any estimate shared before the visit is an initial one. Your final quotation follows the site
		visit and confirmed measurements.
	</p>
	{#if photosLeftOut}
		<p class="mt-3 max-w-xl leading-relaxed">
			Some or all of your photos weren’t sent with the form —
			<a
				href={whatsappHref}
				target="_blank"
				rel="noopener"
				class="font-semibold underline decoration-primary underline-offset-4"
			>
				share them on WhatsApp<span class="sr-only"> (opens in a new tab)</span>
			</a>.
		</p>
	{/if}
	<div class="mt-8 flex flex-col gap-3 sm:flex-row">
		<Button href={PROJECTS_HREF} variant="outline">See completed projects</Button>
		<Button variant="ghost" onclick={onreset}>Start another request</Button>
	</div>
</div>
