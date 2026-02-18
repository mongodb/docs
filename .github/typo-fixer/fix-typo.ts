#!/usr/bin/env npx tsx
/**
 * Typo Fixer - Direct Anthropic API approach
 * 
 * Receives Jira ticket info, uses Claude to find/fix typo, creates PR.
 * Runs in GitHub Actions with GITHUB_TOKEN (no PAT needed).
 */

import Anthropic from '@anthropic-ai/sdk';
import { Octokit } from '@octokit/rest';
import { readFileSync, existsSync } from 'fs';

// ============================================
// TYPES
// ============================================

interface JiraInfo {
  issueKey: string;
  summary: string;
  description: string;
  urls: string[];
}

interface TypoInfo extends JiraInfo {
  misspelled: string;
  correction: string;
}

interface TypoExtractionResult {
  misspelled: string | null;
  correction: string | null;
  confidence: 'high' | 'low';
  reason?: string;
}

interface FileContent {
  path: string;
  content: string;
  sha: string;
}

interface MatchingLine {
  lineNum: number;
  content: string;
}

interface Fix {
  found: boolean;
  file: string;
  occurrences?: number;
  matchingLines?: MatchingLine[];
  explanation?: string;
  original_line?: string;
  fixed_line?: string;
}

interface FileCheck {
  process: boolean;
  reason?: string;
}

interface PR {
  html_url: string;
  number: number;
}

// ============================================
// CONFIGURATION
// ============================================

const DOCS_CONTENT_PATH = 'content';
const DRY_RUN = process.env.DRY_RUN === 'true';

// Files to skip - learned from docs-typo-scanner
const SKIP_PATHS: string[] = [
  '/includes/',      // Shared includes = messy PRs with duplicates
  '/changelogs/',    // Historical, don't modify
  '/node_modules/',
  '/.git/',
];

const ALLOWED_EXTENSIONS: string[] = [
  '.txt',   // Snooty docs
  '.rst',   // Sphinx docs
  '.md',    // Markdown
  '.mdx',   // MDX
];

const SKIP_EXTENSIONS: string[] = [
  '.json',
  '.yaml', 
  '.yml',
  '.toml',
  '.lock',
  '.svg',
  '.png',
  '.jpg',
  '.gif',
  '.ico',
  '.css',
  '.scss',
  '.js',
  '.ts',
  '.py',
];

// Maximum files to modify in one PR (safety limit)
const MAX_FILES_PER_PR = 50;

// Retry configuration for rate limits
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 60000; // 1 minute

// ============================================
// RETRY HELPER
// ============================================

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (err) {
      const error = err as Error & { status?: number };
      lastError = error;
      
      // Check if it's a rate limit error (429 or secondary rate limit)
      const isRateLimit = error.status === 429 || 
        error.message?.includes('rate limit') ||
        error.message?.includes('Too many requests');
      
      if (isRateLimit && attempt < MAX_RETRIES) {
        const delayMs = INITIAL_RETRY_DELAY_MS * attempt; // Linear backoff: 1min, 2min, 3min
        console.log(`   ⏳ Rate limited on ${operationName}, waiting ${delayMs / 1000}s before retry ${attempt + 1}/${MAX_RETRIES}...`);
        await sleep(delayMs);
        continue;
      }
      
      // Not a rate limit or out of retries
      throw error;
    }
  }
  
  throw lastError;
}

// ============================================
// INITIALIZATION
// ============================================

function validateEnvironment(): void {
  const required = ['ANTHROPIC_API_KEY', 'GITHUB_TOKEN', 'ISSUE_KEY'];
  const missing = required.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

validateEnvironment();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = process.env.REPO_OWNER || '10gen';
const repo = process.env.REPO_NAME || 'docs-mongodb-internal';

// ============================================
// JIRA PARSING
// ============================================

function getJiraInfo(): JiraInfo {
  const issueKey = process.env.ISSUE_KEY || '';
  const summary = process.env.ISSUE_SUMMARY || '';
  
  // Read description from file (handles newlines)
  let description = '';
  if (existsSync('/tmp/description.json')) {
    try {
      description = JSON.parse(readFileSync('/tmp/description.json', 'utf-8'));
    } catch {
      description = readFileSync('/tmp/description.json', 'utf-8');
    }
  }
  
  console.log('📋 Jira Ticket:', issueKey);
  console.log('📝 Summary:', summary);
  console.log('📄 Description:', description.substring(0, 500) + (description.length > 500 ? '...' : ''));
  
  // Extract URLs from description (for PR context, not for file matching)
  const urlPattern = /https?:\/\/(?:www\.)?mongodb\.com\/docs\/[^\s\])]+/gi;
  const urls = description.match(urlPattern) || [];

  return {
    issueKey,
    summary,
    description,
    urls,
  };
}

