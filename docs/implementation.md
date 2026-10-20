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

## Phase C5.0 — Sanity / Content Model Migration

Status: Complete

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

Stop after C5.0.

Do not begin:

- C5.5
- C6 Content Alignment
- C7 SEO / Local Search
- C8 Launch QA

## Phase C5.5 — Homepage Conversion Refinement

Status: Complete

## Objective

Refine the homepage so a first-time visitor can quickly understand:

1. What Capital Shades does
2. Who it serves
3. Why the business is a strong fit
4. Where it operates
5. What kind of work it has delivered
6. How to contact the team immediately

This is not a full redesign.

The goal is to reduce unnecessary homepage sections, sharpen the message,
and make the first one to two screenfuls commercially stronger.

Do not begin the full C6 content-alignment phase.

---

## Core principle

The homepage should not try to explain the entire website.

It should function as:

- a strong business introduction;
- a trust layer;
- a proof layer;
- a routing layer;
- a conversion page.

Visitors should be able to understand the Capital Shades proposition without
scrolling through many explanatory sections.

---

# 1. Recommended homepage structure

Refine the homepage toward this order:

1. Hero
2. Why Capital Shades
3. Core solutions
4. Selected projects
5. Residential / Commercial / Institutional
6. How it works
7. Final conversion CTA
8. Footer

Reduce or remove homepage sections that are useful elsewhere but do not need
their own dedicated homepage block.

---

# 2. Hero

The hero should communicate the business proposition more directly than the
current expressive version.

The visitor should understand within a few seconds that Capital Shades:

- designs;
- fabricates;
- supplies;
- installs;
- maintains shade/outdoor structures.

The hero should also establish:

- homes, businesses and institutions as customer contexts;
- Nairobi as the business base;
- Kenya / East Africa as the broader service scope;
- Request a Quote and WhatsApp as primary conversion paths;
- Projects as the main proof path.

---

## Hero messaging direction

Use a strong literal headline rather than relying only on abstract brand copy.

Preferred direction:

> Shade structures designed, fabricated and installed for your space.

Supporting copy can communicate:

> Car parking shades, shade sails, canopies, awnings, pergolas, tensile
> structures and more — for homes, businesses and institutions across Kenya
> and East Africa.

Do not feel required to copy this word-for-word if a stronger concise version
fits the existing visual composition.

Keep it factual.

Do not overload the hero with every service or process detail.

---

## Hero actions

Primary:

- Request a Quote

Secondary:

- WhatsApp

Tertiary / supporting link:

- View Projects

The hero should make it clear that a visitor can either:

- start a structured quote;
- start a quick conversation;
- review completed work first.

---

# 3. Capability line

Near the hero, expose the confirmed lifecycle in a restrained form.

For example:

Design · Fabrication · Supply · Installation · Maintenance

This may be:

- a thin capability strip;
- a quiet line under the hero copy;
- another editorial treatment that fits the existing design.

Do not turn this into five large cards.

---

# 4. Why Capital Shades

Add or refine one concise section near the top answering:

"Why should I choose Capital Shades?"

Use the owner-confirmed differentiators and verified service capability.

Preferred themes:

### Custom design

Structures are designed around the site, intended use and project requirements.

### Materials & finishes

The business uses high-end materials and finishes, with material sourcing
including suppliers in South Africa and France.

Do not invent supplier brands or certifications.

### Expert installation

Installation is one of the owner-confirmed differentiators.

Avoid vague superlatives.

### Full lifecycle / after-sales

Capital Shades handles the project from design and fabrication through
installation, maintenance and after-sales support.

Warranty may be mentioned only using the approved conditional wording where
appropriate.

---

## Presentation

Do not build four generic SaaS cards.

Prefer:

- editorial columns;
- ruled rows;
- concise statements;
- small numbered items;
- restrained typography.

The section should remain compact.

---

# 5. Core solutions

Keep a homepage Solutions section, but reduce its role.

The homepage does not need to explain all eight solution categories in depth.

Use the current working taxonomy:

- Car Parking Shades
- Shade Sails
- Canopies
- Awnings
- Pergolas & Gazebos
- Tensile & Custom Structures
- Screen Fencing
- Parasols

Preferred behavior:

- feature approximately 4–6 strategically useful solutions;
- link clearly to View all Solutions;
- retain access to all eight on `/solutions`.

Prioritize solutions with:

- existing project proof;
- common customer search terminology;
- strategic commercial relevance.

Do not bring Pool Shades back as a top-level solution.

---

# 6. Remove/reduce the standalone solution-guide section

The current homepage has dedicated solution/material guidance.

Review whether the standalone:

"Which structure is right for your space?"

or equivalent guidance deserves a full homepage section.

Preferred direction:

Remove or significantly reduce it.

Reason:

- the Solutions page now handles detailed guidance;
- the quote flow provides "Not sure — help me choose";
- the homepage should focus on proposition, proof and conversion.

If useful, retain only a compact prompt such as:

> Not sure which structure suits your space?
> We can help you choose.

Link to:

- Solutions
- Request a Quote

Do not keep a large comparison block merely because it already exists.

---

# 7. Remove homepage material comparison

Remove the detailed Shade Mesh vs PVC comparison from the homepage unless
there is a strong UX reason to retain it.

Material education belongs more naturally on:

- Solutions;
- relevant solution detail pages;
- quote flow.

The first-time visitor does not need to understand roofing-material differences
before understanding the company itself.

Removing it should shorten the page.

Do not delete the shared component/data if other pages still use it.

---

# 8. Selected projects

Keep real project proof prominent.

Projects should appear early enough that visitors can quickly verify the work.

Preferred section:

- 3–5 strong projects;
- image-led;
- minimal metadata;
- solution / sector where useful;
- general location only when verified;
- View all Projects.

Do not overcrowd the homepage with project cards.

Avoid repeating project imagery elsewhere on the same page.

---

# 9. Featured project section

Review whether the standalone Featured Project section still adds enough value
now that:

- Selected Projects exists;
- project detail pages exist;
- project-specific metadata is still incomplete.

Preferred direction:

Remove the dedicated Featured Project homepage section unless it provides
meaningfully different proof from Selected Projects.

A deeper featured case study can return later when verified project scope,
location, year and delivered-solution content are available.

Do not keep the section only to preserve the previous B2 layout.

---

# 10. Customer sectors

Keep:

- Residential
- Commercial
- Institutional

Give the three equal visual importance.

Do not base prominence solely on current portfolio counts.

Institutional work is a strategic growth target.

The section should help customers self-identify quickly.

Possible examples:

### Residential

Homes and private outdoor spaces.

### Commercial

Developers, offices, hospitality and commercial properties.

### Institutional

Schools, hospitals, churches and government organisations.

Use confirmed customer categories only.

---

# 11. Process

Replace the older provisional process with the now-confirmed customer journey.

Do not show all 11 internal stages on the homepage.

Compress them into four understandable stages:

### 1. Tell us about the project

Initial enquiry and discussion.

### 2. Site visit & measurements

Capital Shades reviews the site and confirms measurements.

### 3. Design, quotation & fabrication

The project is designed/proposed, quoted and fabricated after approval.

### 4. Installation, handover & support

Installation, handover and after-sales support.

This should align with the full confirmed process recorded in `decisions.md`.

Avoid old generic stages such as:

- Site evaluation
- Design
- Fabrication
- Installation

when they omit important context such as quotation, handover and support.

---

# 12. Geography

Homepage should communicate service geography once, clearly.

Preferred concise direction:

> Based in Nairobi · Projects across Kenya and East Africa

or equivalent.

Do not repeat this phrase throughout multiple sections.

Do not turn this phase into SEO keyword optimization.

C7 will handle detailed local-search strategy.

---

# 13. Warranty

Warranty is a useful trust signal but must remain conditional.

If used on the homepage, only use approved wording or a concise derivative
that preserves the condition.

Approved wording:

> Selected structures are covered by warranties of up to 10 years.
> Final warranty terms are provided with the quotation and contract documents.

A shorter homepage treatment may say:

> Selected warranties up to 10 years

only if nearby/contextual copy makes it clear that terms vary.

Do not write:

- 10-year warranty
- all structures covered for 10 years

as an unconditional claim.

It is also acceptable to leave warranty detail off the homepage and expose it
through About / Quote instead.

---

# 14. Final conversion section

Keep one strong final CTA.

The visitor should be offered:

- Request a Quote
- WhatsApp
- Call

Preferred message:

> Tell us about your project.

Supporting copy may mention:

- site photos are useful;
- rough dimensions are enough to start;
- final quotation follows the site visit.

Keep this concise.

---

# 15. WhatsApp / mobile conversion

Preserve existing behavior.

Desktop/tablet:

- floating WhatsApp control remains;
- do not let it cover footer or CTA content.

Mobile:

- Call | WhatsApp | Request a Quote
- no duplicate floating WhatsApp control.

Hero-aware mobile action-bar behavior should continue working after the hero
changes.

---

# 16. Homepage copy alignment

Use the now-confirmed business facts.

The homepage may accurately say that Capital Shades:

- is based in Nairobi;
- serves Kenya and East Africa;
- designs;
- fabricates;
- supplies;
- installs;
- provides maintenance and repair;
- provides after-sales support;
- works with Residential, Commercial and Institutional customers;
- sources materials including from suppliers in South Africa and France.

Do not invent:

- years in business;
- project totals;
- client totals;
- supplier brands;
- certifications;
- project completion claims;
- response-time promises;
- installation-duration promises.

---

# 17. Visual direction

Do not redesign the visual system again.

Preserve:

- warm white;
- charcoal;
- restrained gold;
- teal;
- editorial typography;
- strong photography;
- thin rules;
- restrained geometry.

The main visual goal of this phase is:

**less page, clearer hierarchy.**

Prefer fewer stronger sections over additional visual treatments.

---

# 18. Page-length reduction

The final homepage should be materially shorter than the current B2 version.

Candidates for removal/merging:

- standalone material comparison;
- large solution-guidance block;
- standalone Featured Project section;
- repetitive CTAs;
- redundant copy.

