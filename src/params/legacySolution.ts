import type { ParamMatcher } from '@sveltejs/kit';
import { LEGACY_SOLUTION_SLUGS } from '$lib/content/solutionTypes';

/** Retired solution slugs (LEGACY_SOLUTION_SLUGS); the route 301s them. */
export const match: ParamMatcher = (param) => Object.hasOwn(LEGACY_SOLUTION_SLUGS, param);
