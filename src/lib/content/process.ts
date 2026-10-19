/**
 * The confirmed project process (docs/decisions.md — "Project process"), its
 * eleven internal stages grouped into the four customers see. Shared by the
 * home page (ProcessStrip) and About (ProcessSection), which add their own
 * detail per stage.
 */
export const PROCESS_HEADING = 'From first enquiry to after-sales support.';

export const PROCESS_STAGES = [
	'Tell us about the project',
	'Site visit and measurements',
	'Design, quotation and fabrication',
	'Installation, handover and support'
] as const;

/** Detail lines per stage, in PROCESS_STAGES order. */
export type StageDetail = readonly [string, string, string, string];

export const withStageTitles = (detail: StageDetail): { title: string; text: string }[] =>
	PROCESS_STAGES.map((title, i) => ({ title, text: detail[i] }));
