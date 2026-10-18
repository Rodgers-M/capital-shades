# Capital Shades — Implementation Plan

This document tracks completed website phases and defines the current
implementation phase.

Detailed product/business decisions live in `decisions.md`.
Visual and UX principles live in `design-direction.md`.

---

# Completed phases

## Phase A — Global Foundation

Status: Complete

- [x] Design tokens
- [x] Global spacing
- [x] Navigation architecture
- [x] Content types
- [x] Centralized public settings
- [x] Public-settings allowlist
- [x] Button system
- [x] Header
- [x] Mobile action bar
- [x] Footer
- [x] Metadata foundations
- [x] Primary public phone handling
- [x] Responsive validation
- [x] Check / lint / production build

---

## Phase B1 — Route & Content Model Migration

Status: Complete

- [x] `/solutions`
- [x] `/solutions/[slug]`
- [x] `/request-a-quote`
- [x] Legacy permanent redirects
- [x] Public "Solutions" terminology
- [x] Project `solutions` model
- [x] `heroImage`
- [x] Primary public contact usage
- [x] Removal of deprecated project UI fields
- [x] Unverified homepage statistics removed
- [x] Check / lint / production build

---

## Phase B2 — Homepage

Status: Complete

- [x] Editorial hero
- [x] Selected projects
- [x] Featured solutions
- [x] Solution/material guidance
- [x] Sector context
- [x] Featured project
- [x] Process section
- [x] Closing conversion CTA
- [x] Hero-aware mobile action bar
- [x] Form-focus action-bar behavior
- [x] Old visual treatments removed
- [x] Claim-safety cleanup
- [x] Responsive validation
- [x] Check / lint / production build

---

## Phase C1 — Solutions Experience

Status: Complete

- [x] Editorial Solutions index
- [x] Solution detail template
- [x] Related project proof
- [x] Zero-project handling
- [x] Contextual WhatsApp helper
- [x] Desktop/tablet floating WhatsApp
- [x] Mobile conversion behavior
- [x] Solution copy cleanup
- [x] Shared material guidance
- [x] Responsive validation
- [x] Check / lint / production build

Note:

The current frontend solution data predates the newly confirmed taxonomy.
Taxonomy migration should be handled deliberately rather than through
piecemeal edits.

See `decisions.md`.

---

## Phase C2 — Projects Experience

Status: Complete

- [x] Editorial Projects index
- [x] URL-driven solution/sector filters
- [x] Canonical sector vocabulary
- [x] Zero-result states
- [x] Project detail pages
- [x] Verified metadata only
- [x] Project vs solution content separation
- [x] Accessible project lightbox
- [x] Related-project logic
- [x] Project-specific WhatsApp context
- [x] Project sitemap entries
- [x] Responsive validation
- [x] Check / lint / production build

---

## Phase C3 — About + Contact

Status: Complete

### About

- [x] New visual system
- [x] Business positioning
- [x] Solutions overview
- [x] Residential / Commercial / Institutional context
- [x] Process section
- [x] Service-area section
- [x] Selected-project proof
- [x] Conversion CTA

### Contact

- [x] Above-the-fold Call / WhatsApp / Request Quote actions
- [x] Email path
- [x] Contact form preserved
- [x] Location/service-area support
- [x] Empty optional fields omitted
- [x] Project/Solutions/review links
- [x] Responsive validation
- [x] Check / lint / production build

Note:

Discovery completed after C3 confirmed a broader Kenya/East Africa service
scope and the full Design → Fabrication → Supply → Installation →
Maintenance lifecycle.

Relevant content should be updated during the next content-alignment pass
rather than by reverting completed layouts.

---

## Phase C4 — Request-a-Quote Flow

Status: Complete

### Objective

Replace the legacy estimator-style enquiry with a focused, low-friction
multi-step quote request aligned with Capital Shades' real sales process.