Do not remove content merely to hit an arbitrary number of pixels.

Every remaining section should answer a distinct customer question.

---

# 19. Customer-question test

After implementation, review the page from the perspective of a first-time
visitor.

Within the first 1–2 screenfuls they should be able to answer:

- What does Capital Shades do?
- Does it handle my type of project?
- Why should I consider them?
- Where do they work?
- How can I contact them now?

By the end of the homepage they should also know:

- what main solutions are available;
- that real project proof exists;
- that Residential / Commercial / Institutional work is supported;
- what the broad project process looks like.

---

# 20. Responsive requirements

Verify:

- desktop
- tablet
- 375px
- 320px

Especially verify:

- hero CTA hierarchy;
- capability line;
- Why Capital Shades section;
- solution list;
- project imagery;
- process steps;
- mobile action bar.

No horizontal overflow.

---

# 21. Accessibility

Preserve:

- semantic heading order;
- image alt text;
- keyboard navigation;
- focus states;
- accessible WhatsApp/Call/Quote links;
- reduced motion preferences.

Do not turn concise UI into icon-only inaccessible content.

---

# 22. Out of scope

Do not begin:

- C6 full-site content alignment
- C7 SEO/local search
- C8 launch QA
- Sanity schema changes
- quote-flow redesign
- project-page redesign
- solution-page redesign

This phase is homepage refinement only.

---

# Acceptance criteria

- [x] Homepage is materially shorter
- [x] Hero immediately explains what Capital Shades does
- [x] Hero communicates customer contexts
- [x] Hero includes Nairobi / Kenya / East Africa positioning appropriately
- [x] Request a Quote is prominent
- [x] WhatsApp is prominent
- [x] View Projects remains an obvious proof path
- [x] Confirmed lifecycle is visible near the top
- [x] Why Capital Shades uses verified differentiators
- [x] Solutions section is concise
- [x] Detailed material comparison removed from homepage
- [x] Large "help me choose" section removed or reduced
- [x] Selected Projects remains strong
- [x] Standalone Featured Project removed unless it adds distinct value
- [x] Residential / Commercial / Institutional remains visible
- [x] Homepage process reflects confirmed customer journey
- [x] Final CTA supports Quote / WhatsApp / Call
      (C5.6: on the home page WhatsApp comes from the floating control, see
      docs/decisions.md — "Mobile conversion")
- [x] No unsupported claims introduced
- [x] Existing visual design language is preserved
- [x] Existing WhatsApp/mobile behavior is preserved
- [x] No horizontal overflow at 320px / 375px
- [x] npm run check passes
- [x] npm run lint passes
- [x] npm run build passes

---

## Phase Boundary

Stop after homepage conversion refinement.

## Phase C5.6 — Mobile Homepage Compression

Status: Complete

## Objective

Reduce the homepage's mobile scroll length and improve first-screen conversion
without removing important business information or redesigning the desktop
experience.

The primary focus is mobile presentation.

Use:

- tighter mobile typography;
- tighter vertical spacing;
- horizontal swipe / scroll-snap for suitable repeated content;
- a more compact connected process timeline;
- a much simpler mobile footer.

Do not begin C6.

---

## Core principle

Do not remove information simply to shorten the page.

Instead, reduce vertical repetition on mobile and make repeated content easier
to browse horizontally.

The homepage should still answer:

- What does Capital Shades do?
- Who is it for?
- Why should I consider them?
- Where do they work?
- Can I see real projects?
- How do I contact them now?

Desktop/tablet should retain the existing editorial composition unless a small
shared adjustment is necessary.

---

# 1. Hero mobile compression

On phones, make the hero materially more compact.

Goals:

- Capital Shades / location label visible;
- headline visible;
- supporting copy remains understandable;
- Request a Quote visible in the first viewport;
- WhatsApp also visible in the first viewport where reasonably possible;
- View Projects remains available as a quieter proof path.

Review:

- headline font size;
- headline line height;
- supporting-copy size;
- supporting-copy width;
- vertical gaps;
- CTA padding;
- hero image height / placement.

Do not make the hero feel cramped.

Do not reduce accessibility tap targets.

---

## Mobile hero typography

Preserve the strong desktop typography.

On small phones, deliberately reduce the headline and supporting-copy scale so
the visitor reaches the conversion actions sooner.

Create a proper mobile type scale rather than shrinking every element equally.

The hero should still feel confident, premium and readable.

---

# 2. Hero CTA layout

Optimize the mobile CTA group so the two most important actions appear early.

Priority:

1. Request a Quote
2. WhatsApp
3. View Projects

Preferred mobile treatment:

[ Request a Quote ] [ WhatsApp ]

View projects →

A stacked layout is acceptable if a two-column treatment becomes cramped at
320px.

Requirements:

- Request a Quote remains visually primary;
- WhatsApp remains immediately visible;
- View Projects may use a lighter text-link treatment;
- all tap targets remain comfortable;
- no horizontal overflow.

---

# 3. Capability line

Current capability message:

Design · Fabrication · Supply · Installation · Maintenance

Keep this near the hero but compress it on phones.

Avoid awkward separator wrapping.

Possible treatments:

- compact two-line layout;
- horizontally scrollable line;
- tightly spaced wrapping with controlled separators.

Do not turn the five capabilities into five stacked cards.

The line should remain easy to scan without adding significant page height.

---

# 4. Why Capital Shades — mobile swipe

Desktop:

Preserve the current editorial composition.

Mobile:

Convert the repeated reasons into a horizontally scrollable, scroll-snap row.

Current themes:

- Custom design
- Materials & finishes
- Expert installation
- Support after handover

Requirements:

- native horizontal scrolling;
- CSS scroll-snap;
- no carousel library;
- partial next item visible to suggest horizontal browsing;
- usable with JavaScript disabled;
- keyboard accessible;
- visible focus states;
- no autoplay;
- no forced slide changes.

Keep each item concise.

Prefer restrained panels with:

- small number / label;
- short heading;
- short supporting sentence.

Avoid large rounded cards and heavy shadows.

The warranty text should not become another large mobile block.

If retained here, keep it compact and clearly conditional.

---

# 5. Solutions — mobile swipe

Desktop:

Preserve the current concise solution treatment.

Mobile:

Convert the featured solution items into a compact horizontal scroll-snap rail.

Each item should contain only what is useful for quick recognition:

- image;
- solution title;
- link / tap target.

Avoid long descriptions.

Show enough of the next item to make horizontal scrolling obvious.

Requirements:

- native horizontal scroll;
- CSS scroll-snap;
- no carousel dependency;
- no autoplay;
- links remain directly accessible;
- focus rings must not be clipped.

Keep:

**View all solutions**

outside the scroll area and always visible.

---

## Not sure prompt

Keep the compact prompt:

> Not sure which structure suits your space?

Offer:

- Request a Quote / Help me choose
- WhatsApp advice message

This prompt should remain outside the horizontal rail so it is not hidden
behind a swipe interaction.

---

# 6. Selected Projects — mobile swipe

Selected Projects is the strongest candidate for horizontal browsing.

Desktop:

Preserve the existing editorial project composition.

Mobile:

Use a horizontal scroll-snap project rail instead of stacking multiple large
project images vertically.

Each project may show:

- strong project image;
- project title;
- solution and/or sector where useful.

Requirements:

- real project imagery;
- natural image proportions;
- native horizontal scrolling;
- CSS scroll-snap;
- partial next project visible;
- no autoplay;
- no JavaScript-heavy carousel;
- project image/title remains a real link;
- keyboard navigation remains usable.

Avoid:

- equal-height generic cards;
- heavy overlays;
- badges;
- excessive metadata.

Keep:

**View all projects**

outside the rail.

---

# 7. Sectors — compact mobile treatment

Do not automatically convert Residential / Commercial / Institutional into a
carousel.

There are only three sectors, and all three are strategically important.

On mobile, first test a compact layout that keeps all three visible with minimal
height.

Preferred direction:

Residential  
Homes & private spaces →

Commercial  
Developers, hospitality & businesses →

Institutional  
Schools, hospitals, churches & government organisations →

Possible treatments:

- three compact ruled rows;
- compact stacked editorial items;
- a very small horizontal treatment if it proves materially better.

Only use horizontal swipe if it clearly improves both height and usability.

Requirements:

- Residential, Commercial and Institutional remain equally discoverable;
- Institutional must not be visually de-emphasized;
- no project counts;
- no empty-state messaging here.

---

# 8. Process visual treatment

Replace the current process presentation with a connected numbered progression
inspired by the structural idea used on the Greenleaf Kenya Services page.

Borrow the concept, not Greenleaf's visual styling.

Capital Shades process:

1. Tell us about the project
2. Site visit & measurements
3. Design, quotation & fabrication
4. Installation, handover & support

---

## Desktop process

Desktop may use a horizontal or stepped progression.

Requirements:

- clear numerical sequence;
- stages visibly connected;
- restrained typography;
- minimal chrome;
- thin connecting rule;
- no large standalone cards.

The progression should communicate that these stages belong to one process.

---

## Mobile process

Do not make the process swipeable.

Use a compact vertical timeline.

Preferred structure:

01
Tell us about the project
Initial enquiry and discussion

│

02
Site visit & measurements
We review the site and confirm dimensions

│

03
Design, quotation & fabrication
The project is agreed, quoted and fabricated after approval

│

04
Installation, handover & support
Installation, handover and available after-sales support

Requirements:

- numbers aligned consistently;
- thin gold or restrained connecting rule;
- concise descriptions;
- minimal vertical padding;
- no large cards;
- sequence is visually obvious.

Preserve the Capital Shades visual system:

- warm white;
- charcoal;
- restrained gold;
- teal accents only where appropriate.

---

# 9. Closing CTA

Keep the final CTA concise and compact on phones.

Core message:

> Tell us about your project.

Supporting text should remain short.

For example:

> Rough dimensions and a few site photos are enough to start. Your final
> quotation follows a site visit and confirmed measurements.

Actions:

- Request a Quote
- WhatsApp
- Call

