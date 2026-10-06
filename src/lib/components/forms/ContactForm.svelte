<script lang="ts">
	import { CheckCircle2Icon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import Field from './Field.svelte';
	import { submitEnquiry } from './submitEnquiry';
	import { summarise } from '$lib/enquiry';
	import { whatsappLink } from '$lib/utils';
	import type { Product, PublicSiteSettings } from '$lib/content/types';

	let { settings, products }: { settings: PublicSiteSettings; products: Product[] } = $props();

	const EMPTY = { name: '', phone: '', email: '', location: '', product: '', message: '' };
	let form = $state({ ...EMPTY });
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let errorMessage = $state('');

	const whatsappFallback = $derived(
		whatsappLink(
			settings.whatsapp.number,
			summarise({ kind: 'contact', application: '', size: '', material: '', ...form })
		)
	);

	// Without JS the form posts to /api/enquiry and is redirected to /thank-you.
	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		status = 'submitting';
		const result = await submitEnquiry(event.currentTarget as HTMLFormElement);
		if (result.status === 'success') {
			status = 'success';
			errors = {};
		} else if (result.status === 'invalid') {
			errors = result.errors;
			status = 'idle';
		} else {
			errorMessage = result.message;
			status = 'error';
		}
	}
</script>

{#if status === 'success'}
	<div class="flex h-full flex-col items-center justify-center py-12 text-center" role="status">
		<CheckCircle2Icon class="size-14 text-success" />
		<h2 class="mt-4 text-2xl font-extrabold">Message sent</h2>
		<p class="mt-2 max-w-sm text-muted-foreground">
			Thanks {form.name.split(' ')[0]}. We'll get back to you on {form.phone} shortly.
		</p>
		<Button
			variant="outline"
			class="mt-6"
			onclick={() => {
				form = { ...EMPTY };
				status = 'idle';
			}}
		>
			Send another enquiry
		</Button>
	</div>
{:else}
	<form method="POST" action="/api/enquiry" {onsubmit} class="space-y-4">
		<h2 class="text-xl font-extrabold">Send an enquiry</h2>
		<input type="hidden" name="kind" value="contact" />
		<input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" />

		<div class="grid gap-4 sm:grid-cols-2">
			<Field
				id="c-name"
				name="name"
				label="Full name"
				required
				autocomplete="name"
				bind:value={form.name}
				error={errors.name}
			/>
			<Field
				id="c-phone"
				name="phone"
				label="Phone"
				type="tel"
				required
				autocomplete="tel"
				placeholder="07XX XXX XXX"
				bind:value={form.phone}
				error={errors.phone}
			/>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<Field
				id="c-email"
				name="email"
				label="Email"
				type="email"
				autocomplete="email"
				bind:value={form.email}
				error={errors.email}
			/>
			<div class="space-y-1.5">
				<label for="c-product" class="block text-sm font-semibold">
					Solution of interest <span class="font-normal text-muted-foreground">(optional)</span>
				</label>
				<select
					id="c-product"
					name="product"
					bind:value={form.product}
					class="h-11 w-full rounded-md border border-input bg-card px-3 text-base"
				>
					<option value="">Select a solution</option>
					{#each products as product (product.slug)}
						<option value={product.title}>{product.title}</option>
					{/each}
					<option value="Other">Something else</option>
				</select>
			</div>
		</div>
		<Field
			id="c-location"
			name="location"
			label="Site location"
			placeholder="e.g. Karen, Nairobi"
			bind:value={form.location}
		/>
		<Field
			id="c-message"
			name="message"
			label="Project details"
			multiline
			placeholder="Approximate size, what you'd like covered, timeline…"
			bind:value={form.message}
		/>

		{#if status === 'error'}
			<div class="rounded-lg bg-destructive/10 p-3 text-sm" role="alert">
				<p class="font-semibold text-destructive">{errorMessage}</p>
				<a
					href={whatsappFallback}
					target="_blank"
					rel="noopener"
					class="mt-2 inline-flex items-center gap-1.5 font-bold underline"
				>
					<WhatsAppIcon class="size-4" /> Send this on WhatsApp instead
				</a>
			</div>
		{/if}

		<Button
			type="submit"
			class="h-12 w-full text-base sm:w-auto sm:px-8"
			disabled={status === 'submitting'}
		>
			{status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
		</Button>
	</form>
{/if}