The experience should help the Capital Shades team collect enough information
for an initial assessment while making clear that the final quotation follows
a site visit and confirmed measurements.

---

## Quote flow

### Step 1 — What do you need?

Capture:

- Solution / structure type
- Not sure — help me choose
- Intended use

Use the current working solution taxonomy:

- Car Parking Shades
- Shade Sails
- Canopies
- Awnings
- Pergolas & Gazebos
- Tensile & Custom Structures
- Screen Fencing
- Parasols

Tents should not appear as a primary option.

---

### Step 2 — Tell us about the site

Capture:

- Location
- Approximate width
- Approximate length
- Number of vehicles where relevant
- Material preference if known
- Site photos
- Additional project details

Measurements should use simple dimensions rather than requiring square metres.

Example:

Width:
`6 m`

Length:
`5 m`

Helper copy should make clear that rough measurements are acceptable and will
be confirmed during the site visit.

---

## Conditional fields

Car Parking Shades should ask for vehicle count.

Suggested choices:

- 1
- 2
- 3–5
- 6–10
- 10+
- Not sure

Do not show irrelevant vehicle questions for unrelated solutions.

Future conditional questions may be added only where they materially improve
lead quality.

---

## Site photos

Site-photo upload is an important part of this phase.

Photos should be strongly encouraged but not mandatory.

Suggested supporting message:

> Add photos of the site

> Photos help the team understand the space and may help Capital Shades
> prepare an initial estimate before the site visit.

Support multiple images where practical.

Do not make large uploads block or break the form experience.

---

### Step 3 — How should we contact you?

Capture:

- Name
- Phone
- Email
- Preferred contact method

Preferred contact options:

- Phone
- WhatsApp
- Email

Phone and email validation should remain practical for East African and
international enquiries.

---

## Quote expectations

The form should distinguish between:

- initial assessment / estimate;
- final quotation.

Use wording consistent with:

> Project details and site photos can help the team make an initial
> assessment. A final quotation follows the site visit and confirmed
> measurements.

Do not imply that form submission creates a binding quotation.

---

## Site visit

Site visit is part of the normal process.

Do not state that every site visit is free.

Safe wording:

> Site visits within Nairobi and nearby areas may be provided at no cost,
> depending on location.

Exact commercial policy may be refined later.

---

## Warranty

Where warranty information appears near the quote flow, use only:

> Selected structures are covered by warranties of up to 10 years.
> Final warranty terms are provided with the quotation and contract documents.

Do not introduce stronger wording.

---

## Submission destination

Enquiries should reach the Capital Shades team using the existing confirmed
contact destination.

Confirmed public email:

`info@capitalshades.co.ke`

Preserve any existing server-side delivery/fallback infrastructure unless a
change is necessary for photo uploads.

---

## WhatsApp fallback

Preserve a useful WhatsApp fallback.

If form submission fails, the fallback message should carry as much entered
project context as practical without becoming unreadably long.

Do not expose uploaded files through unsafe public URLs.

---

## Accessibility

Preserve or improve:

- keyboard navigation
- labelled fields
- error summaries/messages
- focus management between steps
- screen-reader step/progress information
- accessible file input
- reduced-motion preferences
- adequate mobile tap targets

---

## Responsive requirements

Verify:

- desktop
- tablet
- 375px
- 320px

The form should remain comfortable with the on-screen phone keyboard open.

The mobile action bar should not cover focused form fields.

---

## C4 content cleanup

Review and update the current quote option:

`100% waterproof PVC`

Use neutral wording such as:

`Waterproof PVC`

or another accurate option matching the solution/material model.

---

## Out of scope

Do not begin:

- Sanity Studio migration
- final SEO optimization
- location landing pages
- CRM/customer-management system
- invoicing system
- final analytics implementation

---

## Acceptance criteria