Avoid making this another full-height hero.

Reduce:

- oversized heading scale;
- excessive top/bottom padding;
- unnecessary image height;
- repeated explanatory copy.

---

# 10. Mobile footer compression

On phones, simplify the footer substantially.

The mobile footer should function primarily as:

- contact information;
- brand closure;
- essential utility links.

It should not act as a duplicate site map.

---

## Hide on mobile

Hide the full:

- Solutions navigation column
- Company/navigation column

These links remain available through:

- mobile header navigation;
- contextual page links;
- site content.

Tablet and desktop should retain the fuller footer navigation.

---

## Keep on mobile

Keep:

- Capital Shades logo / brand
- primary phone
- WhatsApp
- email
- concise location/service-area context
- verified social links
- Blog / Insights
- Privacy
- copyright

Possible mobile footer rhythm:

Capital Shades

Call
0722 765 397

WhatsApp
Chat with us

Email
info@capitalshades.co.ke

Based in Nairobi
Projects across Kenya and East Africa

[ verified social links ]

Blog / Insights
Privacy

© Capital Shades

Do not add unverified social links.

---

# 11. Mobile section spacing

Review homepage-specific mobile spacing.

The global design system intentionally uses generous editorial spacing, but the
homepage can use a tighter rhythm on phones.

Prefer section-level mobile adjustments rather than changing spacing globally.

Review:

- section top/bottom padding;
- gaps between heading and content;
- spacing between rail and section footer link;
- CTA block spacing;
- process row spacing.

Goal:

reduce scroll fatigue without making the page feel crowded.

---

# 12. Swipe behavior guidelines

All swipeable sections should prefer native browser behavior.

Use:

- `overflow-x: auto`
- `scroll-snap-type`
- `scroll-snap-align`
- appropriate item widths
- controlled gap
- optional quiet scrollbar treatment

Avoid:

- autoplay
- timed movement
- drag-only interaction
- pagination dots unless clearly useful
- large JavaScript carousel libraries
- infinite looping

Users must still be able to:

- swipe on touch;
- scroll with a trackpad;
- use keyboard navigation;
- tab into individual links;
- access all content without JavaScript.

---

# 13. Swipe affordance

Avoid repeatedly writing "Swipe →".

Prefer visual affordance:

- partial next item visible;
- horizontal continuation;
- natural clipped edge.

A subtle "Swipe to explore" hint may be used only if testing shows the
interaction is otherwise unclear.

Do not clutter every rail with instructions.

---

# 14. Mobile action bar

Preserve the existing:

Call | WhatsApp | Request a Quote

behavior.

The hero should remain marked with `data-hero`.

The action bar should continue appearing only after the hero leaves the
viewport.

Because the hero now exposes Quote and WhatsApp earlier, verify that the action
bar's appearance after the hero feels natural rather than repetitive.

Do not add another floating WhatsApp control on phones.

---

# 15. Accessibility

Horizontal rails must preserve:

- semantic links;
- logical document order;
- keyboard focus;
- visible focus states;
- screen-reader readability;
- comfortable tap targets.

Do not hide essential content behind hover.

Do not create keyboard traps.

Do not clip focus rings at the edges of horizontal containers.

The process timeline should preserve proper heading/list semantics rather than
being purely decorative.

---

# 16. Responsive verification

Test:

- 320px
- 375px
- 390px
- tablet
- desktop

Specifically verify:

### Hero

- Quote appears in the first viewport;
- WhatsApp also appears in the first viewport where practical;
- View Projects remains accessible;
- copy remains readable.

### Swipe sections

- native swipe works;
- no page-level horizontal overflow;
- next-item affordance is visible;
- links remain clickable;
- keyboard focus is visible.

### Process

- timeline alignment holds;
- connecting rule does not break;
- descriptions remain readable.

### Footer

- significantly shorter on mobile;
- all essential contact actions remain available;
- no important nav dependency is lost.

---

# 17. Page-length target

Do not optimize for a precise pixel number.

Current mobile homepage is approximately 7,900px at 375px.

The page should become materially shorter.

A result around roughly 6,000–7,000px would be a useful signal if achieved
naturally.

The more important metric is:

- lower scroll fatigue;
- earlier conversion actions;
- no important information lost.

Do not sacrifice clarity merely to reach a height target.

---

# 18. Desktop protection

This phase is primarily mobile-focused.

Do not materially redesign desktop sections that already work.

Shared-component changes must preserve existing desktop behavior by default.

The process timeline may receive a deliberate desktop improvement as described
above, but it must remain consistent with the established visual language.

---

# 19. Before / after report

Before changing code:

1. measure homepage height at 320px and 375px;
2. identify the biggest vertical contributors;
3. record the first-viewport position of:
   - Request a Quote;
   - WhatsApp;
   - View Projects.

After implementation, report the same values.

Also report:

- which sections became horizontal rails;
- whether Sectors stayed vertical or became horizontal;
- mobile footer height before/after;
- hero height before/after;
- any desktop changes required.

---

# Out of scope

Do not:

- remove additional major business sections;
- redesign Solutions pages;
- redesign Projects pages;
- redesign About / Contact;
- modify Sanity schemas;
- alter quote-flow behavior;
- begin C6 content alignment;
- begin C7 SEO;
- introduce a carousel library.

---

# Acceptance criteria

- [x] Mobile hero is materially shorter
- [x] Request a Quote appears in first viewport at 320px / 375px
- [x] WhatsApp appears in first viewport where practical
- [x] View Projects remains obvious
- [x] Capability line is compact
- [x] Why Capital Shades uses native horizontal scroll-snap on phones
- [x] Featured Solutions uses compact horizontal browsing on phones
- [x] Selected Projects uses horizontal browsing on phones
- [x] Sectors use the most compact usable treatment
- [x] Process uses connected progression styling
- [x] Mobile process is a compact vertical timeline
- [x] Final CTA is vertically compact
- [x] Mobile footer hides full Solutions and Company link columns
- [ ] Mobile footer preserves contact/social/blog/privacy essentials
      (contact, social and Blog done; no Privacy page exists yet to link)
- [x] Mobile page height is materially reduced
- [x] No page-level horizontal overflow
- [x] Horizontal content works without JavaScript
- [x] Keyboard accessibility is preserved
- [x] Existing desktop composition remains intact
- [x] Mobile action-bar behavior does not regress
      (final refinement: action bar removed; floating WhatsApp is the single
      persistent control, see docs/decisions.md — "Mobile conversion")
- [x] npm run check passes
- [x] npm run lint passes
- [x] npm run build passes

---

---

## Phase C6 — Content Alignment

Status: Complete

## Objective

Align all public-facing website copy with the confirmed Capital Shades business
model, taxonomy, service process, geography, warranty language and conversion
strategy.

This phase is primarily about content consistency and truthfulness.

Do not redesign page layouts.

Do not begin the dedicated SEO/local-search phase.

---

## Core principle

Every public page should now use the same language for:

- solutions;
- capabilities;
- sectors;
- geography;
- process;
- quote expectations;
- warranties;
- contact methods.

Remove stale terminology from the old website.

Do not invent missing project facts, supplier details, statistics, certifications
or guarantees.

---

# 1. Full-site content audit

Before changing copy, audit all public-facing content for:

- old solution names;
- references to Pool Shades as a top-level solution;
- "Car Park Shades";
- "Tensile Membrane Structures";
- Product / Products terminology;
- Estimator terminology;
- unsupported claims;
- stale process copy;
- conflicting geography;
- inconsistent warranty wording;
- inconsistent site-visit / quotation wording;
- duplicate or contradictory conversion copy.

Search:

- route files;
- shared components;
- seed content;
- Sanity seed/import content;
- metadata;
- structured data;
- footer/header copy;
- blog content;
- hard-coded fallback copy.

Report the audit categories before making broad changes.

---

# 2. Canonical solution terminology

Use the current working taxonomy consistently:

1. Car Parking Shades
2. Shade Sails
3. Canopies
4. Awnings
5. Pergolas & Gazebos
6. Tensile & Custom Structures
7. Screen Fencing
8. Parasols

Do not publicly present Pool Shades as a ninth top-level solution.

Pool shades may be described as an application/use case where appropriate.

Do not introduce Tents as a primary solution.

---

## Legacy naming

Replace public-facing uses of:

- Car Park Shades
  → Car Parking Shades

- Tensile Membrane Structures
  → Tensile & Custom Structures

Do not break intentional legacy slug redirects or migration code.

Old slugs may remain in:

- redirect maps;
- migration tooling;
- compatibility logic;
- legacy-document handling.

Do not replace technical compatibility values merely for copy consistency.

---

# 3. Homepage

C5.5 and C5.6 established the final homepage structure and messaging direction.

Do not materially redesign it.

Audit only for:

- stale metadata;
- old solution names;
- duplicated claims;
- wording inconsistent with the confirmed business facts;
- geography consistency;
- warranty wording;
- service/process terminology.

Preserve the current section order:

1. Hero
2. Why Capital Shades
3. Solutions
4. How it works
5. Selected work
6. Residential / Commercial / Institutional
7. Closing CTA

---

# 4. Solutions index

Update `/solutions` copy so it reflects the current taxonomy and customer needs.

The page should explain that Capital Shades provides custom shade and outdoor
structure solutions for:

- Residential
- Commercial
- Institutional

The page may refer to:

- design;
- fabrication;
- supply;
- installation;
- maintenance / repair;
- after-sales support.

Avoid overly broad claims.

---

## Pool shades

Do not list Pool Shades as a top-level solution.

Where useful, swimming-pool shade should appear as an application of relevant
solutions.

The legacy Pool Shades route may continue to exist during migration, but public
navigation and primary page copy should not present it as a current top-level
category.

---

# 5. Solution detail pages

Audit every current solution page.

Each page should use a consistent content structure where the available content
supports it:

- clear solution name;
- concise summary;
- typical applications;
- relevant sectors;
- available material information;
- related projects where available;
- contextual quote action;
- contextual WhatsApp action;
- "Not sure?" guidance where useful.

Do not force empty sections.

---

## Planned solutions

