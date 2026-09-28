<script lang="ts">
	import {
		ArrowLeftIcon,
		ArrowRightIcon,
		Building2Icon,
		CarIcon,
		CheckIcon,
		CloudRainIcon,
		GraduationCapIcon,
		HelpCircleIcon,
		HomeIcon,
		MaximizeIcon,
		PlusIcon,
		ShoppingBagIcon,
		SunIcon,
		UsersIcon
	} from '@lucide/svelte';
	import { tick, type Component } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import WhatsAppIcon from '$lib/components/icons/WhatsAppIcon.svelte';
	import Field from './Field.svelte';
	import { submitEnquiry } from './submitEnquiry';
	import { APPLICATIONS, MATERIALS, SIZES, labelFor, summarise } from '$lib/enquiry';
	import { cn, whatsappLink } from '$lib/utils';
	import type { SiteSettings } from '$lib/content/types';

	let { settings, class: className }: { settings: SiteSettings; class?: string } = $props();

	const ICONS: Record<string, Component<{ class?: string }>> = {
		residential: HomeIcon,
		commercial: Building2Icon,
		school: GraduationCapIcon,
		shopping: ShoppingBagIcon,
		small: CarIcon,
		medium: UsersIcon,
		large: MaximizeIcon,
		mesh: SunIcon,
		pvc: CloudRainIcon,
		unsure: HelpCircleIcon
	};

	/*
	 * Journey: tap, tap, tap, then name/phone/location and submit — no pop-up.
	 * Every choice advances automatically; the details step is part of the card.
	 */
	const CHOICE_STEPS = [
		{
			key: 'application',
			label: 'Where',
			title: 'Where will the shade be installed?',
			options: APPLICATIONS
		},
		{ key: 'size', label: 'Size', title: 'How much cover do you need?', options: SIZES },
		{
			key: 'material',
			label: 'Material',
			title: 'Which material do you prefer?',
			options: MATERIALS
		}
	] as const;
	const STEP_LABELS = [...CHOICE_STEPS.map((s) => s.label), 'Details'];
	const DETAILS = CHOICE_STEPS.length;

	const NEXT_STEPS = [
		'We review your request and call you back',
		'We visit to evaluate and measure the site',
		'You receive a design proposal and quote'
	];

	let step = $state(0);
	let selections = $state({ application: '', size: '', material: '' });
	let contact = $state({ name: '', phone: '', location: '', message: '' });
	let showNote = $state(false);
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let errorMessage = $state('');
	let nameInput = $state<HTMLElement>();

	const values = $derived(CHOICE_STEPS.map((s) => selections[s.key]));
	const choicesDone = $derived(values.every(Boolean));
	const progress = $derived(
		((values.filter(Boolean).length + (status === 'success' ? 1 : 0)) / STEP_LABELS.length) * 100
	);
	const summary = $derived(
		CHOICE_STEPS.map((s) => ({ label: s.label, value: labelFor(s.options, selections[s.key]) }))
	);
	const whatsappFallback = $derived(
		whatsappLink(
			settings.whatsapp.number,
			summarise({ kind: 'assessment', email: '', product: '', ...contact, ...selections })
		)
	);

	const reachable = (i: number) => i === 0 || values.slice(0, i).every(Boolean);

	async function goTo(i: number) {
		step = i;
		if (i === DETAILS) {
			await tick();
			// The details step replaces the options in place, so don't jump the page
			nameInput?.focus({ preventScroll: true });
		}
	}

	function select(value: string) {
		selections[CHOICE_STEPS[step].key] = value;
		// Next unanswered step, or the details once all three are chosen
		const next = values.findIndex((v) => !v);
		goTo(next === -1 ? DETAILS : next);
	}

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

	function reset() {
		step = 0;
		selections = { application: '', size: '', material: '' };
		contact = { name: '', phone: '', location: '', message: '' };
		showNote = false;
		status = 'idle';
	}
</script>

<noscript>
	<p class="mb-4 rounded-xl border bg-card p-4 text-sm">
		The estimator needs JavaScript. You can still <a class="font-bold underline" href="/contact"
			>send us an enquiry</a
		>
		or call {settings.phones[0].display}.
	</p>
</noscript>