// ============================================
// AI TYPO EXTRACTION
// ============================================

async function extractTypoWithAI(jiraInfo: JiraInfo): Promise<TypoExtractionResult> {
  console.log('\n🤖 Asking Claude to identify the typo...');
  
  const prompt = `You are analyzing a Jira ticket about a typo in MongoDB documentation.

## Jira Ticket: ${jiraInfo.issueKey}

**Summary:** ${jiraInfo.summary}

**Description:**
${jiraInfo.description}

## Task
Identify the misspelled word and its correction from this ticket.

Return ONLY valid JSON (no markdown, no explanation):
{
  "misspelled": "the typo word exactly as it appears",
  "correction": "the correct spelling",
  "confidence": "high" or "low"
}

If you cannot identify a clear typo and correction, return:
{
  "misspelled": null,
  "correction": null,
  "confidence": "low",
  "reason": "brief explanation"
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = (response.content[0] as { text: string }).text.trim();
    
    // Parse JSON response
    let jsonStr = content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    const result = JSON.parse(jsonStr) as TypoExtractionResult;
    
    if (result.misspelled && result.correction) {
      console.log(`   ✓ Identified: "${result.misspelled}" → "${result.correction}" (${result.confidence} confidence)`);
    } else {
      console.log(`   ✗ Could not identify typo: ${result.reason || 'unknown'}`);
    }
    
    return result;
    
  } catch (err) {
    const error = err as Error;
    console.error('   AI error:', error.message);
    return { misspelled: null, correction: null, confidence: 'low', reason: error.message };
  }
}


// ============================================
// FILE OPERATIONS
// ============================================

async function getFileContent(filePath: string): Promise<FileContent | null> {
  // Try multiple path variations
  const pathsToTry = [filePath];
  
  // If path doesn't have extension, try with .txt
  if (!filePath.match(/\.(txt|rst|md)$/)) {
    pathsToTry.push(`${filePath}.txt`);
  }
  
  for (const path of pathsToTry) {
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: 'main',
      });
      
      // Type guard for file content
      if ('content' in data && 'sha' in data) {
        console.log(`   ✓ Found: ${path}`);
        return {
          path,
          content: Buffer.from(data.content, 'base64').toString('utf-8'),
          sha: data.sha,
        };
      }
    } catch {
      // Continue to next path variation
    }
  }
  
  console.log(`   ✗ Could not fetch: ${filePath}`);
  return null;
}

async function applyFix(
  file: FileContent, 
  fix: Fix, 
  branchName: string, 
  typoInfo: TypoInfo | null
): Promise<boolean> {
  let newContent: string;
  
  // Deterministic fix: replace all occurrences of misspelled word with word boundaries
  if (typoInfo?.misspelled && typoInfo?.correction && fix.occurrences) {
    // Word boundary matching prevents partial word replacements
    const regex = new RegExp(`\\b${escapeRegex(typoInfo.misspelled)}\\b`, 'g');
    newContent = file.content.replace(regex, typoInfo.correction);
  } 
  // AI-suggested fix: replace specific line
  else if (fix.original_line && fix.fixed_line) {
    newContent = file.content.replace(fix.original_line, fix.fixed_line);
  }
  else {
    console.log(`   ⚠️ No fix strategy for ${file.path}`);
    return false;
  }
  
  if (newContent === file.content) {
    console.log(`   ⚠️ No change made to ${file.path}`);
    return false;
  }
  
  // Get current SHA from branch
  const { data: branchFile } = await octokit.repos.getContent({
    owner,
    repo,
    path: file.path,
    ref: branchName,
  });
  
  // Type guard
  if (!('sha' in branchFile)) {
    console.log(`   ⚠️ Could not get SHA for ${file.path}`);
    return false;
  }
  
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: file.path,
    message: `${process.env.ISSUE_KEY}: Fix typo in ${file.path.split('/').pop()}`,
    content: Buffer.from(newContent).toString('base64'),
    sha: branchFile.sha,
    branch: branchName,
  });
  
  const count = fix.occurrences || 1;
  console.log(`   ✓ Fixed ${count} occurrence(s) in ${file.path}`);
  return true;
}

// ============================================
// PR CREATION
// ============================================

async function createPR(typoInfo: TypoInfo, fixes: Fix[]): Promise<PR | null> {
  const branchName = `typo-fix/${typoInfo.issueKey.toLowerCase()}-${Date.now()}`;
  const validFixes = fixes.filter(f => f.found);
  const totalOccurrences = validFixes.reduce((sum, f) => sum + (f.occurrences || 1), 0);
  
  if (DRY_RUN) {
    console.log('\n🧪 DRY RUN - Would create PR:');
    console.log(`   Branch: ${branchName}`);
    console.log(`   Files: ${validFixes.length}`);
    console.log(`   Total occurrences: ${totalOccurrences}`);
    for (const fix of validFixes) {
      console.log(`\n   📄 ${fix.file}`);
      if (fix.occurrences) {
        console.log(`      ${fix.occurrences} occurrence(s) of "${typoInfo.misspelled}" → "${typoInfo.correction}"`);
        if (fix.matchingLines) {
          for (const line of fix.matchingLines.slice(0, 2)) {
            console.log(`      Line ${line.lineNum}: ${line.content.substring(0, 60)}...`);
          }
        }
      } else {
        console.log(`      - "${fix.original_line}"`);
        console.log(`      + "${fix.fixed_line}"`);
      }
    }
    return { html_url: '(dry run)', number: 0 };
  }
  
  console.log(`\n📝 Creating PR on branch: ${branchName}`);
  
  // Get main branch SHA
  const { data: mainRef } = await octokit.git.getRef({
    owner,
    repo,
    ref: 'heads/main',
  });
  
  // Create branch
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: mainRef.object.sha,
  });
  
  console.log('   Created branch');
  
  // Apply fixes
  let fixCount = 0;
  let totalFixed = 0;
  for (const fix of fixes) {
    if (!fix.found || !fix.file) continue;
    
    const file = await getFileContent(fix.file);
    if (file && await applyFix(file, fix, branchName, typoInfo)) {
      fixCount++;
      totalFixed += fix.occurrences || 1;
    }
  }
  
  if (fixCount === 0) {
    console.log('   No fixes applied, cleaning up branch');
    await octokit.git.deleteRef({ owner, repo, ref: `heads/${branchName}` });
    return null;
  }
  
  // Create PR
  const prTitle = `${typoInfo.issueKey}: Fix typo${typoInfo.misspelled ? ` "${typoInfo.misspelled}" → "${typoInfo.correction}"` : ''}`;
  
  // Build detailed change list
  const changeList = fixes.filter(f => f.found).map(f => {
    const count = f.occurrences ? ` (${f.occurrences}x)` : '';
    return `- \`${f.file}\`${count}`;
  }).join('\n');
  
  const prBody = `## Summary
Automated typo fix for ${typoInfo.issueKey}

${typoInfo.misspelled ? `**Typo:** \`${typoInfo.misspelled}\` → \`${typoInfo.correction}\`\n` : ''}
**Files updated:** ${fixCount}
**Total occurrences fixed:** ${totalFixed}
${typoInfo.urls.length > 0 ? `\n**Reported page:** ${typoInfo.urls[0]}` : ''}

