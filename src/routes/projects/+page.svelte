<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import ProjectGallery from '$lib/components/projects/ProjectGallery.svelte';

	let { data } = $props();
</script>

<Seo
	title="Recent Projects"
	description="Car park shades, carports, shade sails and membrane structures recently installed by Capital Shades for homes and businesses in Kenya."
	image={data.projects[0]?.heroImage}
/>

<PageHero
	eyebrow="Recent projects"
	title="Real installations by our team."
	description="Browse car park shades, carports, sails and membrane structures we've designed and installed for homes and businesses."
	image={data.projects.find((p) => p.featured)?.heroImage}
/>

<section class="container-page section-y-tight">
	<ProjectGallery projects={data.projects} products={data.products} />
</section>
