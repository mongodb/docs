#!/usr/bin/env node
/**
 * CLI entry point for generate-llms, a TypeScript port of audit-cli's
 * `generate llms` command (grove-platform/audit-cli#7).
 *
 * Projects whose page list would exceed the 50,000-character llms.txt limit
 * are automatically split into <project>-<n>-llms.txt part files instead of
 * one oversized llms.txt (see split.ts).
 *
 * Usage:
 *   pnpm generate -- [monorepo-path] [flags]
 *
 * Flags:
 *   --output-dir <dir>     Directory to write per-project llms.txt files into
 *                          (default: llms-output)
 *   --for-project <name>   Limit generation to a single project (content
 *                          directory name)
 *   --no-descriptions      Omit both the summary blockquote (from
 *                          llms-descriptions.json) and every page's own
 *                          inline meta description from the written files
 *   --parts <n>            Force exactly <n> part files for every split
 *                          project, instead of the number automatically
 *                          computed from the character limit (still snapped
 *                          to L3 section boundaries; intended for use with
 *                          --for-project)
 *   --oversized-section-parts <n>
 *                          If a single L3 section is still over the limit
 *                          on its own after splitting (e.g. manual's
 *                          reference/), it's automatically recursed into
 *                          progressively deeper path segments (L4, L5, ...)
 *                          to break it up further. Force the *first* of
 *                          those recursive steps to produce exactly <n>
 *                          sub-parts instead of the number automatically
 *                          computed; any further recursion beyond that
 *                          first step still uses the automatic count.
 *
 * Examples:
 *   pnpm generate
 *   pnpm generate -- --for-project atlas
 *   pnpm generate -- --for-project cloud-docs --no-descriptions
 *   pnpm generate -- --for-project manual --parts 3
 *   pnpm generate -- --for-project manual --parts 3 --oversized-section-parts 2
 *   pnpm generate -- /path/to/docs-mongodb-internal --output-dir build/llms
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate } from './generator.js';
import { resolveMonorepoPath } from './monorepo.js';
import { LLMS_TXT_CHAR_LIMIT, PRODUCTION_BASE_URL } from './types.js';
import type { ProjectResult } from './types.js';

const DEFAULT_OUTPUT_DIR = 'llms-output';

interface CliArgs {
  monorepoPath?: string;
  outputDir: string;
  forProject?: string;
  noDescriptions: boolean;
  parts?: number;
  oversizedSectionParts?: number;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    outputDir: DEFAULT_OUTPUT_DIR,
    noDescriptions: false,
  };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case '--output-dir':
        args.outputDir = argv[++i];
        break;
      case '--for-project':
        args.forProject = argv[++i];
        break;
      case '--no-descriptions':
        args.noDescriptions = true;
        break;
      case '--parts': {
        const raw = argv[++i];
        const parsed = Number.parseInt(raw, 10);
        if (!Number.isInteger(parsed) || parsed < 1 || String(parsed) !== raw) {
          throw new Error(`Invalid --parts value: ${raw} (must be a positive integer)`);
        }
        args.parts = parsed;
        break;
      }
      case '--oversized-section-parts': {
        const raw = argv[++i];
        const parsed = Number.parseInt(raw, 10);
        if (!Number.isInteger(parsed) || parsed < 1 || String(parsed) !== raw) {
          throw new Error(`Invalid --oversized-section-parts value: ${raw} (must be a positive integer)`);
        }
        args.oversizedSectionParts = parsed;
        break;
      }
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        if (arg.startsWith('--')) {
          throw new Error(`Unknown flag: ${arg}`);
        }
        if (args.monorepoPath) {
          throw new Error(`Unexpected extra argument: ${arg}`);
        }
        args.monorepoPath = arg;
        break;
    }
    i++;
  }

  return args;
}

function printHelp(): void {
  console.log(`Generate per-project llms.txt files.

Usage:
  generate-llms [monorepo-path] [flags]

Flags:
  --output-dir <dir>     Directory to write per-project llms.txt files into (default: ${DEFAULT_OUTPUT_DIR})
  --for-project <name>   Limit generation to a single project (content directory name)
  --no-descriptions      Omit both the summary blockquote (from llms-descriptions.json) and every page's own inline meta description from the written files
  --parts <n>            Force exactly <n> part files for every split project (still snapped to L3 boundaries)
  --oversized-section-parts <n>
                         Force exactly <n> sub-parts for the first recursive split of a section still over the limit`);
}

function padEnd(value: string | number, width: number): string {
  return String(value).padEnd(width);
}

function printSummary(results: ProjectResult[], outputDir: string): void {
  if (results.length === 0) {
    console.log('No projects generated (no matching content found).');
    return;
  }

  const totalFiles = results.reduce((sum, r) => sum + r.outputPaths.length, 0);
  console.log(`Generated ${totalFiles} llms.txt file(s) across ${results.length} project(s) in ${outputDir}/\n`);

  const headers = ['PROJECT', 'VERSION', 'PAGES', 'PARTS', 'CHARS(w/ desc)', 'CHARS(no desc)', 'OVER 50k?'];
  const rows = results.map((r) => ({
    cells: [
      r.project,
      r.version || '-',
      String(r.pages.length),
      String(r.outputPaths.length),
      String(r.charsWithDescriptions),
      String(r.charsWithoutDescriptions),
      r.anyPartOverLimit ? 'YES' : '',
    ],
    split: r.outputPaths.length > 1,
    over: r.anyPartOverLimit,
    project: r.project,
  }));

  const widths = headers.map((h, col) => Math.max(h.length, ...rows.map((r) => r.cells[col].length)) + 2);
  console.log(headers.map((h, col) => padEnd(h, widths[col])).join(''));
  for (const row of rows) {
    console.log(row.cells.map((cell, col) => padEnd(cell, widths[col])).join(''));
  }

  const split = rows.filter((r) => r.split).map((r) => r.project);
  if (split.length > 0) {
    console.log(`\n${split.length} project(s) were split into multiple part files (see PARTS column): [${split.join(', ')}]`);
  }

  const over = rows.filter((r) => r.over).map((r) => r.project);
  if (over.length > 0) {
    console.log(
      `\n${over.length} project(s) still have at least one part over the ${LLMS_TXT_CHAR_LIMIT}-character limit ` +
        `(a single section is larger than the limit even after recursing into deeper path segments): [${over.join(', ')}]`,
    );
  } else {
    console.log(`\nAll written files are within the ${LLMS_TXT_CHAR_LIMIT}-character limit.`);
  }
}

async function main(): Promise<void> {
  // `pnpm generate -- --for-project foo` can leak a literal "--" through to us.
  const argv = process.argv.slice(2).filter((arg) => arg !== '--');
  const args = parseArgs(argv);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const monorepoPath = await resolveMonorepoPath(args.monorepoPath, __dirname);
  // cli.ts lives at <package root>/src/cli.ts.
  const descriptionsPath = path.join(__dirname, '..', 'llms-descriptions.json');

  const results = await generate({
    monorepoPath,
    baseUrl: PRODUCTION_BASE_URL,
    descriptionsPath,
    outputDir: args.outputDir,
    forProject: args.forProject,
    noDescriptions: args.noDescriptions,
    parts: args.parts,
    oversizedSectionParts: args.oversizedSectionParts,
  });

  printSummary(results, args.outputDir);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
