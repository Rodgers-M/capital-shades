export interface SeedProduct {
	slug: string;
	title: string;
	eyebrow: string;
	summary: string;
	body: string[];
	features: string[];
	applications: string[];
	photo: string;
	photoAlt: string;
}

/*
 * The six product lines on the current site, rewritten from its copy.
 * Features stick to what the current site claims (fabric colours, waterproofing,
 * UV protection, mesh/PVC/metal roof options, custom design, installation).
 */
export const products: SeedProduct[] = [
	{
		slug: 'car-park-shades',
		title: 'Car Park Shades',
		eyebrow: 'Homes to shopping centres',
		summary:
			'Cantilever, residential and commercial car park shades that protect vehicles from sun, heat, rain and hail.',
		body: [
			'Nothing is more frustrating than watching the sun fade your paintwork or hail dent your car because there was no covered parking. Our car park shades protect vehicles at home, at work and wherever your customers park.',
			'Regardless of how large, small or irregularly shaped your car park is, we design a shade to fit it — from a single-car carport to long rows of commercial bays. Choose cantilever designs for post-free access, or standard designs for economical coverage of large areas.',
			'Covers are available in heavy-duty shade mesh, 100% waterproof PVC membrane or metal roofing, in a wide range of colours.'
		],
		features: [
			'Cantilever and post-supported designs',
			'Shade mesh, PVC membrane or metal roof',
			'Wide range of fabric colours',
			'Custom-designed for your site'
		],
		applications: ['Homes', 'Offices', 'Shopping centres', 'Schools', 'Hotels'],
		photo: 'carport-landcruiser-green',
		photoAlt: 'Green car park shade over a white SUV at a home in Nairobi'
	},
	{
		slug: 'shade-sails',
		title: 'Shade Sails',
		eyebrow: 'Patios, pools & play areas',
		summary:
			'Tensioned fabric sails that shade patios, terraces, play areas and gardens with a light, modern look.',
		body: [
			'Our sails are designed to do more than keep off the sun. Layered sails create generous shade over terraces, play equipment and gardens, while the open design keeps the space airy.',
			'Choose breathable shade fabric for airflow, or waterproof material where you also need protection from rain.'
		],
		features: [
			'Breathable or waterproof fabrics',
			'Wide range of colours',
			'Layered, custom shapes',
			'Professionally tensioned'
		],
		applications: ['Homes', 'Hotels & restaurants', 'Schools', 'Pools'],
		photo: 'sails-hotel-balcony',
		photoAlt: 'Layered shade sails over a hotel terrace'
	},
	{
		slug: 'canopies',
		title: 'Canopies',
		eyebrow: 'Entrances & walkways',
		summary:
			'Entrance canopies and covered walkways that keep people shaded and dry and give your frontage a distinctive look.',
		body: [
			'A canopy over an entrance, walkway or seating area makes every visit more comfortable. Our canopies block the harsh sun and — in waterproof PVC — keep people dry in the rains.',
			'We design canopies to suit the building, with a choice of shapes, fabrics and colours.'
		],
		features: [
			'High UV protection',
			'Waterproof PVC options',
			'Shapes and colours to suit your building',
			'Designed and installed by our team'
		],
		applications: ['Shop and office entrances', 'Walkways', 'Restaurants', 'Schools'],
		photo: 'canopy-red-entrance',
		photoAlt: 'Red fabric canopies over a building entrance'
	},
	{
		slug: 'tensile-membrane-structures',
		title: 'Tensile Membrane Structures',
		eyebrow: 'Architectural shade',
		summary:
			'Fabric held in tension to create striking, curved structures for carports, courtyards and commercial spaces.',
		body: [
			'Tensile membrane structures use fabric stretched in tension to create curved, architectural forms. They make a statement at entrances and courtyards and turn a carport into a feature of the property.',
			'Our membrane structures can include decorative panels and integrated lighting, so they look as good at night as they do in the day.'
		],
		features: [
			'Curved, architectural forms',
			'Decorative panels and lighting options',
			'Waterproof PVC membranes',
			'Custom design for every site'
		],
		applications: ['Homes', 'Courtyards', 'Hotels', 'Commercial entrances'],
		photo: 'carport-decorative-night',
		photoAlt: 'Illuminated membrane carport with decorative laser-cut panels at night'
	},
	{
		slug: 'parasols',
		title: 'Parasols',
		eyebrow: 'Hospitality & outdoor seating',
		summary:
			'Durable parasols that bring shade and style to restaurants, hotels, gardens and outdoor seating.',
		body: [
			'We pride ourselves on offering customers strong value on price, quality and durability. Our parasols provide shade and aesthetic appeal for outdoor dining, poolsides and gardens across Kenya.'
		],
		features: ['Durable frames and fabrics', 'Range of sizes and colours', 'Good value for money'],
		applications: ['Restaurants', 'Hotels', 'Gardens', 'Poolsides'],
		photo: 'parasol-yellow',
		photoAlt: 'Yellow parasols shading outdoor restaurant seating'
	},
	{
		slug: 'pool-shades',
		title: 'Pool Shades',
		eyebrow: 'Poolside comfort',
		summary:
			'Shade structures over and around pools that protect swimmers from the sun and add style to the space.',
		body: [
			'A shade structure over a pool delivers more than UV protection and relief from the heat. Today’s shade structures are attractive additions in their own right, adding ambience and style to your pool area.'
		],
		features: ['UV protection for swimmers', 'Sails or fixed structures', 'Choice of colours'],
		applications: ['Homes', 'Hotels', 'Clubs', 'Schools'],
		photo: 'sails-pool-garden',
		photoAlt: 'Shade sails over a garden beside a swimming pool'
	}
];
