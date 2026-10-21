#!/usr/bin/env node
// PreToolUse hook for Bash: enforces the Git rules in AGENTS.md (and a few
// destructive commands) that permission patterns can't express. Exit code 2
// blocks the command and shows the reason to the agent. It reads commands
// the way a person would, not like a shell: quoted text and heredoc bodies
// are ignored when deciding what runs, so a commit message mentioning "push
// to main" is fine. CI re-checks commit messages on every PR.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
	ATTRIBUTION,
	currentBranch,
	PROTECTED_BRANCHES as PROTECTED
} from '../../scripts/repo-rules.mjs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const raw = input.tool_input?.command ?? '';
const cwd = input.cwd ?? process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

const block = (reason) => {
	console.error(reason);
	process.exit(2);
};

/** The command with heredoc bodies and quoted text blanked. One left-to-right
 *  pass, so an apostrophe inside "..." (`"don't"`) doesn't pair with a later
 *  single quote and hide the commands between them. */
function blankQuotes(text) {
	let out = '';
	let quote = null;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (quote === null) {
			out += ch;
			if (ch === "'" || ch === '"') quote = ch;
		} else if (quote === '"' && ch === '\\') {
			i++; // an escaped character inside double quotes
		} else if (ch === quote) {
			quote = null;
			out += ch;
		}
	}
	return out;
}
const code = blankQuotes(
	raw.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\b/g, '<<HEREDOC')
);
const segments = code.split(/&&|\|\||;|\||\n/).map((s) => s.trim().split(/\s+/).filter(Boolean));

/** A segment's git subcommand, its arguments and the -C directory, or null. */
function parseGit(tokens) {
	let i = 0;
	while (i < tokens.length && /^\w+=/.test(tokens[i])) i++; // FOO=bar git ...
	if (tokens[i] !== 'git') return null;
	i++;
	let dir = cwd;
	while (i < tokens.length && tokens[i].startsWith('-')) {
		if (tokens[i] === '-C') dir = path.resolve(dir, tokens[++i] ?? '');
		else if (tokens[i] === '-c') i++;
		i++;
	}
	return { sub: tokens[i], args: tokens.slice(i + 1), dir };
}

// A branch switched to earlier in the same command line.
let switchedTo = null;

for (const tokens of segments) {
	// rm with recursive and force, in any spelling.
	if (tokens[0] === 'rm' || (tokens[0] === 'sudo' && tokens[1] === 'rm')) {
		const flags = tokens.filter((t) => t.startsWith('-'));
		const recursive = flags.some((f) => f === '--recursive' || /^-[a-zA-Z]*[rR]/.test(f));
		const force = flags.some((f) => f === '--force' || /^-[a-zA-Z]*f/.test(f));
		if (recursive && force) {
			block(
				'No recursive force deletes (rm -rf and its variants). Ask the user, or delete specific files.'
			);
		}
	}

	const git = parseGit(tokens);
	if (!git) continue;
	const { sub, args, dir } = git;

	// `git checkout <ref> -- <path>` restores files and stays on the branch;
	// `checkout -` goes back to a branch we can't name here, so the guard
	// asks git (currentBranch) instead of guessing.
	if ((sub === 'checkout' || sub === 'switch') && !args.includes('--')) {
		const target = args.find((a) => !a.startsWith('-') || a === '-');
		if (target === '-') switchedTo = null;
		else if (target) switchedTo = target;
	}

	if (['commit', 'merge', 'cherry-pick', 'revert', 'am'].includes(sub)) {
		// The message is in the raw command (-m, or a heredoc for -F -) or in a
		// file passed with -F / --file.
		if (sub === 'commit') {
			let message = raw;
			const fileArg = args.findIndex((a) => a === '-F' || a === '--file');
			const file =
				fileArg >= 0 ? args[fileArg + 1] : args.find((a) => a.startsWith('--file='))?.slice(7);
			if (file && file !== '-') {
				const abs = path.resolve(dir, file);
				if (existsSync(abs)) message += readFileSync(abs, 'utf8');
			}
			if (ATTRIBUTION.test(message)) {
				block(
					'Commit messages carry no AI attribution: remove the Co-Authored-By trailer and any "Generated with" line (AGENTS.md, Git).'
				);
			}
		}
		const branch = switchedTo ?? currentBranch(dir);
		if (PROTECTED.has(branch)) {
			block(
				`Never commit on ${branch} (git ${sub}). Create a feature branch first (AGENTS.md, Git).`
			);
		}
	}

	if (sub === 'push') {
		const flags = args.filter((a) => a.startsWith('-'));
		if (
			flags.some(
				(f) => /^--force/.test(f) || f === '--mirror' || /^-[a-zA-Z]*f[a-zA-Z]*$/.test(f)
			) ||
			args.some((a) => a.startsWith('+'))
		) {
			block('No force pushes. Ask the user if history really has to be rewritten.');
		}
		if (flags.includes('--all')) {
			block("Don't push every branch at once; push the feature branch.");
		}
		// No refspec, or HEAD, pushes the current branch.
		const branch = switchedTo ?? currentBranch(dir);
		const refspecs = args.filter((a) => !a.startsWith('-')).slice(1);
		const targets = (refspecs.length ? refspecs : ['HEAD']).map((r) => {
			const dest = r
				.split(':')
				.pop()
				.replace(/^refs\/heads\//, '');
			return dest === 'HEAD' ? branch : dest;
		});
		if (targets.some((t) => PROTECTED.has(t))) {
			block('Never push to main directly; push the feature branch and open a PR.');
		}
	}
}
