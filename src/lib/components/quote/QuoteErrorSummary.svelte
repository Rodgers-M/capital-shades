<script lang="ts">
	import type { EnquiryField } from '$lib/enquiry';
	import { FIELD_NAMES, fieldId, type QuoteErrors } from './steps';

	/**
	 * Lists the current step's errors, each linking to its field. QuoteFlow
	 * focuses `element` when the summary is (re)shown.
	 */
	let {
		fields,
		errors,
		element = $bindable()
	}: { fields: EnquiryField[]; errors: QuoteErrors; element?: HTMLElement } = $props();

	// Radios sit inside a fieldset, so focus the first one rather than jumping to the group
	function focusField(event: MouseEvent, field: EnquiryField) {
		const target = document.getElementById(fieldId(field));
		const control = target?.matches('input, textarea') ? target : target?.querySelector('input');
		if (!control) return;
		event.preventDefault();
		control.focus();
	}
</script>

<div
	bind:this={element}
	tabindex="-1"
	role="alert"
	aria-labelledby="q-error-title"
	class="mb-8 border-l-2 border-destructive bg-destructive/5 p-4 outline-none"
>
	<p id="q-error-title" class="font-semibold text-destructive">
		Please check {fields.length === 1 ? 'this answer' : 'these answers'}:
	</p>
	<ul class="mt-2 space-y-1 text-sm">
		{#each fields as field (field)}
			<li>
				<a
					href="#{fieldId(field)}"
					onclick={(event) => focusField(event, field)}
					class="underline underline-offset-4"
				>
					{FIELD_NAMES[field] ?? field}: {errors[field]}
				</a>
			</li>
		{/each}
	</ul>
</div>
