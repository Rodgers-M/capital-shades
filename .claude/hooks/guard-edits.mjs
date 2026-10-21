#!/usr/bin/env node
// PreToolUse hook for Write/Edit/MultiEdit: refuses edits to generated files
// (AGENTS.md, Coding rules). Exit code 2 blocks the edit and shows the reason
// to the agent.
import { readFileSync } from 'node:fs';
import path from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8'));
const file = input.tool_input?.file_path ?? input.tool_input?.notebook_path;
if (!file) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd();
const rel = path.relative(root, path.resolve(root, file)).split(path.sep).join('/');

const GENERATED = [
	[/^\.svelte-kit\//, 'SvelteKit writes it; run npm run check (svelte-kit sync) instead.'],
	[
		/^(studio\/)?package-lock\.json$/,
		'npm writes it; change package.json and run npm install in that package.'
	],
	[/^(studio\/)?node_modules\//, 'Installed dependencies; change package.json and reinstall.']
];
for (const [pattern, how] of GENERATED) {
	if (pattern.test(rel)) {
		console.error(`${rel} is generated; don't edit it by hand. ${how}`);
		process.exit(2);
	}
}
