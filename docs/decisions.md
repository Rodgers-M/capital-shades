# Capital Shades — Project Decisions

This document records product, content, architecture and business decisions
that should remain stable across implementation phases.

Implementation-specific tasks belong in `implementation.md`.

---

## Terminology

Use **Solutions** rather than **Products** in the public website.

Capital Shades provides designed, fabricated, supplied and installed structures
rather than simply selling packaged products.

Preferred public terminology:

- Solutions
- Projects
- Request a Quote
- Residential
- Commercial
- Institutional

Avoid reverting to:

- Products
- Estimator
- Request Site Assessment

---

## Solution taxonomy

The current working top-level solution taxonomy is:

1. Car Parking Shades
2. Shade Sails
3. Canopies
4. Awnings
5. Pergolas & Gazebos
6. Tensile & Custom Structures
7. Screen Fencing
8. Parasols

This taxonomy balances:

- how customers describe the products;
- distinct construction/solution types;
- useful search intent;
- avoiding many thin top-level categories.

### Applications, variants and subtypes

The following should normally be represented as applications, variants or
subtypes rather than separate top-level solution families:

- Carports
- Retractable awnings
- Swimming-pool shades
- School/playground shades
- Restaurant/hospitality shades
- Walkway covers
- Car wash tensile structures
- Privacy screen fence
- Dust screen fence

These terms remain valuable for:

- solution-page copy;
- project metadata;
- filters;
- FAQs;
- internal linking;
- SEO/search terminology.

### Tents

Capital Shades can install tents when required, but tents are not a strategic
or strongly promoted offering.

Decision:

- do not include Tents in the primary Solutions navigation;
- do not prioritize Tents in SEO or homepage content;
- the capability may be mentioned contextually where appropriate.

---

## Customer terminology

Customers commonly use terms including:

- car shades
- carports
- car parking shades
- shade sails
- shade nets
- screen fence

The website should understand and naturally incorporate this language during
the SEO/content phase without keyword stuffing.

---

## Sectors

The canonical customer-context vocabulary is:

- Residential
- Commercial
- Institutional

These are cross-cutting content dimensions, not duplicated site hierarchies.

Examples of customer types include:

### Residential

- Homeowners

### Commercial

- Property developers
- Offices
- Hotels
- Restaurants
- Shopping centres

### Institutional

- Schools
- Hospitals
- Churches
- Government organisations

Current strongest customer groups are:

- property developers;
- homeowners.

A strategic business goal is to attract more institutional work.

Institutional content should therefore remain visible and credible even if the
current published project portfolio contains fewer institutional projects.

---

## Business capability

Capital Shades handles the full project lifecycle.

Confirmed capabilities include:

- Design
- Fabrication
- Supply
- Installation
- Maintenance
- Repair
- After-sales support

Website copy may now accurately refer to design, fabrication, supply,
installation and maintenance.

Avoid unnecessarily saying "in-house", because fabrication may occur either:

- at the project site; or
- at a Capital Shades workshop;

depending on the project and customer preference.

---

## Project process

The confirmed typical project process is:

1. Customer enquiry
2. Initial discussion
3. Site visit
4. Measurements
5. Design or proposal
6. Quotation
7. Deposit or approval
8. Fabrication
9. Installation
10. Handover
11. After-sales support

Capital Shades performs the site measurements.

A site visit is a required part of the process before the final quotation.

Site visits are free within Nairobi and nearby areas where practical.
Whether a free visit is possible depends on the distance from Nairobi.

Website wording should avoid implying that all site visits everywhere are free.

---

## Quote model

The website should distinguish between an **initial estimate** and a
**final quotation**.

### Initial assessment / estimate

Project information, rough dimensions and site photographs can help the team
understand the project and may support an initial estimate.

### Final quotation

The safer public assumption is:

> The final quotation follows the site visit and confirmed measurements.

Do not imply that the website automatically produces a final binding quote.

---

## Quote information

Useful information for a new enquiry includes:

- Location
- Structure type
- Approximate dimensions
- Number of vehicles, where relevant
- Site photographs
- Material preference, if known
- Intended use
- Additional project notes

Customers may choose:

**Not sure — help me choose**

when they do not know the correct solution type.

### Measurements

Ask for dimensions rather than requiring customers to calculate square metres.

Preferred UX:

- Width, e.g. 6 m
- Length, e.g. 5 m

Rough measurements are acceptable.

Capital Shades will confirm measurements during the site visit.

### Photos

Site photographs are particularly valuable and should receive prominent
treatment in the quote flow.

Photos should be strongly encouraged but not required to submit an enquiry.

---

## Communication channels

Customers commonly use:

- Phone
- WhatsApp
- Email

