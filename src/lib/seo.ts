/**
 * A JSON-LD <script> tag for {@html}. Built here rather than inline in markup:
 * a literal closing script tag inside a .svelte template trips the parser.
 */
export function jsonLdTag(data: Record<string, unknown>) {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</` + 'script>';
}
