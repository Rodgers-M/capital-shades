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

# Current Phase

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

---

# Remaining roadmap

## Phase C5 — Sanity / Content Model Migration

Planned.

Key work:

- final solution taxonomy;
- solution records;
- project schema;
- galleries;
- general locations;
- completion year;
- scope;
- featured project controls;
- public settings;
- service areas;
- blog/articles;
- editorial workflow.

---

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

### C4 follow-up refinements

- [x] Structure selector changed to compact accessible dropdown
- [x] No-JavaScript structure select preserved
- [x] Direct mobile camera capture for site photos
- [x] Existing photo resizing / validation / limits reused
- [x] Mobile quote layout tightened
- [x] Material preference limited to confirmed options per solution (UI, server, no-JS)
