import type { Sector } from './types';

/**
 * The canonical customer-context vocabulary (docs/design-direction.md).
 * Descriptions are drawn from the sectors listed on the current site and
 * describe where shade is used — not claims about delivered work.
 */
export const SECTORS: { id: Sector; label: string; text: string }[] = [
	{
		id: 'residential',
		label: 'Residential',
		text: 'Carports, driveways, patios, gardens and poolsides at home.'
	},
	{
		id: 'commercial',
		label: 'Commercial',
		text: 'Car parks, entrances, walkways and outdoor seating for offices, shops, hotels and restaurants.'
	},
	{
		id: 'institutional',
		label: 'Institutional',
		text: 'Shade over play areas, walkways, sports facilities and parking for schools and public buildings.'
	}
];
