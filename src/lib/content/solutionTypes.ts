/**
 * The working top-level solution taxonomy (docs/decisions.md — "Solution
 * taxonomy"), used where visitors pick a structure type, such as Request a
 * Quote. Hints name applications and variants from the same decision record.
 *
 * TODO(phase-c5): the solution records still predate this taxonomy. Once they
 * are migrated, derive this list from them instead of keeping a copy here.
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
