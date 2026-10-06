<script lang="ts" module>
	export type ButtonVariant =
		'primary' | 'ink' | 'outline' | 'outline-on-ink' | 'ghost' | 'whatsapp';
	export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	const variants: Record<ButtonVariant, string> = {
		primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
		ink: 'bg-ink text-on-ink hover:bg-ink-raised',
		outline:
			'border border-foreground/25 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/[0.04]',
		'outline-on-ink':
			'border border-on-ink/30 bg-transparent text-on-ink hover:border-on-ink/60 hover:bg-on-ink/10',
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
			'inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-semibold tracking-wide whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
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