All three should remain first-class contact methods.

Different audiences may naturally prefer different channels.

For example:

- homeowners may prefer Call or WhatsApp;
- institutions and commercial organisations may prefer Email.

Do not force all visitors through a website form.

---

## Official contact details

Confirmed authoritative public details:

Primary phone:

`+254 722 765397`

WhatsApp:

`+254 722 765397`

Email:

`info@capitalshades.co.ke`

All website components and structured data must use centralized public
settings rather than hard-coded copies.

The previous `0708...` number should not be exposed publicly unless the owner
later explicitly asks for it to be restored.

---

## Public settings exposure

Client-facing loaders must expose an explicit public settings projection
rather than serializing the complete CMS/settings record.

New settings fields should remain server-side unless deliberately added to the
public allowlist.

This prevents internal, legacy or secondary information from accidentally
appearing in browser page data.

---

## Geographic positioning

Capital Shades is based in Nairobi.

The business serves projects:

- in Nairobi;
- throughout Kenya;
- across East Africa.

The website may accurately describe Capital Shades as:

> Based in Nairobi, serving projects across Kenya and East Africa.

### Primary local market

For local search and everyday operations, the strongest geographic focus
remains Nairobi and nearby counties, including:

- Nairobi
- Kiambu County
- Machakos County
- Kajiado County

This local focus should coexist with the broader Kenya/East Africa capability.

Do not make the website sound Nairobi-exclusive.

Do not over-repeat "East Africa" or geographic keywords purely for SEO.

---

## Local SEO direction

Google visibility is one of the owner's highest priorities. Phase C7 set the
rules below ("Search architecture"); its research and crawl are in
`implementation.md`.

The architecture should support searches such as:

- car shades Nairobi
- car parking shades Nairobi
- carports Nairobi
- shade sails Nairobi
- shade nets Nairobi
- car shades Kasarani
- car parking shades Thika Road
- shade structures Kiambu
- shade structures Machakos
- shade structures Kajiado
- screen fence Nairobi

For now:

- keep solution pages focused on useful service content;
- preserve structured location/service-area fields;
- use verified project locations;
- preserve project-to-solution relationships;
- use customer terminology naturally;
- avoid keyword stuffing;
- do not create thin doorway/location pages.

Future SEO may include genuinely useful location pages where enough distinct
content exists.

---

## Search architecture

Decided in Phase C7.

- **One page per solution.** Customer terms map onto the eight solutions; no
  page per synonym. Car shades, carports, parking shades and car shade nets →
  Car Parking Shades. Pool, garden and playground shade → Shade Sails.
  Tensile fabric/membrane structures → Tensile & Custom Structures. Privacy
  and dust screens → Screen Fencing, once it has a page.
- **"Shade nets"** is not a target term: most of that search is agricultural
  rolls and retail listings. Use "shade net" only where the installed
  structure really uses it (car parking shades), never as a site-wide keyword
  and never as a `/shade-nets` page.
- **Nairobi first**, then Kenya, then East Africa. Nairobi goes in titles and
  descriptions where it reads naturally; East Africa stays in about/positioning
  copy, not in titles.
- **No location doorway pages** (e.g. "Car Parking Shades Kiambu"). Local
  relevance comes from the Nairobi base, the service areas in settings and
  verified project locations. A location page needs real projects and photos
  there first.
- **Planned solutions get no page and no index entry** until they have
  confirmed copy and real photos. Eight taxonomy records do not mean eight
  pages.
- **Retired solution slugs redirect** (one hop) through
  `LEGACY_SOLUTION_SLUGS`. Pool Shades → Shade Sails.
- **Filtered portfolio views** (`/projects?solution=…`, `?sector=…`) stay
  shareable but canonicalise to `/projects`; they are never in the sitemap.
- **Search metadata** comes from content: solution records carry an optional
  search title and description; project metadata is built from verified
  fields. Customer terms (aliases) inform copy and are never rendered as a
  keyword list or hidden text.
- **Structured data** states verified facts only: no street address, hours,
  ratings, review counts, prices, coordinates or founding date until
  confirmed.
- **Utility pages** (Thank You, errors) are noindex. Contact and Request a
  Quote stay indexable.

---

## Project publishing and privacy

Client names should not be published.

Project locations may be published at a general level that does not expose a
private or precise address.

Good examples:

- Runda, Nairobi
- Karen, Nairobi
- Kiambu
- Thika Road area

Avoid:

- exact residential street addresses;
- house numbers;
- location information that allows a private home to be easily pinpointed.

The website may publish:

- general project location;
- completion year;
- project scope;
- solution;
- sector;
- photographs where publication rights are confirmed.

---

