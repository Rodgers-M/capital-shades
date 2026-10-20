<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import EditorialHeading from '$lib/components/EditorialHeading.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import QuoteCta from '$lib/components/QuoteCta.svelte';
	import ProjectHero from '$lib/components/projects/ProjectHero.svelte';
	import ProjectPhotos from '$lib/components/projects/ProjectPhotos.svelte';
	import ProjectDetails from '$lib/components/projects/ProjectDetails.svelte';
	import ProjectTile from '$lib/components/projects/ProjectTile.svelte';
	import { PROJECTS_HREF, projectHref, projectsHref } from '$lib/nav';
	import { breadcrumbList, projectSeo } from '$lib/seo';

	/*
	 * Reusable project template: hero → extra photos → details → related
	 * projects → quote. Built from verified fields only; with just a title,
	 * solution, sector and photo it is still complete.
	 */
	let { data } = $props();
	const project = $derived(data.project);

	const seo = $derived(projectSeo(project, data.projectSolutions));
	// Tablet-and-up stagger for the related row
	const offset = (i: number) => (i % 2 === 1 ? 'mt-10 lg:mt-16' : '');
</script>

<Seo
	title={seo.title}
	description={seo.description}
	image={project.heroImage}
	jsonLd={breadcrumbList([
		{ name: 'Projects', path: PROJECTS_HREF },
		{ name: project.title, path: projectHref(project.slug) }
	])}
/>

<ProjectHero settings={data.settings} {project} solutions={data.projectSolutions} />

{#if data.gallery.length}
	<ProjectPhotos images={data.gallery} title={project.title} />
{/if}

<ProjectDetails {project} solutions={data.projectSolutions} />

{#if data.related.length}
	<section aria-labelledby="related-projects" class="bg-muted section-y">
		<div class="container-page">
			<EditorialHeading id="related-projects" eyebrow="Projects" title={data.relatedHeading}>
				{#snippet action()}
					<TextLink href={projectsHref({ solution: project.solutions[0] })}>
						More {data.projectSolutions[0]?.title.toLowerCase() ?? ''} projects
					</TextLink>
				{/snippet}
			</EditorialHeading>
			<ul class="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:mt-16 lg:grid-cols-4">
				{#each data.related as related, i (related.slug)}
					<li class={offset(i)}>
						<ProjectTile
							project={related}
							solutions={data.solutions}
							sizes="(min-width: 1024px) 22vw, 50vw"
							imageClass="aspect-[3/4]"
						/>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<div class="border-t">
	<QuoteCta settings={data.settings} whatsapp={data.whatsapp} />
</div>
