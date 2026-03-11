#!/usr/bin/env npx tsx
/**
 * 404 Linter - CLI
 * 
 * Checks external links in documentation files using lychee.
 * Designed for pre-commit hooks and local development.
 * 
 * Usage (from any directory in the repo):
 *   npx tsx .github/lint-docs/404-lint-cli.ts file1.txt file2.rst ...
 *   npx tsx .github/lint-docs/404-lint-cli.ts content/manual/source/*.txt
 * 
 * Options:
 *   -o, --output <file>  Write results to a file instead of just terminal
 * 
 * Requirements:
 *   - lychee must be installed (brew install lychee / cargo install lychee)
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync, mkdtempSync, rmSync } from 'fs';
import { resolve, isAbsolute, join } from 'path';
import { tmpdir } from 'os';

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
 * Resolve a file path relative to the current working directory
 */
function resolveFilePath(file: string): string {
  if (isAbsolute(file)) {
    return file;
  }
  // Resolve relative to where the user ran the command, not where the script is
  return resolve(process.cwd(), file);
}

// ============================================
// TYPES
// ============================================

interface BrokenLink {
  url: string;
  status: string;
  file: string;
  line?: number;
}

interface LycheeError {
  url: string;
  status: {
    code?: number;
    text?: string;
  };
}

interface LycheeResult {
  error_map: Record<string, LycheeError[]>;
  errors: number;
}

// ============================================
// CONFIGURATION
// ============================================

// URLs to skip (same as the archived workflow)
const EXCLUDE_PATTERNS: string[] = [
  // Localhost and private IPs
  '^https?://localhost',
  '^https?://127\\.0\\.0\\.1',
  '^https?://0\\.0\\.0\\.0',
  '^https?://192\\.168\\.',
  '^https?://10\\.',
  '^https?://172\\.(1[6-9]|2[0-9]|3[0-1])\\.',
  
  // Login/auth pages (often return 403/401)
  '^https?://portal\\.azure\\.com',
  '^https?://console\\.aws\\.amazon\\.com',
  '^https?://console\\.cloud\\.google\\.com',
  '^https?://.*\\.okta\\.com',
  '^https?://login\\.',
  '^https?://.*signin',
  '^https?://.*login',
  
  // Microsoft/Azure docs (often timeout or block automated checkers)
  '^https?://azure\\.microsoft\\.com',
  '^https?://docs\\.microsoft\\.com',
  '^https?://learn\\.microsoft\\.com',
  
  // Example/placeholder domains
  '^https?://.*example\\.com',
  '^https?://.*example\\.org',
  '^https?://.*\\.local',
  '^https?://.*\\.internal',
  '\\.internal\\.(io|com|net|org)',
  
  // MongoDB internal
  'cloud-dev\\.mongodb\\.com',
  '^https?://mms\\.mongodb\\.com',
  'github\\.com/10gen/',
  'docs-mongodbcom-staging\\.corp\\.mongodb\\.com',
  
  // Other protocols
  '^mailto:',
  '^mongodb(\\+srv)?://',
  '^file://',
  
  // API endpoints (often require auth)
  '^https?://api\\.github\\.com',
  '/v[0-9]+/(embeddings|completions|chat)',
  '/api/v[0-9]+/',
  
  // Google Docs (requires auth)
  'docs\\.google\\.com',
  
  // URL templates
  '%7B\\+',
  '\\{\\+',
];

// Accept these status codes as "OK"
const ACCEPT_CODES = '200,201,202,204,206,301,302,307,308,403,405,429';

// ============================================
// HELPERS
// ============================================