Current planned/new categories include:

- Awnings
- Pergolas & Gazebos
- Screen Fencing

If verified copy/photos are still unavailable:

- do not invent detailed marketing copy;
- do not fabricate project proof;
- preserve their planned/unpublished status;
- do not publish thin pages merely to complete the taxonomy.

If a page is not currently published because its content is incomplete, leave
it that way.

Record missing content in `docs/content-to-confirm.md`.

---

# 6. Material language

Use only confirmed material information.

Current safe quote material knowledge remains:

### Car Parking Shades

- Shade mesh
- Waterproof PVC
- Metal roofing

### Shade Sails

- Shade mesh

### Canopies

- Waterproof PVC

### Tensile & Custom Structures

- Waterproof PVC

Do not casually add:

- metal roofing to Canopies;
- shade mesh to Tensile & Custom Structures;
- detailed material choices to Awnings, Pergolas & Gazebos, Screen Fencing or
  Parasols;

unless the content already contains verified owner-confirmed evidence.

Keep unresolved material questions in `docs/content-to-confirm.md`.

---

# 7. About page

Align About with the confirmed business model.

The page should clearly communicate that Capital Shades:

- is based in Nairobi;
- works across Kenya and East Africa;
- handles design;
- fabrication;
- supply;
- installation;
- maintenance / repair;
- after-sales support.

Avoid unnecessary repetition of homepage copy.

---

## About process

Update stale process copy to match the confirmed customer journey.

Use the same four customer-facing stages:

1. Tell us about the project
2. Site visit & measurements
3. Design, quotation & fabrication
4. Installation, handover & support

The About page may explain these stages slightly more deeply than the homepage.

Do not expose all 11 internal process stages unless useful.

---

## Fabrication wording

Fabrication may happen:

- at the Capital Shades workshop;
- on site/customer location where appropriate.

Do not make an unsupported blanket claim that all fabrication is:

- in-house;
- off-site;
- on-site.

Use neutral wording such as:

> Fabrication is carried out according to the project requirements, either at
> the workshop or on site where appropriate.

Only include this detail where it improves understanding.

---

# 8. Contact page

Review the Contact page for content consistency.

Keep primary contact routes:

- Call
- WhatsApp
- Request a Quote
- Email

Confirmed contact:

Phone:
`+254722765397`

WhatsApp:
`+254722765397`

Display phone may remain:

`0722 765 397`

Email:
`info@capitalshades.co.ke`

Do not add an unconfirmed:

- street address;
- map;
- opening hours;
- social account.

---

## Contact geography

A concise statement is sufficient:

> Based in Nairobi, serving projects across Kenya and East Africa.

Do not over-repeat county names unless they help explain site-visit availability.

---

# 9. Request a Quote

Preserve the current quote-flow UX.

Only align copy where required.

The flow should consistently communicate:

- location;
- structure type;
- rough width × length measurements;
- number of vehicles where relevant;
- site photos;
- material preference where confirmed;
- intended use;
- preferred contact method.

---

## Measurement language

Keep measurements simple.

Use concepts such as:

> Rough dimensions are enough to start.

Avoid demanding exact area calculations from users.

Capital Shades confirms measurements during the site visit.

---

## Site photos

Maintain the message that photos are:

- optional;
- useful for initial assessment;
- not a substitute for final site measurements.

Do not promise that photos alone are enough for a final quotation.

---

# 10. Estimate vs final quotation

Use consistent language site-wide.

Approved business rule:

Project details, rough measurements and photos may support an initial
assessment or estimate.

The final quotation follows:

- site visit;
- confirmed measurements.

Remove copy that implies users receive a guaranteed final quote directly from
the online form.

---

# 11. Site visits

Use cautious, accurate wording.

Confirmed:

- site visit is part of the normal process;
- Capital Shades takes/validates site measurements;
- free site visits may be available around Nairobi and nearby areas depending
  on distance.

Do not state:

> Free site visits

as a universal promise.

Prefer wording such as:

> Site visits in Nairobi and nearby areas may be complimentary depending on
> location.

Only include this detail where useful.

---

# 12. Warranty language

Use the approved wording consistently:

> Selected structures are covered by warranties of up to 10 years. Final
> warranty terms are provided with the quotation and contract documents.

Shorter UI wording is acceptable only if it preserves the conditional meaning.

Do not use:

- 10-year warranty
- 10 years guaranteed
- all structures include a 10-year warranty

without qualification.

---

# 13. Geography

Use the following hierarchy consistently:

Primary business base:

- Nairobi

Core nearby service market:

- Nairobi
- Kiambu County
- Machakos County
- Kajiado County

Broader service positioning:

- Kenya
- East Africa

Do not make every page list all four counties.

Use:

> Based in Nairobi, serving projects across Kenya and East Africa.

as the main broad positioning where appropriate.

Detailed local-search optimization belongs to C7.

---

# 14. Customer sectors

Use the canonical sectors consistently:

- Residential
- Commercial
- Institutional

Confirmed customer examples include:

Residential:

- homeowners

Commercial:

- property developers;
- offices;
- hotels;
- restaurants;
- shopping centres.

Institutional:

- schools;
- hospitals;
- churches;
- government organisations.

Do not invent client names or institutional contracts.

Do not imply Capital Shades has completed work for every listed organisation
type unless the wording clearly describes who the business serves rather than
past clients.

---

# 15. Differentiators

Verified differentiators that may be used:

- custom design;
- high-end materials and finishes;
- expert installation;
- full project lifecycle;
- maintenance / repair;
- after-sales support;
- materials sourced from suppliers including South Africa and France.

Do not turn these into unsupported superlatives such as:

- best in Kenya;
- highest-quality in East Africa;
- industry-leading;
- unmatched;
- number one.

Do not invent supplier/company names.

---

# 16. Project pages

Audit project detail copy for consistency.

Public project information may include:

- title;
- solution(s);
- sector;
- general location;
- completion year;
- scope;
- customer requirement;
- delivered solution;
- hero image;
- gallery.

Do not publish:

- client name;
- exact private address.

If project-specific scope, requirement or delivered-solution content is absent,
omit it rather than replacing it with generic solution copy.

Keep generic solution context visually separate from actual project facts.

---

# 17. Project index

Keep the existing image-led portfolio structure.

Audit:

- filter labels;
- solution names;
- sector names;
- stale Pool Shades references;
- old URLs/labels;
- empty categories.

Institutional may remain visible where strategically appropriate even if the
current project dataset is limited, but do not fabricate projects or counts.

---

# 18. Footer

Update stale footer copy.

Remove old solution names and old taxonomy references.

Desktop/tablet may continue to show the full navigation structure.

Mobile remains the compact contact-focused footer established in C5.6.

Do not reintroduce hidden mobile navigation columns.

---

# 19. Header / navigation

Audit:

- nav labels;
- mobile-menu labels;
- contact labels;
- stale solution terminology.

Primary navigation remains:

- Solutions
- Projects
- About
- Contact
- Request a Quote

Do not expand the main nav with every solution.

---

# 20. Metadata

Update stale metadata copy where it is obviously content alignment rather than
keyword research.

Examples:

- page title using an old solution name;
- meta description mentioning Pool Shades as a current top-level service;
- descriptions containing "Products" or "Estimator";
- stale site description.

Keep metadata factual and concise.

Do not perform C7 keyword research or build dedicated SEO landing pages yet.

---

# 21. Structured data

Audit existing structured-data text fields for stale business terminology.

Use:

- current business description;
- confirmed phone;
- confirmed email;
- Nairobi base;
- current URLs.

Do not add:

- fake ratings;
- fabricated review counts;
- exact address;
- coordinates;
- business hours;

unless verified.

Do not broaden the structured-data implementation substantially in C6.

---

# 22. Blog content

Audit existing blog posts for stale terminology.

Do not rewrite every historical article for style.

Correct only content that is clearly misleading under the new business model,
such as:

- old solution names used as current navigation/category terminology;
- Pool Shades described as a current top-level category where context makes
  that misleading;
- broken links to old solution routes;
- Product/Estimator terminology that points at removed experiences.

Preserve historical article context where rewriting would distort the original
meaning.

Record larger editorial improvements for later.

---

# 23. Internal links

Audit public internal links.

Update links to:

- current solution URLs;
- `/solutions`;
- `/projects`;
- `/request-a-quote`.

Avoid links that unnecessarily pass through redirects.

Legacy external/indexed URLs should continue to redirect correctly, but current
site copy should link directly to canonical routes.

---

# 24. CTA terminology

Use a consistent conversion vocabulary.

Preferred:

- Request a Quote
- WhatsApp
- Call
- View Projects
- View Solutions
- Tell us about your project
- Help me choose

Avoid unnecessary variants such as:

- Get Estimate
- Start Estimator
- Get Pricing
- Book Assessment
- Enquire Now

unless there is a strong contextual reason.

Quote remains the primary structured conversion.

WhatsApp remains the conversational alternative.

---

# 25. WhatsApp context

Preserve the C5.6 conversion model.

Keep contextual WhatsApp links for:

- solution enquiry;
- project enquiry;
- help choosing a structure;
- hero conversion;
- Contact page;
- quote fallback.

Do not reintroduce generic WhatsApp buttons into every section.

The floating WhatsApp control remains the persistent generic conversation path.

---

# 26. Unsupported claims sweep

Search the public site for numbers and absolute claims.

Review phrases containing concepts such as:

- 100%
- always
- guaranteed
- best
- leading
- years of experience
- number of projects
- customers served
- fastest
- free
- waterproof
- lifetime
- 10-year warranty

Keep only claims supported by confirmed content.

"Waterproof PVC" or "waterproof cover" may remain when describing the material
itself where already verified.

Do not interpret this sweep as a reason to remove legitimate technical
descriptions.

---

# 27. Seed / Sanity consistency

Where C6 copy exists in both:

- seed content;
- Sanity/import content;

keep the normalized frontend result consistent.

Do not update only one content source and leave a contradictory fallback.

If live Sanity content requires owner/editor updates that cannot safely be
automated, document the required manual change.

