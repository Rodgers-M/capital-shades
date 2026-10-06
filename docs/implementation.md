# Capital Shades Implementation Plan

## Phase A — Global Foundation

Status: Complete

- [x] Design tokens
- [x] Global spacing
- [x] Navigation architecture
- [x] Content types
- [x] Centralized public settings
- [x] Button system
- [x] Header
- [x] Mobile action bar
- [x] Footer
- [x] Metadata foundations
- [x] Typecheck
- [x] Lint
- [x] Production build

## Phase B1 — Route & Content Model Migration

Status: Complete

- [x] Real `/solutions` and `/solutions/[slug]` routes
- [x] Real `/request-a-quote` route
- [x] Permanent redirects from `/products`, `/products/[slug]` and `/estimator`
- [x] Public terminology: Solutions, Request a Quote
- [x] Solution links use `/solutions/[slug]`
- [x] Project UI consumes `solutions` and `heroImage`
- [x] Public contact details use `primaryPhone`
- [x] Legacy `product` and `image` removed from the project type
- [x] Unverified homepage stats removed
- [x] Typecheck
- [x] Lint
- [x] Production build

## Phase B2 — Homepage Visual Rebuild

Status: Complete

- [x] Split editorial hero
- [x] Selected projects section
- [x] Featured solutions section
- [x] Cover/material guidance
- [x] Residential / Commercial / Institutional section
- [x] Featured project section
- [x] Process section
- [x] Closing quote CTA
- [x] Hero-aware mobile action bar
- [x] Form-focus action bar behavior
- [x] Removed legacy homepage visual treatments
- [x] Removed/reworded unverified homepage claims
- [x] 320px / 375px responsive checks
- [x] npm run check
- [x] npm run lint
- [x] npm run build

## Phase C1 — Solutions Experience

Status: Complete

- [x] Editorial `/solutions` index (all six solutions, catalogue order)
- [x] Guidance for visitors unsure which structure they need
- [x] Reusable `/solutions/[slug]` template
- [x] Related real projects per solution; zero-project solutions handled
- [x] Shared contextual WhatsApp messages (`$lib/whatsapp.ts`)
- [x] Floating WhatsApp on tablet/desktop; mobile keeps the action bar
- [x] Solution-record copy review (unverified/subjective/geographic claims)
- [x] Materials comparison and `/solutions` intro copy fixes
- [x] 320px / 375px responsive checks
- [x] npm run check
- [x] npm run lint
- [x] npm run build

## Deferred content cleanup

The following wording remains and should be handled in the phase that owns
the relevant surface:

- settings stat: "Breathable or 100% waterproof"
  - clean during content/settings cleanup
- About sector description:
  - "100% waterproof PVC membrane"
  - clean during C3
- Quote form material option:
  - "100% waterproof PVC"
  - review during C4

Do not widen C2 to address these.

## Current Phase

Phase C2 — Projects Experience

## Objective

Redesign the Projects index and project detail pages into an image-led,
editorial portfolio that helps visitors answer:

"Has Capital Shades delivered something similar to what I need?"

Projects should function as the site's strongest proof layer.

Use only verified project data and real project imagery.

---

## In Scope

### Projects index

Redesign `/projects`.

Requirements:

- image-led editorial layout
- real project photography as the primary proof
- avoid repetitive equal-sized card grids
- preserve URL-driven filtering
- support filtering by sector and solution
- keep filtered URLs shareable
- show only verified metadata
- normalize sector wording
- gracefully handle zero-result filters
- avoid fake project counts

Canonical sector labels:

- Residential
- Commercial
- Institutional

Do not use "Schools & institutions" as the canonical label.

If a sector currently has no projects, do not expose it as a visible filter
unless there is a deliberate empty-state reason.

Currently Institutional has no projects, so it should normally remain hidden
from the visible project filters.

---

## Project index copy safety

The current `/projects` intro contains "by our team".

Remove or neutralize that wording during the redesign.

Do not replace it with another unverified in-house/team claim.

Prefer descriptive copy such as:

"Selected shade and outdoor structure projects."

or equivalent.

---

## Project detail pages

Create or redesign:

`/projects/[slug]`

Use a reusable project detail template.

The page should support:

- breadcrumb
- project title
- solution(s)
- sector
- hero image
- gallery
- Request a Quote CTA
- contextual WhatsApp CTA
- location when verified
- completion date when verified
- requirement when verified
- delivered solution when verified
- related projects
- final conversion CTA

Unavailable fields must be omitted cleanly.

Do not show empty labels or placeholder metadata.

---

## Project detail structure

Preferred structure:

1. Breadcrumb

2. Project introduction
   - title
   - solution(s)
   - sector
   - Request a Quote
   - Ask about a similar project

3. Hero image

4. Gallery
   - only when additional images exist
   - no duplicated hero image

5. Project details
   - Location — only when present
   - Completed — only when present
   - Solution(s)
   - Sector

6. Requirement
   - only when present

7. Delivered solution
   - only when present

8. Related projects

