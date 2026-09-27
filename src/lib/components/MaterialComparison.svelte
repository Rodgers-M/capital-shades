<script lang="ts">
	import { CloudRainIcon, SunIcon } from '@lucide/svelte';
	import SectionHeading from './SectionHeading.svelte';

	const ROWS = [
		{
			label: 'Sun protection',
			mesh: 'Blocks most UV (varies by grade)',
			pvc: 'Blocks direct sun fully'
		},
		{ label: 'Rain', mesh: 'Breaks up light rain only', pvc: '100% waterproof' },
		{ label: 'Airflow', mesh: 'Breathable — stays airy', pvc: 'Sealed — keep sides open' },
		{ label: 'Finish', mesh: 'Textured fabric', pvc: 'Smooth, architectural' },
		{ label: 'Best for', mesh: 'Homes, schools, open car parks', pvc: 'Entrances, walkways, malls' }
	];
</script>

<section class="bg-muted/60 py-16 md:py-20">
	<div class="mx-auto max-w-5xl px-4 md:px-6">
		<SectionHeading
			align="center"
			eyebrow="Materials"
			title="Shade mesh vs waterproof PVC"
			description="Both work well in Kenyan conditions — the right choice depends on how you use the space."
		/>
		<div class="mt-10 overflow-x-auto rounded-2xl border bg-card">
			<table class="w-full min-w-[32rem] text-left text-sm">
				<thead class="bg-ink text-on-ink">
					<tr>
						<th
							scope="col"
							class="p-4 text-xs font-bold tracking-wider text-on-ink-subtle uppercase md:p-5"
						>
							Spec
						</th>
						<th scope="col" class="p-4 font-bold md:p-5">
							<span class="inline-flex items-center gap-2">
								<SunIcon class="size-4 text-primary" /> Shade mesh
							</span>
						</th>
						<th scope="col" class="p-4 font-bold md:p-5">
							<span class="inline-flex items-center gap-2">
								<CloudRainIcon class="size-4 text-primary" /> PVC membrane
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{#each ROWS as row (row.label)}
						<tr class="border-t">
							<th scope="row" class="p-4 font-semibold text-muted-foreground md:p-5">{row.label}</th
							>
							<td class="p-4 md:p-5">{row.mesh}</td>
							<td class="p-4 font-semibold md:p-5">{row.pvc}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="mt-4 text-center text-sm text-muted-foreground">
			Read the full comparison:
			<a
				href="/blog/shade-netting-vs-pvc-membrane"
				class="font-semibold text-accent-strong underline">Shade netting vs waterproof PVC</a
			>
		</p>
	</div>
</section>
