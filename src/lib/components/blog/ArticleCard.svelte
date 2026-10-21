<script lang="ts">
	import { ArrowUpRightIcon, ClockIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TagPill from './TagPill.svelte';
	import { formatDate } from '$lib/utils';
	import type { PostSummary } from '$lib/content/types';

	let { post, headingLevel = 3 }: { post: PostSummary; headingLevel?: 2 | 3 } = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
>
	<div class="relative aspect-[16/10] overflow-hidden">
		<Picture
			image={post.image}
			alt=""
			sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
			class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
	</div>
	<div class="flex flex-1 flex-col p-5">
		<div class="flex items-center justify-between">
			<TagPill tag={post.tag} />
			<span class="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
				<ClockIcon class="size-3.5" />
				{post.readMinutes} min read
			</span>
		</div>
		<svelte:element
			this={`h${headingLevel}`}
			class="mt-3 text-lg leading-snug font-extrabold tracking-tight transition-colors group-hover:text-accent-strong"
		>
			{post.title}
		</svelte:element>
		<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
		<div class="mt-auto flex items-center justify-between pt-5 text-xs">
			<div class="leading-tight">
				<p class="font-semibold">{post.author}</p>
				<p class="text-muted-foreground">{formatDate(post.date)}</p>
			</div>
			<ArrowUpRightIcon
				class="size-5 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-accent-strong"
			/>
		</div>
	</div>
</a>
