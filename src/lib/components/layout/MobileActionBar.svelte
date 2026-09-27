<script lang="ts">
	import { PhoneIcon } from '@lucide/svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import { whatsappLink } from '$lib/utils';
	import type { SiteSettings } from '$lib/content/types';

	let { settings }: { settings: SiteSettings } = $props();
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink-border bg-ink/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
>
	<a
		href={whatsappLink(settings.whatsapp.number, "Hi Capital Shades, I'd like a quote")}
		target="_blank"
		rel="noopener"
		class="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp text-sm font-bold text-whatsapp-foreground shadow-lg shadow-whatsapp/20 active:scale-[0.98]"
	>
		<WhatsAppIcon class="size-5" />
		Chat on WhatsApp
	</a>
	<a
		href="tel:+{settings.phones[0].number}"
		class="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 active:scale-[0.98]"
	>
		<PhoneIcon class="size-5" />
		Call Us Now
	</a>
</div>
