<script lang="ts">
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { MATERIAL_ROWS, MATERIALS_ARTICLE } from '$lib/content/materials';

	// Lightweight guidance: the same mesh vs PVC comparison as /solutions, as two
	// side-by-side spec lists instead of a table so it reads well on phones.
	const COLUMNS = [
		{ title: 'Shade mesh', key: 'mesh' },
		{ title: 'PVC membrane', key: 'pvc' }
	] as const;
</script>

<section aria-labelledby="solution-guide" class="container-page section-y">
	<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<EditorialHeading
				id="solution-guide"
				eyebrow="Choosing a cover"
				title="Shade mesh or waterproof PVC?"
				description="The right cover depends on how the space is used. Here is how the two compare."
			/>
			<TextLink href={MATERIALS_ARTICLE.href} class="mt-8">Read the full comparison</TextLink>
		</div>

		<div class="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:col-span-7">
			{#each COLUMNS as column (column.key)}
				<div>
					<h3 class="border-b-2 border-primary pb-3 text-xl font-medium tracking-tight">
						{column.title}
					</h3>
					<dl>
						{#each MATERIAL_ROWS as row (row.label)}
							<div class="border-b py-4">
								<dt
									class="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
								>
									{row.label}
								</dt>
								<dd class="mt-1.5">{row[column.key]}</dd>
							</div>
						{/each}
					</dl>
				</div>
			{/each}
		</div>
	</div>
</section>