- [x] Three-step quote flow
- [x] Not sure — help me choose
- [x] Current working solution taxonomy
- [x] Location field
- [x] Width × length inputs
- [x] Conditional vehicle-count input
- [x] Prominent optional multi-photo upload
- [x] Material preference
- [x] Intended use / project notes
- [x] Name / phone / email
- [x] Preferred contact method
- [x] Initial estimate vs final quote wording
- [x] Final-quote-after-site-visit expectation
- [x] Warranty wording remains conditional
- [x] Submission still reaches the team
- [x] WhatsApp fallback remains functional
- [x] Accessible multi-step behavior
- [x] No mobile overflow
- [x] `npm run check` passes
- [x] `npm run lint` passes
- [x] `npm run build` passes

## Follow-up refinements

- [x] Structure selector changed to compact accessible dropdown
- [x] No-JavaScript structure select preserved
- [x] Direct mobile camera capture for site photos
- [x] Existing photo resizing / validation / limits reused
- [x] Mobile quote layout tightened
- [x] Material preference limited to confirmed options per solution (UI, server, no-JS)
- [x] Retry without photos offered only for size or connection failures

---

## Current Phase

Phase C5 — Sanity / Content Model Migration

## Objective

Migrate the CMS/content model from the legacy website structure to the current
Capital Shades business model while preserving compatibility with the already
rebuilt frontend.

The goal is to make the content model reflect:

- the current working solution taxonomy;
- editable solution applications and materials;
- richer project records and galleries;
- verified business/settings content;
- owner-manageable projects, galleries and articles.

This phase should improve CMS structure and migration safety.

Do not redesign page layouts.

---

## Core principles

1. Preserve the working frontend while migrating content.
2. Prefer explicit migrations over destructive replacement.
3. Do not delete legacy fields until the new model is populated and verified.
4. Do not invent missing business content.
5. Keep public settings exposure controlled through the existing public
   settings allowlist.
6. Projects and galleries should be the easiest content types for the owner to
   manage.
7. Sanity should become the long-term source of truth where appropriate.

---

# 1. Solution taxonomy migration

The current working top-level solution taxonomy is:

1. Car Parking Shades
2. Shade Sails
3. Canopies
4. Awnings
5. Pergolas & Gazebos
6. Tensile & Custom Structures
7. Screen Fencing
8. Parasols

Tents are not a primary promoted solution.

The existing CMS/data model still reflects the older solution set.

Migrate carefully.

---

## Legacy solution records

Current legacy records may include:

- Car Park Shades
- Tensile Membrane Structures
- Shade Sails
- Canopies
- Parasols
- Pool Shades

Do not simply delete these records.

Instead:

- identify which records map directly to the new taxonomy;
- migrate content where the mapping is clear;
- preserve slugs/redirect knowledge where needed;
- create new solution records for missing categories;
- do not merge content automatically when meaning is ambiguous.

Expected high-level migration direction:

- Car Park Shades
  → Car Parking Shades

- Shade Sails
  → Shade Sails

- Canopies
  → Canopies

- Parasols
  → Parasols

- Tensile Membrane Structures
  → Tensile & Custom Structures
  only where the existing content genuinely fits

- Pool Shades
  → likely an application/use case rather than a top-level solution

Do not silently map Pool Shades or other legacy categories without recording
the migration decision.

---

# 2. Solution schema

Create/evolve the Sanity solution schema so a solution can support:

- title
- slug
- eyebrow / short label
- summary
- body / rich description
- hero image
- typical-use label
- applications
- customer sectors
- materials
- features
- aliases / customer terminology
- related applications
- featured flag
- display/order field
- SEO title / description where appropriate
- active/published status where useful

Do not add fields simply because they might be useful someday.

Prefer fields that are used by the current site or clearly needed by the
planned SEO/content phase.

---

## Solution applications

Applications should be editable content rather than hard-coded component copy.

Examples include:

- Swimming-pool shades
- School/playground shades
- Restaurant/hospitality shades
- Walkway covers
- Car wash structures
- Carports
- Retractable awnings
- Privacy screen fence
- Dust screen fence

