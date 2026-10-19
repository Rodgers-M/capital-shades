# Capital Shades — Design Direction

This document defines the intended user experience and visual/product direction
for the Capital Shades website.

Implementation tasks belong in `implementation.md`.
Business and architecture decisions belong in `decisions.md`.

---

## Brand direction

Preserve the existing Capital Shades logo.

The website should feel like an evolution of the existing brand rather than a
new identity.

Approved palette direction:

- warm white / white — dominant canvas
- charcoal / near-black — structural foundation
- restrained gold — premium architectural accent
- existing Capital Shades teal — secondary brand signature

The owner has approved this black / white / gold / teal direction.

---

## Visual character

The website should feel:

- architectural
- professional
- established
- premium
- practical
- image-led
- restrained
- credible

Avoid:

- generic construction templates
- SaaS dashboards/card grids
- excessive rounded cards
- gradients used decoratively
- heavy shadows
- pill-heavy UI
- fake luxury styling
- decorative clutter

---

## Typography

Typography should feel architectural, editorial and restrained.

- Use the existing font stack unless a deliberate typography phase changes it.
- Prefer medium and semibold weights.
- Avoid widespread extrabold typography.
- Create hierarchy primarily through scale, spacing and composition.
- Use uppercase sparingly for eyebrows and metadata.
- Keep body text highly readable.

---

## Imagery

Photography is one of the site's strongest credibility assets.

Prefer:

- real Capital Shades project imagery
- large photographic compositions
- asymmetric crops
- natural project details
- installation/fabrication imagery where useful
- strong whitespace around photography

Avoid:

- generic stock imagery
- AI-generated project imagery
- repeated use of the same image within one page
- excessive image effects
- decorative overlays

A simple dark overlay may be used when required for text legibility.

---

## Information architecture

Primary navigation:

- Solutions
- Projects
- About
- Contact

Primary conversion action:

- Request a Quote

Blog remains available but does not need to occupy primary navigation.

---

## Solution taxonomy

Current working top-level solution families:

1. Car Parking Shades
2. Shade Sails
3. Canopies
4. Awnings
5. Pergolas & Gazebos
6. Tensile & Custom Structures
7. Screen Fencing
8. Parasols

Tents are not a primary promoted solution.

Applications and variants such as:

- carports
- retractable awnings
- pool shades
- playground shades
- hospitality shades
- walkway covers
- car wash structures
- privacy screens
- dust screens

should be surfaced contextually rather than automatically becoming separate
top-level pages.

---

## Sectors

Canonical customer contexts:

- Residential
- Commercial
- Institutional

These should function as cross-cutting dimensions.

Institutional work is a strategic growth area and should remain visibly
represented even if the existing portfolio is currently weighted more heavily
toward residential and commercial work.

Do not create fake project counts or fabricate institutional portfolio proof.

---

## Content model

Solutions answer:

> What can Capital Shades build?

Applications answer:

> Where or how can this structure be used?

Sectors answer:

> Is this relevant to my type of project?

Projects answer:

> Has Capital Shades delivered something similar?

Projects should connect:

- solution(s);
- sector;
- general location where publishable;
- completion year where known;
- project imagery;
- project scope where known.

---

## Homepage direction

The homepage is a routing and credibility layer, not an exhaustive brochure.

Preferred rhythm (Phases C5.5–C5.6):

1. Hero, with the capability line
2. Why Capital Shades
3. Core solutions, with a short "not sure?" prompt
4. How it works
5. Selected work (compact project proof)
6. Residential / Commercial / Institutional context
7. Final quote CTA
8. Footer

Detailed material comparison and solution guidance live on `/solutions`; a
deeper featured case study can return once verified project details exist.

---

## Hero

The hero should:

- immediately explain the business;
- use real project imagery;
- prioritize Request a Quote;
- offer WhatsApp as the secondary action and View Projects as the proof path;
- avoid unnecessary claims or statistics.

Business scope may now accurately reference:

- design;
- fabrication;
- supply;
- installation.

Geographic copy may accurately reference:

- Nairobi base;
- Kenya;
- East Africa.

Do not overload the hero with every capability.

---

## Solutions experience

Solutions should use an editorial, image-led presentation.

