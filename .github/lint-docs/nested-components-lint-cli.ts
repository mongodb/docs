#!/usr/bin/env npx tsx
/**
 * Nested components linter CLI
 *
 * Usage:
 *   npx tsx nested-components-lint-cli.ts <files...>
 *
 * Options:
 *   -o, --output <file>   Write results to a file
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { formatIssuesForTerminal } from './seo-lint-rules.js';
import { lintNestedComponents, type LintIssue } from './nested-components-lint-rules.js';

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

function main(): void {
  const { files: rawFiles, outputFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);

  if (files.length === 0) {
    console.log('Usage: npx tsx nested-components-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>   Write results to a file');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx nested-components-lint-cli.ts content/atlas/source/tutorial/foo.txt');
    process.exit(0);
  }

  const allIssues: LintIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;

  for (const file of files) {
    if (!file.match(/\.(rst|txt)$/)) continue;

    try {
      const content = readFileSync(file, 'utf-8');
      const issues = lintNestedComponents(content, file);
      filesChecked++;
      if (issues.length > 0) {
        filesWithIssues++;
        allIssues.push(...issues);
      }
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

  const output = formatIssuesForTerminal(allIssues, 'Nested components linter');
  const summary =
    allIssues.length > 0
      ? `\nChecked ${filesChecked} file(s), ${filesWithIssues} with issues.`
      : '';

  console.log(output);
  if (summary) console.log(summary);

  if (outputFile) {
    const fullOutput = `Nested Components Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }

  const hasErrors = allIssues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