## Jira Ticket
[${typoInfo.issueKey}](https://jira.mongodb.org/browse/${typoInfo.issueKey})

## Files Changed
${changeList}

---
<sub>🤖 Generated by Typo Fixer Bot</sub>`;

  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    title: prTitle,
    body: prBody,
    head: branchName,
    base: 'main',
  });
  
  console.log(`\n✅ Created PR #${pr.number}: ${pr.html_url}`);
  return { html_url: pr.html_url, number: pr.number };
}

// ============================================
// FILE FILTERING (lessons from docs-typo-scanner)
// ============================================

function shouldProcessFile(filePath: string): FileCheck {
  // Check for skip paths (includes, changelogs, etc.)
  for (const skipPath of SKIP_PATHS) {
    if (filePath.includes(skipPath)) {
      return { process: false, reason: `Skipped path: ${skipPath}` };
    }
  }
  
  // Check extension
  const ext = '.' + filePath.split('.').pop()?.toLowerCase();
  
  if (SKIP_EXTENSIONS.includes(ext)) {
    return { process: false, reason: `Skipped extension: ${ext}` };
  }
  
  // For allowed extensions, proceed
  if (ALLOWED_EXTENSIONS.includes(ext)) {
    return { process: true };
  }
  
  // Unknown extension - skip to be safe
  return { process: false, reason: `Unknown extension: ${ext}` };
}

// ============================================
// DETERMINISTIC FIX (when we know the exact typo)
// ============================================

