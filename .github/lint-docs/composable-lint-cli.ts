#!/usr/bin/env npx tsx
/**
 * Composable tutorial linter CLI
 *
 * Usage:
 *   npx tsx composable-lint-cli.ts <files...>
 *
 * For each content file it resolves the owning docset snooty.toml (for custom
 * composable definitions) and also reports duplicate composable ids found in
 * that snooty.toml. Passing a snooty.toml directly checks only its definitions.
 *
 * Options:
 *   -o, --output <file>   Write results to a file
 */

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { resolve, isAbsolute, dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import { formatIssuesForTerminal } from './seo-lint-rules.js';
import {
  lintComposableContent,
  lintSnootyToml,
  parseSnootyComposables,
  type LintIssue,
} from './composable-lint-rules.js';

const HERE = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv: string[]): { files: string[]; outputFile?: string } {
  const files: string[] = [];
  let outputFile: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--output') {
      outputFile = argv[++i];
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }
  return { files, outputFile };
}

function resolveFilePath(file: string): string {
  if (isAbsolute(file)) return file;
  return resolve(process.cwd(), file);
}

/** Loads the default composable definitions (id -> option count). */
function loadAllowlistDefaults(): Map<string, number> {
  const defaults = new Map<string, number>();
  try {
    const raw = readFileSync(join(HERE, 'composable-allowlist.json'), 'utf-8');
    const parsed = JSON.parse(raw) as { defaults?: Record<string, number> };
    for (const [id, count] of Object.entries(parsed.defaults ?? {})) {
      defaults.set(id, count);
    }
  } catch {
    // No allowlist: permutations-over-50 will simply not fire.
  }
  return defaults;
}

const allowlistDefaults = loadAllowlistDefaults();

/** Walks up from a file to the nearest docset snooty.toml. */
function findSnootyToml(file: string): string | null {
  let dir = dirname(file);
  for (;;) {
    const candidate = join(dir, 'snooty.toml');
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

// docset snooty.toml path -> merged definitions (allowlist + custom).
const definitionsCache = new Map<string, Map<string, number>>();
// docset snooty.toml paths already checked for duplicate ids.
const snootyChecked = new Set<string>();

function definitionsFor(file: string): Map<string, number> {
  const snooty = findSnootyToml(file);
  if (!snooty) return allowlistDefaults;
  const cached = definitionsCache.get(snooty);
  if (cached) return cached;

  const merged = new Map(allowlistDefaults);
  try {
    const { definitions } = parseSnootyComposables(readFileSync(snooty, 'utf-8'));
    for (const [id, count] of definitions) merged.set(id, count);
  } catch {
    // Fall back to defaults only.
  }
  definitionsCache.set(snooty, merged);
  return merged;
}

function main(): void {
  const { files: rawFiles, outputFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);

  if (files.length === 0) {
    console.log('Usage: npx tsx composable-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>   Write results to a file');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx composable-lint-cli.ts content/manual/upcoming/source/tutorial/foo.txt');
    process.exit(0);
  }

  const allIssues: LintIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;

  const addIssues = (target: string, issues: LintIssue[]): void => {
    if (issues.length > 0) {
      allIssues.push(...issues);
      filesWithIssues++;
    }
    filesChecked++;
  };

  for (const file of files) {
    // A snooty.toml passed directly is checked for duplicate composable ids.
    if (basename(file) === 'snooty.toml') {
      try {
        addIssues(file, lintSnootyToml(readFileSync(file, 'utf-8'), file));
      } catch (err) {
        console.error(`⚠️  Error reading ${file}: ${(err as Error).message}`);
      }
      continue;
    }

    if (!file.match(/\.(rst|txt)$/)) continue;

    try {
      const content = readFileSync(file, 'utf-8');
      const issues = lintComposableContent(content, file, definitionsFor(file));

      // Also check the owning docset's snooty.toml once for duplicate ids.
      const snooty = findSnootyToml(file);
      if (snooty && !snootyChecked.has(snooty)) {
        snootyChecked.add(snooty);
        try {
          issues.push(...lintSnootyToml(readFileSync(snooty, 'utf-8'), snooty));
        } catch {
          // Ignore unreadable snooty.toml.
        }
      }

      addIssues(file, issues);
    } catch (err) {
      const error = err as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        console.error(`⚠️  File not found: ${file}`);
      } else {
        console.error(`⚠️  Error reading ${file}: ${error.message}`);
      }
    }
  }

  if (filesChecked === 0) {
    console.log('No documentation files to check.');
    process.exit(0);
  }

  const output = formatIssuesForTerminal(allIssues, 'Composable tutorial linter');
  const summary =
    allIssues.length > 0
      ? `\nChecked ${filesChecked} file(s), ${filesWithIssues} with issues.`
      : '';

  console.log(output);
  if (summary) console.log(summary);

  if (outputFile) {
    const fullOutput = `Composable Tutorial Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }

  const hasErrors = allIssues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
