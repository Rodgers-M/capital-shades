<script lang="ts" module>
	export type ButtonVariant =
		'primary' | 'ink' | 'outline' | 'outline-on-ink' | 'ghost' | 'whatsapp';
	export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	const variants: Record<ButtonVariant, string> = {
		primary:
			'bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary-hover',
		ink: 'bg-ink text-on-ink hover:bg-ink-raised',
		outline: 'border border-border bg-card text-foreground hover:bg-muted',
		'outline-on-ink':
			'border border-on-ink/25 bg-on-ink/5 text-on-ink backdrop-blur hover:bg-on-ink/15',
		ghost: 'text-foreground hover:bg-muted',
		whatsapp: 'bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover'
	};

	const sizes: Record<ButtonSize, string> = {
		sm: 'h-10 px-4 text-sm',
		md: 'h-11 px-5 text-sm',
		lg: 'h-14 px-7 text-base',
		icon: 'h-11 w-11'
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children: Snippet;
	} & (
		| ({ href: string } & Omit<HTMLAnchorAttributes, 'class'>)
		| ({ href?: undefined } & Omit<HTMLButtonAttributes, 'class'>)
	);

	let { variant = 'primary', size = 'md', class: className, children, ...rest }: Props = $props();

	const classes = $derived(
		cn(
			'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
			sizes[size],
			variants[variant],
			className
		)
	);
</script>

{#if rest.href !== undefined}
	<a class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button class={classes} {...rest as HTMLButtonAttributes}>{@render children()}</button>
{/if}
