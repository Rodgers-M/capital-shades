// The Git rules in AGENTS.md that tools enforce, shared by the Claude Code
// hooks (.claude/hooks/) and CI (scripts/check-commit-messages.mjs) so they
// can't drift apart.
import { execFileSync } from 'node:child_process';

export const PROTECTED_BRANCHES = new Set(['main']);

const AI_LINES = /generated with \[?claude|claude\.com\/claude-code|noreply@anthropic\.com/i;

/** AI attribution in any commit: "Generated with" lines, and co-author
 *  trailers whose address belongs to an AI tool or AI bot account. Matched
 *  by address, not name, so a person's trailer is fine whatever they're
 *  called, and so are non-AI bots (dependabot, renovate). */
export const AI_ATTRIBUTION = new RegExp(
	`${AI_LINES.source}|co-authored-by:[^\\n]*<[^>]*(@anthropic\\.com|@openai\\.com|cursoragent@cursor\\.com|noreply@aider\\.chat|\\+copilot@users\\.noreply\\.github\\.com|\\+(copilot-swe-agent|devin-ai-integration|gemini-code-assist|cursor|claude)\\[bot\\]@users\\.noreply\\.github\\.com)>`,
	'i'
);

/** What the coding agent's commits may not contain (.claude/hooks/
 *  guard-bash.mjs): any co-author trailer, since the agent never adds one,
 *  plus the AI lines. People's commits use AI_ATTRIBUTION. */
export const ATTRIBUTION = new RegExp(`co-authored-by|${AI_LINES.source}`, 'i');

/** The checked-out branch, or "" on a detached HEAD. */
export function currentBranch(cwd) {
	try {
		return execFileSync('git', ['symbolic-ref', '--short', '-q', 'HEAD'], {
			cwd,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore']
		}).trim();
	} catch {
		return '';
	}
}
