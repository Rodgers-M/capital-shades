import { marked, type Token, type Tokens } from 'marked';

/*
 * Minimal markdown → Portable Text converter for the seed blog posts.
 * Supports what the posts use: h2/h3, paragraphs, bold/italic/links,
 * bullet & numbered lists, and tables (as @sanity/table objects).
 */

type Span = { _type: 'span'; _key: string; text: string; marks: string[] };
type MarkDef = { _type: 'link'; _key: string; href: string };
type Block = {
	_type: 'block';
	_key: string;
	style: string;
	children: Span[];
	markDefs: MarkDef[];
	listItem?: 'bullet' | 'number';
	level?: number;
};
type Table = {
	_type: 'table';
	_key: string;
	rows: { _type: 'tableRow'; _key: string; cells: string[] }[];
};

let counter = 0;
const key = () => `k${(counter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function inline(tokens: Token[], marks: string[], markDefs: MarkDef[]): Span[] {
	return tokens.flatMap((token): Span[] => {
		switch (token.type) {
			case 'strong':
				return inline((token as Tokens.Strong).tokens, [...marks, 'strong'], markDefs);
			case 'em':
				return inline((token as Tokens.Em).tokens, [...marks, 'em'], markDefs);
			case 'link': {
				const def: MarkDef = { _type: 'link', _key: key(), href: (token as Tokens.Link).href };
				markDefs.push(def);
				return inline((token as Tokens.Link).tokens, [...marks, def._key], markDefs);
			}
			case 'codespan':
				return [
					{
						_type: 'span',
						_key: key(),
						text: (token as Tokens.Codespan).text,
						marks: [...marks, 'code']
					}
				];
			case 'text': {
				const t = token as Tokens.Text;
				if (t.tokens?.length) return inline(t.tokens, marks, markDefs);
				return [{ _type: 'span', _key: key(), text: decode(t.text), marks }];
			}
			case 'escape':
				return [{ _type: 'span', _key: key(), text: (token as Tokens.Escape).text, marks }];
			case 'br':
				return [{ _type: 'span', _key: key(), text: '\n', marks }];
			default:
				return 'text' in token
					? [{ _type: 'span', _key: key(), text: String(token.text), marks }]
					: [];
		}
	});
}

function block(tokens: Token[], style: string, extra: Partial<Block> = {}): Block {
	const markDefs: MarkDef[] = [];
	return {
		_type: 'block',
		_key: key(),
		style,
		children: inline(tokens, [], markDefs),
		markDefs,
		...extra
	};
}

function plain(tokens: Token[]): string {
	return inline(tokens, [], [])
		.map((s) => s.text)
		.join('');
}

function decode(text: string) {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"');
}

export function markdownToPortableText(markdown: string): (Block | Table)[] {
	const out: (Block | Table)[] = [];
	for (const token of marked.lexer(markdown.trim())) {
		switch (token.type) {
			case 'heading': {
				const h = token as Tokens.Heading;
				out.push(block(h.tokens, h.depth <= 2 ? 'h2' : 'h3'));
				break;
			}
			case 'paragraph':
				out.push(block((token as Tokens.Paragraph).tokens, 'normal'));
				break;
			case 'list': {
				const list = token as Tokens.List;
				for (const item of list.items) {
					const tokens = item.tokens.flatMap((t) =>
						'tokens' in t && t.tokens ? (t.tokens as Token[]) : [t]
					);
					out.push(
						block(tokens, 'normal', { listItem: list.ordered ? 'number' : 'bullet', level: 1 })
					);
				}
				break;
			}
			case 'table': {
				const table = token as Tokens.Table;
				const row = (cells: Tokens.TableCell[]) => ({
					_type: 'tableRow' as const,
					_key: key(),
					cells: cells.map((cell) => plain(cell.tokens))
				});
				out.push({
					_type: 'table',
					_key: key(),
					rows: [row(table.header), ...table.rows.map(row)]
				});
				break;
			}
			case 'blockquote':
				out.push(
					block(
						(token as Tokens.Blockquote).tokens.flatMap((t) =>
							'tokens' in t && t.tokens ? (t.tokens as Token[]) : []
						),
						'blockquote'
					)
				);
				break;
			default:
				// space, hr, html: nothing to carry over
				break;
		}
	}
	return out;
}
