// CI: no AI attribution in any commit message of a range (a PR's commits),
// for commits made outside the agent's hook (by hand, the GitHub web editor).
// The arguments go to `git log`:
//   node scripts/check-commit-messages.mjs origin/main..HEAD
import { execFileSync } from 'node:child_process';
import { AI_ATTRIBUTION } from './repo-rules.mjs';

const log = execFileSync('git', ['log', '--format=%h%x00%B%x00', ...process.argv.slice(2)], {
	encoding: 'utf8'
}).split('\0');
const bad = [];
for (let i = 0; i + 1 < log.length; i += 2) {
	if (AI_ATTRIBUTION.test(log[i + 1])) bad.push(log[i].trim());
}
if (bad.length) {
	console.error(
		`These commits carry AI attribution; reword them without the AI Co-Authored-By trailer or "Generated with" line: ${bad.join(', ')}`
	);
	process.exit(1);
}
