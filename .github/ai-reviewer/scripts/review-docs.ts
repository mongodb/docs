import Anthropic from '@anthropic-ai/sdk';
import { Octokit } from '@octokit/rest';
import { readFileSync, appendFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import YAML from 'yaml';

// =============================================================================
// TYPES
// =============================================================================

interface Config {
  ai: {
    model: string;
    fallback_model: string;
    max_tokens: number;
  };
  review: {
    include_patterns: string[];
    exclude_patterns: string[];
    max_files: number;
  };
  feedback: {
    granularity: string;
    max_inline_comments: number;
  };
}

interface Guidelines {
  seoGuidelines: string;
  styleGuide: string;
  nestedComponentsGuide: string;
}

interface PRFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch?: string;
}

interface PRData {
  head: {
    sha: string;
  };
}

interface ReviewComment {
  file: string;
  line?: number;
  severity: 'high' | 'medium' | 'low';
  category: 'seo' | 'style' | 'typo' | 'clarity' | 'structure' | 'nested';
  issue: string;
  suggestion: string;
  original_text?: string;
}

interface AIReview {
  summary: string;
  overall_quality: 'good' | 'needs_work' | 'significant_issues';
  comments: ReviewComment[];
  praise: string[];
}

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
}

interface RetryableError extends Error {
  status?: number;
  headers?: Record<string, string>;
}

// =============================================================================
// SETUP
// =============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate required environment variables
function validateEnvironment(): void {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY.\n' +
      'Add it as a repository secret: Settings → Secrets → Actions → New repository secret');
  }
  
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('Missing GITHUB_TOKEN.\n' +
      'This should be provided automatically by GitHub Actions via ${{ secrets.GITHUB_TOKEN }}');
  }
}

// Write to GitHub Actions summary (if available)
function writeToSummary(content: string): void {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    try {
      appendFileSync(summaryFile, content + '\n');
    } catch {
      // Ignore - not in GitHub Actions
    }
  }
}

// Sleep helper for retries
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper with exponential backoff
async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 30000 } = options;
  let lastError: Error | undefined;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const error = err as RetryableError;
      lastError = error;
      
      // Don't retry on certain errors
      const noRetryStatuses = [400, 401, 403, 404, 422];
      if (error.status && noRetryStatuses.includes(error.status)) {
        throw error;
      }
      
      // Rate limit - use Retry-After header if available
      if (error.status === 429) {
        const retryAfter = error.headers?.['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : baseDelay * Math.pow(2, attempt);
        console.log(`   ⏳ Rate limited. Waiting ${waitTime/1000}s before retry ${attempt}/${maxRetries}...`);
        await sleep(Math.min(waitTime, maxDelay));
        continue;
      }
      
      // Other retryable errors
      if (attempt < maxRetries) {
        const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
        console.log(`   ⚠️ Attempt ${attempt} failed: ${error.message}. Retrying in ${delay/1000}s...`);
        await sleep(delay);
      }
    }
  }
  
  throw lastError!;
}

// Validate environment on load
validateEnvironment();

// Initialize clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Model preferences in order (best to fallback)
const MODEL_PREFERENCES = [
  'claude-sonnet-4-20250514',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-sonnet-latest',
  'claude-3-sonnet-20240229',
];

// =============================================================================
// MODEL SELECTION
// =============================================================================

async function getAvailableModel(configModel: string): Promise<string> {
  try {
    console.log('   Checking available models...');
    const response = await fetch('https://api.anthropic.com/v1/models', {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
    });
    
    if (!response.ok) {
      console.log('   ⚠️ Could not fetch models list, using config model');
      return configModel;
    }
    
    const data = await response.json() as { data: Array<{ id: string }> };
    const availableIds = new Set(data.data.map(m => m.id));
    
    // First check if config model is available
    if (availableIds.has(configModel)) {
      console.log(`   ✓ Using configured model: ${configModel}`);
      return configModel;
    }
    
    // Otherwise find best available from preferences
    for (const model of MODEL_PREFERENCES) {
      if (availableIds.has(model)) {
        console.log(`   ✓ Config model unavailable, using: ${model}`);
        return model;
      }
    }
    
    // Last resort: use first available model that looks like sonnet
    const sonnetModel = data.data.find(m => m.id.includes('sonnet'));
    if (sonnetModel) {
      console.log(`   ✓ Using discovered model: ${sonnetModel.id}`);
      return sonnetModel.id;
    }
    
    console.log('   ⚠️ No suitable model found, trying config model anyway');
    return configModel;
  } catch (error) {
    const err = error as Error;
    console.log(`   ⚠️ Error checking models: ${err.message}, using config model`);
    return configModel;
  }
}

