import type { PostTag } from '../types';

export interface SeedPost {
	slug: string;
	title: string;
	excerpt: string;
	tag: PostTag;
	date: string;
	author: string;
	/** Key of a photo in src/lib/assets/photos (filename without extension) */
	photo: string;
	/** Hidden from the site until the owner fills in the missing facts */
	draft?: boolean;
	markdown: string;
}

/*
 * Launch posts. Written from the current capitalshades.co.ke copy plus general,
 * checkable industry knowledge — no invented figures, clients or guarantees.
 * Anything company-specific that still needs the owner is listed in
 * docs/content-to-confirm.md.
 */
export const posts: SeedPost[] = [
	{
		slug: 'car-park-shades-guide',
		title: 'Car Park Shades: A Practical Guide for Kenyan Homes and Businesses',
		excerpt:
			'What a car park shade actually protects against, the main designs, and what to check before you commission one.',
		tag: 'Buyers Guide',
		date: '2026-09-01',
		author: 'Capital Shades team',
		photo: 'carpark-residential-green',
		markdown: `
A car park shade is a frame — usually galvanised or painted steel — with a fabric, membrane or metal roof stretched or fixed over it to cover parked vehicles. It sounds simple, but a well-designed shade does a lot of quiet work for your cars and your property.

## What a car park shade protects against

- **Sun and UV.** Direct sunlight fades paintwork, cracks dashboards and breaks down seats and trim. Shade stops that damage at the source.
- **Heat.** A car parked in the open can become uncomfortably hot inside within minutes. Under shade the cabin stays far cooler, so you need less air-conditioning when you drive off.
- **Rain and hail.** With a waterproof membrane, vehicles stay dry and are protected from hail and falling debris during storms.
- **Wear and tear.** By shielding vehicles from the elements, you extend the life of both the exterior and interior — and reduce repair bills over time.

## Common designs

**Cantilever shades** are supported from one side, with the roof reaching out over the bays. There are no posts at the front, so parking and opening doors is easier. See our comparison of [cantilever and standard designs](/blog/cantilever-vs-standard-car-park-shades).

**Single- and double-post (standard) shades** are supported at both ends. They are economical for long rows of bays and for large commercial car parks.

**Tensile and membrane designs** use fabric held in tension to create curved, architectural shapes — popular where the look of the entrance or frontage matters.

## Choosing the cover material

The two most common covers are **shade netting** (breathable knitted fabric) and **PVC membrane** (fully waterproof). We explain the trade-offs in [Shade netting vs waterproof PVC](/blog/shade-netting-vs-pvc-membrane). Metal roofing is a third option for permanent structures.

## What to check before you commission a shade

1. **Site evaluation.** Measure the space, how cars move in and out, and where water will run off.
2. **Structure and foundations.** The frame and footings must be designed for the wind loads at your site — especially for cantilever designs.
3. **Material quality.** Ask what the frame is made of, how it is protected from rust and what grade of fabric is used.
4. **Local regulations.** Larger structures may need approvals; a professional installer will advise.
5. **Professional installation.** Correct tensioning and anchoring are what make a shade last.

Planning a car park shade? [Request a site assessment](/estimator) and tell us about your space.
`
	},
	{
		slug: 'shade-netting-vs-pvc-membrane',
		title: 'Shade Netting vs Waterproof PVC: Which Is Right for You?',
		excerpt:
			'Breathable shade netting or a fully waterproof PVC membrane? Here is how the two compare on sun, rain, heat and upkeep.',
		tag: 'Buyers Guide',
		date: '2026-09-08',
		author: 'Capital Shades team',
		photo: 'membrane-beige-carport',
		markdown: `
Most of the shade structures we build use one of two covers: heavy-duty **shade netting** or **PVC-coated membrane**. Both work well — the right choice depends on how you use the space and what you need protection from.

## Shade netting

Shade netting is a knitted fabric, usually made from high-density polyethylene (HDPE).

- **Sun:** blocks most direct sun and UV. The exact figure depends on the density and colour of the fabric, so ask for the specification of the grade being quoted.
- **Rain:** it is *not* waterproof. Light rain is broken up, but heavy rain comes through.
- **Heat:** because air passes through the knit, hot air does not get trapped underneath. This makes it comfortable for open car parks, play areas and gardens.
- **Look:** available in a wide range of colours.

## PVC membrane

PVC membrane is a polyester fabric coated in PVC, stretched tight over the frame.

- **Sun:** blocks direct sunlight completely.
- **Rain:** fully waterproof. Water runs off, so the design should plan where it goes — gutters and drainage matter.
- **Heat:** the surface doesn't breathe, so height and open sides help keep the space underneath airy. Lighter colours reflect more heat.
- **Look:** a smooth, clean, architectural finish that suits entrances, walkways and commercial frontages.

## Side-by-side

| | Shade netting | PVC membrane |
| --- | --- | --- |
| Rain protection | Light only | Fully waterproof |
| Airflow | Breathable | Sealed |
| Best for | Homes, schools, open car parks | Entrances, walkways, commercial parking |

## Which should you choose?

Ask yourself one question first: **do you need to stay dry, or just in the shade?** If rain protection matters — for customers walking to a door, or vehicles that must stay dry — choose PVC. If your priority is sun protection and airflow over a large area, netting is often the practical choice.

Not sure? [Talk to us](/contact) — we'll recommend a material after looking at your site.
`
	},
	{
		slug: 'cantilever-vs-standard-car-park-shades',
		title: 'Cantilever vs Standard Car Park Shades',
		excerpt:
			'Posts on one side or both? How cantilever and standard shades differ in access, cost and foundations.',
		tag: 'Buyers Guide',
		date: '2026-09-12',
		author: 'Capital Shades team',
		photo: 'cantilever-hero',
		markdown: `
The biggest design decision for a car park shade is how it is held up. There are two broad families.

## Cantilever shades

A cantilever shade is supported on one side only. The roof "floats" over the parking bays from a single line of posts.

**Why people choose it**

- **Clear access.** No posts at the front of the bay, so drivers can reverse in, open doors and move around freely.
- **Clean look.** The open front gives a modern, uncluttered appearance — popular for homes and office frontages.

**What to plan for**

- Because all the load sits on one side, the posts and **foundations must be larger** and carefully engineered for wind.
- They usually cost more per bay than a standard design.

## Standard (post-supported) shades

Standard shades are supported at both ends — or along both sides — of the covered area.

**Why people choose it**

- **Economical** for long rows and large commercial car parks.
- **Simpler foundations**, because loads are shared between posts.

**What to plan for**

- Posts need to be placed so they don't obstruct parking, doors or traffic lanes.

## Quick guide

- **Residential driveways and compounds:** cantilever designs often win on convenience.
- **Offices and malls with many bays:** standard or double-sided designs usually give the best value.
- **Tight or irregular spaces:** a custom design may combine both.

However large, small or irregularly shaped your car park is, the right answer comes from the site itself. [Request a site assessment](/estimator) and we'll suggest the best layout.
`
	},
	{
		slug: 'shade-for-schools',
		title: 'Shade for Schools: Protecting Children at Play',
		excerpt:
			'Shade sails and structures make playgrounds, walkways and assembly areas safer and more comfortable for learners.',
		tag: 'Insights',
		date: '2026-09-17',
		author: 'Capital Shades team',
		photo: 'sails-hotel-balcony',
		markdown: `
Children spend a large part of the school day outdoors — at break, during sport and moving between classrooms. Health authorities, including the World Health Organization, recommend **shade as a key part of sun protection** for children, alongside hats and sensible timing of outdoor activities.

## Where schools use shade

- **Playgrounds and play equipment.** Shade keeps metal and plastic surfaces from becoming too hot to touch and protects children from direct sun.
- **Assembly and waiting areas.** Parents' pick-up points and assembly grounds are often in full sun.
- **Walkways.** Covered walkways connect blocks and keep learners dry in the rains when a waterproof membrane is used.
- **Sports areas and spectator seating.**
- **Staff and visitor parking.**

## Choosing the right structure

**Shade sails** are ideal over play equipment and open areas. They are colourful, cover large spaces economically, and the breathable fabric keeps the space airy.

**Tensile or PVC structures** suit walkways and assembly areas where rain protection matters too.

## Safety considerations

- Posts should be padded or positioned away from play paths.
- Structures must be engineered for local wind conditions and professionally tensioned.
- Plan regular inspections — see our [maintenance checklist](/blog/shade-structure-maintenance-checklist).

We work with schools on shade for play areas, parking and walkways. [Get in touch](/contact) to arrange a site evaluation.
`
	},
	{
		slug: 'shade-for-shopping-centres',
		title: 'Why Shade Matters for Shopping Centres',
		excerpt:
			'Covered parking and walkways change where shoppers choose to go — and how long they stay.',
		tag: 'Insights',
		date: '2026-09-21',
		author: 'Capital Shades team',
		photo: 'carpark-retail-blue',
		markdown: `
At Capital Shades we are always looking at how shade can help our clients achieve their goals. Working with commercial sites, we have seen a **marked difference in both how long shoppers stay and which centre they choose** when shade and all-weather cover are available.

## Shade is part of the customer experience

A shopper's visit begins in the car park. Returning to a car that has been standing in full sun is one of the least pleasant parts of the trip — and it is something customers remember when choosing where to shop next time.

## Where to add shade in a retail centre

- **Customer parking.** The most visible improvement, and the one shoppers value most.
- **Entrances and drop-off points.** A PVC or tensile canopy keeps people dry and gives the building a distinctive frontage.
- **Walkways** between parking, anchor stores and restaurants.
- **Outdoor seating and food courts,** where comfort directly affects how long people linger.

## Designing for a busy site

- **Keep it open.** A good design shades the space while keeping a light, spacious feel.
- **Plan traffic flow.** Cantilever designs keep bays free of posts; standard designs are economical for long rows. See [Cantilever vs standard car park shades](/blog/cantilever-vs-standard-car-park-shades).
- **Match the brand.** Fabrics and membranes come in a wide range of colours, and lighting can be added for evening trade.
- **Install with minimal disruption,** phasing work so the centre stays open.

Planning shade for a commercial site? [Request a site assessment](/estimator).
`
	},
	{
		slug: 'shade-structure-maintenance-checklist',
		title: 'A Simple Maintenance Checklist for Your Shade Structure',
		excerpt:
			'A few regular checks keep fabric tight, frames sound and your shade looking good for years.',
		tag: 'Maintenance',
		date: '2026-09-25',
		author: 'Capital Shades team',
		photo: 'carport-dark-silver',
		markdown: `
Shade structures are built to be low-maintenance, but a few simple checks help them last longer and look better.

## Every few months

- **Look at the fabric tension.** Sagging or flapping fabric wears faster and can collect water. If it has slackened, have it re-tensioned.
- **Check fixings and bolts** at posts, brackets and tension points for looseness or corrosion.
- **Clear debris** — leaves, branches and dust — from the top of the fabric and from gutters.
- **Check drainage** on waterproof membranes so water runs off where it should.

## After heavy rain or strong wind

- Walk around the structure and look for **tears, loose edges or bent fittings.**
- Make sure nothing has fallen onto the fabric.

## Cleaning

- Rinse with clean water and use a **soft brush with mild soap** for stubborn marks.
- **Avoid pressure washers, harsh chemicals and solvents** — they can damage coatings and stitching.
- Let fabric dry fully before any retensioning.

## When to call a professional

Call us if you notice rust on the frame, torn fabric, movement at the foundations, or tension points that have failed. Small repairs caught early are far cheaper than replacing a cover.

Need a check-up or repair? [Contact us](/contact).
`
	},
	{
		slug: 'car-park-shade-prices-kenya',
		title: 'What Does a Car Park Shade Cost in Kenya?',
		excerpt: 'The main things that drive the price of a car park shade, with typical ranges.',
		tag: 'Buyers Guide',
		date: '2026-09-27',
		author: 'Capital Shades team',
		photo: 'carpark-blue-lot',
		// TODO(owner): needs real price ranges before publishing — see docs/content-to-confirm.md
		draft: true,
		markdown: `
Every shade is custom, but these are the factors that drive the price.

## What affects the price

- **Number of bays / area covered.**
- **Design:** cantilever designs need heavier posts and foundations than standard designs.
- **Cover material:** shade netting, PVC membrane or metal roofing.
- **Site conditions:** ground type, access and any demolition or levelling.
- **Extras:** lighting, guttering, branding and colours.

## Typical ranges

_TODO(owner): per-bay or per-m² ranges for netting, PVC and metal roofing._

[Request a site assessment](/estimator) for an exact quote.
`
	}
];
