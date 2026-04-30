#!/usr/bin/env npx tsx
/**
 * Findability / taxonomy linter CLI
 *
 * Usage:
 *   npx tsx findability-lint-cli.ts [options] <files...>
 *
 * Options:
 *   -o, --output <file>     Write results to a file
 *   --synonyms <path>       synonyms.csv (e.g. docs-search-transport) for keyword overlap checks
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { formatIssuesForTerminal } from './seo-lint-rules.js';
import {
  lintFindabilityContent,
  loadSynonymTermsFromFile,
  extractMetaKeywordBlocks,
  type LintIssue,
} from './findability-lint-rules.js';

function parseArgs(argv: string[]): {
  files: string[];
  outputFile?: string;
  synonymsPath?: string;
} {
  const files: string[] = [];
  let outputFile: string | undefined;
  let synonymsPath: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-o' || arg === '--output') {
      outputFile = argv[++i];
    } else if (arg === '--synonyms') {
      synonymsPath = argv[++i];
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }
  return { files, outputFile, synonymsPath };
}

function resolveFilePath(file: string): string {
  if (isAbsolute(file)) return file;
  return resolve(process.cwd(), file);
}

function main(): void {
  const { files: rawFiles, outputFile, synonymsPath } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);

  if (files.length === 0) {
    console.log('Usage: npx tsx findability-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>   Write results to a file');
    console.log('  --synonyms <path>     Path to synonyms.csv (optional)');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx findability-lint-cli.ts content/manual/source/tutorial/foo.txt');
    console.log(
      '  npx tsx findability-lint-cli.ts --synonyms ../docs-search-transport/resources/synonyms.csv foo.txt',
    );
    process.exit(0);
  }

  let synonymTerms: Set<string> | undefined;
  if (synonymsPath) {
    try {
      synonymTerms = loadSynonymTermsFromFile(resolveFilePath(synonymsPath));
    } catch (e) {
      console.error(`⚠️  Could not read synonyms file: ${(e as Error).message}`);
      process.exit(2);
    }
  }

  const allIssues: LintIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;
  let hadKeywords = false;

  for (const file of files) {
    if (!file.match(/\.(rst|txt|md|mdx)$/)) continue;

    try {
      const content = readFileSync(file, 'utf-8');
      if (!hadKeywords && extractMetaKeywordBlocks(content).length > 0) hadKeywords = true;
      const issues = lintFindabilityContent(content, file, { synonymTerms });
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

  const output = formatIssuesForTerminal(allIssues, 'Findability linter');
  const summary =
    allIssues.length > 0 ? `\nChecked ${filesChecked} file(s), ${filesWithIssues} with issues.` : '';

  console.log(output);
  if (summary) console.log(summary);
  if (!synonymsPath && hadKeywords) {
    console.log('ℹ️  Synonyms overlap check skipped (pass --synonyms synonyms.csv to enable)');
  }

  if (outputFile) {
    const fullOutput = `Findability Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }

  const hasErrors = allIssues.some(i => i.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
