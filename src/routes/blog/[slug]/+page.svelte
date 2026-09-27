<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
	import TagPill from '$lib/components/blog/TagPill.svelte';
	import { QUOTE_HREF } from '$lib/nav';
	import { SITE_URL } from '$lib/config';
	import { formatDate } from '$lib/utils';

	let { data } = $props();
	const post = $derived(data.post);
</script>

<Seo
	title={post.title}
	description={post.excerpt}
	image={post.image}
	type="article"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		datePublished: post.date,
		image: new URL(post.image.src, SITE_URL).href,
		author: { '@type': 'Organization', name: post.author },
		publisher: { '@id': `${SITE_URL}/#business` },
		mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`
	}}
/>

<article>
	<header class="bg-card">
		<div class="mx-auto max-w-3xl px-4 pt-10 pb-8 md:px-6 md:pt-14">
			<a
				href="/blog"
				class="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" /> All articles
			</a>
			<div class="mt-6"><TagPill tag={post.tag} /></div>
			<h1
				class="mt-4 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance md:text-5xl"
			>
				{post.title}
			</h1>
			<p class="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
			<p class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
				<span class="font-semibold text-foreground">{post.author}</span>
				<span aria-hidden="true">·</span>
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span aria-hidden="true">·</span>
				<span class="inline-flex items-center gap-1">
					<ClockIcon class="size-4" />
					{post.readMinutes} min read
				</span>
			</p>
		</div>
		<div class="mx-auto max-w-5xl px-4 md:px-6">
			<Picture
				image={post.image}
				loading="eager"
				fetchpriority="high"
				sizes="(min-width: 1024px) 1024px, 100vw"
				class="aspect-[2/1] w-full rounded-3xl object-cover"
			/>
		</div>
	</header>

	<div
		class="mx-auto prose prose-lg max-w-3xl px-4 py-12 md:px-6 md:py-16 prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-accent-strong prose-table:text-base"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted content from our own CMS/seed -->
		{@html post.html}
	</div>
</article>

<section class="mx-auto max-w-3xl px-4 md:px-6">
	<div
		class="flex flex-col gap-4 rounded-2xl bg-ink p-6 text-on-ink sm:flex-row sm:items-center sm:justify-between md:p-8"
	>
		<div>
			<p class="text-xl font-extrabold">Planning a shade project?</p>
			<p class="mt-1 text-sm text-on-ink-subtle">
				Tell us about your site and we'll arrange a visit.
			</p>
		</div>
		<Button href={QUOTE_HREF} class="shrink-0">
			Request Site Assessment <ArrowRightIcon />
		</Button>
	</div>
</section>

{#if data.related.length}
	<section class="container-page py-16 md:py-20">
		<SectionHeading eyebrow="Keep reading" title="Related articles" />
		<ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.related as related (related.slug)}
				<li><ArticleCard post={related} /></li>
			{/each}
		</ul>
	</section>
{/if}