9. Final quote / WhatsApp CTA

The page must still feel intentional and complete when the only available
content is:

- title
- sector
- solution
- hero image

Do not pad sparse projects with invented copy.

---

## Filtering

Preserve URL-based filtering.

Examples:

`/projects?sector=residential`

`/projects?solution=car-park-shades`

Use canonical internal values.

Sector values:

- residential
- commercial
- institutional

Solution values:

- solution slugs

Requirements:

- active filter state should be visually clear
- provide a simple reset to All
- filters must remain usable on mobile
- do not expose dead filters by default
- do not let the filter UI dominate the photography

---

## Project → Solution relationship

Projects may belong to one or more solutions.

Use the current `solutions: string[]` model.

Where practical:

- display the primary or relevant solution
- link solution labels back to `/solutions/[slug]`
- allow solution filters to match projects with multiple solutions

Do not fall back to deprecated `product` fields in UI components.

---

## Contextual WhatsApp

Extend the shared WhatsApp system from C1.

Project detail pages should use a project-specific message such as:

"Hi Capital Shades, I was looking at the [Project Name] project on your
website and would like to discuss something similar."

All appropriate WhatsApp controls on the page should inherit this project
context:

- floating WhatsApp
- mobile action bar
- mobile header menu
- project CTA
- final CTA

Do not hard-code WhatsApp numbers.

The Projects index can keep the general WhatsApp message unless the user
clicks a project-specific enquiry action.

---

## Related projects

Use actual content relationships.

Preferred relevance order:

1. same solution
2. same sector
3. another featured/recent project

Do not show the current project again.

Do not claim projects are "similar" unless the relationship is based on
solution/sector data.

Preferred headings:

- Related projects
- More work in this solution
- More projects

---

## Gallery

Use existing project gallery infrastructure where practical.

Requirements:

- responsive
- real project images only
- no duplicate hero image
- accessible if modal/lightbox behavior is used
- meaningful alt text
- keyboard navigation if interactive

Do not add a large carousel dependency if a simpler responsive gallery works.

---

## Visual Direction

Follow `docs/design-direction.md`.

Projects should be more image-led than Solutions.

Prefer:

- large project imagery
- staggered compositions
- varied image proportions
- subtle captions
- warm-white space
- occasional charcoal sections
- thin gold rules
- restrained teal

Avoid:

- SaaS card grids
- heavy borders around every item
- large rounded cards
- gradients
- heavy shadows
- decorative overlays
- badge-heavy metadata

---

## Geographic / SEO readiness

Do not perform the SEO optimization phase yet.

However, preserve project location as a first-class optional field.

When verified location content exists, project pages should be able to render
it naturally.

Do not invent project locations for SEO.

Do not add location keywords to titles or copy unless supported by real data.

This phase should keep the project architecture ready for later local SEO.

---

## Floating WhatsApp / Mobile Action Bar

Preserve C1 behavior.

Desktop/tablet:

- floating WhatsApp remains available
- hide it where conversion controls already make it redundant
- do not allow it to cover footer content

Mobile:

- no separate floating WhatsApp
- preserve:
  Call | WhatsApp | Request a Quote

Project pages should pass project context into shared WhatsApp controls.

Do not regress:

- hero-aware action-bar behavior
- form-focus hiding
- footer visibility behavior

---

## Accessibility

Preserve or improve:

- semantic headings
- focus-visible styles
- keyboard navigation
- accessible filters
- meaningful alt text
- accessible gallery interactions
- appropriate aria labels
- reasonable tap targets

Do not hide essential project information behind hover-only interactions.

---

## Responsive Requirements

Verify:

- desktop
- tablet
- 375px
- 320px

Requirements:

- no horizontal overflow
- filters remain usable
- project titles wrap cleanly
- captions remain readable
- galleries remain navigable
- CTAs remain usable
- floating/mobile controls do not obscure content

---

## Content Rules

Do not invent:

- location
- client name
- dimensions
- completion date
- project duration
- material
- challenge
- requirement
- delivered solution
- technical specifications

Only render these when actual content exists.

---

## Out of Scope

- owner-confirmed project content population
- final project taxonomy changes
- Sanity Studio migration
- About page redesign
- Contact page redesign
- quote-flow redesign
- final SEO optimization
- analytics
- testimonials

---

## Acceptance Criteria

- `/projects` follows the new visual system
- photography is the primary proof
- URL-driven filtering still works
- sector labels are normalized
- dead filters are not exposed unnecessarily
- `/projects/[slug]` works for all current projects
- detail pages remain intentional with sparse metadata
- solution links work
- project-specific WhatsApp context works
- related projects use actual relationships
- no unverified project facts are introduced
- no duplicate floating WhatsApp on mobile
- no horizontal overflow at 320px / 375px
- accessibility is preserved
- npm run check passes
- npm run lint passes
- npm run build passes

---

## Phase Boundary

Stop after C2.

Do not begin:

- C3 About / Contact
- C4 Quote flow
- C5 Sanity migration
