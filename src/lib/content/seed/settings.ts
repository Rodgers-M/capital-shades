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
		'Capital Shades designs and installs custom car park shades, shade sails, canopies and tensile membrane structures in Kenya.',
	// Facebook and the current contact page list 0722 765 397; the current site header lists 0708 559 059.
	phones: [
		{ display: '0722 765 397', number: '254722765397' },
		{ display: '0708 559 059', number: '254708559059' }
	],
	// TODO(owner): provisional — 0722 765 397 is on Facebook, the contact page and the carport sign.
	primaryPhone: { display: '0722 765 397', number: '254722765397' },
	// TODO(owner): confirm which number is on WhatsApp (Facebook shows a WhatsApp button).
	whatsapp: { display: '0722 765 397', number: '254722765397' },
	email: 'info@capitalshades.co.ke',
	// Unconfirmed details stay null/empty so nothing is published until the owner confirms it.
	// TODO(owner): confirm the location (the old site never stated one).
	location: null,
	address: null,
	hours: null,
	facebookUrl: 'https://www.facebook.com/capitalshades/',
	instagramUrl: null,
	linkedinUrl: null,
	googleMapsUrl: null,
	serviceAreas: [],
	// Facebook shows "100% recommend" (97 reviews, Sept 2026); the site avoids counts that go stale
	facebookReviewsUrl: 'https://www.facebook.com/capitalshades/reviews',
	// Capabilities from the current site — no figures that need updating.
	// "In-house" and "Any size" were removed as unverified claims (Phase B1).
	stats: [
		{ value: 'Mesh or PVC', label: 'Breathable or 100% waterproof' },
		{ value: 'Site visit', label: 'Evaluation & measurement' }
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
