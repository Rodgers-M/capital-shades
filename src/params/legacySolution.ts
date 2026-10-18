import type { ParamMatcher } from '@sveltejs/kit';
import { LEGACY_SOLUTION_SLUGS } from '$lib/content/solutionTypes';

/** Solution slugs renamed in the C5 migration; the route redirects them. */
export const match: ParamMatcher = (param) => Object.hasOwn(LEGACY_SOLUTION_SLUGS, param);