<div class={cn('grid gap-5 lg:grid-cols-12 lg:gap-6', className)}>
	<div class="rounded-2xl border bg-card p-4 shadow-sm sm:p-6 lg:col-span-8">
		{#if status === 'success'}
			<div class="py-8 text-center" role="status">
				<div
					class="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15 text-success-strong"
				>
					<CheckIcon class="size-7" strokeWidth={3} />
				</div>
				<h3 class="mt-4 text-xl font-extrabold">Request received</h3>
				<p class="mx-auto mt-2 max-w-sm text-muted-foreground">
					Thanks {contact.name.split(' ')[0]} — we'll call you on {contact.phone} to arrange your site
					visit.
				</p>
				<Button variant="outline" class="mt-6" onclick={reset}>Start another request</Button>
			</div>
		{:else}
			<ol class="grid grid-cols-4 gap-2">
				{#each STEP_LABELS as label, i (label)}
					{@const done = i < DETAILS && Boolean(values[i])}
					{@const active = i === step}
					<li>
						<button
							type="button"
							disabled={!reachable(i)}
							onclick={() => goTo(i)}
							aria-current={active ? 'step' : undefined}
							class="w-full text-left disabled:cursor-not-allowed"
						>
							<span
								class={cn(
									'block h-1.5 rounded-full transition-colors',
									active ? 'bg-primary' : done ? 'bg-foreground/80' : 'bg-muted'
								)}
							></span>
							<span class="mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
								<span
									class={cn(
										'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
										active
											? 'bg-primary text-primary-foreground'
											: done
												? 'bg-foreground text-background'
												: 'bg-muted text-muted-foreground'
									)}
								>
									{#if done && !active}<CheckIcon class="size-3" strokeWidth={3} />{:else}{i +
											1}{/if}
								</span>
								<span class={cn('truncate', active ? 'text-foreground' : 'text-muted-foreground')}>
									{label}
								</span>
							</span>
						</button>
					</li>
				{/each}
			</ol>

			{#if step < DETAILS}
				{@const current = CHOICE_STEPS[step]}
				<fieldset class="mt-4 sm:mt-5">
					<legend class="text-lg font-extrabold tracking-tight sm:text-xl">{current.title}</legend>
					<div
						class={cn(
							'mt-4 grid gap-2.5 sm:gap-3',
							step === 0 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
						)}
					>
						{#each current.options as option (option.value)}
							{@const selected = selections[current.key] === option.value}
							{@const Icon = ICONS[option.value]}
							<button
								type="button"
								onclick={() => select(option.value)}
								aria-pressed={selected}
								class={cn(
									'flex w-full items-center gap-3 rounded-xl border-2 bg-card p-3 text-left transition-all hover:border-primary/60 sm:items-start sm:p-4',
									selected
										? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
										: 'border-border'
								)}
							>
								<span
									class={cn(
										'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors sm:size-11',
										selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
									)}
								>
									<Icon class="size-5" />
								</span>
								<span class="min-w-0 flex-1">
									<span class="block text-sm leading-tight font-bold sm:text-base">
										{option.label}
									</span>
									<!-- The "where" options are self-explanatory; drop hints on phones to fit 2×2 -->
									<span
										class={cn(
											'mt-0.5 text-xs text-muted-foreground sm:block sm:text-sm',
											step === 0 ? 'hidden' : 'block'
										)}
									>
										{option.hint}
									</span>
									{#if 'perks' in option && option.perks.length}
										<span class="mt-3 hidden space-y-1.5 sm:block">
											{#each option.perks as perk (perk)}
												<span class="flex items-center gap-1.5 text-xs font-medium">
													<CheckIcon class="size-3.5 text-accent-strong" strokeWidth={3} />
													{perk}
												</span>
											{/each}
										</span>
									{/if}
								</span>
							</button>
						{/each}
					</div>
				</fieldset>
			{:else}
				<form class="mt-5" {onsubmit}>
					<h3 class="text-lg font-extrabold tracking-tight sm:text-xl">
						Where should we call you?
					</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{summary.map((row) => row.value).join(' · ')}
						<button
							type="button"
							class="ml-1 font-semibold text-accent-strong underline-offset-4 hover:underline"
							onclick={() => goTo(0)}
						>
							Change
						</button>
					</p>

					<input type="hidden" name="kind" value="assessment" />
					<input type="hidden" name="application" value={selections.application} />
					<input type="hidden" name="size" value={selections.size} />
					<input type="hidden" name="material" value={selections.material} />
					<!-- Honeypot: hidden from people, bots fill it in -->
					<input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" />

					<div class="mt-4 grid gap-3 sm:grid-cols-2">
						<Field
							id="est-name"
							name="name"
							label="Full name"
							required
							autocomplete="name"
							bind:value={contact.name}
							bind:input={nameInput}
							error={errors.name}
						/>
						<Field
							id="est-phone"
							name="phone"
							label="Phone number"
							type="tel"
							required
							autocomplete="tel"
							placeholder="07XX XXX XXX"
							bind:value={contact.phone}
							error={errors.phone}
						/>
						<div class="sm:col-span-2">
							<Field
								id="est-location"
								name="location"
								label="Site location"
								required
								placeholder="e.g. Westlands, Nairobi"
								bind:value={contact.location}
								error={errors.location}
							/>
						</div>
						{#if showNote}
							<div class="sm:col-span-2">
								<Field
									id="est-message"
									name="message"
									label="Anything else we should know?"
									multiline
									bind:value={contact.message}
								/>
							</div>
						{:else}
							<button
								type="button"
								class="inline-flex items-center gap-1 justify-self-start text-sm font-semibold text-accent-strong underline-offset-4 hover:underline"
								onclick={() => (showNote = true)}
							>
								<PlusIcon class="size-4" /> Add a note (optional)
							</button>
						{/if}
					</div>

					{#if status === 'error'}
						<div class="mt-4 rounded-lg bg-accent/10 p-3 text-sm" role="alert">
							<p class="font-semibold text-accent-strong">{errorMessage}</p>
							<a
								href={whatsappFallback}
								target="_blank"
								rel="noopener"
								class="mt-2 inline-flex items-center gap-1.5 font-bold underline"
							>
								<WhatsAppIcon class="size-4" /> Send these details on WhatsApp instead
							</a>
						</div>
					{/if}

					<Button
						type="submit"
						class="mt-5 h-12 w-full text-base shadow-lg shadow-primary/30 sm:w-auto sm:px-8"
						disabled={status === 'submitting'}
					>
						{status === 'submitting' ? 'Sending…' : 'Request Site Assessment'}
						<ArrowRightIcon />
					</Button>
					<p class="mt-3 text-xs text-muted-foreground">We'll call you to arrange a site visit.</p>
				</form>
			{/if}

			{#if step > 0}
				<div class="mt-5 border-t pt-4">
					<Button variant="ghost" size="sm" onclick={() => goTo(step - 1)}>
						<ArrowLeftIcon /> Back
					</Button>
				</div>
			{/if}
		{/if}
	</div>

	<!-- Desktop only: on phones the step bar and the details summary cover this -->
	<aside
		class="relative hidden overflow-hidden rounded-2xl bg-ink p-6 text-on-ink shadow-xl lg:sticky lg:top-32 lg:col-span-4 lg:block lg:self-start"
		aria-label="Your selection"
	>
		<div
			class="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/20 blur-3xl"
		></div>
		<div class="relative">
			<div class="flex items-center justify-between">
				<p class="eyebrow text-on-ink-subtle">Your project</p>
				<span class="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
			</div>
			<div class="mt-2 h-1 overflow-hidden rounded-full bg-on-ink/10">
				<div
					class="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
					style:width="{progress}%"
				></div>
			</div>

			<dl class="mt-4">
				{#each summary as row (row.label)}
					<div
						class="flex items-center justify-between gap-3 border-b border-on-ink/10 py-3 text-sm last:border-0"
					>
						<dt class="text-on-ink-subtle">{row.label}</dt>
						<dd class={cn('text-right font-semibold', !row.value && 'text-on-ink-subtle/60')}>
							{row.value ?? 'Not selected'}
						</dd>
					</div>
				{/each}
			</dl>

			<div class="mt-5 rounded-xl border border-on-ink/10 bg-on-ink/5 p-4">
				<p class="text-sm font-semibold">What happens next</p>
				<ol class="mt-3 space-y-2 text-sm text-on-ink-muted">
					{#each NEXT_STEPS as text, i (text)}
						<li class="flex gap-2.5">
							<span
								class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground"
							>
								{i + 1}
							</span>
							{text}
						</li>
					{/each}
				</ol>
			</div>
			{#if choicesDone && step < DETAILS}
				<Button onclick={() => goTo(DETAILS)} class="mt-5 w-full">
					Continue to your details <ArrowRightIcon />
				</Button>
			{/if}
		</div>
	</aside>
</div>
