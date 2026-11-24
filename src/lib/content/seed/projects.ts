import type { Sector } from '../types';

export interface SeedProject {
	slug: string;
	title: string;
	/** Solution slugs, main one first */
	solutions: string[];
	sector: Sector;
	photo: string;
	photoAlt: string;
	featured?: boolean;
	/** Only set once confirmed by the owner — never guessed. Location stays general, never an address */
	location?: string;
	material?: string;
	completionYear?: number;
	scope?: string;
}

/*
 * One entry per installation, from the owner's own uploads on the current
 * site (Feb 2023 and Nov 2025 "Recent Projects") and photos sent in Nov 2026;
 * duplicates removed. Titles describe what the photo shows, and no two match:
 * each is a page title in search results. Location, material, completion year
 * and scope are left empty until the owner confirms them.
 */
export const projects: SeedProject[] = [
	{
		slug: 'cantilever-carport-signboard',
		title: 'Cantilever carport with a Capital Shades sign',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carpark-signboard',
		photoAlt: 'Dark cantilever carport over a silver car with a Capital Shades sign',
		featured: true
	},
	{
		slug: 'decorative-membrane-carport',
		title: 'Decorative membrane carport with lighting',
		solutions: ['tensile-custom-structures'],
		sector: 'residential',
		photo: 'carport-decorative-night',
		photoAlt: 'Illuminated membrane carport with decorative laser-cut panels at night',
		featured: true
	},
	{
		slug: 'green-cantilever-driveway',
		title: 'Cantilever shade over a driveway',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'cantilever-hero',
		photoAlt: 'Green cantilever shade covering a paved driveway',
		featured: true
	},
	{
		slug: 'hotel-terrace-sails',
		title: 'Layered shade sails on a hotel terrace',
		solutions: ['shade-sails'],
		sector: 'commercial',
		photo: 'sails-hotel-balcony',
		photoAlt: 'Layered shade sails over a hotel terrace',
		featured: true
	},
	{
		slug: 'office-car-park-blue',
		title: 'Office car parking shades',
		solutions: ['car-parking-shades'],
		sector: 'commercial',
		photo: 'carpark-office-blue',
		photoAlt: 'Blue car parking shades in front of an office building',
		featured: true
	},
	{
		slug: 'beige-membrane-carport',
		title: 'Membrane carport for two cars',
		solutions: ['tensile-custom-structures'],
		sector: 'residential',
		photo: 'membrane-beige-carport',
		photoAlt: 'Beige curved membrane carport over two cars in a paved compound',
		featured: true
	},
	{
		slug: 'decorative-panel-carport-green',
		title: 'Carport with decorative panels',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-decorative-green',
		photoAlt: 'Green carport frame with laser-cut decorative end panels'
	},
	{
		slug: 'decorative-panel-carport-dark',
		title: 'Curved carport with decorative panels',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-decorative-dark',
		photoAlt: 'Dark curved carport with decorative end panels in a landscaped garden'
	},
	{
		slug: 'cantilever-carport-brown',
		title: 'Brown cantilever carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-cantilever-brown',
		photoAlt: 'Brown cantilever carport over a red car'
	},
	{
		slug: 'arched-carport-columns',
		title: 'Arched carport between columns',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-columns-green',
		photoAlt: 'Green arched carport over two black cars beside white columns'
	},
	{
		slug: 'green-carport-land-cruiser',
		title: 'Green residential carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-landcruiser-green',
		photoAlt: 'Green car parking shade over a white SUV at a home'
	},
	{
		slug: 'green-cantilever-suv',
		title: 'Green cantilever carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carpark-residential-green',
		photoAlt: 'Green cantilever carport over a white SUV'
	},
	{
		slug: 'hip-roof-carport-green',
		title: 'Hip-roof carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-hip-green',
		photoAlt: 'Green hip-roof carport over a white car at a home'
	},
	{
		slug: 'pergola-structure',
		title: 'Pergola structure (in progress)',
		solutions: ['pergolas-gazebos'],
		sector: 'residential',
		photo: 'pergola-in-progress',
		photoAlt: 'Pergola frame with slatted roof being installed in a garden'
	},
	{
		slug: 'business-cantilever-van',
		title: 'Business parking shade',
		solutions: ['car-parking-shades'],
		sector: 'commercial',
		photo: 'carpark-commercial-van',
		photoAlt: 'Dark cantilever shade over a company van'
	},
	{
		slug: 'teal-carport-home',
		title: 'Teal residential carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-teal-house',
		photoAlt: 'Teal carport over a car in a landscaped driveway'
	},
	{
		slug: 'dark-cantilever-suv',
		title: 'Dark cantilever carport over an SUV',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-dark-white-suv',
		photoAlt: 'Dark cantilever carport over a white SUV'
	},
	{
		slug: 'dark-cantilever-garden',
		title: 'Dark cantilever carport beside a garden',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-dark-silver',
		photoAlt: 'Dark cantilever carport over a silver car beside a garden'
	},
	{
		slug: 'green-carport-compound',
		title: 'Compound carport',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-green-compound',
		photoAlt: 'Green curved carport in a walled compound'
	},
	{
		slug: 'blue-cantilever-car-park',
		title: 'Commercial car parking shade',
		solutions: ['car-parking-shades'],
		sector: 'commercial',
		photo: 'carpark-blue-cantilever',
		photoAlt: 'Blue cantilever shade over a car in a commercial car park'
	},
	{
		slug: 'blue-shades-parking-lot',
		title: 'Parking lot shades',
		solutions: ['car-parking-shades'],
		sector: 'commercial',
		photo: 'carpark-blue-lot',
		photoAlt: 'Blue shades over bays in a paved parking lot'
	},
	{
		slug: 'retail-frontage-shades',
		title: 'Retail frontage parking',
		solutions: ['car-parking-shades'],
		sector: 'commercial',
		photo: 'carpark-retail-blue',
		photoAlt: 'Blue car parking shade in front of shops'
	},
	{
		slug: 'decorative-lace-panel-carport',
		title: 'Curved carport with a lace-pattern end panel',
		solutions: ['car-parking-shades'],
		sector: 'residential',
		photo: 'carport-decorative-lace',
		photoAlt: 'Dark green curved carport with a laser-cut lace-pattern end panel beside a lawn'
	},
	{
		slug: 'pergola-timber-porch',
		title: 'Timber pergola over a front porch',
		solutions: ['pergolas-gazebos'],
		sector: 'residential',
		photo: 'pergola-timber-porch',
		photoAlt: 'Dark timber pergola on stone-clad columns over a patio'
	},
	{
		slug: 'pergola-fabric-terrace',
		title: 'Fabric-roofed pergola over a tiled terrace',
		solutions: ['pergolas-gazebos'],
		sector: 'residential',
		photo: 'pergola-fabric-terrace',
		photoAlt: 'Pergola with tan fabric panels between dark steel rafters over a tiled terrace'
	},
	{
		slug: 'pergola-timber-deck',
		title: 'Pergola over a raised deck',
		solutions: ['pergolas-gazebos'],
		sector: 'residential',
		photo: 'pergola-timber-deck',
		photoAlt: 'Timber pergola over a raised deck on a stone-clad base'
	},
	{
		slug: 'awning-red-balcony',
		title: 'Red balcony awning',
		solutions: ['awnings'],
		sector: 'residential',
		photo: 'awning-red-balcony',
		photoAlt: 'Red fabric awning over a first-floor balcony'
	},
	{
		slug: 'awning-canvas-walkway',
		title: 'Canvas awning over a side walkway',
		solutions: ['awnings'],
		sector: 'commercial',
		photo: 'awning-canvas-walkway',
		photoAlt: 'Grey canvas awning on a steel frame over a paved walkway'
	},
	{
		slug: 'awning-side-passage',
		title: 'Fabric awning along a side passage',
		solutions: ['awnings'],
		sector: 'residential',
		photo: 'awning-side-passage',
		photoAlt: 'Beige fabric awning on wall brackets along a narrow garden passage'
	},
	{
		slug: 'screen-fence-pool-courtyard',
		title: 'Screen fencing around a pool courtyard',
		solutions: ['screen-fencing'],
		sector: 'residential',
		photo: 'screen-fence-pool-courtyard',
		photoAlt: 'Beige screen fencing above the walls of a courtyard with a swimming pool'
	},
	{
		slug: 'screen-fence-boundary-wall',
		title: 'Screen fencing on a roadside boundary wall',
		solutions: ['screen-fencing'],
		sector: 'commercial',
		photo: 'screen-fence-boundary-wall',
		photoAlt: 'Dark screen fencing along the top of a long roadside boundary wall'
	},
	{
		slug: 'screen-fence-green-garden',
		title: 'Green screen fencing behind a garden',
		solutions: ['screen-fencing'],
		sector: 'residential',
		photo: 'screen-fence-green-garden',
		photoAlt: 'Green screen fencing above a boundary wall behind young palms'
	},
	{
		slug: 'screen-fence-blue',
		title: 'Blue screen fencing',
		solutions: ['screen-fencing'],
		sector: 'residential',
		photo: 'screen-fence-blue',
		photoAlt: 'Long run of blue screen fencing along a boundary'
	},
	{
		slug: 'sails-restaurant-frontage',
		title: 'Shade sails over restaurant seating',
		solutions: ['shade-sails'],
		sector: 'commercial',
		photo: 'sails-restaurant-frontage',
		photoAlt: 'Shade sails on curved posts over the seating in front of a restaurant'
	},
	{
		slug: 'sail-office-terrace',
		title: 'Shade sail over an office terrace',
		solutions: ['shade-sails'],
		sector: 'commercial',
		photo: 'sail-office-terrace',
		photoAlt: 'Brown shade sail over a paved terrace beside an office building'
	},
	{
		slug: 'tensile-poolside-terrace',
		title: 'Tensile shade over a poolside terrace',
		solutions: ['tensile-custom-structures'],
		sector: 'commercial',
		photo: 'tensile-poolside-terrace',
		photoAlt: 'Grey tensile membrane on steel masts over a poolside dining terrace'
	},
	{
		slug: 'tensile-rooftop-membrane',
		title: 'Rooftop membrane roof (in progress)',
		solutions: ['tensile-custom-structures'],
		sector: 'commercial',
		photo: 'tensile-rooftop-membrane',
		photoAlt: 'Orange fabric membrane along the edge of an open rooftop beside a steel roof frame'
	},
	{
		slug: 'membrane-curved-poolside',
		title: 'Curved membrane canopy by a pool',
		solutions: ['tensile-custom-structures'],
		sector: 'residential',
		photo: 'membrane-curved-poolside',
		photoAlt: 'Cream curved membrane canopy on dark steel arches beside a pool'
	},
	{
		slug: 'membrane-terrace-seating',
		title: 'Membrane cover over a terrace lounge',
		solutions: ['tensile-custom-structures'],
		sector: 'commercial',
		photo: 'membrane-terrace-seating',
		photoAlt: 'Cream membrane cover with pendant lights over a long terrace with built-in seating'
	},
	{
		slug: 'canopy-blue-walkway',
		title: 'Walkway canopy at an office building',
		solutions: ['canopies'],
		sector: 'commercial',
		photo: 'canopy-blue-walkway',
		photoAlt: 'Blue fabric canopy over the walkway along an office building'
	},
	{
		slug: 'canopy-blue-shopfront',
		title: 'Shopfront canopy',
		solutions: ['canopies'],
		sector: 'commercial',
		photo: 'canopy-blue-shopfront',
		photoAlt: 'Blue fabric canopy along a row of shopfronts'
	},
	{
		slug: 'canopy-beige-frames',
		title: 'Fabric canopies on steel frames',
		solutions: ['canopies'],
		sector: 'commercial',
		photo: 'canopy-beige-frames',
		photoAlt: 'Beige fabric canopies on dark steel frames along a building'
	}
];
