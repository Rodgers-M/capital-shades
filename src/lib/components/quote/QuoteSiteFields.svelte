<script lang="ts">
	import Field from '$lib/components/forms/Field.svelte';
	import ChoiceGroup from './ChoiceGroup.svelte';
	import PhotoUpload from './PhotoUpload.svelte';
	import { MATERIALS, VEHICLE_COUNTS, VEHICLE_STRUCTURE } from '$lib/enquiry';
	import { fieldId, type QuoteErrors, type QuoteValues } from './steps';
	import type { SitePhoto } from './photos';

	/** Step 2 — the site: location, rough size, conditional vehicle count, material and photos. */
	let {
		values = $bindable(),
		photos = $bindable(),
		errors
	}: { values: QuoteValues; photos: SitePhoto[]; errors: QuoteErrors } = $props();

	const asksVehicles = $derived(values.structure === VEHICLE_STRUCTURE);
</script>

<div class="space-y-8">
	<Field
		id={fieldId('location')}
		name="location"
		label="Where is the site?"
		hint="The area and town are enough for now."
		placeholder="e.g. Karen, Nairobi"
		required
		bind:value={values.location}
		error={errors.location}
	/>

	<fieldset aria-describedby="q-size-hint">
		<legend class="text-base font-semibold">
			Approximate size <span class="font-normal text-muted-foreground">(optional)</span>
		</legend>
		<p id="q-size-hint" class="mt-1 text-sm text-muted-foreground">
			Rough measurements are fine — we confirm measurements during the site visit.
		</p>
		<div class="mt-3 grid grid-cols-2 gap-3 sm:max-w-md">
			<Field
				id={fieldId('width')}
				name="width"
				label="Width (m)"
				inputmode="decimal"
				placeholder="e.g. 6"
				bind:value={values.width}
				error={errors.width}
			/>
			<Field
				id={fieldId('length')}
				name="length"
				label="Length (m)"
				inputmode="decimal"
				placeholder="e.g. 5"
				bind:value={values.length}
				error={errors.length}
			/>
		</div>
	</fieldset>

	<!-- Always shown without JavaScript, where it can't react to the structure choice -->
	<div class="quote-reveal data-inactive:hidden" data-inactive={!asksVehicles || undefined}>
		<ChoiceGroup
			id={fieldId('vehicles')}
			name="vehicles"
			legend="How many vehicles need cover?"
			hint="For car parking shades."
			options={VEHICLE_COUNTS}
			layout="inline"
			bind:value={values.vehicles}
		/>
	</div>

	<ChoiceGroup
		id={fieldId('material')}
		name="material"
		legend="Material preference"
		hint="If you already know what you’d like."
		options={MATERIALS}
		columns={3}
		bind:value={values.material}
	/>

	<PhotoUpload id="q-photos" bind:photos />

	<Field
		id={fieldId('message')}
		name="message"
		label="Anything else we should know?"
		placeholder="e.g. timing, colours, existing structures, access to the site"
		multiline
		rows={4}
		bind:value={values.message}
	/>
</div>
