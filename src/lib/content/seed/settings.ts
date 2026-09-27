import type { SiteSettings } from '../types';

/**
 * Seed settings, used until Sanity is connected.
 * Only facts found on the current site or the company Facebook page — see
 * docs/content-to-confirm.md for what still needs the owner's confirmation.
 */
export const settings: SiteSettings = {
	name: 'Capital Shades',
	legalName: 'Capital Shades E.A Ltd',
	tagline: 'The coolest solutions under the sun.',
	description:
		'Capital Shades designs, fabricates and installs custom car park shades, shade sails, canopies and tensile membrane structures in Kenya.',
	// Facebook and the current contact page list 0722 765 397; the current site header lists 0708 559 059.
	phones: [
		{ display: '0722 765 397', number: '254722765397' },
		{ display: '0708 559 059', number: '254708559059' }
	],
	// TODO(owner): confirm which number is on WhatsApp (Facebook shows a WhatsApp button).
	whatsapp: { display: '0722 765 397', number: '254722765397' },
	email: 'info@capitalshades.co.ke',
	location: 'Nairobi, Kenya',
	hours: null,
	facebookUrl: 'https://www.facebook.com/capitalshades/',
	facebookReviews: { percent: 100, count: 97 },
	stats: [
		{ value: '100%', label: 'Recommend us on Facebook' },
		{ value: '97', label: 'Facebook reviews' },
		{ value: '15K', label: 'Facebook followers' },
		{ value: 'In-house', label: 'Design, fabrication & install' }
	],
	sectors: [
		{
			title: 'Homes',
			text: 'Carports, patios and gardens — in heavy-duty shade fabric or 100% waterproof PVC membrane.'
		},
		{
			title: 'Businesses',
			text: 'Our technicians design and install a structure suited to your site and how it is used.'
		},
		{
			title: 'Shopping centres',
			text: 'Covered parking and walkways that keep an open, spacious feel while shading shoppers.'
		},
		{
			title: 'Schools',
			text: 'Shade sails and structures that cover play equipment, walkways and parking.'
		},
		{
			title: 'Sports centres',
			text: 'Shade lowers ambient temperature and blocks direct sun, making outdoor activity more comfortable.'
		},
		{
			title: 'Government buildings',
			text: 'A wide range of options, colours, fabrics and styles to match the finished look you need.'
		}
	]
};