// =============================================================================
// CONFIGURATION & DATA LOADING
// =============================================================================

function loadConfig(): Config {
  const configPath = join(__dirname, '..', 'config.yml');
  const configContent = readFileSync(configPath, 'utf-8');
  return YAML.parse(configContent) as Config;
}

function loadGuidelines(): Guidelines {
  const seoPath = join(__dirname, '..', 'seo-guidelines.md');
  const stylePath = join(__dirname, '..', 'style-guide-reference.md');
  const nestedPath = join(__dirname, '..', 'nested-components-guide.md');
  
  const seoGuidelines = readFileSync(seoPath, 'utf-8');
  const styleGuide = readFileSync(stylePath, 'utf-8');
  const nestedComponentsGuide = readFileSync(nestedPath, 'utf-8');
  
  return { seoGuidelines, styleGuide, nestedComponentsGuide };
}

async function getPRDetails(owner: string, repo: string, prNumber: number): Promise<{ pr: PRData; files: PRFile[] }> {
  return withRetry(async () => {
    const { data: pr } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });
    
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
    });
    
    return { pr: pr as PRData, files: files as PRFile[] };
  });
}

function filterFiles(files: PRFile[], config: Config): PRFile[] {
  const includePatterns = config.review.include_patterns.map(p => 
    new RegExp(p.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
  );
  const excludePatterns = config.review.exclude_patterns.map(p => 
    new RegExp(p.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
  );
  
  return files.filter(file => {
    const matchesInclude = includePatterns.some(p => p.test(file.filename));
    const matchesExclude = excludePatterns.some(p => p.test(file.filename));
    return matchesInclude && !matchesExclude;
  }).slice(0, config.review.max_files);
}

// =============================================================================
// PROMPT BUILDING
// =============================================================================

function buildPrompt(files: PRFile[], guidelines: Guidelines, config: Config, reviewMode: string): string {
  const { seoGuidelines, styleGuide, nestedComponentsGuide } = guidelines;
  
  const filesContent = files.map(file => {
    return `
### File: ${file.filename}
Status: ${file.status}
Changes: +${file.additions} -${file.deletions}

\`\`\`diff
${file.patch || '(binary file or no changes)'}
\`\`\`
`;
  }).join('\n');
  
  const isStyleOnly = reviewMode === 'style';
  const isFull = reviewMode === 'full';
  
  const modeInstructions = isStyleOnly 
    ? `## Review Focus: Writing Style & Clarity

NOTE: The deterministic linter handles SEO and syntax issues. 
You should focus ONLY on:
- Writing clarity and readability
- Active vs passive voice
- Terminology consistency
- Sentence structure
- Audience appropriateness
- Flow and organization

Skip: SEO issues (title length, meta length), syntax errors, nested components - the linter catches those.`
    : isFull
    ? `## Review Focus: Full Style Guide

Check for ALL issues:
- Writing style and clarity
- Terminology consistency
- Active voice usage
- Audience appropriateness
- Plus any SEO or syntax issues you notice`
    : `## Review Focus: Critical Issues

Check for:
- SEO: titles outside 30-60 chars, meta descriptions outside 150-200 chars
- Nested components (not allowed)
- Broken syntax
Skip: style/clarity suggestions`;

  return `You are an expert technical writing reviewer for MongoDB documentation.

${modeInstructions}

## Your Guidelines

### SEO Guidelines:
${seoGuidelines}

### Nested Components Guidelines (NOT allowed):
${nestedComponentsGuide}
${isStyleOnly || isFull ? `
### Style Guide Reference:
${styleGuide}` : ''}

## Review Instructions

**IMPORTANT: Writers experience cognitive overload during PR reviews.** They're already checking markup, build logs, staging, and other checks. Your feedback must be:
- **Minimal**: Only flag definite problems that MUST be fixed
- **Actionable**: Every comment should have a clear fix
- **Concise**: Keep comments short and direct

1. **ONLY flag HIGH severity issues** - things that are definitely wrong and need fixing:
   - Broken or malformed syntax (like malformed :ref: directives)
   - Missing required elements (no H1, missing meta)
   - Nested components (these are NOT allowed)
   - Clear SEO violations (but ONLY if the PR touches that content - see rule 4)

2. **DO NOT flag**:
   - Minor style suggestions
   - "Nice to have" improvements  
   - Issues in content the PR didn't touch
   - Anything subjective or debatable

3. **Be concise**: One sentence for the issue, one sentence for the fix. No lengthy explanations.

4. **Check ALL files in the PR** - the writer requested this review.

5. **Nested components are always HIGH priority** (flag these regardless):
   - Admonitions inside admonitions
   - Admonitions inside tables
   - Examples inside admonitions or tables
   - Procedures inside procedures
   - Tables inside tables

6. **Report all issues found**. Don't limit yourself - if there are 10 problems, report 10 problems.

7. **Format your response as JSON** with this structure:
\`\`\`json
{
  "summary": "A 2-3 sentence overall assessment of the PR",
  "overall_quality": "good|needs_work|significant_issues",
  "comments": [
    {
      "file": "path/to/file.rst",
      "line": 42,
      "severity": "high|medium|low",
      "category": "seo|style|typo|clarity|structure|nested",
      "issue": "Brief description of the issue",
      "suggestion": "How to fix it",
      "original_text": "The problematic text (if applicable)"
    }
  ],
  "praise": ["List of things done well (1-3 items)"]
}
\`\`\`

## Files to Review

${filesContent}

Now review these changes and provide your feedback as JSON.

**Remember: Less is more.** Only flag definite issues that must be fixed. Aim for 0-5 comments. If the PR looks good, say so - that's valuable feedback too! Writers are already overwhelmed with things to check.`;
}

// =============================================================================
// AI REVIEW
// =============================================================================

async function getAIReview(prompt: string, config: Config): Promise<AIReview> {
  // Check prompt size (rough token estimate: ~4 chars per token)
  const estimatedTokens = Math.ceil(prompt.length / 4);
  if (estimatedTokens > 100000) {
    console.log(`   ⚠️ Warning: Large prompt (~${estimatedTokens} tokens). May hit limits.`);
    writeToSummary(`⚠️ Warning: Large diff size (~${estimatedTokens} estimated tokens)`);
  }
  
  const model = await getAvailableModel(config.ai.model);
  
  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: model,
      max_tokens: config.ai.max_tokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    
    const content = (response.content[0] as { text: string }).text;
    
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || 
                      content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr) as AIReview;
    }
    
    throw new Error('Could not parse AI response as JSON');
  }, { maxRetries: 2 });
}

