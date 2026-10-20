/**
 * The working top-level solution taxonomy (docs/decisions.md — "Solution
 * taxonomy"), used where visitors pick a structure type, such as Request a
 * Quote. Hints name applications and variants from the same decision record.
 *
 * The solution records (seed or Sanity) use these IDs as their slugs. The quote
 * flow keeps this copy because /api/enquiry validates against it and must never
 * depend on a content fetch; content only overrides per-solution materials.
 */
export const SOLUTION_TYPES = [
	{ id: 'car-parking-shades', label: 'Car Parking Shades', hint: 'Car shades and carports' },
	{ id: 'shade-sails', label: 'Shade Sails', hint: 'Gardens, pools and play areas' },
	{ id: 'canopies', label: 'Canopies', hint: 'Entrances and walkway covers' },
	{ id: 'awnings', label: 'Awnings', hint: 'Including retractable awnings' },
	{ id: 'pergolas-gazebos', label: 'Pergolas & Gazebos', hint: 'Outdoor seating and living' },
	{
		id: 'tensile-custom-structures',
		label: 'Tensile & Custom Structures',
		hint: 'Bespoke membranes, car wash structures'
	},
	{ id: 'screen-fencing', label: 'Screen Fencing', hint: 'Privacy and dust screens' },
	{ id: 'parasols', label: 'Parasols', hint: 'Restaurants, hotels and poolsides' }
] as const;

export type SolutionTypeId = (typeof SOLUTION_TYPES)[number]['id'];

export const isSolutionTypeId = (value: string): value is SolutionTypeId =>
	SOLUTION_TYPES.some((type) => type.id === value);

/**
 * Retired solution slugs, old → current. Old URLs 301 straight to the current
 * slug, and old project references resolve through it. Also imported by the
 * Studio, which refuses these slugs on new records. Pool shades are an
 * application of shade sails, not a solution (docs/decisions.md — "Search
 * architecture").
 */
export const LEGACY_SOLUTION_SLUGS: Readonly<Record<string, SolutionTypeId>> = {
	'car-park-shades': 'car-parking-shades',
	'tensile-membrane-structures': 'tensile-custom-structures',
	'pool-shades': 'shade-sails'
};

/** The current slug for a solution slug that may predate the migration. */
export const currentSolutionSlug = (slug: string): string =>
	Object.hasOwn(LEGACY_SOLUTION_SLUGS, slug) ? LEGACY_SOLUTION_SLUGS[slug] : slug;
