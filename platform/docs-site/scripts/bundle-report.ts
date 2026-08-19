/**
 * Bundle size report CLI (UXE-697).
 *
 * Reads the stats from a `BUNDLE_STATS=true next build`, measures what shipped
 * into .next/static, and writes a JSON summary plus a markdown report.
 *
 * Report-only: no size delta is ever an error, since the LeafyGreen → Via
 * migration is expected to grow the bundle first. Exits non-zero only when the
 * measurement itself is untrustworthy.
 *
 * Usage:
 *   tsx scripts/bundle-report.ts [--baseline <path>]
 *                               [--summary-out <path>] [--markdown-out <path>]
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import {
  renderMarkdown,
  summarize,
  type AssetTotal,
  type BundleSummary,
  type ShippedTotals,
  type StatsJson,
} from './lib/bundle-stats';

const SITE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STATS_DIR = join(SITE_ROOT, '.bundle-stats');
const STATS_FILE = join(STATS_DIR, 'client-stats.json');
const STATIC_DIR = join(SITE_ROOT, '.next', 'static');
const BUILD_ID_FILE = join(SITE_ROOT, '.next', 'BUILD_ID');

export interface Args {
  baseline: string | null;
  summaryOut: string;
  markdownOut: string;
}

export function parseArgs(argv: string[]): Args {
  const args: Args = {
    baseline: null,
    summaryOut: join(STATS_DIR, 'summary.json'),
    markdownOut: join(STATS_DIR, 'report.md'),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    // pnpm forwards the bare `--` from `pnpm run bundle:report -- --baseline x`.
    if (flag === '--') continue;
    switch (flag) {
      case '--baseline':
        args.baseline = requireValue(flag, value);
        i += 1;
        break;
      case '--summary-out':
        args.summaryOut = requireValue(flag, value);
        i += 1;
        break;
      case '--markdown-out':
        args.markdownOut = requireValue(flag, value);
        i += 1;
        break;
      default:
        throw new Error(`Unknown argument: ${flag}`);
    }
  }

  return args;
}

function requireValue(flag: string, value: string | undefined): string {
  if (value === undefined || value.startsWith('--')) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function collectFiles(dir: string, extensions: readonly string[]): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...collectFiles(full, extensions));
    } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
      found.push(full);
    }
  }
  return found;
}

/** Gzips here because Next reports gzip only in its console table, unparsed. */
function measureAssets(extension: string): AssetTotal {
  const files = collectFiles(STATIC_DIR, [extension]);
  let rawBytes = 0;
  let gzipBytes = 0;

  for (const file of files) {
    rawBytes += statSync(file).size;
    gzipBytes += gzipSync(readFileSync(file)).length;
  }

  return { rawBytes, gzipBytes, files: files.length };
}

function measureShipped(): ShippedTotals {
  if (!existsSync(STATIC_DIR)) {
    throw new Error(`No static assets at ${STATIC_DIR}. Run \`pnpm run build:stats\` before this script.`);
  }
  return { js: measureAssets('.js'), css: measureAssets('.css') };
}

/**
 * A `build:stats` that dies before writing stats would leave the previous run's
 * file in place, and the report would silently describe the wrong build.
 */
function assertStatsAreFresh(): void {
  if (!existsSync(BUILD_ID_FILE)) return;
  if (statSync(STATS_FILE).mtimeMs < statSync(BUILD_ID_FILE).mtimeMs) {
    throw new Error(
      `${STATS_FILE} is older than the current build. Re-run \`pnpm run build:stats\` — ` +
        'reporting these numbers would describe a previous build.',
    );
  }
}

function resolveCommit(): string {
  // On pull_request this is the merge commit, still a stable id for the tree.
  const fromEnv = process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function readBaseline(path: string): BundleSummary | null {
  if (!existsSync(path)) {
    console.warn(`No baseline at ${path} — reporting absolute sizes only.`);
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf8')) as BundleSummary;
}

function writeFileEnsuringDir(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  if (!existsSync(STATS_FILE)) {
    throw new Error(
      `No webpack stats at ${STATS_FILE}. Run \`pnpm run build:stats\` (which sets BUNDLE_STATS=true) first.`,
    );
  }
  assertStatsAreFresh();

  const stats = JSON.parse(readFileSync(STATS_FILE, 'utf8')) as StatsJson;
  const summary = summarize(stats, {
    generatedAt: new Date().toISOString().slice(0, 10),
    commit: resolveCommit(),
    shipped: measureShipped(),
  });

  const baseline = args.baseline === null ? null : readBaseline(args.baseline);
  const markdown = renderMarkdown(summary, baseline);

  writeFileEnsuringDir(args.summaryOut, `${JSON.stringify(summary, null, 2)}\n`);
  writeFileEnsuringDir(args.markdownOut, `${markdown}\n`);

  console.log(markdown);
  console.log(`\nWrote summary to ${args.summaryOut}`);

  // Also write the job summary, so the report survives a skipped (fork) or
  // failed comment step.
  const stepSummary = process.env.GITHUB_STEP_SUMMARY;
  if (stepSummary) {
    writeFileSync(stepSummary, `${markdown}\n`, { flag: 'a' });
  }

  // Fail last: the report is already written and warns inline, so the numbers
  // stay visible while the exit code keeps the degradation from going unnoticed.
  if (summary.unattributedModules > 0) {
    throw new Error(
      `webpack collapsed ${summary.unattributedModules} modules into an unnamed group, so every ` +
        'bucket above is understated. The stats options in next.config.mjs (cachedModules / ' +
        'groupModulesByCacheStatus / modulesSpace) no longer defeat webpack module grouping.',
    );
  }
}

try {
  main();
} catch (error) {
  console.error(`bundle-report failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