---

# 28. Content-to-confirm

As you audit, add unresolved facts to:

`docs/content-to-confirm.md`

Do not solve uncertainty through marketing assumptions.

Examples may include:

- missing solution copy;
- material applicability;
- supplier names;
- project scope;
- photo rights;
- testimonials;
- flagship projects;
- social profiles.

Do not duplicate questions already recorded.

---

# 29. Design protection

C6 is not a visual redesign.

Do not materially change:

- homepage structure;
- page layouts;
- color system;
- typography system;
- project grid;
- solution layout;
- mobile rails;
- process timeline;
- floating WhatsApp behavior.

Small spacing changes needed because copy length changed are acceptable.

---

# 30. Validation

Run:

- formatter
- npm run check
- npm run lint
- npm run build
- Studio type/schema validation where content schemas or seed data are touched

Search the built/public content for stale terms including:

- Car Park Shades
- Tensile Membrane Structures
- Pool Shades
- Products
- Estimator

Do not blindly fail on occurrences inside:

- redirect maps;
- migration comments;
- compatibility code;
- legacy CMS fields.

Classify each remaining occurrence.

---

# 31. Browser review

Review at minimum:

- homepage
- /solutions
- published solution detail pages
- /projects
- several project detail pages
- /about
- /contact
- /request-a-quote
- /blog
- representative blog post

Verify:

- headings remain readable;
- no awkward wrapping introduced by renamed solutions;
- no broken internal links;
- no horizontal overflow;
- CTA hierarchy remains intact.

---

# 32. Final C6 report

Report:

1. stale terminology found;
2. terminology replaced;
3. pages/content sources changed;
4. unsupported claims removed or softened;
5. process wording aligned;
6. geography wording aligned;
7. warranty/site-visit wording aligned;
8. metadata updated;
9. blog references changed;
10. current internal-link redirects avoided;
11. unresolved content questions;
12. any manual Sanity edits still needed;
13. checks/build results.

Also explicitly list any remaining legacy terms and explain why they remain.

---

# Out of scope

Do not begin:

- C7 SEO / Local Search
- keyword research
- location landing pages
- Google Business Profile work
- Search Console work
- structured-data expansion
- C8 launch QA
- privacy/legal drafting
- new testimonials
- fabricated project case studies
- another homepage redesign

---

# Acceptance criteria

- [x] Public site uses the eight-solution taxonomy consistently
- [x] Car Parking Shades naming is aligned
- [x] Tensile & Custom Structures naming is aligned
- [x] Pool Shades is not presented as a top-level current solution
- [x] Product terminology is removed from customer-facing copy
- [x] Estimator terminology is removed from customer-facing copy
- [x] About process matches the confirmed lifecycle
- [x] Quote/site-visit wording is consistent
- [x] Warranty language remains conditional
- [x] Nairobi / Kenya / East Africa positioning is consistent
- [x] Residential / Commercial / Institutional terminology is consistent
- [x] Contact details are consistent
- [x] Footer copy is aligned
- [x] Metadata no longer contains stale taxonomy copy
- [x] Current internal links avoid legacy redirects
- [x] Project pages distinguish project facts from generic solution copy
- [x] Unsupported marketing claims are removed or corrected
- [x] Seed and Sanity-facing content remain compatible
- [x] Missing facts are recorded rather than invented
- [x] Existing layouts remain materially unchanged
- [x] npm run check passes
- [x] npm run lint passes
- [x] npm run build passes

---

## Manual Sanity edits (production)

The seed and import carry the C6 copy. A dataset migrated from the old
`product` documents keeps its old copy, so an editor needs to update, in the
Studio:

- **Site settings → Description:** "Capital Shades designs, fabricates and
  installs car parking shades, shade sails, canopies and other shade
  structures for homes, businesses and institutions." It leaves out the
  geography on purpose: the hero and service-area copy state it, using
  `SERVICE_REACH` in `src/lib/content/geography.ts` (a code constant until
  C7 adds a settings field; keep the two in step).
- **Site settings → Stats bar:** "Breathable or 100% waterproof" →
  "Breathable or waterproof" (not shown on the site, kept for consistency).
- **Solution "Car Parking Shades":** summary, description and photo alt text
  say "car park shade(s)"; use "car parking shade(s)".
- **Solution "Tensile & Custom Structures":** the description opens
  "Tensile membrane structures use fabric…"; use "Tensile structures use
  fabric stretched in tension to create curved forms, designed around the
  site."
- **Projects:** titles "Office car park shades" and "Commercial car park
  shade" → "car parking shades" / "car parking shade" (and matching photo
  descriptions).
- **Blog post "Why Shade Matters for Shopping Centres":** excerpt and opening
  paragraph as in `src/lib/content/seed/posts.ts`. **"Shade for Schools":**
  "site evaluation" → "site visit". **"Car Park Shades: A Practical Guide":**
  the checklist's first step, the closing paragraph and "fully waterproof", as
  in the seed. **"Shade Netting vs Waterproof PVC":** "fully waterproof" →
  "waterproof".

## Phase C7 — SEO / Local Search

Status: Complete

## Objective

Make the rebuilt Capital Shades website deliberately discoverable for relevant
Google searches while preserving the current architecture, truthful content
and conversion experience.

This phase should improve:

- search intent alignment;
- Nairobi/local relevance;
- technical crawlability;
- page titles and descriptions;
- internal linking;
- solution-page discoverability;
- project-page search value;
- structured data;
- image/search metadata;
- legacy URL handling;
- measurement/indexing readiness.

Do not create keyword-stuffed pages.

Do not create thin location doorway pages.

Do not redesign the website.

---

# 1. SEO research before implementation

Before changing metadata or page copy, perform a targeted search-intent audit
for Capital Shades' real services.

Research current Kenyan/Nairobi search results for at least:

- car parking shades Kenya
- car parking shades Nairobi
- car shades Kenya
- car shades Nairobi
- carports Kenya
- shade sails Kenya
- shade sails Nairobi
- tensile structures Kenya
- tensile structures Nairobi
- canopies Kenya / Nairobi
- awnings Kenya / Nairobi
- pergolas Kenya / Nairobi
- gazebos Kenya / Nairobi
- screen fencing Kenya
- privacy screen fence Kenya
- shade nets Kenya
- commercial shade structures Kenya

Also inspect major competitors that rank across multiple relevant queries.

The purpose is to identify:

- customer terminology;
- commercial vs informational intent;
- terminology differences;
- useful application language;
- SERP patterns;
- content gaps.

Do not copy competitors' content.

Record a concise findings summary in `docs/implementation.md`.

---

# 2. Search-intent architecture

Map search terms to the existing site architecture rather than creating a new
page for every keyword variation.

Canonical solution pages remain:

1. Car Parking Shades
2. Shade Sails
3. Canopies
4. Awnings
5. Pergolas & Gazebos
6. Tensile & Custom Structures
7. Screen Fencing
8. Parasols

Use aliases and supporting language within these pages.

Do not create separate thin pages merely for:

- car shades
- carports
- shade ports
- parking canopies
- car shade nets

when they describe substantially the same Capital Shades service.

---

# 3. Keyword / terminology mapping

Create a simple internal intent map.

Suggested starting direction:

## Car Parking Shades

Primary concepts:

- car parking shades
- car shades
- car parking shades Kenya
- car parking shades Nairobi

Secondary/customer terminology:

- carports
- parking shades
- parking canopies
- shade ports
- car shade structures

Use naturally.

Do not force every synonym into headings.

---

## Shade Sails

Primary concepts:

- shade sails
- shade sails Kenya
- shade sails Nairobi

Supporting applications:

- garden shade
- pool shade
- playground shade
- outdoor shade
- hospitality shade

Pool shade should be treated as an application rather than returning as a
top-level solution.

---

## Tensile & Custom Structures

Primary concepts:

- tensile structures
- tensile structures Kenya
- tensile structures Nairobi
- tensile shade structures
- tensile fabric structures

Use "custom structures" descriptively, but do not rely on it as the only
search phrase because it is too broad.

---

## Canopies

Use application context to disambiguate the generic term.

Potential supporting language:

- outdoor canopies
- entrance canopies
- walkway canopies
- commercial canopies

Do not assume unsupported materials or structure types.

---

## Awnings

Potential terms:

- awnings Kenya
- awnings Nairobi
- retractable awnings

Only use "retractable awnings" prominently once the offering is confirmed.

---

## Pergolas & Gazebos

Potential terms:

- pergolas Kenya
- pergolas Nairobi
- gazebos Kenya
- gazebos Nairobi
- outdoor structures

Do not split these into separate thin pages during C7.

---

## Screen Fencing

Potential terms:

- screen fencing Kenya
- privacy screen fence
- privacy screening
- dust screen fence

Make it clear that Capital Shades provides a designed/installed solution.

Avoid making the page look like an ecommerce listing for rolls of shade net.

---

## Parasols

Use contextual commercial/hospitality terminology where supported.

Do not invent hospitality-specific projects.

---

# 4. "Shade nets" strategy

Treat "shade nets" carefully.

Current search intent can include:

- agriculture;
- roll/material sales;
- privacy mesh;
- installed car shades.

Capital Shades is primarily selling designed/fabricated/installed structures,
not generic agricultural net rolls.

Therefore:

- use "shade net" naturally where the material/service genuinely overlaps;
- include it in aliases/customer terminology where appropriate;
- do not make it the primary site-wide keyword;
- do not create a generic `/shade-nets` page merely to chase traffic;
- avoid attracting irrelevant agricultural-shopping searches.

Prioritize qualified enquiries over raw search volume.

---

# 5. Nairobi-first local positioning

Nairobi is the primary local SEO anchor.

Use Nairobi naturally in:

- appropriate page titles;
- descriptions;
- solution copy;
- project location context;
- organization/business structured data.

Broader positioning remains:

- Kenya
- East Africa

Do not make every heading say:

"Nairobi Kenya East Africa"

Use geographic language naturally.

---

# 6. Nearby counties

Confirmed nearby service areas include:

- Nairobi
- Kiambu County
- Machakos County
- Kajiado County