function checkLycheeInstalled(): boolean {
  try {
    execSync('lychee --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalize RST content to join multi-line URLs
 * 
 * RST allows URLs to wrap across lines like:
 *   `link text
 *   <https://example.com/very/long/
 *   url/path>`__
 * 
 * This function joins those into single lines so lychee can parse them.
 */
function normalizeMultiLineUrls(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let i = 0;
  
  while (i < lines.length) {
    let line = lines[i];
    
    // Check if line contains an incomplete URL in angle brackets
    // Pattern: <http... without closing >
    if (/<https?:\/\/[^>]*$/.test(line) && !line.includes('>`')) {
      // Keep joining lines until we find the closing >
      while (i + 1 < lines.length && !line.includes('>`')) {
        i++;
        // Join without adding space (URLs don't have spaces)
        line = line + lines[i].trim();
      }
    }
    
    result.push(line);
    i++;
  }
  
  return result.join('\n');
}

function formatBrokenLinks(links: BrokenLink[]): string {
  if (links.length === 0) {
    return '✅ No broken links found!';
  }
  
  const lines: string[] = [];
  
  // Group by file
  const byFile = new Map<string, BrokenLink[]>();
  for (const link of links) {
    const existing = byFile.get(link.file) || [];
    existing.push(link);
    byFile.set(link.file, existing);
  }
  
  for (const [file, fileLinks] of byFile) {
    for (const link of fileLinks) {
      lines.push(`🔴 ${file}${link.line ? `:${link.line}` : ''}`);
      lines.push(`   [404] ${link.url}`);
      if (link.status) {
        lines.push(`   Status: ${link.status}`);
      }
      lines.push('');
    }
  }
  
  const errorCount = links.length;
  lines.push(`Found ${errorCount} broken link(s)`);
  
  return lines.join('\n');
}

function runLychee(files: string[]): BrokenLink[] {
  // Build lychee command
  const args: string[] = [
    '--no-progress',
    '--format', 'json',
    '--timeout', '30',  // Increased from 15s to handle slow sites
    '--max-retries', '2',
    '--accept', ACCEPT_CODES,
  ];
  
  // Add exclude patterns
  for (const pattern of EXCLUDE_PATTERNS) {
    args.push('--exclude', pattern);
  }
  
  // Add files
  args.push(...files);
  
  // Run lychee
  const result = spawnSync('lychee', args, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024, // 10MB
  });
  
  // Parse JSON output
  const brokenLinks: BrokenLink[] = [];
  
  if (result.stdout) {
    try {
      const parsed = JSON.parse(result.stdout) as LycheeResult;
      
      if (parsed.error_map) {
        for (const [file, errors] of Object.entries(parsed.error_map)) {
          for (const error of errors) {
            brokenLinks.push({
              url: error.url,
              status: error.status?.code ? `${error.status.code}` : (error.status?.text || 'unknown'),
              file,
            });
          }
        }
      }
    } catch {
      // If JSON parsing fails, lychee might have had an error
      if (result.stderr) {
        console.error('Lychee error:', result.stderr);
      }
    }
  }
  
  return brokenLinks;
}

// ============================================
// MAIN
// ============================================

function main(): void {
  const { files: rawFiles, outputFile } = parseArgs(process.argv.slice(2));
  const files = rawFiles.map(resolveFilePath);
  
  if (files.length === 0) {
    console.log('Usage: npx tsx 404-lint-cli.ts [options] <file1> [file2] ...');
    console.log('');
    console.log('Options:');
    console.log('  -o, --output <file>  Write results to a file (for large scans)');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx 404-lint-cli.ts content/manual/source/tutorial/install.txt');
    console.log('  npx tsx 404-lint-cli.ts -o results.txt content/**/*.txt');
    console.log('');
    console.log('Requirements:');
    console.log('  - lychee must be installed (brew install lychee)');
    process.exit(0);
  }
  
  // Check lychee is installed
  if (!checkLycheeInstalled()) {
    console.log('⚠️  lychee not installed. Skipping 404 link check.');
    console.log('');
    console.log('   To enable broken link detection, install lychee:');
    console.log('   • macOS:  brew install lychee');
    console.log('   • Linux:  cargo install lychee (or download from GitHub releases)');
    console.log('   • More:   https://github.com/lycheeverse/lychee#installation');
    console.log('');
    process.exit(0);
  }
  
  // Filter to doc files that exist
  const docFiles = files.filter(f => {
    if (!f.match(/\.(rst|txt|md|mdx)$/)) {
      return false;
    }
    if (!existsSync(f)) {
      console.error(`⚠️  File not found: ${f}`);
      return false;
    }
    return true;
  });
  
  if (docFiles.length === 0) {
    console.log('No documentation files to check.');
    process.exit(0);
  }
  
  console.log(`🔗 Checking ${docFiles.length} file(s) for broken links...`);
  console.log('');
  
  // Pre-process files to handle multi-line URLs
  // Create temp directory for normalized files
  const tempDir = mkdtempSync(join(tmpdir(), '404-lint-'));
  const fileMap = new Map<string, string>(); // temp path -> original path
  
  try {
    for (const file of docFiles) {
      const content = readFileSync(file, 'utf-8');
      const normalized = normalizeMultiLineUrls(content);
      
      // Create temp file with same name structure
      const tempFile = join(tempDir, file.replace(/\//g, '_'));
      writeFileSync(tempFile, normalized);
      fileMap.set(tempFile, file);
    }
    
    // Run lychee on temp files
    const tempFiles = Array.from(fileMap.keys());
    const brokenLinksTemp = runLychee(tempFiles);
    
    // Map results back to original file paths
    var brokenLinks = brokenLinksTemp.map(link => ({
      ...link,
      file: fileMap.get(link.file) || link.file,
    }));
  } finally {
    // Clean up temp directory
    rmSync(tempDir, { recursive: true, force: true });
  }
  
  // Output results
  const output = formatBrokenLinks(brokenLinks);
  console.log(output);
  
  // Also write to file if specified
  if (outputFile) {
    const fullOutput = `404 Linter Results\n${'='.repeat(50)}\nChecked ${docFiles.length} file(s)\n\n${output}\n`;
    writeFileSync(outputFile, fullOutput);
    console.log(`\n📄 Results written to: ${outputFile}`);
  }
  
  // Exit with error code if there are broken links
  // But we use exit code 0 anyway since pre-commit shouldn't block
  process.exit(0);
}

main();
