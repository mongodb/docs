/**
 * Redirect Linter - CLI
 * 
 * Checks for circular redirects in netlify.toml files.
 * Designed for pre-commit hooks and CI pipelines.
 * 
 * Usage:
 *   npx tsx redirect-lint-cli.ts <netlify.toml files>
 * 
 * Options:
 *   -o, --output <file>  Write results to a file
 *   --cross-file         Check for cycles across all files (default: per-file only)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { 
  lintRedirects, 
  lintRedirectsMultiFile, 
  formatIssuesForTerminal, 
  RedirectIssue 
} from './redirect-lint-rules.js';

const HELP_TEXT = `Redirect Linter - Detects circular redirects in netlify.toml files

Usage:
  npx tsx redirect-lint-cli.ts [options] <file1> [file2] ...

Options:
  -o, --output <file>  Write results to a file
  --cross-file         Check for cycles across all files combined

Examples:
  npx tsx redirect-lint-cli.ts content/atlas/netlify.toml
  npx tsx redirect-lint-cli.ts content/*/netlify.toml
  npx tsx redirect-lint-cli.ts --cross-file content/*/netlify.toml
`;

interface ParsedArgs {
  files: string[];
  outputFile?: string;
  crossFile: boolean;
}

function parseArgs(args: string[]): ParsedArgs {
  const files: string[] = [];
  let outputFile: string | undefined;
  let crossFile = false;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-o' || arg === '--output') {
      outputFile = args[++i];
    } else if (arg === '--cross-file') {
      crossFile = true;
    } else if (!arg.startsWith('-')) {
      files.push(arg);
    }
  }
  
  return { files, outputFile, crossFile };
}

function resolveFilePath(file: string): string {
  if (isAbsolute(file)) {
    return file;
  }
  return resolve(process.cwd(), file);
}

function isNetlifyToml(file: string): boolean {
  return file.toLowerCase().endsWith('.toml');
}

function main(): void {
  const { files: rawFiles, outputFile, crossFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath).filter(isNetlifyToml);
  
  if (files.length === 0) {
    console.log(HELP_TEXT);
    process.exit(0);
  }
  
  let allIssues: RedirectIssue[] = [];
  let filesChecked = 0;
  let filesWithIssues = 0;
  
  if (crossFile) {
    // Load all files and check together for cross-file cycles
    const fileContents: Array<{content: string, filename: string}> = [];
    
    for (const file of files) {
      try {
        const content = readFileSync(file, 'utf-8');
        fileContents.push({ content, filename: file });
        filesChecked++;
      } catch (err) {
        const error = err as NodeJS.ErrnoException;
        if (error.code === 'ENOENT') {
          console.error(`⚠️  File not found: ${file}`);
        } else {
          console.error(`⚠️  Error reading ${file}: ${error.message}`);
        }
      }
    }
    
    allIssues = lintRedirectsMultiFile(fileContents);
    if (allIssues.length > 0) {
      filesWithIssues = new Set(allIssues.map(i => i.file)).size;
    }
  } else {
    // Check each file independently
    for (const file of files) {
      try {
        const content = readFileSync(file, 'utf-8');
        const issues = lintRedirects(content, file);
        
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
  }
  
  // Output results
  if (filesChecked === 0) {
    console.log('No redirect files to check.');
    process.exit(0);
  }
  
  const output = formatIssuesForTerminal(allIssues);
  const summary = `\nChecked ${filesChecked} file(s), found ${allIssues.length} issue(s) in ${filesWithIssues} file(s).`;
  
  console.log(output);
  console.log(summary);
  
  // Write to file if specified
  if (outputFile) {
    const fullOutput = `Redirect Linter Results\n${'='.repeat(50)}\n\n${output}${summary}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }
  
  // Exit with error code if there are issues
  process.exit(allIssues.length > 0 ? 1 : 0);
}

main();
