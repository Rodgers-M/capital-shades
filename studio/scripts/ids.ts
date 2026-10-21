/** Fixed document IDs, shared by import-seed.ts and migrate-solutions.ts so both address the same documents. */
export const solutionId = (slug: string): string => `solution-${slug}`;

/** A valid LexoRank for list position `index`, so drag-to-reorder works from the start. */
export const orderRank = (index: number): string =>
	`0|${String((index + 1) * 100000).padStart(6, '0')}:`;
