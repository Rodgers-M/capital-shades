<script lang="ts">
	import Field from '$lib/components/forms/Field.svelte';
	import ChoiceGroup from './ChoiceGroup.svelte';
	import ChoiceSelect from './ChoiceSelect.svelte';
	import { SITE_TYPES, STRUCTURES, materialFor, type QuoteMaterials } from '$lib/enquiry';
	import { fieldId, type QuoteErrors, type QuoteValues } from './steps';

	/** Step 1 — what the visitor needs. */
	let {
		values = $bindable(),
		errors,
		quoteMaterials
	}: { values: QuoteValues; errors: QuoteErrors; quoteMaterials: QuoteMaterials } = $props();

	// A material the new structure doesn't offer is cleared, so it is never sent
	function setStructure(structure: string) {
		values.structure = structure;
		values.material = materialFor(structure, values.material, quoteMaterials);
	}
</script>

<div class="space-y-8">
	<ChoiceSelect
		id={fieldId('structure')}
		name="structure"
		label="Which structure are you interested in?"
		placeholder="Choose a structure"
		options={STRUCTURES}
		required
		bind:value={() => values.structure, setStructure}
		error={errors.structure}
	/>
	<ChoiceGroup
		id={fieldId('siteType')}
		name="siteType"
		legend="What type of site is it?"
		options={SITE_TYPES}
		columns={3}
		bind:value={values.siteType}
	/>
	<Field
		id={fieldId('use')}
		name="use"
		label="How will it be used?"
		placeholder="e.g. Covered parking for staff, shade over a play area"
		bind:value={values.use}
	/>
</div>