Avoid repetitive equal-sized SaaS cards.

Each solution page should help visitors understand:

- what the structure is;
- common applications;
- available relevant options/materials;
- real related projects;
- how to ask about that solution.

Customer search terminology may appear naturally in copy.

Example:

Car Parking Shades may naturally mention:

- car shades
- carports
- car parking shades

without creating separate duplicate pages for every phrase.

---

## Projects experience

Projects are the site's strongest proof layer.

Prefer:

- large imagery;
- masonry/editorial layouts;
- restrained captions;
- verified metadata only;
- contextual links back to relevant solutions.

Project detail pages should still feel complete when project metadata is sparse.

Do not invent narrative content to fill gaps.

Project-specific content must remain distinct from generic solution content.

---

## About direction

About should establish:

- who Capital Shades is;
- what lifecycle the company handles;
- who it serves;
- where it operates;
- how projects typically proceed;
- why the company is credible.

Useful confirmed capability language includes:

- Design
- Fabrication
- Supply
- Installation
- Maintenance and repair
- After-sales support

Avoid a long generic company-history page.

---

## Geographic presentation

Capital Shades is based in Nairobi and serves projects across Kenya and East
Africa.

Use this broad positioning sparingly.

For local relevance, naturally emphasize Nairobi and nearby areas such as:

- Kiambu
- Machakos
- Kajiado

when contextually appropriate.

Do not keyword-stuff location names.

General estate/project locations may be shown where approved.

Do not expose exact private residential addresses.

---

## Quote-flow direction

The quote experience should be a focused multi-step flow.

Preferred structure:

### Step 1 — What do you need?

- Structure type
- Not sure — help me choose
- Intended use

### Step 2 — Tell us about the site

- Location
- Approximate width
- Approximate length
- Number of vehicles where relevant
- Material preference if known
- Site photos
- Additional details

### Step 3 — How should we contact you?

- Name
- Phone
- Email
- Preferred contact:
  - Phone
  - WhatsApp
  - Email

Site photos should receive prominent treatment because they can help the team
understand the site and prepare an initial estimate.

Photos should be strongly encouraged rather than mandatory.

The website should make clear that:

- rough dimensions are acceptable;
- Capital Shades confirms measurements during the site visit;
- a final quotation follows the site visit and confirmed measurements.

---

## Conversion model

Visitors should always have low-friction paths to:

- Call
- WhatsApp
- Request a Quote

Email remains important, particularly for organisations and institutional
customers.

Do not force every visitor through the quote form.

A persistent floating WhatsApp control is used on every screen size; there is no
mobile bottom action bar (docs/decisions.md — "Mobile conversion").

---

## Trust signals

Prefer concrete verified evidence over generic marketing claims.

Useful trust signals include:

- real completed projects;
- project photography;
- full lifecycle capability;
- maintenance and after-sales support;
- materials sourced from suppliers in South Africa and France;
- selected warranties of up to 10 years;
- customer reviews where verified;
- clear process;
- general project locations;
- completion years.

Approved warranty wording:

> Selected structures are covered by warranties of up to 10 years.
> Final warranty terms are provided with the quotation and contract documents.

Do not reduce conditional warranty information to a blanket guarantee.

---

## Material language

Use descriptive technical wording.

Examples:

- shade mesh
- waterproof PVC membrane
- metal roofing

Avoid unnecessary absolute claims such as:

- 100% waterproof
- indestructible
- permanent
- maintenance-free

unless supported by explicit manufacturer documentation.

---

## SEO direction

Google visibility is a major business goal.

Design should support SEO rather than fight it.

This includes:

- crawlable solution pages;
- meaningful headings;
- real text content;
- project detail pages;
- internal linking;
- location-aware project content;
- fast loading;
- good mobile usability;
- CMS-managed project updates.

Do not compromise the editorial design by turning pages into keyword lists.

---

## Visual composition

Prefer:

- warm white space
- charcoal sections used deliberately
- thin gold rules
- restrained teal moments
- editorial grids
- square or lightly rounded geometry
- varied section composition
- prominent photography

Avoid:

- excessive gradients
- large rounded cards
- pill-heavy UI
- decorative blueprint textures
- heavy shadows
- unnecessary illustration
- fake statistics