// =============================================================================
// GITHUB POSTING
// =============================================================================

async function postReview(
  owner: string, 
  repo: string, 
  prNumber: number, 
  pr: PRData, 
  review: AIReview, 
  config: Config
): Promise<void> {
  const comments: Array<{ path: string; line: number; body: string }> = [];
  
  for (const comment of review.comments.slice(0, config.feedback.max_inline_comments)) {
    if (comment.line && comment.file) {
      const severityEmoji: Record<string, string> = {
        high: '🔴',
        medium: '🟡', 
        low: '🟢'
      };
      
      const categoryLabel: Record<string, string> = {
        seo: 'SEO',
        style: 'Style Guide',
        typo: 'Typo',
        clarity: 'Clarity',
        structure: 'Structure',
        nested: 'Nested Component'
      };
      
      comments.push({
        path: comment.file,
        line: comment.line,
        body: `${severityEmoji[comment.severity] || '💬'} **${categoryLabel[comment.category] || comment.category}**: ${comment.issue}

**Fix:** ${comment.suggestion}`
      });
    }
  }
  
  const qualityEmoji: Record<string, string> = {
    good: '✅',
    needs_work: '⚠️',
    significant_issues: '🚨'
  };
  
  let summaryBody: string;
  
  if (review.comments.length === 0) {
    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review: Looks good!** No issues found.`;
  } else {
    const issueList = review.comments.map(c => {
      const emoji: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
      return `- ${emoji[c.severity] || '💬'} ${c.issue}`;
    }).join('\n');
    
    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review** - ${review.comments.length} issue${review.comments.length === 1 ? '' : 's'} found:

${issueList}

<sub>See inline comments for details. Advisory only.</sub>`;
  }

  try {
    await withRetry(async () => {
      await octokit.pulls.createReview({
        owner,
        repo,
        pull_number: prNumber,
        commit_id: pr.head.sha,
        body: summaryBody,
        event: 'COMMENT',
        comments: comments.filter(c => c.line > 0),
      });
    });
    
    console.log('✅ Review posted successfully!');
  } catch {
    console.log('⚠️ Could not post inline comments, posting summary only...');
    
    await withRetry(async () => {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: summaryBody,
      });
    });
    
    console.log('✅ Summary comment posted successfully!');
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  console.log('🚀 Starting AI Documentation Review...\n');
  
  const owner = process.env.REPO_OWNER;
  const repo = process.env.REPO_NAME;
  const prNumber = parseInt(process.env.PR_NUMBER || '0', 10);
  const dryRun = process.env.DRY_RUN === 'true';
  const reviewMode = process.env.REVIEW_MODE || 'critical';
  
  if (dryRun) {
    console.log('🧪 DRY RUN MODE - Will not post to GitHub\n');
  }
  
  console.log(`📋 Review mode: ${reviewMode.toUpperCase()}\n`);
  
  if (!owner || !repo || !prNumber) {
    throw new Error('Missing required environment variables: REPO_OWNER, REPO_NAME, PR_NUMBER');
  }
  
  console.log(`📋 Reviewing PR #${prNumber} in ${owner}/${repo}\n`);
  
  const config = loadConfig();
  const guidelines = loadGuidelines();
  
  console.log('📚 Loaded configuration and guidelines\n');
  
  const { pr, files } = await getPRDetails(owner, repo, prNumber);
  console.log(`📁 Found ${files.length} changed files\n`);
  
  const filesToReview = filterFiles(files, config);
  
  if (filesToReview.length === 0) {
    console.log('ℹ️ No documentation files to review in this PR');
    
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: '🤖 **AI Documentation Review**\n\nNo documentation files (`.rst`, `.md`, `.txt`) found in this PR. Skipping review.',
    });
    
    return;
  }
  
  console.log(`📝 Reviewing ${filesToReview.length} documentation files:\n`);
  filesToReview.forEach(f => console.log(`   - ${f.filename}`));
  console.log();
  
  const prompt = buildPrompt(filesToReview, guidelines, config, reviewMode);
  
  console.log('🤖 Requesting AI review...\n');
  const review = await getAIReview(prompt, config);
  
  console.log(`📊 AI found ${review.comments.length} issues\n`);
  console.log(`   Quality: ${review.overall_quality}\n`);
  
  const summaryEmoji: Record<string, string> = { good: '✅', needs_work: '⚠️', significant_issues: '🚨' };
  writeToSummary(`## ${summaryEmoji[review.overall_quality] || '📝'} AI Documentation Review\n`);
  writeToSummary(`**PR:** #${prNumber} | **Quality:** ${review.overall_quality} | **Issues:** ${review.comments.length}\n`);
  if (review.comments.length > 0) {
    writeToSummary(`\n| Severity | Category | File | Issue |\n|----------|----------|------|-------|\n`);
    review.comments.forEach(c => {
      const emoji: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
      writeToSummary(`| ${emoji[c.severity] || '💬'} ${c.severity} | ${c.category} | \`${c.file}\` | ${c.issue} |`);
    });
  }
  
  if (dryRun) {
    console.log('━'.repeat(60));
    console.log('📋 REVIEW OUTPUT (not posted):\n');
    console.log(`Summary: ${review.summary}\n`);
    
    if (review.comments.length === 0) {
      console.log('✅ No issues found! PR looks good.\n');
    } else {
      console.log(`Issues (${review.comments.length}):\n`);
      review.comments.forEach(c => {
        const emoji: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
        console.log(`${emoji[c.severity] || '💬'} [${c.category}] ${c.file}:${c.line || '?'}`);
        console.log(`   ${c.issue}`);
        console.log(`   Fix: ${c.suggestion}\n`);
      });
    }
    console.log('━'.repeat(60));
    console.log('\n✅ Dry run complete! Use --post to post to GitHub.');
    return;
  }
  
  await postReview(owner, repo, prNumber, pr, review, config);
}

main().catch(async error => {
  const err = error as Error;
  console.error('❌ Error:', err.message);
  
  writeToSummary(`## ❌ AI Review Failed\n\n\`\`\`\n${err.message}\n\`\`\``);
  
  try {
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    const prNumber = parseInt(process.env.PR_NUMBER || '0', 10);
    
    if (owner && repo && prNumber && process.env.DRY_RUN !== 'true') {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: `⚠️ **AI Review encountered an error**

The automated review could not complete. This doesn't block your PR.

<details>
<summary>Error details</summary>

\`\`\`
${err.message}
\`\`\`

</details>

<sub>You can re-run by removing and re-adding the review label.</sub>`,
      });
      console.log('📝 Posted failure notice to PR');
    }
  } catch (commentError) {
    const cerr = commentError as Error;
    console.error('Could not post failure comment:', cerr.message);
  }
  
  process.exit(1);
});
