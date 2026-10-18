import { marked } from 'marked';
import { toQuoteMaterials } from '$lib/enquiry';
import { settings } from '$lib/content/seed/settings';
import { solutions as seedSolutions, type SeedPage } from '$lib/content/seed/solutions';
import { projects as seedProjects } from '$lib/content/seed/projects';
import { posts as seedPosts } from '$lib/content/seed/posts';
import type { Post, Project, Solution } from '$lib/content/types';
import type { Content } from './index';
import { photo } from './photos';

const WORDS_PER_MINUTE = 200;

export function loadSeedContent(): Content {
	const pages = (status: SeedPage['status']): Solution[] =>
		seedSolutions
			.filter((s): s is SeedPage => s.status === status)
			.map((s) => ({
				slug: s.slug,
				title: s.title,
				eyebrow: s.eyebrow,
				summary: s.summary,
				body: s.body,
				features: s.features,
				applications: s.applications,
				image: photo(s.photo, s.photoAlt)
			}));

	const projects: Project[] = seedProjects.map(
		({ photo: key, photoAlt, completionYear, ...p }) => ({
			...p,
			location: p.location ?? null,
			material: p.material ?? null,
			completed: completionYear ? String(completionYear) : null,
			scope: p.scope ?? null,
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

	return {
		settings,
		solutions: pages('published'),
		legacySolutions: pages('legacy'),
		quoteMaterials: toQuoteMaterials(seedSolutions),
		projects,
		posts
	};
}
