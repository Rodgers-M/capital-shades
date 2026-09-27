import { getContent } from '$lib/server/content';

export async function load() {
	const { posts } = await getContent();
	// Article bodies aren't needed for the listing
	return { posts: posts.map(({ html: _html, ...post }) => post) };
}
