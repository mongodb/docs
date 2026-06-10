#!/usr/bin/env node
// Formats the code, runs tests, and extracts snippets via Bluehawk.
// Run from the csharp/driver/ directory: node run-tests.js

import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { requireReachableConnectionString } from '../../preflight.js';

const SCRIPT_DIR    = dirname(fileURLToPath(import.meta.url));

await requireReachableConnectionString({
  envCandidates: [join(SCRIPT_DIR, '.env')],
});

const SHOW_TIMINGS  = process.stdout.isTTY;
const NO_SNIP       = process.argv.includes('--no-snip');
const suiteStart    = Date.now();

function formatDuration(ms) {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  const t = Date.now();
  execSync(cmd, { stdio: 'inherit', cwd: SCRIPT_DIR });
  if (SHOW_TIMINGS) console.log(`  (${formatDuration(Date.now() - t)})`);
}

// 1. Format
run('dotnet format');

// 2. Test
run('dotnet test');

// 3. Snip
if (!NO_SNIP) run('node snip.js');

if (SHOW_TIMINGS) console.log(`\nTotal: ${formatDuration(Date.now() - suiteStart)}`);