Do not create pages such as:

- Car Parking Shades Kiambu
- Car Parking Shades Machakos
- Car Parking Shades Kajiado
- Shade Sails Kiambu

unless future content and project evidence justify genuinely useful local
pages.

Avoid doorway-page SEO.

Project location data and natural service-area copy should carry local
relevance for now.

---

# 7. East Africa positioning

Keep East Africa as broader business positioning.

Do not optimize every solution page primarily for "East Africa".

Primary organic focus should remain:

Nairobi → Kenya → East Africa

This better reflects the current physical/business base while retaining the
broader service capability.

---

# 8. Homepage metadata

Review the homepage title and description using the keyword research.

The homepage should target the broader business category rather than trying to
rank for every solution.

Current title:

`Capital Shades | Car Parking Shades & Shade Structures in Kenya`

Evaluate whether this remains the best balance.

Possible direction:

`Capital Shades | Shade Structures & Car Parking Shades Kenya`

or equivalent.

Do not change solely for stylistic reasons.

Keep title concise enough to avoid unnecessary truncation.

Homepage description should communicate:

- design / fabrication / installation;
- major shade-structure category;
- Nairobi/Kenya relevance;
- customer context where useful.

Do not keyword-stuff all eight solutions into the description.

---

# 9. Solution page metadata

Every published solution page should have a unique:

- title;
- meta description;
- canonical URL.

Titles should generally combine:

solution + useful geography + Capital Shades

without following an identical robotic template where a better natural title
exists.

Examples of direction, not mandatory copy:

`Car Parking Shades in Nairobi & Kenya | Capital Shades`

`Shade Sails in Kenya | Design & Installation | Capital Shades`

`Tensile Structures in Kenya | Capital Shades`

Do not put Nairobi and Kenya into every title if it makes the title awkward.

---

# 10. Planned solution pages

Do not publish thin SEO pages for:

- Awnings
- Pergolas & Gazebos
- Screen Fencing

until enough verified copy and imagery exist to make them genuinely useful.

Having eight taxonomy records does not require eight indexable pages.

Avoid:

- placeholder pages;
- 100-word SEO pages;
- invented FAQs;
- generic AI copy.

Record publication readiness separately.

---

# 11. Headings and on-page intent

Audit H1/H2 structure of all published solution pages.

Each page should have:

- one clear H1;
- useful application-oriented H2s;
- natural terminology;
- no duplicate keyword headings solely for SEO.

Examples:

Instead of:

`Car Parking Shades Kenya`

followed by:

`Best Car Parking Shades Nairobi Kenya`

prefer meaningful sections such as:

`Car parking shades for homes and commercial sites`

`Material options`

`Where car parking shades work well`

`Related projects`

Write for customers first.

---

# 12. Solution aliases

Use the C5 `aliases / customer terminology` field where appropriate.

Aliases may support:

- copy decisions;
- metadata;
- internal search/content logic;
- future content planning.

Do not automatically render an ugly comma-separated keyword list.

Do not expose aliases as hidden SEO text.

---

# 13. Project SEO

Projects should become a major organic-search proof layer.

For projects with enough verified information, use:

- solution;
- sector;
- general location;
- completion year;
- scope;
- requirement;
- delivered solution.

Generate useful metadata from real project facts.

Example direction:

`Car Parking Shade Project in Karen, Nairobi | Capital Shades`

only if:

- the project really is a car parking shade;
- Karen is the verified general location.

Do not invent locations.

---

# 14. Project titles

Do not automatically keyword-stuff project titles.

Editorial project names can remain concise.

SEO metadata may provide additional context separately.

Resolve obviously duplicate project titles where verified information exists,
but do not invent distinctions.

Keep exact client identities private.

---

# 15. Project location SEO

General location data is useful for local relevance.

Use safe public locations such as:

- Karen, Nairobi
- Runda, Nairobi
- Kiambu
- Thika Road area

Do not expose:

- exact residential address;
- coordinates identifying a private site;
- client name.

Location should serve both customer understanding and local relevance without
compromising privacy.

---

# 16. Project index metadata

Optimize `/projects` as portfolio/proof, not as a giant keyword landing page.

Use a concise title/description describing:

- completed shade structures;
- relevant solution types;
- Nairobi/Kenya scope where appropriate.

Do not put every solution name in the title.

---

# 17. Internal linking

Improve contextual internal linking between:

- Solutions → relevant Projects
- Projects → relevant Solutions
- Blog → relevant Solutions
- Blog → relevant Projects where genuinely related
- About → Solutions / Projects
- Homepage → primary solutions / projects
- Solution applications → quote flow

Use descriptive anchor text.

Prefer:

`See our car parking shade projects`

over:

`Click here`

Do not over-link every keyword occurrence.

---

# 18. Blog SEO

Review existing articles for search intent and internal-link opportunities.

Do not rewrite every post.

For each existing post, evaluate:

- title;
- H1;
- description;
- canonical;
- internal links;
- outdated terminology;
- whether it satisfies an actual customer question.

Historical slugs should normally remain stable.

A title may be updated without changing the slug if doing so improves accuracy.

---

# 19. Old "Car Park Shades" article titles

Review the owner question about existing article titles.

Do not change URLs automatically.

If a title using "Car Park Shades" remains understandable and is already
published/shared, leaving it is acceptable.

If title alignment improves clarity, the visible title may become
"Car Parking Shades..." while retaining the historical slug.

Do not introduce redirects merely to make blog slugs prettier.

---

# 20. Future editorial opportunities

Based on research, record useful content opportunities but do not build a large
content campaign in C7.

Potential topics may include real customer questions such as:

- car parking shade design choices;
- shade sail vs canopy;
- waterproof vs breathable shade;
- what happens during a site visit;
- how to plan shade for multiple vehicles;
- commercial shade considerations;
- maintaining installed shade structures.

Only record opportunities supported by business knowledge.

Do not generate dozens of thin SEO articles.

---

# 21. Canonical URLs

Ensure every indexable page emits the correct canonical URL.

Audit:

- homepage;
- solutions;
- solution detail;
- projects;
- project detail;
- about;
- contact;
- blog;
- blog posts.

Filtered URLs such as:

`/projects?solution=...`

should generally canonicalize appropriately rather than creating a large set of
duplicate indexable pages.

Determine the correct behavior based on the current implementation.

---

# 22. Project filter URLs

The portfolio uses URL-driven filters.

Audit search-engine handling of:

- `?solution=`
- `?sector=`
- legacy `?filter=`

Unless there is a strong reason for filtered combinations to rank separately,
avoid creating duplicate indexed versions of `/projects`.

Prefer a canonical back to `/projects` for transient filter states.

Do not break shareable filtered URLs for users.

---

# 23. Legacy redirects

Audit all old routes.

Already known examples include:

- `/products`
- `/products/[slug]`
- `/estimator`
- `/car-park-shades`
- `/gallery`
- `/recent-projects`
- old solution slugs

Verify:

- permanent redirects where appropriate;
- one hop only;
- target returns 200;
- no redirect loops.

---

# 24. Historical `/portfolios/*` URLs

The previous sitemap included:

- `/portfolios/*`
- `/portfolios_category/*`

Investigate these URLs.

Build an explicit mapping where possible.

Preferred priority:

1. old individual portfolio → corresponding current `/projects/[slug]`
2. old category → relevant canonical `/projects` or solution page
3. unknown legacy portfolio URL → useful parent destination

Do not blindly redirect every old URL to the homepage.

Avoid redirect chains.

Document the mapping.

---

# 25. Pool Shades legacy route

Review `/solutions/pool-shades`.

It is currently an unlisted legacy page.

Determine the best SEO transition using:

- its actual existing content;
- project relationships;
- current taxonomy;
- search intent.

Possible outcomes include:

- retain temporarily with canonical handling;
- redirect to Shade Sails;
- redirect to another relevant solution;
- redirect to a future application section.

Do not choose purely from taxonomy.

Document the decision.

---

# 26. Sitemap

Audit the generated XML sitemap.

It should contain only canonical URLs intended for indexing.

Include:

- homepage;
- core public pages;
- published solution pages;
- project detail pages;
- blog posts.

Do not include:

- redirects;
- filtered project URLs;
- unpublished/planned solution pages;
- thank-you page;
- quote-success states;
- legacy Pool Shades page if it is not intended for indexing.

Use appropriate last-modified data where trustworthy and practical.

Do not fabricate timestamps.

---

# 27. Robots

Audit `robots.txt`.

Ensure:

- public content is crawlable;
- Studio/admin/private routes are handled appropriately;
- sitemap URL is declared where useful.

Do not block query parameters globally without understanding the effect.

Do not use robots.txt as a substitute for canonical/noindex decisions.

---

# 28. Noindex pages

Review utility/conversion pages.

Likely candidates for `noindex` include:

- thank-you page;
- internal success/error pages;
- Studio routes;
- other pages with no useful search value.

Do not automatically noindex:

- Contact
- Request a Quote

They may have legitimate search/customer value.

Make explicit decisions.

---

# 29. Structured data

Audit and improve structured data using only verified facts.

At minimum evaluate:

- Organization / LocalBusiness
- WebSite
- BreadcrumbList where appropriate
- Article for blog posts

Use verified:

- business name;
- URL;
- primary phone;
- email;
- Nairobi base;
- logo;
- service geography where schema supports it safely.

Do not add:

- fabricated ratings;
- fake review counts;
- price ranges;
- opening hours;
- street address;
- latitude/longitude;
- employee counts;
- founding dates;

unless verified.

---

# 30. Business schema type

Choose the most semantically appropriate schema type supported by the current
business information.

Do not force a highly specific type if it requires inaccurate assumptions.

A valid LocalBusiness/Organization implementation with accurate data is better
than a more specific but incorrect schema.

Validate generated structured data.

---

# 31. Breadcrumbs

Evaluate breadcrumbs for:

- solution detail pages;
- project detail pages;
- blog posts.

Breadcrumbs should help both:

- users;
- search engines understand hierarchy.

Example:

