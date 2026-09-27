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
		ShoppingBagIcon,
		SunIcon,
		UsersIcon
	} from '@lucide/svelte';
	import type { Component } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
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

	const STEPS = [
		{ key: 'application', label: 'Application', title: 'Where will the shade be installed?' },
		{ key: 'size', label: 'Size', title: 'How much cover do you need?' },
		{ key: 'material', label: 'Material', title: 'Choose your material' }
	] as const;

	const NEXT_STEPS = [
		'We review your request and call you back',
		'We visit to evaluate and measure the site',
		'You receive a design proposal and quote'
	];

	let step = $state(0);
	let selections = $state({ application: '', size: '', material: '' });
	let dialogOpen = $state(false);
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errors = $state<Record<string, string>>({});
	let errorMessage = $state('');
	let contact = $state({ name: '', phone: '', location: '', message: '' });

	const values = $derived([selections.application, selections.size, selections.material]);
	const complete = $derived(values.every(Boolean));
	const progress = $derived((values.filter(Boolean).length / STEPS.length) * 100);
	const summary = $derived([
		{ label: 'Application', value: labelFor(APPLICATIONS, selections.application) },
		{ label: 'Size', value: labelFor(SIZES, selections.size) },
		{ label: 'Material', value: labelFor(MATERIALS, selections.material) }
	]);

	const whatsappFallback = $derived(
		whatsappLink(
			settings.whatsapp.number,
			summarise({ kind: 'assessment', email: '', product: '', ...contact, ...selections })
		)
	);

	function options(index: number) {
		return index === 0 ? APPLICATIONS : index === 1 ? SIZES : MATERIALS;
	}

	function select(value: string) {
		selections[STEPS[step].key] = value;
		// Move on automatically — one tap per step on mobile
		if (step < STEPS.length - 1) step += 1;
	}

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		status = 'submitting';
		const result = await submitEnquiry(event.currentTarget as HTMLFormElement);
		if (result.status === 'success') {
			status = 'success';
		} else if (result.status === 'invalid') {
			errors = result.errors;
			status = 'idle';
		} else {
			errorMessage = result.message;
			status = 'error';
		}
	}

	function onOpenChange(open: boolean) {
		if (!open && status === 'success') {
			step = 0;
			selections = { application: '', size: '', material: '' };
			contact = { name: '', phone: '', location: '', message: '' };
			status = 'idle';
		}
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
	<div class="rounded-2xl border bg-card p-4 shadow-sm sm:p-6 lg:col-span-8 lg:p-8">
		<ol class="grid grid-cols-3 gap-2">
			{#each STEPS as s, i (s.key)}
				{@const done = Boolean(values[i])}
				{@const active = i === step}
				<li>
					<button
						type="button"
						disabled={!(i === 0 || values.slice(0, i).every(Boolean))}
						onclick={() => (step = i)}
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
									'flex size-5 items-center justify-center rounded-full text-[10px] font-bold',
									active
										? 'bg-primary text-primary-foreground'
										: done
											? 'bg-foreground text-background'
											: 'bg-muted text-muted-foreground'
								)}
							>
								{#if done && !active}<CheckIcon class="size-3" strokeWidth={3} />{:else}{i + 1}{/if}
							</span>
							<span class={active ? 'text-foreground' : 'text-muted-foreground'}>{s.label}</span>
						</span>
					</button>
				</li>
			{/each}
		</ol>

		<fieldset class="mt-7">
			<legend class="contents">
				<span class="block text-xs font-bold tracking-[0.2em] text-accent-strong uppercase">
					Step {step + 1} of {STEPS.length}
				</span>
				<span class="mt-1.5 block text-xl font-extrabold tracking-tight sm:text-2xl">
					{STEPS[step].title}
				</span>
			</legend>

			<div class={cn('mt-5 grid gap-3', step === 1 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
				{#each options(step) as option (option.value)}
					{@const selected = selections[STEPS[step].key] === option.value}
					{@const Icon = ICONS[option.value]}
					<button
						type="button"
						onclick={() => select(option.value)}
						aria-pressed={selected}
						class={cn(
							'relative flex w-full items-start gap-3 rounded-xl border-2 bg-card p-4 text-left transition-all hover:border-primary/60',
							selected ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-border'
						)}
					>
						<span
							class={cn(
								'flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors',
								selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
							)}
						>
							<Icon class="size-5" />
						</span>
						<span class="min-w-0 flex-1">
							<span class="block font-bold">{option.label}</span>
							<span class="mt-0.5 block text-sm text-muted-foreground">{option.hint}</span>
							{#if 'perks' in option && option.perks.length}
								<span class="mt-3 block space-y-1.5">
									{#each option.perks as perk (perk)}
										<span class="flex items-center gap-1.5 text-xs font-medium">
											<CheckIcon class="size-3.5 text-accent-strong" strokeWidth={3} />
											{perk}
										</span>
									{/each}
								</span>
							{/if}
						</span>
						<span
							class={cn(
								'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
								selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
							)}
						>
							{#if selected}<CheckIcon class="size-3" strokeWidth={3} />{/if}
						</span>
					</button>
				{/each}
			</div>
		</fieldset>

		<div class="mt-7 flex items-center justify-between gap-3 border-t pt-5">
			<Button variant="ghost" onclick={() => (step = Math.max(0, step - 1))} disabled={step === 0}>
				<ArrowLeftIcon /> Back
			</Button>
			{#if step < STEPS.length - 1}
				<Button variant="ink" onclick={() => (step += 1)} disabled={!values[step]}>
					Continue <ArrowRightIcon />
				</Button>
			{:else}
				<Button onclick={() => (dialogOpen = true)} disabled={!complete} class="lg:hidden">
					Continue
				</Button>
			{/if}
		</div>
	</div>

	<aside
		class="relative overflow-hidden rounded-2xl bg-ink p-5 text-on-ink shadow-xl sm:p-6 lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
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

			<Button
				onclick={() => (dialogOpen = true)}
				disabled={!complete}
				class="mt-6 hidden h-12 w-full text-base shadow-lg shadow-primary/30 lg:inline-flex"
			>
				Request Site Assessment <ArrowRightIcon />
			</Button>
			{#if !complete}
				<p class="mt-2 hidden text-center text-xs text-on-ink-subtle lg:block">
					Complete all 3 steps to continue
				</p>
			{/if}
		</div>
	</aside>
</div>

<Modal
	bind:open={dialogOpen}
	{onOpenChange}
	title={status === 'success' ? 'Request received' : 'Book your site assessment'}
	description={status === 'success'
		? undefined
		: summary
				.map((row) => row.value)
				.filter(Boolean)
				.join(' · ')}
>
	{#if status === 'success'}
		<div class="text-center">
			<div
				class="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15 text-success-strong"
			>
				<CheckIcon class="size-7" strokeWidth={3} />
			</div>
			<p class="mt-4 text-muted-foreground">
				Thanks {contact.name.split(' ')[0]} — we'll call you on {contact.phone} to arrange your site visit.
			</p>
			<Button class="mt-6 h-11 w-full" onclick={() => ((dialogOpen = false), onOpenChange(false))}>
				Done
			</Button>
		</div>
	{:else}
		<form {onsubmit} class="space-y-4">
			<input type="hidden" name="kind" value="assessment" />
			<input type="hidden" name="application" value={selections.application} />
			<input type="hidden" name="size" value={selections.size} />
			<input type="hidden" name="material" value={selections.material} />
			<!-- Honeypot: hidden from people, bots fill it in -->
			<input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" />

			<Field
				id="est-name"
				name="name"
				label="Full name"
				required
				autocomplete="name"
				bind:value={contact.name}
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
			<Field
				id="est-location"
				name="location"
				label="Site location"
				required
				placeholder="e.g. Westlands, Nairobi"
				bind:value={contact.location}
				error={errors.location}
			/>
			<Field
				id="est-message"
				name="message"
				label="Anything else we should know?"
				multiline
				bind:value={contact.message}
			/>

			{#if status === 'error'}
				<div class="rounded-lg bg-accent/10 p-3 text-sm">
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

			<Button type="submit" class="h-12 w-full text-base" disabled={status === 'submitting'}>
				{status === 'submitting' ? 'Sending…' : 'Request Site Assessment'}
			</Button>
		</form>
	{/if}
</Modal>
