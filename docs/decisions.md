# Project Decisions

## 2026-10 — Terminology

Decision:
Use "Solutions" rather than "Products".

Reason:
Capital Shades delivers designed/fabricated/installed
structures rather than simply selling packaged products.

## 2026-10 — Sectors

Decision:
Residential, Commercial and Institutional are cross-cutting
content dimensions, not standalone duplicated content trees.

Reason:
Prevents duplicate content and connects naturally to projects.

## 2026-10 — Mobile conversion

Decision:
Use Call / WhatsApp / Request Quote action bar.

Behavior:
Appear after hero and hide during form interaction.

## Public settings exposure

Decision:
Client-facing loaders must return only public business settings rather
than serializing the complete CMS/settings record.

Reason:
The CMS may contain secondary or internal contact information that should
not automatically become visible in browser page data.

Public contact details must use the explicitly selected primary values.