Applications should not automatically become top-level Solutions.

---

## Solution aliases / customer terminology

Support optional search/customer-language terms such as:

- car shades
- carports
- car parking shades
- shade nets
- screen fence

These fields are content/SEO aids.

Do not visibly dump aliases into page UI by default.

---

# 3. Materials model

Move the quote-flow material rules toward content-driven configuration.

Each Solution may optionally define allowed material preferences.

The current known safe mappings are:

### Car Parking Shades

- Shade mesh
- Waterproof PVC
- Metal roofing
- Not sure yet

### Shade Sails

- Shade mesh
- Not sure yet

### Canopies

- Waterproof PVC
- Not sure yet

### Tensile & Custom Structures

- Waterproof PVC
- Not sure yet

The following currently have no confirmed material selection UI:

- Awnings
- Pergolas & Gazebos
- Screen Fencing
- Parasols

Do not invent missing options.

---

## Quote integration

The quote flow should eventually read material options from the content model
rather than maintaining a permanent hard-coded mapping.

During migration:

- preserve the existing `MATERIALS_BY_SOLUTION` fallback;
- add a content-driven path;
- use content values when available;
- fall back safely to the existing mapping until migration is complete.

Do not create a runtime dependency that breaks the quote flow if Sanity is
unavailable.

---

# 4. Project schema

Projects are a high-priority CMS content type.

The owner should be able to create/update projects without a developer.

The project schema should support:

- title
- slug
- sector
- solutions
- general location / estate
- completion year
- project scope
- customer requirement
- delivered solution
- materials where useful
- hero image
- gallery
- featured flag
- display/order value where appropriate
- publish status / draft workflow through Sanity
- optional SEO description where useful

Do not include public client-name fields as a normal website requirement.

Client identity is not intended for publication.

---

## Project location privacy

Location should be general.

Good examples:

- Runda, Nairobi
- Karen, Nairobi
- Kiambu
- Thika Road area

Avoid exact private residential addresses.

The CMS field description should explicitly remind editors of this.

---

## Completion year

Store completion year separately rather than a full date unless the business
has a need for exact dates.

Preferred UI:

Completion year:
`2026`

Do not invent completion years for existing projects.

---

## Project scope

Support concise project scope text.

This can describe what was delivered without exposing private client details.

Do not auto-generate project scope from solution summaries.

---

# 5. Project galleries

Project galleries should be first-class editable content.

Requirements:

- multiple images
- drag/reorder where Sanity supports it
- alt/caption fields where practical
- hero image remains distinct
- avoid accidental duplicate hero image in gallery
- preserve image metadata useful for optimization

Do not overcomplicate image schema.

The owner specifically complained about stale project photography, so updating
project galleries should be easy.

---

# 6. Project workflow / Studio usability

Projects should be one of the easiest documents to create.

Prefer sensible field ordering:

1. Project title
2. Hero image
3. Gallery
4. Solution(s)
5. Sector
6. General location
7. Completion year
8. Scope
9. Requirement
10. Delivered solution
11. Featured

Use clear field descriptions.

Avoid exposing technical/internal fields prominently if editors do not need
them.

If Studio supports previews, project previews should show:

- title
- sector
- location where available
- thumbnail

---

# 7. Site settings schema

Expand/evolve settings so editable business content can move out of components
and seed files.

Support where appropriate:

- business name
- legal name
- tagline
- description
- primary phone
- WhatsApp
- email
- location
- address
- opening hours
- service areas
- social links
- map link
- site-visit wording
- warranty wording
- quote/estimate explanatory text
- review link
- other public contact settings currently used by the site

Do not put every paragraph of page copy into settings.

Settings are for shared/global business content.

---

## Confirmed values

Populate/seed confirmed values:

Primary phone:

`+254 722 765397`

WhatsApp:

`+254 722 765397`

Email:

`info@capitalshades.co.ke`

Business location:

`Nairobi`

Service geography:

- Nairobi
- Kiambu County
- Machakos County
- Kajiado County

Broader positioning:

- Kenya
- East Africa

Do not invent:

- street address
- map coordinates
- business hours
- social accounts

---

# 8. Warranty content

Move the approved warranty wording into editable shared content/settings.

Approved wording:

> Selected structures are covered by warranties of up to 10 years.
> Final warranty terms are provided with the quotation and contract documents.

Do not replace this with a blanket 10-year warranty.

Keep exact warranty scope unresolved until confirmed.

---

# 9. Site-visit / quote wording

Move reusable quote/site-visit explanatory text into shared content where
appropriate.

Approved business rules:

- Site visit is part of the normal process.
- Final quotation follows site visit and confirmed measurements.
- Site photos may support an initial assessment/estimate.
- Free site visits are not guaranteed everywhere.
- Nairobi and nearby areas may qualify for free site visits depending on
  distance.

Avoid putting commercial policy into code when editors may need to adjust it.

---

# 10. Public settings safety

Preserve the Phase A public-settings boundary.

The raw CMS settings document must not automatically be serialized to the
browser.

Continue using:

- explicit public-settings projection
- allowlisted public fields

If new settings fields are added, expose them publicly only when required by
the frontend.

Internal or future-only CMS fields should remain server-side.

---

# 11. Content source abstraction

Preserve the existing content abstraction.

The frontend should not become tightly coupled to raw Sanity queries.

Prefer:

Sanity → normalized content model → page loaders/components

rather than:

components directly depending on Sanity document shape.

Existing seed content should remain usable as fallback during migration where
practical.

---

# 12. Migration compatibility

During C5, the frontend must continue to work while data is partially migrated.

Support temporary compatibility where needed.

Examples:

- old solution slugs may redirect to new slugs;
- legacy project `product` references may map into `solutions`;
- legacy images may map into `heroImage`;
- hard-coded quote material fallback may remain until CMS options exist.

Add TODO/deprecation comments where appropriate.

Do not leave silent compatibility hacks undocumented.

---

# 13. Slugs and redirects

Preserve SEO value and old links.

When solution slugs change, add redirects where needed.

Likely examples:

`/solutions/car-park-shades`
→ `/solutions/car-parking-shades`

`/solutions/tensile-membrane-structures`
→ `/solutions/tensile-custom-structures`

Do not choose final redirect targets blindly.

Inspect current routes and existing indexed/legacy URLs before implementing.

Avoid redirect chains.

---

# 14. Blog / articles

Keep blog/articles editable in Sanity.

Do not redesign the blog in C5.

Ensure existing article fields remain usable.

If legacy blog content uses outdated service terminology, do not rewrite all
articles during this phase.

Record content-alignment work for C6.

---

# 15. CMS priorities

The owner identified these as highest-priority editable content:

1. Projects
2. Project galleries/photos
3. Blog/articles

Optimize Studio usability around these first.

Solutions and settings should also be editable but do not need unnecessarily
complex editorial workflows.

---

# 16. Existing content migration

Create a deliberate migration strategy for existing seed/Sanity content.

Before deleting or replacing records:

- inspect existing Sanity documents;
- identify legacy slugs;
- identify references from projects;
- map old → new taxonomy;
- preserve project relationships;
- preserve useful copy/images;
- flag ambiguous mappings.

Do not perform destructive migration until the mapping is documented.

If the project currently uses import/seed scripts, update them so a clean
environment can produce the new schema/content model.

---

# 17. Migration report

At the end of C5, report:

1. New/changed Sanity schemas
2. Old → new solution mapping
3. New solution records
4. Legacy records retained temporarily
5. Redirects added
6. Project migration approach
7. Settings migrated
8. Quote material integration status
9. Seed/import script changes
10. Any manual migration steps required in production Sanity
11. Any unresolved business/content decisions