Home → Solutions → Car Parking Shades

Home → Projects → Project Name

Do not add visually heavy breadcrumbs if the current page design does not need
them.

Structured-data-only breadcrumbs are acceptable where appropriate, but visible
breadcrumbs may improve navigation on deep pages.

---

# 32. Images

Audit important SEO images:

- solution heroes;
- project heroes;
- project galleries;
- homepage project images.

Ensure:

- useful alt text;
- dimensions where appropriate;
- responsive delivery;
- lazy loading below the fold;
- hero/LCP image handling is appropriate;
- filenames/content pipeline do not rely on keyword stuffing.

Alt text should describe the image.

Do not write alt text such as:

`Best car parking shades Nairobi Kenya Capital Shades`.

---

# 33. Performance / Core Web Vitals

Run a focused performance review.

Prioritize:

- homepage;
- primary solution page;
- projects;
- project detail;
- request quote.

Inspect:

- LCP;
- CLS;
- unnecessary image weight;
- blocking fonts/assets;
- JavaScript shipped for static content.

Do not perform a broad architecture rewrite.

Fix clear regressions or low-risk issues.

Record larger performance work for C8 or later if necessary.

---

# 34. Open Graph / social metadata

Ensure important pages have sensible:

- title;
- description;
- share image where available.

This is secondary to search metadata but useful for portfolio sharing, which is
one of the owner's stated website goals.

Prefer real project/solution imagery.

Do not create generic fake social graphics merely to tick a box.

---

# 35. Google Business Profile consistency

Do not edit Google Business Profile unless access exists and the user asks.

Document the values the owner should ensure match the website:

- Capital Shades business name;
- primary phone;
- website URL;
- Nairobi base;
- business category;
- service areas;
- business description.

Do not invent address/hours.

Add this to the launch/owner checklist.

---

# 36. Google Search Console

Prepare the site for Search Console.

Document post-deployment steps:

- verify the domain/property;
- submit sitemap;
- inspect homepage;
- inspect major solution pages;
- inspect major project pages;
- monitor indexing;
- review search queries;
- review Page Experience / Core Web Vitals;
- watch for old URLs remaining indexed.

Do not claim Search Console is configured unless it actually is.

---

# 37. Search measurement

Define a lightweight measurement baseline for post-launch.

Track search visibility around categories such as:

- branded search;
- car parking shades;
- car shades;
- shade sails;
- tensile structures;
- screen fencing;
- relevant Nairobi variants.

Do not promise rankings.

Success indicators should include:

- impressions;
- clicks;
- relevant enquiries;
- indexed canonical pages;
- discovery of useful real search queries.

Qualified leads matter more than raw traffic.

---

# 38. Local content strategy

Do not build dozens of city/county pages.

Future local pages should only exist when there is enough unique value, such as:

- real projects in that area;
- relevant photos;
- meaningful service context;
- location-specific customer questions.

A useful Nairobi-focused solution page is preferable to twenty thin locality
pages.

---

# 39. Content gaps

During SEO implementation, identify where a published page is too thin to
compete usefully.

Do not fill gaps with fabricated generic text.

Add missing owner/content requirements to:

`docs/content-to-confirm.md`

Potential gaps may include:

- Awnings copy/photos;
- Pergolas & Gazebos copy/photos;
- Screen Fencing copy/photos;
- Tensile & Custom Structure examples;
- richer project scope/location/year data;
- testimonials;
- institutional proof.

---

# 40. SEO configuration source

Prefer reusable metadata helpers/templates where this reduces drift.

Avoid:

- hard-coded duplicate business descriptions across many routes;
- one giant keyword constant inserted everywhere.

Allow individual routes/content documents to override metadata appropriately.

The content abstraction should remain intact.

---

# 41. Sanity and SEO fields

Review the SEO fields introduced during C5.

Use them only where they add editorial value.

Do not add a large SEO-plugin-style schema with:

- focus keyword;
- keyword density;
- arbitrary SEO score;
- dozens of advanced fields.

Useful editor-controlled fields may include:

- SEO title override;
- meta description override;
- social/share image where needed.

Defaults should work without manual SEO input.

---

# 42. Technical validation

Run:

- formatter;
- npm run lint;
- npm run check;
- npm run build;
- Studio type-check/schema validation if schemas change.

Crawl the production build locally where practical.

Check:

- status codes;
- redirect chains;
- canonical tags;
- titles;
- descriptions;
- H1 count;
- sitemap;
- robots;
- noindex;
- internal links;
- broken links;
- structured-data output.

---

# 43. SEO crawl report

Create a concise report covering:

- indexable URL count;
- redirected URLs;
- noindex URLs;
- pages missing titles;
- pages missing descriptions;
- pages missing canonicals;
- pages with duplicate titles;
- pages with duplicate descriptions;
- broken internal links;
- redirecting internal links;
- missing H1s;
- multiple H1s.

Fix issues that fall within C7.

---

# 44. Browser / SERP review

Review major pages at mobile and desktop widths.

Also inspect generated search snippets conceptually:

- title reads naturally;
- description reads naturally;
- no keyword repetition;
- brand is identifiable;
- intent is obvious.

Pages should still read like a professional business website, not SEO landing
pages.

---

# 45. Documentation

Update:

- `docs/implementation.md`
- `docs/design-direction.md` only if SEO decisions affect content hierarchy
- `docs/content-to-confirm.md`
- `docs/decisions.md` for durable SEO architecture decisions

Record:

- search-intent map;
- local positioning;
- indexing rules;
- legacy redirect decisions;
- Pool Shades decision;
- filter canonical policy;
- planned-page indexing policy.

---

# Final C7 report

At completion report:

1. search-result / competitor observations;
2. search-intent map;
3. primary terms associated with each solution;
4. metadata changes;
5. canonical strategy;
6. sitemap changes;
7. robots/noindex decisions;
8. structured-data changes;
9. project SEO improvements;
10. internal-link improvements;
11. legacy redirect mappings;
12. `/portfolios/*` handling;
13. Pool Shades SEO decision;
14. image/performance changes;
15. Search Console / GBP steps requiring owner action;
16. content gaps preventing stronger SEO;
17. complete technical crawl results;
18. validation results.

Explicitly state anything that was researched but intentionally not
implemented.

---

# Out of scope

Do not:

- redesign the site;
- publish thin planned solution pages;
- create mass city/county pages;
- invent testimonials;
- invent reviews;
- invent prices;
- invent project locations;
- invent FAQs;
- buy/build backlinks;
- configure Google services without access;
- begin C8 launch QA;
- draft legal/privacy content.

---

- [x] Search-intent research completed
- [x] Existing architecture mapped to useful customer search terminology
- [x] Nairobi is the primary local-search anchor
- [x] Kenya / East Africa positioning remains natural
- [x] No doorway-location pages created
- [x] Shade-net terminology does not misrepresent the business as a material retailer
- [x] Every indexable page has an appropriate title
- [x] Every important indexable page has an appropriate description
- [x] Canonical URLs are correct
- [x] Project filter URLs do not create uncontrolled duplicate indexing
- [x] Sitemap contains only intended canonical/indexable pages
- [x] Redirects are permanent and one-hop where appropriate
- [x] Historical portfolio URLs are explicitly handled
- [x] Pool Shades legacy SEO treatment is explicitly decided
- [x] Planned/thin solutions are not accidentally indexed
- [x] Internal site links use canonical routes
- [x] Project pages use verified location/scope data where available
- [x] Structured data contains verified facts only
- [x] No fabricated ratings/reviews/address/hours added
- [x] Important images have useful alt text
- [x] Basic Core Web Vitals/performance review completed
- [x] Open Graph metadata is sensible
- [x] Search Console post-launch steps documented
- [x] Google Business Profile consistency checklist documented
- [x] Full local build crawl has no broken internal links
- [x] No indexable page is missing an H1
- [x] No indexable page has multiple H1s unintentionally
- [x] npm run lint passes
- [x] npm run check passes
- [x] npm run build passes

---

# C7 results

## Search research (October 2026)

Method: web searches for every query family in §1, plus competitor home and
service pages. The search tool returns US-located results, not a Google.co.ke
results page, so the ordering below is indicative; re-check the live Kenyan
results page in Search Console after launch.

Observations:

- **Car parking shades / car shades / carports.** The most commercial family.
  Results are dominated by Nairobi installers whose home pages target
  "Car Parking Shades Nairobi Kenya" (Diamond Canopies, ShadePro, Maisha,
  Baraka Shades, Shade Spot, Designer Shades), plus directory pages
  (achisystems, bestcareservices) and Jiji listings. "Car shades" and
  "carports" lead to the same pages; nobody separates them. Common language:
  cantilever, post-supported/standard, arch, pyramid, shade net, PVC.
- **Shade nets.** Mixed and mostly not our customer: agricultural rolls
  (Amiran, agro-dealers), Jiji and Alibaba listings priced per metre, and
  "car shade net" as a cheap carport cover. A small overlap with installed car
  parking shades in shade net.
- **Screen fencing / privacy screen fence.** Almost entirely Jiji listings for
  rolls of artificial hedge and HDPE privacy net; a few "supply and fix"
  sellers. Installed, designed screening is a gap, but there is no page to
  rank until Screen Fencing has copy and photos.
- **Shade sails.** Thin Kenyan results; generic international how-to guides
  fill the gap. Kenyan competitors mention sails as a secondary service.
- **Tensile structures.** Few Kenyan service pages; results are international
  project write-ups (Serena Nairobi pool roof, Hemingways Watamu) and one
  tensile-ceiling page. A credible Kenyan page with real projects has room.
- **Canopies / awnings.** Awnings: directory listings (Shade Solutions
  Kenya, Nairobi Canvas & Tents, Vitendi) for retractable and fixed awnings.
  Canopies: mixed with car park canopies and polycarbonate entrance canopies.
- **Pergolas / gazebos.** One competitor's pages (bestcareservices) and
  international pergola-vs-gazebo explainers.
- **Commercial shade structures.** The same installers, with corporate car
  parks, walkways and "shade structures in Kenya" pages.
