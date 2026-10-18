import type { SiteSettings } from '../types';

/**
 * Seed settings, used until Sanity is connected and copied into it by the
 * Studio import. Only facts confirmed in docs/decisions.md or found on the
 * current site — see docs/content-to-confirm.md for what is still open.
 */
export const settings: SiteSettings = {
	name: 'Capital Shades',
	legalName: 'Capital Shades E.A Ltd',
	tagline: 'The coolest solutions under the sun.',
	description:
		'Capital Shades designs and installs custom car park shades, shade sails, canopies and tensile membrane structures in Kenya.',
	// Server-side only. 0708 559 059 is the old site's header number; it isn't shown publicly.
	phones: [
		{ display: '0722 765 397', number: '254722765397' },
		{ display: '0708 559 059', number: '254708559059' }
	],
	// Confirmed by the owner (docs/decisions.md — "Official contact details")
	primaryPhone: { display: '0722 765 397', number: '254722765397' },
	whatsapp: { display: '0722 765 397', number: '254722765397' },
	email: 'info@capitalshades.co.ke',
	// Unconfirmed details stay null/empty so nothing is published until the owner confirms it.
	// docs/decisions.md — "Geographic positioning": based in Nairobi, primary local market below.
	location: 'Nairobi',
	address: null,
	hours: null,
	facebookUrl: 'https://www.facebook.com/capitalshades/',
	instagramUrl: null,
	linkedinUrl: null,
	googleMapsUrl: null,
	serviceAreas: ['Nairobi', 'Kiambu County', 'Machakos County', 'Kajiado County'],
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
			text: 'Carports, patios and gardens — in shade mesh or waterproof PVC membrane.'
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
	],
	// Approved wording from docs/decisions.md; keep the warranty conditional until its scope is confirmed
	warrantyNote:
		'Selected structures are covered by warranties of up to 10 years. Final warranty terms are provided with the quotation and contract documents.',
	siteVisitNote:
		'Site visits within Nairobi and nearby areas may be provided at no cost, depending on location.',
	quoteNote:
		'Project details and site photos can help the team make an initial assessment. A final quotation follows the site visit and confirmed measurements.'
};