async function fixAllOccurrences(typoInfo: TypoInfo): Promise<Fix[] | null> {
  console.log(`\n🔧 Fixing all occurrences of "${typoInfo.misspelled}" → "${typoInfo.correction}"`);
  
  // Search for all files containing the typo (with retry for rate limits)
  let allFiles: string[] = [];
  try {
    const { data } = await withRetry(
      () => octokit.search.code({
        q: `${typoInfo.misspelled} repo:${owner}/${repo} path:${DOCS_CONTENT_PATH}`,
        per_page: 100,
      }),
      'GitHub code search'
    );
    allFiles = data.items.map(item => item.path);
    console.log(`   Found ${allFiles.length} file(s) containing "${typoInfo.misspelled}"`);
  } catch (err) {
    const error = err as Error;
    console.log(`   Search error: ${error.message}`);
    console.log('   ⚠️ If rate limited, try again in a few minutes');
    return null;
  }
  
  if (allFiles.length === 0) {
    return null;
  }
  
  // Filter files using lessons learned
  const filesToProcess: string[] = [];
  const skippedFiles: Array<{ path: string; reason: string }> = [];
  
  for (const filePath of allFiles) {
    const check = shouldProcessFile(filePath);
    if (check.process) {
      filesToProcess.push(filePath);
    } else {
      skippedFiles.push({ path: filePath, reason: check.reason || 'Unknown' });
    }
  }
  
  if (skippedFiles.length > 0) {
    console.log(`   ⏭️  Skipped ${skippedFiles.length} file(s):`);
    for (const skip of skippedFiles.slice(0, 5)) {
      console.log(`      - ${skip.path} (${skip.reason})`);
    }
    if (skippedFiles.length > 5) {
      console.log(`      ... and ${skippedFiles.length - 5} more`);
    }
  }
  
  if (filesToProcess.length === 0) {
    console.log('   No eligible files to process');
    return null;
  }
  
  // Safety limit
  if (filesToProcess.length > MAX_FILES_PER_PR) {
    console.log(`   ⚠️  Limiting to ${MAX_FILES_PER_PR} files (found ${filesToProcess.length})`);
    filesToProcess.length = MAX_FILES_PER_PR;
  }
  
  console.log(`   Processing ${filesToProcess.length} file(s)...`);
  
  // Process each file
  const fixes: Fix[] = [];
  for (const filePath of filesToProcess) {
    const file = await getFileContent(filePath);
    if (!file) continue;
    
    // Use word boundary matching to avoid partial word replacements
    // e.g., "config" shouldn't match inside "configuration"
    const wordBoundaryRegex = new RegExp(`\\b${escapeRegex(typoInfo.misspelled)}\\b`, 'g');
    const matches = file.content.match(wordBoundaryRegex);
    
    if (matches && matches.length > 0) {
      // Find the lines containing the typo for the PR description
      const lines = file.content.split('\n');
      const matchingLines: MatchingLine[] = [];
      lines.forEach((line, idx) => {
        if (wordBoundaryRegex.test(line)) {
          matchingLines.push({ lineNum: idx + 1, content: line.trim() });
        }
        // Reset regex lastIndex after test
        wordBoundaryRegex.lastIndex = 0;
      });
      
      fixes.push({
        found: true,
        file: file.path,
        occurrences: matches.length,
        matchingLines: matchingLines.slice(0, 3),
        explanation: `Fixed ${matches.length} occurrence(s) of "${typoInfo.misspelled}" → "${typoInfo.correction}"`,
      });
      
      console.log(`   ✓ ${file.path}: ${matches.length} occurrence(s)`);
    }
  }
  
  return fixes.length > 0 ? fixes : null;
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// MAIN
// ============================================

async function main(): Promise<void> {
  console.log('🔤 Typo Fixer Bot\n');
  
  // Get Jira ticket info
  const jiraInfo = getJiraInfo();
  
  if (!jiraInfo.issueKey) {
    throw new Error('No issue key provided');
  }
  
  // Ask Claude to identify the typo from the ticket
  const typoResult = await extractTypoWithAI(jiraInfo);
  
  if (!typoResult.misspelled || !typoResult.correction) {
    console.log('\n❌ Could not identify typo from Jira ticket');
    console.log('   Manual review may be needed');
    process.exit(1);
  }
  
  // Build typoInfo for the rest of the functions
  const typoInfo: TypoInfo = {
    ...jiraInfo,
    misspelled: typoResult.misspelled,
    correction: typoResult.correction,
  };
  
  // Do deterministic fix across all files
  const fixes = await fixAllOccurrences(typoInfo);
  
  if (!fixes || fixes.length === 0) {
    console.log(`\n❌ No occurrences of "${typoInfo.misspelled}" found in repo`);
    console.log('   The typo may have already been fixed, or the word is spelled differently');
    process.exit(1);
  }
  
  // Create PR with fixes
  const pr = await createPR(typoInfo, fixes);
  
  if (!pr) {
    console.log('\n❌ No PR created - fixes could not be applied');
    process.exit(1);
  }
}

main().catch(error => {
  const err = error as Error;
  console.error('❌ Error:', err.message);
  process.exit(1);
});