## Warranty wording

Approved public wording:

> Selected structures are covered by warranties of up to 10 years.
> Final warranty terms are provided with the quotation and contract documents.

Do not state:

> All structures have a 10-year warranty.

until the exact warranty coverage has been confirmed.

Warranty scope may depend on:

- structure type;
- materials;
- manufacturer coverage;
- workmanship;
- project-specific contract terms.

---

## Materials and finishes

The owner identifies the following as differentiators:

- high-end materials and finishes;
- expert installation;
- custom design.

Materials are sourced from suppliers including suppliers in:

- South Africa;
- France.

Do not invent:

- supplier names;
- manufacturer partnerships;
- certifications;
- product brands.

Until those are known, use sourcing geography only where it adds useful
credibility.

---

## Claims and technical wording

Claims may now use verified discovery information.

However, continue avoiding unsupported absolutes or subjective superlatives.

Avoid unless explicitly supported:

- best
- industry-leading
- 100%
- every
- any size
- cheapest
- nationwide leader
- no middlemen

Prefer specific statements backed by verified business facts.

Operational claims that are now confirmed include:

- design;
- fabrication;
- supply;
- installation;
- maintenance/repair;
- site measurements;
- site visits;
- after-sales support.

---

## Mobile conversion

Decided in Phase C5.6: there is no persistent mobile bottom action bar
(Call | WhatsApp | Request a Quote). Pages carry deliberate conversion points,
the sticky header exposes the phone number and the mobile menu offers Call,
WhatsApp and Request a Quote.

The floating WhatsApp action is the single persistent contact control on every
screen size. It is hidden on Contact and Request a Quote and while the footer is
in view, and respects the phone's bottom safe area.

Explicit WhatsApp buttons stay only where they carry context or a distinct
intent: the home hero, solution and project enquiries, "not sure — help me
choose", the Contact page and the quote-flow fallback. Generic WhatsApp
buttons that repeat the floating control are not added.

The floating WhatsApp action is icon-only: the standard white WhatsApp mark on a
round green button, with no text label, because visitors recognise it on sight.
It uses a slightly deeper green than WhatsApp's own (`whatsapp-deep`), close
to what other sites use, so the white mark meets the 3:1 contrast WCAG asks of
icons. It keeps a descriptive accessible name. Other WhatsApp controls keep
near-black on the standard green.

---

## WhatsApp context

WhatsApp messaging should be contextual where possible.

Examples:

### General

> Hi Capital Shades, I'd like to enquire about a shade project.

### Solution

> Hi Capital Shades, I'm interested in car parking shades and would like to
> discuss my project.

### Project

> Hi Capital Shades, I was looking at the [Project Name] project on your
> website and would like to discuss something similar.

All messages must use the centralized official WhatsApp number.

---

## Brand

The existing Capital Shades logo remains the official logo.

Reason:

It is already used on:

- invoices;
- emails;
- existing company material.

Changing it would create unnecessary brand inconsistency and require updates
across other business systems.

There is currently no formal brand guide.

The owner has approved the website direction using:

- warm white / white;
- charcoal / black;
- restrained gold;
- Capital Shades teal.

The website should evolve the existing identity rather than replace it.

---

## Logo assets

The current low-resolution logo should eventually be recreated faithfully as a
vector SVG.

Do not generate a stylistically different replacement logo.

Preferred process:

1. obtain the highest-quality existing source;
2. trace/reconstruct it accurately as vector artwork;
3. compare it against the current official logo;
4. export SVG and high-resolution raster variants;
5. regenerate favicon/app icons from the approved vector.

---

## Content management

After launch, the highest-priority content the Capital Shades team should be
able to update without a developer is:

1. Projects
2. Project galleries/photos
3. Blog/articles

Project publishing should be especially simple.

Publishing a project should automatically allow it to appear under the
relevant:

- solution;
- sector;
- portfolio filter;
- related-project sections.

Sanity remains the planned CMS.

---

## Website business goals

The owner wants the new website to improve:

- quotation requests;
- phone calls;
- WhatsApp enquiries;
- quality of commercial leads;
- company presentation;
- Google visibility;
- portfolio sharing;
- project updates;
- institutional enquiries;
- credibility during bids and proposals.

Google visibility is a particularly important priority.

The website should therefore balance:

- conversion;
- credibility;
- visual presentation;
- search discoverability;
- maintainable project content.

---

## Reference website

The owner shared Professionals Tents as a website he likes.

Use it as a business/market reference rather than a visual template.

Relevant lessons include:

- clear service-specific content;
- strong conversion paths;
- explicit service language;
- visible project/application coverage;
- strong search intent.

Do not copy its visual density or keyword repetition.
