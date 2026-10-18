import type { Sector, SolutionStatus } from '../types';

interface SeedRecord {
	/** A SOLUTION_TYPES id, except for legacy records */
	slug: string;
	title: string;
	/** Material values offered in the quote form (enquiry.ts MATERIALS); "Not sure yet" is always added */
	quoteMaterials?: string[];
	/** Customer search terms (docs/decisions.md — "Customer terminology"); never listed on the page */
	aliases?: string[];
}

/** A solution with a page: all its copy and a photo are required. */
export interface SeedPage extends SeedRecord {
	status: Exclude<SolutionStatus, 'planned'>;
	eyebrow: string;
	summary: string;
	body: string[];
	features: string[];
	applications: string[];
	/** Taken from the applications the copy names, not from delivered projects */
	sectors: Sector[];
	photo: string;
	photoAlt: string;
}

/** In the taxonomy, without a page until its copy and photos are confirmed. */
interface SeedPlanned extends SeedRecord {
	status: 'planned';
}

export type SeedSolution = SeedPage | SeedPlanned;

/*
 * The working taxonomy (docs/decisions.md), in display order, migrated from the
 * six product lines on the current site (migration map: docs/implementation.md,
 * Phase C5). Copy is descriptive: what each structure is and where it is used.
 * No subjective, superlative or geographic claims, and nothing about
 * performance, value or who builds what beyond "design and installation"
 * (Phase C1 review). Planned records carry no copy: none is confirmed yet.
 */
export const solutions: SeedSolution[] = [
	{
		slug: 'car-parking-shades',
		title: 'Car Parking Shades',
		status: 'published',
		eyebrow: 'Homes to shopping centres',
		summary:
			'Cantilever and post-supported car park shades that keep vehicles out of direct sun and rain, at home or at work.',
		body: [
			'Car park shades cover parked vehicles at homes, offices and other sites where people park, keeping them out of direct sun and rain.',
			'Each shade is designed around the space it covers, from a single-car carport to rows of commercial bays. Cantilever designs keep posts to one side of the bay; post-supported designs suit wider areas.',
			'Covers are available in shade mesh, waterproof PVC membrane or metal roofing, in a choice of colours.'
		],
		features: [
			'Cantilever and post-supported designs',
			'Shade mesh, PVC membrane or metal roof',
			'Choice of fabric colours',
			'Designed for the site'
		],
		applications: ['Homes', 'Offices', 'Shopping centres', 'Schools', 'Hotels'],
		sectors: ['residential', 'commercial', 'institutional'],
		quoteMaterials: ['mesh', 'pvc', 'metal'],
		aliases: ['car shades', 'carports', 'car parking shades'],
		photo: 'carport-landcruiser-green',
		photoAlt: 'Green car park shade over a white SUV at a home'
	},
	{
		slug: 'shade-sails',
		title: 'Shade Sails',
		status: 'published',
		eyebrow: 'Patios, pools & play areas',
		summary: 'Tensioned fabric sails that shade patios, terraces, play areas and gardens.',
		body: [
			'Shade sails are tensioned fabric panels, often layered at different heights. They shade terraces, play equipment and gardens while leaving the sides open to the air.',
			'Choose breathable shade fabric for airflow, or waterproof material where you also need protection from rain.'
		],
		features: [
			'Breathable or waterproof fabrics',
			'Choice of colours',
			'Layered, custom shapes',
			'Tensioned fabric panels'
		],
		applications: ['Homes', 'Hotels & restaurants', 'Schools', 'Pools'],
		sectors: ['residential', 'commercial', 'institutional'],
		quoteMaterials: ['mesh'],
		aliases: ['shade sails'],
		photo: 'sails-hotel-balcony',
		photoAlt: 'Layered shade sails over a hotel terrace'
	},
	{
		slug: 'canopies',
		title: 'Canopies',
		status: 'published',
		eyebrow: 'Entrances & walkways',
		summary:
			'Entrance canopies and covered walkways that shade people as they arrive, wait or move between buildings.',
		body: [
			'A canopy shades an entrance, walkway or seating area. With a waterproof PVC cover, it also keeps people dry when it rains.',
			'We design canopies to suit the building, with a choice of shapes, fabrics and colours.'
		],
		features: [
			'Shade from direct sun',
			'Waterproof PVC options',
			'Shapes and colours to suit the building',
			'Design and installation'
		],
		applications: ['Shop and office entrances', 'Walkways', 'Restaurants', 'Schools'],
		sectors: ['commercial', 'institutional'],
		quoteMaterials: ['pvc'],
		photo: 'canopy-red-entrance',
		photoAlt: 'Red fabric canopies over a building entrance'
	},
	{ slug: 'awnings', title: 'Awnings', status: 'planned' },
	{ slug: 'pergolas-gazebos', title: 'Pergolas & Gazebos', status: 'planned' },
	{
		slug: 'tensile-custom-structures',
		title: 'Tensile & Custom Structures',
		status: 'published',
		eyebrow: 'Architectural shade',
		summary:
			'Fabric held in tension to form curved structures over carports, courtyards and commercial spaces.',
		body: [
			'Tensile membrane structures use fabric stretched in tension to create curved forms. They are used over entrances, courtyards and carports.',
			'Designs can include decorative panels and integrated lighting.'
		],
		features: [
			'Curved, architectural forms',
			'Decorative panels and lighting options',
			'Waterproof PVC membranes',
			'Designed for the site'
		],
		applications: ['Homes', 'Courtyards', 'Hotels', 'Commercial entrances'],
		sectors: ['residential', 'commercial'],
		quoteMaterials: ['pvc'],
		photo: 'carport-decorative-night',
		photoAlt: 'Illuminated membrane carport with decorative laser-cut panels at night'
	},
	{ slug: 'screen-fencing', title: 'Screen Fencing', status: 'planned', aliases: ['screen fence'] },
	{
		slug: 'parasols',
		title: 'Parasols',
		status: 'published',
		eyebrow: 'Hospitality & outdoor seating',
		summary: 'Parasols that shade outdoor seating at restaurants, hotels and gardens.',
		body: [
			'Parasols shade individual tables and seating areas for outdoor dining, poolsides and gardens.'
		],
		features: ['Choice of sizes', 'Choice of colours'],
		applications: ['Restaurants', 'Hotels', 'Gardens', 'Poolsides'],
		sectors: ['residential', 'commercial'],
		photo: 'parasol-yellow',
		photoAlt: 'Yellow parasols shading outdoor restaurant seating'
	},
	{
		// Legacy: pool shades are an application, not a top-level solution. The page
		// stays live, unlisted, until the owner decides where it goes (Phase C5 map).
		slug: 'pool-shades',
		title: 'Pool Shades',
		status: 'legacy',
		eyebrow: 'Poolside comfort',
		summary:
			'Shade structures over and around pools that keep swimmers and poolside seating out of direct sun.',
		body: [
			'A shade structure over or beside a pool shades the water and the seating around it from direct sun.'
		],
		features: [
			'Shade over the water and poolside',
			'Sails or fixed structures',
			'Choice of colours'
		],
		applications: ['Homes', 'Hotels', 'Clubs', 'Schools'],
		sectors: ['residential', 'commercial', 'institutional'],
		photo: 'sails-pool-garden',
		photoAlt: 'Shade sails over a garden beside a swimming pool'
	}
];
