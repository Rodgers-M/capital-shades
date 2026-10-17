#!/usr/bin/env node
// PostToolUse hook for Write/Edit/MultiEdit: formats the edited file with
// Prettier, then lints it with ESLint, so the agent sees rule breaks right
// after the edit instead of at the end. Formatting is applied in place; lint
// problems exit 2, which feeds the report back to the agent unfixed.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8'));
const file = input.tool_input?.file_path;
if (!file) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd();
const abs = path.resolve(root, file);
const rel = path.relative(root, abs);
// Files outside the repo (memory, plans, scratch) keep their own formatting.
if (rel === '' || rel.startsWith('..') || path.isAbsolute(rel) || !existsSync(abs)) {
	process.exit(0);
}

/** A package's own bin script, resolved from the repo root and run with this
 *  Node: node_modules/.bin is a shell script on macOS/Linux and a .cmd on
 *  Windows. Null when the package isn't installed yet. */
function bin(pkg, script) {
	try {
		const require = createRequire(path.join(root, 'package.json'));
		return path.join(path.dirname(require.resolve(`${pkg}/package.json`)), script);
	} catch {
		return null;
	}
}

// --ignore-unknown skips files Prettier can't format; .prettierignore is
// honoured for explicit paths.
const prettier = bin('prettier', 'bin/prettier.cjs');
if (prettier) {
	const result = spawnSync(
		process.execPath,
		[prettier, '--write', '--ignore-unknown', '--log-level', 'warn', abs],
		{ cwd: root, encoding: 'utf8' }
	);
	if (result.status !== 0) {
		console.error(`Prettier couldn't format ${rel} (usually a syntax error):\n${result.stderr}`);
		process.exit(2);
	}
}

// studio/ is a separate package without an ESLint config of its own.
if (!/\.(ts|js|mjs|cjs|svelte)$/.test(abs) || rel.startsWith(`studio${path.sep}`)) process.exit(0);
const eslint = bin('eslint', 'bin/eslint.js');
if (!eslint) process.exit(0);

const result = spawnSync(
	process.execPath,
	[eslint, '--max-warnings', '0', '--no-warn-ignored', abs],
	{
		cwd: root,
		encoding: 'utf8'
	}
);
if (result.status !== 0) {
	console.error(
		`ESLint found problems in ${rel}; fix them before moving on:\n${result.stdout}${result.stderr}`
	);
	process.exit(2);
}
