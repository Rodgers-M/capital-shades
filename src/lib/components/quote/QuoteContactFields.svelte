<script lang="ts">
	import Field from '$lib/components/forms/Field.svelte';
	import ChoiceGroup from './ChoiceGroup.svelte';
	import { CONTACT_METHODS } from '$lib/enquiry';
	import { fieldId, type QuoteErrors, type QuoteValues } from './steps';

	/** Step 3 — contact details. Email becomes required when it is the preferred method. */
	let { values = $bindable(), errors }: { values: QuoteValues; errors: QuoteErrors } = $props();
</script>

<div class="space-y-6">
	<div class="grid gap-6 sm:grid-cols-2">
		<Field
			id={fieldId('name')}
			name="name"
			label="Full name"
			autocomplete="name"
			required
			bind:value={values.name}
			error={errors.name}
		/>
		<Field
			id={fieldId('phone')}
			name="phone"
			label="Phone number"
			type="tel"
			autocomplete="tel"
			placeholder="e.g. 0712 345 678"
			hint="Outside Kenya? Include your country code."
			required
			bind:value={values.phone}
			error={errors.phone}
		/>
	</div>
	<Field
		id={fieldId('email')}
		name="email"
		label="Email"
		type="email"
		autocomplete="email"
		required={values.contactMethod === 'email'}
		bind:value={values.email}
		error={errors.email}
	/>
	<ChoiceGroup
		id={fieldId('contactMethod')}
		name="contactMethod"
		legend="How would you prefer we contact you?"
		options={CONTACT_METHODS}
		layout="inline"
		required
		bind:value={values.contactMethod}
		error={errors.contactMethod}
	/>
</div>
