<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { ArrowRightIcon } from '@lucide/svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { submitEnquiry, type SubmitErrorCause } from '$lib/components/forms/submitEnquiry';
	import QuoteContactFields from './QuoteContactFields.svelte';
	import QuoteErrorSummary from './QuoteErrorSummary.svelte';
	import QuoteNeedsFields from './QuoteNeedsFields.svelte';
	import QuoteProgress from './QuoteProgress.svelte';
	import QuoteSendError from './QuoteSendError.svelte';
	import QuoteSiteFields from './QuoteSiteFields.svelte';
	import QuoteStep from './QuoteStep.svelte';
	import QuoteStepNav from './QuoteStepNav.svelte';
	import QuoteSuccess from './QuoteSuccess.svelte';
	import { withinBudget, type SitePhoto } from './photos';
	import { QUOTE_STEPS, stepFields, type QuoteErrors, type QuoteValues } from './steps';
	import {
		EMPTY_ENQUIRY,
		VEHICLE_STRUCTURE,
		materialFor,
		summarise,
		validateEnquiry,
		type Enquiry,
		type EnquiryField
	} from '$lib/enquiry';
	import { QUOTE_LABEL } from '$lib/nav';
	import { whatsappLink } from '$lib/utils';
	import type { PublicSiteSettings } from '$lib/content/types';

	/*
	 * Three-step quote request (docs/design-direction.md — "Quote-flow
	 * direction"). Holds the answers, step navigation, validation and sending;
	 * each step's fields live in their own component.
	 *
	 * All steps are one server-rendered form posting to /api/enquiry, so it
	 * still works without JavaScript: every step shows at once (see the
	 * <noscript> styles) and the browser validates required fields. With
	 * JavaScript, one step shows at a time, each step is checked before moving
	 * on, and photos are downsized before sending.
	 */
	let { settings }: { settings: PublicSiteSettings } = $props();

	const LAST = QUOTE_STEPS.length - 1;
	const PHOTO_PREP_TIMEOUT = 20_000;

	let values = $state<QuoteValues>({ ...EMPTY_ENQUIRY });
	let photos = $state<SitePhoto[]>([]);
	let step = $state(0);
	let enhanced = $state(false);
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	/** Fields flagged after Continue/Submit; each clears once it is valid */
	let flagged = $state<EnquiryField[]>([]);
	let showSummary = $state(false);
	/** The last failed send, and whether it carried photos */
	let sendError = $state<{ message: string; cause: SubmitErrorCause; hadPhotos: boolean }>();
	/** Errors only the server reported; replaced on each send */
	let serverErrors = $state<QuoteErrors>({});
	/** The last send left photos out (on request, failed, or over the upload budget) */
	let photosLeftOut = $state(false);

	let root = $state<HTMLElement>();
	let form = $state<HTMLFormElement>();
	let summaryBox = $state<HTMLElement>();
	const headings: (HTMLElement | undefined)[] = $state([]);

	onMount(() => (enhanced = true));

	// Trimmed like the server does, so a lone space doesn't count as an answer
	const enquiry = $derived<Enquiry>({
		...(Object.fromEntries(
			Object.entries(values).map(([key, value]) => [key, value.trim()])
		) as QuoteValues),
		kind: 'quote',
		vehicles: values.structure === VEHICLE_STRUCTURE ? values.vehicles : '',
		material: materialFor(values.structure, values.material)
	});
	const invalid = $derived(validateEnquiry(enquiry));
	const errors = $derived<QuoteErrors>({
		...serverErrors,
		...Object.fromEntries(flagged.filter((f) => invalid[f]).map((f) => [f, invalid[f]]))
	});
	const stepErrors = $derived(stepFields(step).filter((f) => errors[f]));

	const readyPhotos = $derived(photos.filter((p) => p.status === 'ready'));
	const preparing = $derived(photos.some((p) => p.status === 'preparing'));
	const whatsappFallback = $derived(
		whatsappLink(
			settings.whatsapp.number,
			`Hi ${settings.name}, I'd like to request a quote.\n\n${summarise(enquiry, {
				photos: readyPhotos.length,
				compact: true
			})}`
		)
	);

	const invalidIn = (index: number) => stepFields(index).filter((f) => invalid[f]);

	async function goTo(index: number) {
		step = index;
		showSummary = false;
		await tick();
		root?.scrollIntoView({ block: 'start' });
		headings[index]?.focus({ preventScroll: true });
	}

	async function flag(fields: EnquiryField[]) {
		flagged = [...new Set([...flagged, ...fields])];
		showSummary = true;
		await tick();
		summaryBox?.focus();
	}

	function next() {
		const problems = invalidIn(step);
		if (problems.length) flag(problems);
		else goTo(step + 1);
	}

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		// Enter in a text field submits the form: treat it as Continue
		if (step < LAST) return next();

		const problems = Object.keys(invalid) as EnquiryField[];
		if (problems.length) {
			const first = QUOTE_STEPS.findIndex((_, i) => invalidIn(i).length);
			if (first !== step) await goTo(first);
			return flag(problems);
		}

		send({ withPhotos: true });
	}

	async function send({ withPhotos }: { withPhotos: boolean }) {
		if (!form) return;
		status = 'submitting';
		serverErrors = {};
		// Photos still preparing after this are left out rather than holding up the send
		const giveUpAt = Date.now() + PHOTO_PREP_TIMEOUT;
		while (photos.some((p) => p.status === 'preparing') && Date.now() < giveUpAt) {
			await new Promise((resolve) => setTimeout(resolve, 150));
		}

		const data = new FormData(form);
		// Send the downsized copies instead of whatever the file input holds
		data.delete('photos');
		const sending = withPhotos ? withinBudget(photos).send : [];
		photosLeftOut = sending.length < photos.length;
		for (const photo of sending) {
			if (photo.blob) data.append('photos', photo.blob, 'site-photo');
		}

		const result = await submitEnquiry(data);
		if (result.status === 'success') {
			status = 'success';
			await tick();
			root?.scrollIntoView({ block: 'start' });
		} else if (result.status === 'invalid') {
			status = 'idle';
			serverErrors = result.errors;
			const fields = Object.keys(result.errors) as EnquiryField[];
			const first = QUOTE_STEPS.findIndex((_, i) => stepFields(i).some((f) => fields.includes(f)));
			if (first !== -1 && first !== step) await goTo(first);
			flag(fields);
		} else {
			sendError = { message: result.message, cause: result.cause, hadPhotos: sending.length > 0 };
			status = 'error';
		}
	}

	function reset() {
		photos.forEach((p) => p.preview && URL.revokeObjectURL(p.preview));
		photos = [];
		values = { ...EMPTY_ENQUIRY };
		flagged = [];
		serverErrors = {};
		photosLeftOut = false;
		status = 'idle';
		goTo(0);
	}
