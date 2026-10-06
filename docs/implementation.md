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