---

# 18. Validation

Run:

- formatter
- npm run check
- npm run lint
- tests if any
- npm run build

Also verify:

- homepage
- /solutions
- all solution detail pages
- /projects
- multiple project detail pages
- /about
- /contact
- /request-a-quote

Verify both:

- seed/fallback content mode where supported
- Sanity content mode where local credentials/data allow it

If live Sanity cannot be tested locally because credentials are unavailable,
state exactly what was tested instead.

---

# 19. Out of scope

Do not begin:

- C6 full-site content alignment
- C7 SEO/local-search optimization
- C8 launch QA
- CRM/customer-management system
- invoicing system
- major blog redesign
- analytics overhaul

Do not redesign existing page layouts during C5.

---

# C5 migration map

Recorded before any migration runs. `studio/scripts/migrate-solutions.ts`
implements it and never deletes or overwrites a document or field.

## Solutions: old → new

| Legacy record (slug)                                        | New record (slug)                                         | Status    | Notes                                                                                   |
| ----------------------------------------------------------- | --------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------- |
| Car Park Shades (`car-park-shades`)                         | Car Parking Shades (`car-parking-shades`)                 | Published | Copy and photo carried over; 301 from the old slug                                      |
| Shade Sails (`shade-sails`)                                 | Shade Sails (`shade-sails`)                               | Published | Unchanged                                                                               |
| Canopies (`canopies`)                                       | Canopies (`canopies`)                                     | Published | Unchanged                                                                               |
| Tensile Membrane Structures (`tensile-membrane-structures`) | Tensile & Custom Structures (`tensile-custom-structures`) | Published | Existing copy fits the wider category; 301 from the old slug; copy alignment is C6      |
| Parasols (`parasols`)                                       | Parasols (`parasols`)                                     | Published | Unchanged                                                                               |
| Pool Shades (`pool-shades`)                                 | Pool Shades (`pool-shades`), retained                     | Legacy    | An application, not a top-level solution. Page still served, unlisted; target undecided |
| —                                                           | Awnings (`awnings`)                                       | Planned   | New record; no page until copy and photos are confirmed                                 |
| —                                                           | Pergolas & Gazebos (`pergolas-gazebos`)                   | Planned   | New record; no page until copy and photos are confirmed                                 |
| —                                                           | Screen Fencing (`screen-fencing`)                         | Planned   | New record; no page until copy and photos are confirmed                                 |

Statuses: **Published** has a page and is listed (index, navigation, footer,
home, contact form, sitemap). **Planned** is in the taxonomy (the quote form
lists it) but has no page. **Legacy** keeps its old page for existing links,
unlisted and out of the sitemap.

Any other legacy product slug is reported by the script and left alone.

## Projects

- `product` reference → `solutions[0]`, through the map above.
- `image` → `heroImage`.
- `completed` → `completionYear`, only when the old text holds exactly one
  year (e.g. "Mar 2026" → 2026). Anything else is reported, never guessed.
- Legacy fields stay, read-only in a collapsed "From the old website"
  fieldset, until production is checked.
- The site reads both shapes meanwhile: an unmigrated project resolves its
  old `product` slug through `LEGACY_SOLUTION_SLUGS`.
- Seed project `pergola-structure` stays linked to Canopies. It is a pergola,
  but Pergolas & Gazebos has no page yet, so moving it now would leave it with
  no solution link. Move it when that page is published.

## Redirects (all single-hop)

| From                                     | To                                     |
| ---------------------------------------- | -------------------------------------- |
| `/solutions/car-park-shades`             | `/solutions/car-parking-shades`        |
| `/solutions/tensile-membrane-structures` | `/solutions/tensile-custom-structures` |
| `/products/car-park-shades`              | `/solutions/car-parking-shades`        |
| `/products/tensile-membrane-structures`  | `/solutions/tensile-custom-structures` |
| `/car-park-shades` (old WordPress)       | `/solutions/car-parking-shades`        |
| `/projects?solution=car-park-shades`     | read as `car-parking-shades`           |

