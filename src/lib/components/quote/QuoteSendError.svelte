<script lang="ts">
	import { PhoneIcon } from '@lucide/svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import type { PublicSiteSettings } from '$lib/content/types';

	/** Shown when sending fails: retry without photos, or reach the team directly. */
	let {
		message,
		hasPhotos,
		whatsappHref,
		phone,
		onretrywithoutphotos
	}: {
		message: string;
		hasPhotos: boolean;
		/** Pre-filled with the visitor's answers */
		whatsappHref: string;
		phone: PublicSiteSettings['primaryPhone'];
		onretrywithoutphotos: () => void;
	} = $props();

	const action =
		'inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4';
</script>

<div class="mt-6 border-l-2 border-destructive bg-destructive/5 p-4 text-sm" role="alert">
	<p class="font-semibold text-destructive">{message}</p>
	<ul class="mt-3 space-y-2">
		{#if hasPhotos}
			<li>
				<button type="button" onclick={onretrywithoutphotos} class={action}>
					Try again without photos
				</button>
			</li>
		{/if}
		<li>
			<a href={whatsappHref} target="_blank" rel="noopener" class={action}>
				<WhatsAppIcon class="size-4 text-brand-strong" />
				Send these details on WhatsApp{hasPhotos ? ' (attach your photos in the chat)' : ''}
				<span class="sr-only">(opens in a new tab)</span>
			</a>
		</li>
		<li>
			<a href="tel:+{phone.number}" class={action}>
				<PhoneIcon class="size-4" aria-hidden="true" />
				Call {phone.display}
			</a>
		</li>
	</ul>
</div>
