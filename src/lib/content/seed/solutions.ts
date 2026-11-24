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
	/** Search-result title and description (docs/implementation.md, Phase C7 intent map) */
	seoTitle?: string;
	seoDescription?: string;
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
 * (Phase C1 review). Geography belongs only in the search fields, from the
 * confirmed Nairobi base and Kenya reach. Awnings, Pergolas & Gazebos and
 * Screen Fencing copy is drafted from the owner's project photos and still
 * awaits confirmation (docs/content-to-confirm.md).
 */
export const solutions: SeedSolution[] = [
	{
		slug: 'car-parking-shades',
		title: 'Car Parking Shades',
		status: 'published',
		eyebrow: 'Homes to shopping centres',
		summary:
			'Cantilever and post-supported car parking shades that keep vehicles out of direct sun and rain, at home or at work.',
		body: [
			'Car parking shades, often called car shades or carports, cover parked vehicles at homes, offices and other sites where people park, keeping them out of direct sun and rain.',
			'Each shade is designed around the space it covers, from a single-car carport to rows of commercial bays. Cantilever designs keep posts to one side of the bay; post-supported designs suit wider areas.',
			'Covers are available in shade mesh (often called shade net), waterproof PVC membrane or metal roofing, in a choice of colours.'
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
		photoAlt: 'Green car parking shade over a white SUV at a home',
		seoTitle: 'Car Parking Shades in Nairobi & Kenya',
		seoDescription:
			'Car parking shades and carports in shade net, waterproof PVC or metal roofing, designed and installed for homes and businesses in Nairobi and across Kenya.'
	},
	{
		slug: 'shade-sails',
		title: 'Shade Sails',
		status: 'published',
		eyebrow: 'Patios, pools & play areas',
		summary: 'Tensioned fabric sails that shade patios, terraces, play areas and gardens.',
		body: [
			'Shade sails are tensioned fabric panels, often layered at different heights. They shade terraces, poolsides, play equipment and gardens while leaving the sides open to the air.',
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
		photoAlt: 'Layered shade sails over a hotel terrace',
		seoTitle: 'Shade Sails in Nairobi & Kenya',
		seoDescription:
			'Shade sails for patios, gardens, pools, play areas and hotel terraces, designed and installed for homes, schools and businesses in Nairobi and across Kenya.'
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
		photo: 'canopy-blue-walkway',
		photoAlt: 'Blue fabric canopy over the walkway along an office building',
		seoTitle: 'Entrance & Walkway Canopies in Nairobi',
		seoDescription:
			'Entrance canopies and covered walkways for shops, offices, restaurants and schools, in waterproof PVC. Designed and installed in Nairobi and across Kenya.'
	},
	{
		slug: 'awnings',
		title: 'Awnings',
		status: 'published',
		eyebrow: 'Balconies, shopfronts & walkways',
		summary:
			'Fabric awnings fixed to the face of a building over windows, balconies, shopfronts and walkways.',
		body: [
			'An awning is a fabric cover fixed to the face of a building on wall brackets or a light steel frame. It covers windows, doorways, balconies and the walkway along a building.',
			'Each awning is sized to the wall it is fixed to, from a single balcony or window to the full length of a shopfront or side passage. Fabrics come in a range of colours to suit the building or a brand.'
		],
		features: [
			'Wall-mounted or framed designs',
			'Shade or waterproof fabrics',
			'Choice of fabric colours',
			'Sized to the wall it covers'
		],
		applications: ['Homes', 'Balconies', 'Shopfronts', 'Walkways'],
		sectors: ['residential', 'commercial'],
		photo: 'awning-red-balcony',
		photoAlt: 'Red fabric awning over a first-floor balcony',
		seoTitle: 'Awnings in Nairobi & Kenya',
		seoDescription:
			'Fabric awnings for balconies, windows, shopfronts and walkways, designed and installed for homes and businesses in Nairobi and across Kenya.'
	},
	{
		slug: 'pergolas-gazebos',
		title: 'Pergolas & Gazebos',
		status: 'published',
		eyebrow: 'Patios, decks & gardens',
		summary: 'Pergolas and gazebos that turn a patio, deck or garden into a shaded outdoor room.',
		body: [
			'A pergola is an open frame of posts and roof beams over a patio, deck, terrace or garden seating area. It can stand on its own or be fixed to the house. A gazebo is a free-standing roofed shelter, usually in a garden.',
			'The roof is chosen for how the space will be used: open slats, fabric panels between the rafters, or clear roofing panels.',
			'Frames are designed for the space, in steel or timber, and finished to suit the house.'
		],
		features: [
			'Free-standing or fixed to the house',
			'Slatted, fabric or clear roofs',
			'Steel and timber frames',
			'Designed for the space'
		],
		applications: ['Patios', 'Decks and balconies', 'Gardens'],
		sectors: ['residential'],
		aliases: ['pergolas', 'gazebos'],
		photo: 'pergola-timber-porch',
		photoAlt: 'Dark timber pergola on stone-clad columns over a patio',
		seoTitle: 'Pergolas & Gazebos in Nairobi & Kenya',
		seoDescription:
			'Pergolas and gazebos for patios, decks and gardens, with slatted or covered roofs on steel or timber frames. Designed and installed in Nairobi and across Kenya.'
	},
	{
		slug: 'tensile-custom-structures',
		title: 'Tensile & Custom Structures',
		status: 'published',
		eyebrow: 'Architectural shade',
		summary:
			'Fabric held in tension to form curved structures over carports, courtyards and commercial spaces.',
		body: [
			'Tensile structures use fabric stretched in tension to create curved forms, designed around the site. They are used over entrances, courtyards and carports.',
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
		photoAlt: 'Illuminated membrane carport with decorative laser-cut panels at night',
		seoTitle: 'Tensile Structures in Nairobi & Kenya',
		seoDescription:
			'Tensile fabric structures with curved PVC membranes over carports, courtyards and entrances, designed around each site. Based in Nairobi, working across Kenya.'
	},
	{
		slug: 'screen-fencing',
		title: 'Screen Fencing',
		status: 'published',
		eyebrow: 'Boundaries & privacy',
		summary:
			'Shade-net screening fixed along boundary walls and fences for privacy and to cut dust and wind.',
		body: [
			'Screen fencing is shade netting stretched on a steel frame, usually fixed on top of a boundary wall or along a fence line. It is used for privacy and as a dust screen along roads and neighbouring sites.',
			'Screens are made to the length and height of the boundary, in a range of colours: greens that blend with planting, or blues and neutrals that match the building.'
		],
		features: [
			'Privacy and dust screening',
			'Fixed on walls or fence lines',
			'Choice of netting colours',
			'Made to length and height'
		],
		applications: ['Homes', 'Gated compounds', 'Commercial premises'],
		sectors: ['residential', 'commercial'],
		aliases: ['screen fence', 'privacy screen fence', 'dust screen'],
		photo: 'screen-fence-pool-courtyard',
		photoAlt: 'Beige screen fencing above the walls of a courtyard with a swimming pool',
		seoTitle: 'Screen Fencing in Nairobi & Kenya',
		seoDescription:
			'Privacy and dust screen fencing in shade netting, fixed along boundary walls and fences for homes and businesses in Nairobi and across Kenya.'
	},
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
		photoAlt: 'Yellow parasols shading outdoor restaurant seating',
		seoTitle: 'Parasols for Restaurants, Hotels & Gardens',
		seoDescription:
			'Parasols that shade outdoor seating at restaurants, hotels, poolsides and gardens, from Capital Shades in Nairobi.'
	}
];