</script>

<svelte:head>
	<!-- Without JavaScript: show every step; hide step controls and the photo picker -->
	<noscript>
		<style>
			.quote-step,
			.quote-reveal {
				display: block;
			}
			.quote-js {
				display: none;
			}
		</style>
	</noscript>
</svelte:head>

{#snippet continueNav(index: number)}
	<QuoteStepNav class="quote-js" onback={index > 0 ? () => goTo(index - 1) : undefined}>
		<Button type="button" size="lg" onclick={next}>
			Continue <ArrowRightIcon />
		</Button>
	</QuoteStepNav>
{/snippet}

{#snippet sendNav()}
	<QuoteStepNav onback={() => goTo(LAST - 1)}>
		<Button type="submit" size="lg" disabled={status === 'submitting'}>
			{#if status === 'submitting'}
				{preparing ? 'Preparing photos…' : 'Sending…'}
			{:else}
				Send request <ArrowRightIcon />
			{/if}
		</Button>
	</QuoteStepNav>
{/snippet}

<div bind:this={root} class="scroll-mt-24">
	{#if status === 'success'}
		<QuoteSuccess
			{enquiry}
			photosLeftOut={photosLeftOut && photos.length > 0}
			whatsappHref={whatsappFallback}
			onreset={reset}
		/>
	{:else}
		<QuoteProgress steps={QUOTE_STEPS.map((s) => s.title)} current={step} onselect={goTo} />

		<form
			bind:this={form}
			method="POST"
			action="/api/enquiry"
			enctype="multipart/form-data"
			novalidate={enhanced}
			aria-label={QUOTE_LABEL}
			class="mt-8"
			{onsubmit}
		>
			<input type="hidden" name="kind" value="quote" />
			<!-- Honeypot: hidden from people, bots fill it in -->
			<input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" />

			{#if showSummary && stepErrors.length}
				<QuoteErrorSummary fields={stepErrors} {errors} bind:element={summaryBox} />
			{/if}

			<QuoteStep
				index={0}
				total={QUOTE_STEPS.length}
				title={QUOTE_STEPS[0].title}
				active={step === 0}
				bind:heading={headings[0]}
			>
				<QuoteNeedsFields bind:values {errors} />
				{@render continueNav(0)}
			</QuoteStep>

			<QuoteStep
				index={1}
				total={QUOTE_STEPS.length}
				title={QUOTE_STEPS[1].title}
				active={step === 1}
				bind:heading={headings[1]}
			>
				<QuoteSiteFields bind:values bind:photos {errors} />
				{@render continueNav(1)}
			</QuoteStep>

			<QuoteStep
				index={2}
				total={QUOTE_STEPS.length}
				title={QUOTE_STEPS[2].title}
				active={step === 2}
				bind:heading={headings[2]}
			>
				<QuoteContactFields bind:values {errors} />

				<p
					class="mt-8 border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground"
				>
					Project details and site photos can help the team make an initial assessment. A final
					quotation follows the site visit and confirmed measurements.
				</p>

				{#if status === 'error' && sendError}
					<QuoteSendError
						message={sendError.message}
						hasPhotos={readyPhotos.length > 0}
						canRetryWithoutPhotos={sendError.hadPhotos && sendError.cause !== 'server'}
						whatsappHref={whatsappFallback}
						phone={settings.primaryPhone}
						onretrywithoutphotos={() => send({ withPhotos: false })}
					/>
				{/if}

				{@render sendNav()}
			</QuoteStep>
		</form>
	{/if}
</div>