The old site's sitemap also lists `/portfolios/*` (theme demo content) and
`/portfolios_category/{canopies,car-park-shade,services,tents}`. They aren't
redirected yet; that's left for C7/C8.

## Production Sanity: manual steps

1. Deploy the Studio with the new schema (`cd studio && npm run deploy`).
2. Dry run: `cd studio && npm run migrate-solutions`. Review the plan.
3. Apply: `npm run migrate-solutions -- --apply`. Publish any drafts it
   reports and run it again.
4. Add `solution` to the rebuild webhook filter (README, "Rebuild on publish").
5. Rebuild and check the site. Until step 3 runs, the build stops with an
   error pointing at the script rather than publishing a site with no solutions.
6. After checking, a later cleanup removes the `product` type and documents
   and the legacy project fields (the `TODO(after-c5-migration)` comments).

A new, empty dataset uses `npm run import-seed` instead.

# Acceptance criteria

- [x] Sanity solution schema supports the current working taxonomy
- [x] Eight top-level solution records are supported
- [x] Legacy solution data has an explicit migration map
- [x] Application/subtype content is supported
- [x] Customer terminology/aliases can be stored
- [x] Per-solution material options can be stored
- [x] Quote flow can consume content-driven materials with a safe fallback
- [x] Project schema supports multiple solutions
- [x] Project general location is editable
- [x] Project completion year is editable
- [x] Project scope is editable
- [x] Project requirement/delivered solution are editable
- [x] Project gallery is editable
- [x] Featured project state is editable
- [x] Settings support confirmed contact and geography
- [x] Warranty wording is editable shared content
- [x] Site-visit/quote wording is editable shared content
- [x] Public settings allowlist remains enforced
- [x] Blog/articles remain editable
- [x] Legacy routes/content continue to work during migration
- [x] Redirects avoid chains
- [x] seed/import tooling reflects the new model
- [x] no existing rebuilt frontend page is visually redesigned
- [x] npm run check passes
- [x] npm run lint passes
- [x] npm run build passes

---

## Phase Boundary

Stop after C5.

Do not begin:

- C6 Content Alignment
- C7 SEO / Local Search
- C8 Launch QA

# Remaining roadmap

## Phase C6 — Content Alignment

Planned.

Use verified discovery results to update:

- homepage
- About
- Solutions
- process wording
- geographic scope
- warranty language
- materials/sourcing
- institutional positioning.

---

## Phase C7 — SEO / Local Search

Planned.

High priority due to owner goals.

Expected work includes:

- keyword/search-intent research
- page titles/descriptions
- headings/content
- technical SEO
- structured data
- internal linking
- canonical URLs
- project location signals
- Nairobi/local search
- Kenya/East Africa positioning
- Google Business Profile alignment
- sitemap
- robots
- Search Console
- blog/content opportunities
- Core Web Vitals

---

## Phase C8 — Launch QA

Planned.

Expected work:

- responsive QA
- accessibility
- forms
- WhatsApp/call links
- metadata
- redirects
- broken links
- image optimization
- performance
- analytics
- production environment
- domain/DNS
- monitoring
- enquiry endpoint rate limiting

### Enquiry endpoint rate limiting

`/api/enquiry` is protected only by a honeypot field. Since C4, a quote
request can carry about 4 MB of site photos that are emailed as attachments,
so a spam burst could fill the inbox and use up the Resend quota, making real
enquiries fail.

Before launch:

- add a per-IP limit on `/api/enquiry` (host firewall rule, or a KV/edge
  counter keyed on `getClientAddress()`), returning a friendly 429 that keeps
  the WhatsApp fallback usable;
- consider a minimum form-completion time as a cheap extra bot check;
- confirm the Resend plan's sending and attachment quotas.
