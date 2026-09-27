# Decisions & backlog

## Decisions

| Date       | Decision                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-09-27 | Rebuild capitalshades.co.ke with SvelteKit. The Polymet React export is used as the design reference only.                           |
| 2026-09-27 | Launch palette: navy `#0F172A` with amber primary (`#F59E0B`) and orange accent (`#F97316`). Font: Plus Jakarta Sans.                |
| 2026-09-27 | Hosting will not be the current Apache host. Vercel is the most likely choice, but keep the build host-agnostic until it's decided.  |
| 2026-09-27 | The blog is included at launch. It will be seeded from the current site's copy and the company's Facebook page.                      |
| 2026-09-27 | Content lives in **Sanity**, a hosted CMS, so no database is needed. Pages are prerendered, and a Sanity webhook triggers a rebuild. |
| 2026-09-27 | Enquiry forms email through **Resend**. If email fails, visitors are offered WhatsApp with the details pre-filled.                   |
| 2026-09-27 | Only verifiable facts ship. Polymet's invented stats, clients, authors and photos are dropped. See content-to-confirm.md.            |

## Backlog

### Revisit the palette to match the teal logo (after launch build)

The existing logo is teal (about `#4CB79A`) with charcoal. We launch with navy and amber, then try a teal variant.

**Done in the build:** every colour is a token in `src/routes/layout.css`, and no component contains a hex value or palette class. To try teal, edit these values:

- `--color-primary`, `--color-primary-hover` and `--color-ring`: the amber fill, which becomes teal.
- `--color-accent` and `--color-accent-strong`: the orange accents. Use a darker teal for `accent-strong`, which must reach 4.5:1 on white.
- `--color-ink*`: optional. The navy works with teal, and the logo's charcoal may suit it better.
- `theme-color` in `src/routes/+layout.svelte`: the only hex value outside the tokens (browser UI colour).

Originally, the Polymet export hard-coded `#0F172A` 39 times, `#1E293B` 3 times, and had about 40 `slate-*` literals.

**Contrast check (WCAG):**

| Pairing                         | Ratio                   |
| ------------------------------- | ----------------------- |
| Navy on amber (current buttons) | 8.3:1                   |
| Navy on teal                    | 7.3:1                   |
| White on teal                   | 2.5:1 (fails)           |
| Teal text on white              | 2.5:1 (fails)           |
| Darker teal `#2E8B72` on white  | 4.2:1 (large text only) |

Teal follows the same rules as amber. Use navy text on teal fills, and add a darker "text-on-light" variant token for coloured text on white. The launch build needs that token anyway, because orange eyebrow text on white already fails contrast in the Polymet design.

**Estimated effort if tokenised:** half a day to a day, covering token values, the darker text variant, a pass over gradients and imagery, and a design review with the owner.
**If colours were left hard-coded:** 1–2 days of edits across about 16 files, with a real risk of regressions.

**Also needed:** a vector (SVG) logo. The only file we have is a 165×65 PNG.
