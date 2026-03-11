#!/usr/bin/env npx tsx
/**
 * SEO Linter - CLI
 * 
 * Reads local files and prints lint results to terminal.
 * Designed for pre-commit hooks and local development.
 * 
 * Usage (from any directory in the repo):
 *   npx tsx .github/lint-docs/seo-lint-cli.ts file1.txt file2.rst ...
 *   npx tsx .github/lint-docs/seo-lint-cli.ts content/manual/source/*.txt
 * 
 * Options:
 *   -o, --output <file>  Write results to a file instead of just terminal
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, isAbsolute } from 'path';
import { lintContent, formatIssuesForTerminal, LintIssue } from './seo-lint-rules.js';

/**
 * Parse command line arguments for output file option
 */
function parseArgs(args: string[]): { files: string[], outputFile?: string } {
  const files: string[] = [];
  let outputFile: string | undefined;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-o' || arg === '--output') {
      outputFile = args[++i];
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }
  
  return { files, outputFile };
}

/**
 * Get the git repo root directory
 */
function getRepoRoot(): string {
  try {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
  } catch {
    // Fallback to current directory if not in a git repo
    return process.cwd();
  }
}

/**
 * Resolve a file path relative to the current working directory
 */
function resolveFilePath(file: string): string {
  if (isAbsolute(file)) {
    return file;
  }
  // Resolve relative to where the user ran the command, not where the script is
  return resolve(process.cwd(), file);
}

function main(): void {
  const { files: rawFiles, outputFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);
  
  if (files.length === 0) {
    console.log('Usage: npx tsx seo-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>  Write results to a file (for large scans)');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx seo-lint-cli.ts content/manual/source/tutorial/install.txt');
    console.log('  npx tsx seo-lint-cli.ts -o results.txt content/**/*.txt');
    process.exit(0);
  }
  
  const allIssues: LintIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;
  
  for (const file of files) {
    // Skip non-doc files
    if (!file.match(/\.(rst|txt|md|mdx)$/)) {
      continue;
    }
    
    try {
      const content = readFileSync(file, 'utf-8');
      const issues = lintContent(content, file);
      
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
  
  // Output results
  if (filesChecked === 0) {
    console.log('No documentation files to check.');
    process.exit(0);
  }
  
  const output = formatIssuesForTerminal(allIssues);
  const summary = allIssues.length > 0 
    ? `\nChecked ${filesChecked} file(s), ${filesWithIssues} with issues.`
    : '';
  
  // Always print to terminal
  console.log(output);
  if (summary) console.log(summary);
  
  // Also write to file if specified
  if (outputFile) {
    const fullOutput = `SEO Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }
  
  // Exit with error code if there are errors (not warnings)
  const hasErrors = allIssues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
