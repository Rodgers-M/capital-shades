# Capital Shades website

The rebuild of [capitalshades.co.ke](https://capitalshades.co.ke). It replaces the old WordPress site.

- **Site:** SvelteKit 2 with Svelte 5, Tailwind CSS 4 and TypeScript. Every page is prerendered to static HTML.
- **Content:** [Sanity](https://www.sanity.io). The Studio lives in [`studio/`](studio). Until Sanity is connected, the site builds from seed data in `src/lib/content/seed/`.
- **Enquiry forms:** sent by email through [Resend](https://resend.com), with WhatsApp as the fallback.
- **Hosting:** host-agnostic via `adapter-auto`; Vercel is the likely target.

The design is ported from a Polymet React prototype. See [docs/decisions.md](docs/decisions.md) for the decisions and backlog, and [docs/content-to-confirm.md](docs/content-to-confirm.md) for the facts the owner still needs to confirm.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run check      # type-check
npm run lint       # prettier + eslint
npm run build && npm run preview
```

Without `RESEND_API_KEY`, the dev server logs enquiries to the terminal. In production the key is required.

## How it fits together

```
src/lib/content/types.ts     content model shared by seed + Sanity
src/lib/content/seed/        seed settings, products, projects, blog posts
src/lib/assets/photos/       seed photos (the owner's own, from the old site)
src/lib/server/content/      getContent(): picks Sanity or the seed data
src/routes/                  pages (all prerendered) + /api/enquiry
studio/                      Sanity Studio (separate package)
```

- **Colours** are tokens in `src/routes/layout.css`. Components use token classes only (`bg-ink`, `text-primary`, `text-accent-strong`…), never hex values or palette colours. To change the palette, edit that one block.
- **Images** are converted to AVIF/WebP at several widths. For seed photos, `@sveltejs/enhanced-img` does this at build time. For Sanity images, Sanity's image CDN does it.
- **Redirects:** `/recent-projects`, `/gallery` and `/car-park-shades` from the old site return a 301 to their new pages.

## Going live

### 1. Sanity (content editing)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) and use the `production` dataset (public).
2. In `studio/`, copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID`.
3. Install and log in:
   ```sh
   cd studio
   npm install
   npx sanity login
   ```
4. Import the seed content and photos. This is safe to re-run.
   ```sh
   npm run import-seed
   ```
5. Deploy the Studio to https://capitalshades.sanity.studio:
   ```sh
   npm run deploy
   ```
6. In the Sanity dashboard, invite the owner as an **Editor**.

### 2. Vercel

1. Import the Git repo in Vercel. It detects SvelteKit; leave the root directory as `/`.
2. Add the environment variables from [`.env.example`](.env.example): `SANITY_PROJECT_ID`, `RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM`.
3. Add the `capitalshades.co.ke` domain, and redirect `www.capitalshades.co.ke` to it.

### 3. Rebuild on publish

Pages are prerendered, so a Sanity publish needs a rebuild. That takes about a minute.

1. Vercel → Project → Settings → Git → **Deploy Hooks**: create a hook called `sanity`, then copy its URL.
2. Sanity → API → **Webhooks**: create a webhook with these settings:
   - URL: the deploy hook
   - Dataset: `production`
   - Trigger on: create, update, delete
   - Filter: `_type in ["siteSettings", "product", "project", "post"]`

### 4. Email (Resend)

Verify `capitalshades.co.ke` in Resend by adding the DNS records it gives you. Then set `ENQUIRY_FROM` to an address on that domain.
