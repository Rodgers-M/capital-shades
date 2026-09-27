import { error } from '@sveltejs/kit';
import { getContent } from '$lib/server/content';

export async function entries() {
	const { posts } = await getContent();
	return posts.map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const { posts } = await getContent();
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Article not found');

	const related = posts
		.filter((p) => p.slug !== post.slug)
		.sort((a, b) => Number(b.tag === post.tag) - Number(a.tag === post.tag))
		.slice(0, 3)
		.map(({ html: _html, ...summary }) => summary);

	return { post, related };
}
