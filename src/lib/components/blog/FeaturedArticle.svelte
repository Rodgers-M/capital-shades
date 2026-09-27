<script lang="ts">
	import { ArrowUpRightIcon, ClockIcon } from '@lucide/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import TagPill from './TagPill.svelte';
	import { QUOTE_HREF } from '$lib/nav';
	import { formatDate } from '$lib/utils';
	import type { PostSummary } from '$lib/content/types';

	let { post, side = [] }: { post: PostSummary; side?: PostSummary[] } = $props();
</script>

<div class="grid gap-4 lg:grid-cols-5 lg:gap-6">
	<a
		href="/blog/{post.slug}"
		class="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-ink text-on-ink lg:col-span-3 lg:min-h-[520px]"
	>
		<Picture
			image={post.image}
			alt=""
			loading="eager"
			sizes="(min-width: 1024px) 760px, 100vw"
			class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10"></div>
		<div class="relative p-6 md:p-8">
			<div class="flex items-center gap-2">
				<span
					class="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wider text-primary-foreground uppercase"
				>
					Latest
				</span>
				<TagPill tag={post.tag} class="bg-on-ink/15 text-on-ink" />
			</div>
			<h2
				class="mt-4 max-w-2xl text-2xl leading-[1.15] font-extrabold tracking-tight text-balance md:text-4xl"
			>
				{post.title}
			</h2>
			<p class="mt-3 max-w-xl text-sm leading-relaxed text-on-ink-muted md:text-base">
				{post.excerpt}
			</p>
			<p class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-ink-muted">
				<span class="font-semibold text-on-ink">{post.author}</span>
				<span aria-hidden="true">·</span>
				<span>{formatDate(post.date)}</span>
				<span aria-hidden="true">·</span>
				<span class="inline-flex items-center gap-1">
					<ClockIcon class="size-3.5" />
					{post.readMinutes} min
				</span>
			</p>
		</div>
	</a>

	{#if side.length}
		<div class="flex flex-col gap-4 lg:col-span-2">
			{#each side as item (item.slug)}
				<a
					href="/blog/{item.slug}"
					class="group flex gap-4 rounded-2xl border bg-card p-3 transition-shadow hover:shadow-lg"
				>
					<Picture
						image={item.image}
						alt=""
						sizes="128px"
						class="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-32"
					/>
					<div class="flex min-w-0 flex-col py-1">
						<TagPill tag={item.tag} class="self-start" />
						<h3 class="mt-2 line-clamp-2 leading-snug font-bold group-hover:text-accent-strong">
							{item.title}
						</h3>
						<p class="mt-auto inline-flex items-center gap-1 pt-2 text-xs text-muted-foreground">
							<ClockIcon class="size-3.5" />
							{item.readMinutes} min read
						</p>
					</div>
				</a>
			{/each}
			<div
				class="flex flex-1 flex-col justify-between rounded-2xl bg-primary p-5 text-primary-foreground"
			>
				<div>
					<p class="eyebrow">Planning a project?</p>
					<p class="mt-2 text-lg leading-snug font-extrabold">
						Tell us about your site and we'll recommend the right shade.
					</p>
				</div>
				<a
					href={QUOTE_HREF}
					class="mt-4 inline-flex items-center gap-1.5 self-start rounded-md bg-ink px-4 py-2.5 text-sm font-bold text-on-ink hover:bg-ink-raised"
				>
					Request site assessment <ArrowUpRightIcon class="size-4" />
				</a>
			</div>
		</div>
	{/if}
</div>