- **Brand.** "Capital Shades" itself didn't surface; the old site has no real
  content to rank.

Competitor patterns: keyword-led H1s, prices per square metre, FAQs, project
counts ("500+ projects"), testimonials and estate names (Runda, Karen,
Kileleshwa, Syokimau) as local signals. Several mismatches (testimonial
locations, differing project counts) show how thin those claims are. We copy
none of it; the gaps worth filling honestly are real project locations and
years, Kenyan tensile and shade-sail projects, and designed screening.

## Search-intent map

| Customer terms                                                          | Page                                       | Notes                                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| car parking shades, car shades, carports, parking shades, car shade net | `/solutions/car-parking-shades`            | Primary commercial term; "car shades", "carports" and "shade net" in copy   |
| shade sails, garden/pool/playground shade, pool shades                  | `/solutions/shade-sails`                   | `/solutions/pool-shades` 301s here                                          |
| tensile structures, tensile fabric/membrane structures                  | `/solutions/tensile-custom-structures`     | Title says "Tensile Structures"; "custom" is too broad to target            |
| canopies, entrance canopies, walkway covers                             | `/solutions/canopies`                      | Title leads with entrance and walkway to separate it from car park canopies |
| parasols, restaurant/hotel umbrellas                                    | `/solutions/parasols`                      | No geography forced into the title                                          |
| awnings, pergolas, gazebos, screen fencing, privacy screen fence        | none yet (planned)                         | Named on `/solutions` and in the quote form; no page until copy and photos  |
| shade nets (generic)                                                    | none                                       | Not a target: mostly retail/agricultural; overlap handled on car parking    |
| shade structures Nairobi/Kenya, commercial shade structures             | `/`, `/solutions`                          | Home and Solutions index carry the broad category                           |
| Nairobi + Kiambu, Machakos, Kajiado                                     | settings `serviceAreas`, project locations | No location pages (§6)                                                      |

## Metadata

Titles follow "topic + useful geography | Capital Shades", written per page
rather than from one template:

- Home: `Capital Shades | Car Parking Shades & Shade Structures, Nairobi`;
  description names the category, the customers and Nairobi/Kenya.
- Solutions index: `Shade Structures in Nairobi & Kenya`.
- Solution pages: content fields `seoTitle` / `seoDescription` (seed, and
  "Title/Description in Google" in the Studio's Search tab). Empty falls back
  to "<title> in Kenya" and the summary.
- Projects: `Shade Structure Projects`.
- Project pages: `projectSeo()` builds title and description from verified
  fields only (title, location when known, solution, sector, year, scope).
  Duplicate project titles were renamed from what each photo shows.
- Blog: titles kept, including "Car Park Shades…" (historical, slugs stable).

## Indexing rules

- **Canonical:** every page's canonical is its path without the query string,
  so `/projects?solution=…`, `?sector=…` and the old `?filter=…` all
  canonicalise to `/projects`. Filtered links stay shareable; there is no
  separate indexable filter page.
- **Sitemap:** home, Solutions, published solution pages, Projects, every
  project, Request a Quote, About, Blog, posts, Contact. Not planned
  solutions, redirects, filtered URLs or Thank You. `lastmod` only for posts
  (their publish date); nothing else has a trustworthy date.
- **noindex:** Thank You and the error page. Contact and Request a Quote stay
  indexable (people search for them).
- **robots.txt:** unchanged: everything crawlable except `/api/`, sitemap
  declared. The Studio lives on its own domain.
- **Planned solutions** (Awnings, Pergolas & Gazebos, Screen Fencing) have no
  route, so they 404 rather than serve thin pages; nothing links to them.

## Legacy URLs

All 301, one hop, target 200 (verified in the crawl below). Old WordPress
URLs end in a slash, so every redirect route answers both forms itself.

| Old URL                                    | Goes to                                |
| ------------------------------------------ | -------------------------------------- |
| `/products`, `/products/`                  | `/solutions`                           |
| `/products/<slug>`                         | `/solutions/<current slug>`            |
| `/car-park-shades(/)`                      | `/solutions/car-parking-shades`        |
| `/recent-projects(/)`, `/gallery`          | `/projects`                            |
| `/estimator`                               | `/request-a-quote`                     |
| `/solutions/car-park-shades`               | `/solutions/car-parking-shades`        |
| `/solutions/tensile-membrane-structures`   | `/solutions/tensile-custom-structures` |
| `/solutions/pool-shades`                   | `/solutions/shade-sails`               |
| `/portfolios/` and `/portfolios/*`         | `/projects`                            |
| `/portfolios_category/canopies/`           | `/solutions/canopies`                  |
| `/portfolios_category/car-park-shade/`     | `/solutions/car-parking-shades`        |
| `/portfolios_category/services/`, `tents/` | `/solutions`                           |
| other `/portfolios_category/*`             | `/projects`                            |
| `/sitemap_index.xml`                       | `/sitemap.xml`                         |

**`/portfolios/*`:** the old sitemap listed eight items
(`investment-planning` … `investment-planning-8`). They are the WordPress
"Finance" theme's demo entries ("Investment Planning", "Enterprise Loan",
"MO Insurance"…) with stock images, not Capital Shades work, so none maps to a
project; all go to the portfolio. The four category archives were empty.
`/about/` and `/contact/` reach their page through the framework's own
trailing-slash redirect (one hop).

**Pool Shades:** redirected to Shade Sails. The old page was one sentence,
its only photo (`sails-pool-garden`) is one whose provenance is unconfirmed,
no project used it, and "pool shade" searches want shade over a pool, which
the Shade Sails page now names (poolsides, pools). The seed record was
removed; a migrated Sanity record with that slug is no longer built, and the
migration folds an old `pool-shades` product into Shade Sails without
overwriting Shade Sails' own copy.

## Structured data

- `HomeAndConstructionBusiness` (a LocalBusiness subtype; describes a
  contractor without implying a shop) on every page: name, legal name,
  description, logo, primary phone, email, Nairobi as `addressLocality`
  (no street address), `areaServed` from the confirmed service areas,
  Facebook in `sameAs`. No hours, ratings, reviews, prices, coordinates,
  founding date or staff count.
- `WebSite` on the home page.
- `Service` + `BreadcrumbList` on solution pages; `BreadcrumbList` on project
  pages and posts; `Article` on posts. Breadcrumbs are structured data only:
  the pages already link back to their section, so no visible trail was
  added.

## Internal links

- Solution → projects: "See all <solution> projects" (was "View in the
  project gallery").
- Blog → solutions: the car parking guide, cantilever comparison and
  shopping-centre article now link to Car Parking Shades (and Canopies).
- Already in place: project → its solutions, solution → related projects,
  home and About → solutions and projects, Solutions → quote. The crawl found
  no internal link to a redirect.

## Images and performance

- Hero images load eagerly with `fetchpriority="high"`; everything below the
  fold is lazy; every `<img>` has width, height and alt text. Empty alt text
  is used only on solution thumbnails beside their own title.
- Added a preload for the one font file every page renders with.
- Larger work for C8: about 60 KB (gzip) of JavaScript hydrates static pages;
  measure real Core Web Vitals once live before changing architecture.

## Owner actions (not configured from here)

**Search Console:** verify `capitalshades.co.ke` (DNS), submit
`/sitemap.xml`, remove the old `sitemap_index.xml` if it was submitted,
inspect the home page, Car Parking Shades, Shade Sails, Tensile Structures
and a few projects, then watch indexing, queries, Core Web Vitals and old URLs
dropping out over the following weeks.

**Google Business Profile** should match the site: name "Capital Shades";
phone 0722 765 397; website `https://capitalshades.co.ke`; Nairobi base
(service-area business unless a public address is confirmed); the closest category
to shade structures (check Google's list; don't guess); service areas
Nairobi, Kiambu, Machakos and Kajiado counties; the site's description. Don't
add hours or an address until confirmed.

**Measurement baseline** (Search Console, monthly): impressions and clicks
for branded queries, car parking shades, car shades/carports, shade sails,
tensile structures, screen fencing and their Nairobi variants; number of
indexed canonical pages; enquiries by source. Qualified enquiries matter
more than traffic; no ranking targets.

## Content opportunities (not built)

Supported by what the business already knows: planning car parking shades
for several vehicles; shade sail or canopy; waterproof or breathable shade
(partly covered); what happens at a site visit; maintaining an installed
structure (covered). Build only with owner input.

## Crawl report (local production build)

Crawled from `/` and the sitemap with `vite preview`; script in
`--testing--/c7-crawl.mjs`.

| Check                                   | Result                                 |
| --------------------------------------- | -------------------------------------- |
| HTML pages crawled                      | 46 (40 canonical + 6 filtered views)   |
| Indexable canonical URLs                | 40, all in the sitemap; sitemap has 40 |
| Redirected URLs tested                  | 27, all one hop to a 200               |
| noindex                                 | Thank You, error page                  |
| Missing title / description / canonical | 0 / 0 / 0                              |
| Duplicate titles / descriptions         | 0 / 0 (were 7 and 20 before C7)        |
| Broken / redirecting internal links     | 0 / 0                                  |
| Missing H1 / multiple H1                | 0 / 0                                  |
| JSON-LD parse errors                    | 0                                      |
| Images without alt                      | 0                                      |
| Planned solution URLs                   | 404, not linked, not in sitemap        |

## Manual Sanity edits (C7)

On a dataset imported before C7:

- Solutions: fill "Title in Google" and "Description in Google" (Search tab)
  with the seed values in `src/lib/content/seed/solutions.ts`; Car Parking
  Shades body ("often called car shades or carports", "shade mesh (often
  called shade net)"); Shade Sails body ("poolsides").
- Pool Shades: delete or unpublish the legacy record (it now redirects).
- Projects: rename the duplicate titles as in
  `src/lib/content/seed/projects.ts`.
- Posts: the closing links in the car parking guide, cantilever comparison
  and shopping-centre article, as in `src/lib/content/seed/posts.ts`.

---

## Phase Boundary

Stop after C7.

Do not begin C8.

# Remaining roadmap

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
