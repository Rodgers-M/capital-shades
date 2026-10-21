import type { Sector } from './types';

/**
 * The canonical customer-context vocabulary (docs/design-direction.md).
 * Descriptions are drawn from the sectors listed on the current site and
 * describe where shade is used — not claims about delivered work.
 */
/** `examples`: the customer types in each sector, from docs/decisions.md. */
export const SECTORS: { id: Sector; label: string; text: string; examples: string }[] = [
	{
		id: 'residential',
		label: 'Residential',
		examples: 'Homeowners',
		text: 'Carports, driveways, patios, gardens and poolsides at home.'
	},
	{
		id: 'commercial',
		label: 'Commercial',
		examples: 'Property developers, offices, hotels, restaurants and shopping centres',
		text: 'Car parks, entrances, walkways and outdoor seating for offices, shops, hotels and restaurants.'
	},
	{
		id: 'institutional',
		label: 'Institutional',
		examples: 'Schools, hospitals, churches and government organisations',
		text: 'Shade over play areas, walkways, sports facilities and parking for schools and public buildings.'
	}
];

export const sectorLabel = (id: Sector) => SECTORS.find((s) => s.id === id)?.label ?? id;
