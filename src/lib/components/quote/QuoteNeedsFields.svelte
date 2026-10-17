<script lang="ts">
	import Field from '$lib/components/forms/Field.svelte';
	import ChoiceGroup from './ChoiceGroup.svelte';
	import { SITE_TYPES, STRUCTURES } from '$lib/enquiry';
	import { fieldId, type QuoteErrors, type QuoteValues } from './steps';

	/** Step 1 — what the visitor needs. */
	let { values = $bindable(), errors }: { values: QuoteValues; errors: QuoteErrors } = $props();
</script>

<div class="space-y-8">
	<ChoiceGroup
		id={fieldId('structure')}
		name="structure"
		legend="Which structure are you interested in?"
		options={STRUCTURES}
		required
		bind:value={values.structure}
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
