import type { Sector } from '../types';

export interface SeedProject {
	slug: string;
	title: string;
	product: string;
	sector: Sector;
	photo: string;
	photoAlt: string;
	featured?: boolean;
	/** Only set once confirmed by the owner — never guessed */
	location?: string;
	material?: string;
	completed?: string;
}

/*
 * One entry per installation, from the owner's own uploads on the current
 * site (Feb 2023 and Nov 2025 "Recent Projects"; duplicates removed).
 * Titles describe what the photo shows. Location, material and completion
 * date are left empty until the owner confirms them.
 */
export const projects: SeedProject[] = [
	{
		slug: 'cantilever-carport-signboard',
		title: 'Cantilever carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carpark-signboard',
		photoAlt: 'Dark cantilever carport over a silver car with a Capital Shades sign',
		featured: true
	},
	{
		slug: 'decorative-membrane-carport',
		title: 'Decorative membrane carport with lighting',
		product: 'tensile-membrane-structures',
		sector: 'residential',
		photo: 'carport-decorative-night',
		photoAlt: 'Illuminated membrane carport with decorative laser-cut panels at night',
		featured: true
	},
	{
		slug: 'green-cantilever-driveway',
		title: 'Cantilever shade over a driveway',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'cantilever-hero',
		photoAlt: 'Green cantilever shade covering a paved driveway',
		featured: true
	},
	{
		slug: 'hotel-terrace-sails',
		title: 'Layered shade sails on a hotel terrace',
		product: 'shade-sails',
		sector: 'commercial',
		photo: 'sails-hotel-balcony',
		photoAlt: 'Layered shade sails over a hotel terrace',
		featured: true
	},
	{
		slug: 'office-car-park-blue',
		title: 'Office car park shades',
		product: 'car-park-shades',
		sector: 'commercial',
		photo: 'carpark-office-blue',
		photoAlt: 'Blue car park shades in front of an office building',
		featured: true
	},
	{
		slug: 'beige-membrane-carport',
		title: 'Membrane carport for two cars',
		product: 'tensile-membrane-structures',
		sector: 'residential',
		photo: 'membrane-beige-carport',
		photoAlt: 'Beige curved membrane carport over two cars in a paved compound',
		featured: true
	},
	{
		slug: 'decorative-panel-carport-green',
		title: 'Carport with decorative panels',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-decorative-green',
		photoAlt: 'Green carport frame with laser-cut decorative end panels'
	},
	{
		slug: 'decorative-panel-carport-dark',
		title: 'Curved carport with decorative panels',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-decorative-dark',
		photoAlt: 'Dark curved carport with decorative end panels in a landscaped garden'
	},
	{
		slug: 'cantilever-carport-brown',
		title: 'Cantilever carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-cantilever-brown',
		photoAlt: 'Brown cantilever carport over a red car'
	},
	{
		slug: 'arched-carport-columns',
		title: 'Arched carport between columns',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-columns-green',
		photoAlt: 'Green arched carport over two black cars beside white columns'
	},
	{
		slug: 'green-carport-land-cruiser',
		title: 'Residential carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-landcruiser-green',
		photoAlt: 'Green car park shade over a white SUV at a home'
	},
	{
		slug: 'green-cantilever-suv',
		title: 'Cantilever carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carpark-residential-green',
		photoAlt: 'Green cantilever carport over a white SUV'
	},
	{
		slug: 'hip-roof-carport-green',
		title: 'Hip-roof carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-hip-green',
		photoAlt: 'Green hip-roof carport over a white car at a home'
	},
	{
		slug: 'pergola-structure',
		title: 'Pergola structure (in progress)',
		product: 'canopies',
		sector: 'residential',
		photo: 'pergola-in-progress',
		photoAlt: 'Pergola frame with slatted roof being installed in a garden'
	},
	{
		slug: 'business-cantilever-van',
		title: 'Business parking shade',
		product: 'car-park-shades',
		sector: 'commercial',
		photo: 'carpark-commercial-van',
		photoAlt: 'Dark cantilever shade over a company van'
	},
	{
		slug: 'teal-carport-home',
		title: 'Residential carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-teal-house',
		photoAlt: 'Teal carport over a car in a landscaped driveway'
	},
	{
		slug: 'dark-cantilever-suv',
		title: 'Cantilever carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-dark-white-suv',
		photoAlt: 'Dark cantilever carport over a white SUV'
	},
	{
		slug: 'dark-cantilever-garden',
		title: 'Cantilever carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-dark-silver',
		photoAlt: 'Dark cantilever carport over a silver car beside a garden'
	},
	{
		slug: 'green-carport-compound',
		title: 'Compound carport',
		product: 'car-park-shades',
		sector: 'residential',
		photo: 'carport-green-compound',
		photoAlt: 'Green curved carport in a walled compound'
	},
	{
		slug: 'blue-cantilever-car-park',
		title: 'Commercial car park shade',
		product: 'car-park-shades',
		sector: 'commercial',
		photo: 'carpark-blue-cantilever',
		photoAlt: 'Blue cantilever shade over a car in a commercial car park'
	},
	{
		slug: 'blue-shades-parking-lot',
		title: 'Parking lot shades',
		product: 'car-park-shades',
		sector: 'commercial',
		photo: 'carpark-blue-lot',
		photoAlt: 'Blue shades over bays in a paved parking lot'
	},
	{
		slug: 'retail-frontage-shades',
		title: 'Retail frontage parking',
		product: 'car-park-shades',
		sector: 'commercial',
		photo: 'carpark-retail-blue',
		photoAlt: 'Blue car park shade in front of shops'
	}
];
