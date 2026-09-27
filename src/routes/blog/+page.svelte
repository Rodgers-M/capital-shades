<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
	import FeaturedArticle from '$lib/components/blog/FeaturedArticle.svelte';
	import { cn } from '$lib/utils';
	import type { PostTag } from '$lib/content/types';

	let { data } = $props();

	const posts = $derived(data.posts);
	const tags = $derived([...new Set(posts.map((p) => p.tag))]);
	let tag = $state<PostTag | 'All'>('All');
	const feed = $derived(tag === 'All' ? posts : posts.filter((p) => p.tag === tag));
</script>

<Seo
	title="Blog"
	description="Buyer's guides, maintenance tips and advice on car park shades, shade sails and tensile structures in Kenya."
	image={posts[0]?.image}
/>

<section class="border-b bg-card">
	<div class="container-page pt-12 pb-10 md:pt-16 md:pb-14">
		<SectionHeading
			level={1}
			eyebrow="Blog"
			description="Buyer's guides, maintenance tips and advice from our team."
		>
			{#snippet title()}
				Shade structures, <span class="text-accent-strong">explained.</span>
			{/snippet}
		</SectionHeading>
		{#if posts.length}
			<div class="mt-8 md:mt-10">
				<FeaturedArticle post={posts[0]} side={posts.slice(1, 3)} />
			</div>
		{/if}
	</div>
</section>

<section class="container-page py-12 md:py-16">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<h2 class="text-2xl font-extrabold tracking-tight">All articles</h2>
		<div class="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 md:mx-0 md:px-0">
			<div class="flex w-max gap-2" role="group" aria-label="Filter by topic">
				{#each ['All' as const, ...tags] as t (t)}
					<button
						type="button"
						aria-pressed={tag === t}
						onclick={() => (tag = t)}
						class={cn(
							'h-10 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors',
							tag === t
								? 'border-primary bg-primary text-primary-foreground'
								: 'bg-card text-muted-foreground hover:text-foreground'
						)}
					>
						{t}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each feed as post (post.slug)}
			<li><ArticleCard {post} /></li>
		{/each}
	</ul>
</section>
