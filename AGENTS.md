# Capital Shades

The rebuild of [capitalshades.co.ke](https://capitalshades.co.ke), a Kenyan company that designs, fabricates and installs car park shades, shade sails, tensile structures and related products. It replaces the old WordPress site. See [README.md](README.md) for setup and going live.

The product and content rules live in `docs/`. Read the one that covers your task before changing behaviour or copy:

| Doc                                                                | What it holds                                                  |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| [docs/decisions.md](docs/decisions.md)                             | Terminology, solution taxonomy, sectors, capabilities, quoting |
| [docs/design-direction.md](docs/design-direction.md)               | Visual and UX direction, IA, quote flow, SEO direction         |
| [docs/implementation.md](docs/implementation.md)                   | Completed phases and the current phase's scope                 |
| [docs/content-to-confirm.md](docs/content-to-confirm.md)           | Facts the owner still has to confirm                           |
| [docs/discovery-questionnaire.md](docs/discovery-questionnaire.md) | Questions for the owner                                        |

If the code and these docs disagree, ask before going against the docs.

## Repo layout

| Path                      | What it is                                                                |
| ------------------------- | ------------------------------------------------------------------------- |
| `src/routes/`             | Pages (prerendered) and `/api/enquiry`                                    |
| `src/lib/components/`     | Svelte components; `ui/` holds generic primitives, other folders one area |
| `src/lib/content/`        | Content model (`types.ts`), taxonomies and seed data (`seed/`)            |
| `src/lib/server/content/` | `getContent()`: Sanity or seed data, and the public-settings allowlist    |
| `src/lib/assets/photos/`  | The owner's own seed photos                                               |
| `src/routes/layout.css`   | Design tokens (colours, spacing). The one place to change the palette     |
| `studio/`                 | Sanity Studio, a separate npm package with its own `node_modules`         |

npm, single package. The dev server runs on port 5180 when 5173 is taken.

## Git

- Commit, push or open a PR only when explicitly told to. Finishing a task is not permission to commit.
- Never commit on or push to `main`. Work goes on a feature branch; if you're on `main`, create a branch first.
- No AI attribution anywhere: no `Co-Authored-By` trailer, no "Generated with Claude Code" line, and no mention of AI tools in commit messages, PR titles or PR descriptions.

## Content and copy

- Do not hard-code business information that belongs in settings/content. Phone numbers, email, address, hours, service areas and social links come from site settings (`src/lib/content/seed/settings.ts` or Sanity); projects, solutions and posts come from content.
- Only fields in `PUBLIC_SETTINGS_KEYS` reach the browser, through `toPublicSettings` in `src/lib/server/content/public.ts`. Add a field there only when a page must show it.
- Sell the experience without asserting an operational fact that hasn't been verified (stats, client names, warranties, response times, coverage). Check `docs/decisions.md` for what is confirmed, and add anything unconfirmed to `docs/content-to-confirm.md` instead of inventing it.
- Use the public terminology in `docs/decisions.md` (for example "Solutions", not "Products").
- Only the owner's real photos ship. Never add stock, AI-generated or placeholder images or content.

## Comments

Comment the non-obvious: an invariant, an ordering constraint, a limit with its source, a workaround and what makes it removable. One or two lines.

- Never narrate history ("changed X to Y", "previously…", "as requested"). That goes in the commit or `docs/decisions.md`.
- Don't restate the code; comment why, not what.
- Update or delete comments that your change makes wrong.

## Coding rules

- Follow existing SvelteKit conventions and the existing naming and folder conventions.
- Keep the diff to the task. Don't reformat, rename or refactor code you weren't asked to touch; mention it instead. Each phase is strictly scoped: list improvements for later phases in your reply instead of implementing them.
- Before writing a component, helper or type, search `src/lib` for one that already does the job and reuse or extend it. Prefer small reusable components.
- Don't add a dependency without saying so and why in your reply and the PR. Prefer what the repo already uses (`bits-ui`, `@lucide/svelte`, `clsx` + `tailwind-merge`).
- No `any`, `@ts-ignore`, `@ts-expect-error` or `eslint-disable` without a comment giving the reason.
- Never edit generated files: `.svelte-kit/` (run `npm run check`, which syncs it) or `package-lock.json` by hand (use `npm install`).

## Svelte and SvelteKit

- Svelte 5 runes only (`$state`, `$derived`, `$props`, `$effect`). Derive values with `$derived`; use `$effect` only to sync with something outside Svelte (the DOM, a timer, a subscription), never to derive state or fetch data.
- Prefer server rendering. Pages are prerendered: load data in `+page.server.ts` / `+layout.server.ts` through `getContent()`, and pass plain data to components. Anything that must run per request (the enquiry API) opts out of prerendering explicitly.
- Read secrets only in server code (`src/lib/server/`, `+*.server.ts`, `+server.ts`), with `$env/dynamic/private`. Content loading reads `process.env` on purpose, so the site builds before Sanity is configured. Only `PUBLIC_*` values may reach the browser.
- Every page sets its title, description and canonical URL through `Seo.svelte`.
- Keyed `{#each}` blocks use a stable ID, not the index, unless the list never reorders.
- Images go through `Picture.svelte` (enhanced-img for seed photos, the Sanity CDN for CMS images) with sensible `sizes`; only the main image at the top of a page loads eagerly.
- Old URLs keep working: a moved or removed route gets a 301 redirect.

## Styling and accessibility

- Style with Tailwind and the semantic token classes from `src/routes/layout.css` (`bg-ink`, `text-primary`…). No hex values, raw palette colours (`text-amber-500`) or arbitrary sizes (`p-[13px]`); add a token instead. Merge classes with `cn()` from `$lib/utils`.
- Icons come from `@lucide/svelte`. Give an icon-only button or link an accessible name.
- Preserve accessibility: semantic elements (`button` for actions, `a` for navigation), a label for every input, visible focus, keyboard support, and one `h1` per page with headings in order.

## TypeScript

- Use TypeScript strictly. Give exported functions explicit parameter and return types, and handle `null` and `undefined` explicitly.
- Use `unknown` rather than `any` and narrow it. Don't silence the compiler with `as` or a non-null `!`; fix the type or handle the case, and say why in a comment where a cast is truly needed.
- Use the existing named types from `src/lib/content/types.ts` rather than rebuilding them. Use `import type` for type-only imports.
- A `switch` over a union ends with a `default` that assigns the value to `never`.

## Guardrails

- Command permissions live in `.claude/settings.json`.
- Put scratch work (throwaway scripts, GROQ queries, copies of files to poke at) in `--testing--/` at the repo root, which is gitignored. Never commit it, and don't scatter scratch files in `src/`, `static/` or `studio/`.
- Hooks in `.claude/settings.json` block edits to generated files, commits and pushes on `main`, AI attribution in commit messages, force pushes and recursive force deletes. Each edited file is formatted with Prettier and linted with ESLint after the edit. When a hook blocks you, do what its message says; don't work around it.

## Before you say it's done

Run every step that applies, fix what fails, and say in your reply which steps you ran. If a step can't run, say so instead of skipping it silently.

1. `npm run format`, then `npm run lint` and `npm run check`.
2. `npm run build` for any change to routes, content loading, prerendering or config.
3. For visible changes, check the page in the browser at phone and desktop widths.
4. Run `/self-review` after any code change and end your reply with its report. Docs-only changes are exempt.
5. Say whether anything is half migrated (old callers, a fallback, a redirect still to add) and what's left, or say that nothing is.
6. Update the current phase's checklist in `docs/implementation.md` when the task completes an item.

CI runs lint, check and build on every PR, and checks its commit messages for AI attribution.

## Skills

| Skill          | Use it to                                                            |
| -------------- | -------------------------------------------------------------------- |
| `/self-review` | Have a fresh reviewer criticise your change, fix findings and repeat |
