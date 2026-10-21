import { redirect } from '@sveltejs/kit';
import { PROJECTS_HREF } from '$lib/nav';

// Old WordPress portfolio items. All eight were the theme's demo entries ("Investment
// Planning", "Enterprise Loan"…), not Capital Shades work, so none has a matching project:
// each, and the archive, goes to the portfolio (mapping: docs/implementation.md, Phase C7)
export const prerender = false;
// Old WordPress links end in a slash: answer it here, so there is no slash-stripping hop first
export const trailingSlash = 'ignore';
export const GET = () => redirect(301, PROJECTS_HREF);
