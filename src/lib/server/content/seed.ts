import { marked } from 'marked';
import { settings } from '$lib/content/seed/settings';
import { products as seedProducts } from '$lib/content/seed/products';
import { projects as seedProjects } from '$lib/content/seed/projects';
import { posts as seedPosts } from '$lib/content/seed/posts';
import type { Post, Product, Project } from '$lib/content/types';
import type { Content } from './index';
import { photo } from './photos';

const WORDS_PER_MINUTE = 200;

export function loadSeedContent(): Content {
	const products: Product[] = seedProducts.map(({ photo: key, photoAlt, ...p }) => ({
		...p,
		image: photo(key, photoAlt)
	}));

	// Seed entries still name one `product`; it becomes the project's first solution
	const projects: Project[] = seedProjects.map(
		({ photo: key, photoAlt, product, solutions, ...p }) => ({
			...p,
			solutions: solutions?.length ? solutions : [product],
			location: p.location ?? null,
			material: p.material ?? null,
			completed: p.completed ?? null,
			featured: p.featured ?? false,
			heroImage: photo(key, photoAlt)
		})
	);

	const posts: Post[] = seedPosts
		.filter((p) => !p.draft)
		.map(({ photo: key, markdown, draft: _draft, ...p }) => ({
			...p,
			readMinutes: Math.max(1, Math.round(markdown.split(/\s+/).length / WORDS_PER_MINUTE)),
			image: photo(key, p.title),
			html: marked.parse(markdown.trim(), { async: false })
		}));

	return { settings, products, projects, posts };
}
