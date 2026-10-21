import { SECTORS } from '../../src/lib/content/sectors';

/** The canonical sectors, as Studio list options. */
export const SECTOR_OPTIONS = SECTORS.map(({ id, label }) => ({ title: label, value: id }));
