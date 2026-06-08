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

**IMPORTANT: Do NOT flag anything already caught by the deterministic linters or Vale. These tools run on every PR and will surface these issues separately.**

The following are already handled — skip them entirely:

*SEO linter:* title length, meta description length
*Nested components linter:* admonitions or tables nested inside each other
*404 linter:* broken external links

*Vale (all 52 active rules — do not re-flag any of these):*
- Abbreviations: unspelled-out acronyms on first use
- AbbreviationsPeriods: periods in acronyms/initialisms
- Accessibility: non-descriptive link text
- Adverbs: unnecessary adverbs
- AmbiguousPronouns: sentences starting with ambiguous "This" or "That"
- Ampersands: "&" instead of "and" in prose
- Anthropomorphism: attributing human qualities to software
- AvoidAccessible: misuse of "accessible"
- AvoidFirstPerson: first-person pronouns ("I", "we", "our")
- AvoidFutureTense: future tense ("will + verb")
- AvoidObscure: Latin abbreviations ("i.e.", "e.g.", "etc.")
- AvoidPastTense: past tense in descriptive content
- AvoidSubjunctive: subjunctive mood ("would", "should", "could" expressing uncertainty)
- AvoidSupported: unsupported claims about supported software
- AvoidTerms: specific banned terms
- AvoidWithSubstitution: word substitutions ("argument" → "option", etc.)
- But: paragraphs starting with "But"
- Careful: terms requiring verified usage ("following", "on", etc.)
- ClickHereLinks: "click here" as link text
- Colons: colons after incomplete sentences
- CommaNonRestrictiveClause: missing comma with non-restrictive clauses
- CommaOxford: missing Oxford comma
- CommaQuotation: comma placement with embedded quotations
- CommaRestrictiveClause: comma before restrictive "that" clauses
- ComplexWords: complex word substitutions ("modify" → "change", etc.)
- ConciseTerms: wordy phrases ("in order to" → "to", "is able to" → "can", "a number of" → "several", etc.)
- ConsistencyEarlierLater: "earlier/later" vs "above/below" for version references
- Contractions: non-standard or obscure contractions
- ContractionsNegative: "does not" → "doesn't", "is not" → "isn't", etc.
- Dashes: en dash used where em dash is required
- DashesSpaces: whitespace around dashes
- Dates: non-standard date formatting
- Ellipsis: ellipses in prose
- ExpletiveConstruct: "It is", "There is", "There are" constructions
- GenderBias: gendered pronouns
- Girls: "girls" or "boys" used to describe adults
- GlobalAudienceIdioms: idiomatic expressions unfamiliar to global audiences
- GlobalAudienceMetaphorical: metaphorical language
- GlobalAudienceNonOppressiveLanguage: oppressive language
- Hyphen: missing hyphens with "self-" prefix
- Interjections: exclamation points in documentation
- NegativeWords: negative framing where positive phrasing is preferred
- Numbers: number formatting (numerals vs. spelled-out)
- PossessiveAbbreviations: apostrophes in plural abbreviations
- ProductNames: incorrect MongoDB product name formatting
- Semicolons: semicolons in prose
- SentenceLength: sentences over 25 words
- Simplicity: "simply", "easy", "easily", "just"
- SingleQuotes: single quotes in prose
- Slashes: slashes where "or" should be used
- ThatWhich: "which" in restrictive clauses, "that" in non-restrictive clauses
- TitlesEnd: punctuation at the end of headings
- Wordiness: nominalization ("perform an installation" → "install", etc.)

**Flag ONLY issues that pattern-matching tools cannot catch:**
1. **Wrong voice**: "the user", "the developer", or any third-person reference where second-person "you" is required
2. **Passive voice**: "to be" + past participle constructions ("is saved", "has been installed", "can be restarted") — rewrite with an active subject
3. **Vague quantifiers**: always flag "various". Flag "some", "many", "several" when a specific count or enumerated list exists in context. If the same vague quantifier appears multiple times in one file, report it once and note it recurs — do not create a separate comment for each occurrence.
4. **Wrong admonition type**: \`.. warning::\` is correct ONLY for data loss, irreversible actions, or security vulnerabilities. Performance tips and best practices belong in \`.. tip::\`. Supplemental information belongs in \`.. note::\`. Essential prerequisites belong in \`.. important::\`. Flag any \`.. warning::\` whose content does not describe data loss, a destructive operation, or a security risk.
5. **Stacked admonitions**: two or more consecutive notes, tips, warnings, or important blocks — combine into one or move to a dedicated section
6. **Non-parallel list items**: list items that don't follow the same grammatical form (e.g., mixing imperative verbs with noun phrases)
7. **List introduction issues**: any sentence that introduces a bulleted or numbered list must end with a colon. Flag: a missing colon (e.g., "Set up your environment using these steps" with no trailing colon), "do the following" used as an introduction, or an introduction that counts the items ("the following three methods").
8. **Cross-reference structure**: flag any sentence that opens with "See :ref:", "See :doc:", or "Refer to :ref:" followed by "to learn", "to understand", "for more information", or similar. Correct form puts the reason first: "To learn about X, see :ref:\`foo\`."
9. **Broken RST directives**: malformed :ref:, :method:, :class:, or other inline roles where the syntax is wrong — e.g., \`:method:collection.insertOne\` instead of \`:method:\`collection.insertOne\`\`
10. **Heading capitalization**: headings must use AP headline style. Scan every word in every heading. Capitalize: nouns, verbs, adjectives, adverbs, and the first and last word regardless of part of speech. Lowercase: articles (a, an, the), coordinating conjunctions (and, but, or, for, nor, so, yet), and prepositions (to, of, in, on, at, by, for, with, about, from, as, into, through, etc.) when they appear mid-heading. Example violation: "Performance And Tuning" — "And" is a coordinating conjunction and must be lowercase: "Performance and Tuning".
11. **List item punctuation consistency**: scan every item in a list and check end punctuation. If ANY item ends with a period, ALL items must end with a period. If NO item ends with a period, none should. Flag the list if some items end with a period and others do not — e.g., "Install the driver." followed by "Copy your connection string" (no period) is a violation.
12. **List items starting with articles**: list items must not begin with "a", "an", or "the".

**Additional instructions:**
- **Actionable**: Every comment must have a clear, specific fix
- **Concise**: One sentence for the issue, one sentence for the fix
- **No duplicates**: Report each distinct issue once per file, even if the same pattern recurs. Note recurrence in the single comment rather than filing multiple comments.
- **Never re-flag Vale rules**: The Simplicity rule covers "simply", "easy", "easily", "just" — never flag these words regardless of context. The full list of 52 Vale rules above are off-limits even when they appear alongside other issues.
- **Check ALL files in the PR** - the writer requested this review
- **Report all applicable issues found** — if there are 10 problems in the categories above, report all 10

**Format your response as JSON** with this structure:
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

interface ExistingAIComment {
  type: 'issue_comment' | 'pr_review';
  id: number;
}

async function findExistingAIComment(
  owner: string,
  repo: string,
  prNumber: number
): Promise<ExistingAIComment | null> {
  // Check issue comments first (canonical location for new runs)
  const { data: issueComments } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: prNumber,
    per_page: 100,
  });
  const existingIssueComment = issueComments.find(
    c =>
      c.user?.login === 'github-actions[bot]' &&
      c.body?.includes('**AI Review')
  );
  if (existingIssueComment) {
    return { type: 'issue_comment', id: existingIssueComment.id };
  }

  // Fall back to PR reviews (legacy location from older runs)
  const { data: reviews } = await octokit.pulls.listReviews({
    owner,
    repo,
    pull_number: prNumber,
    per_page: 100,
  });
  const existingReview = reviews.find(
    r =>
      r.user?.login === 'github-actions[bot]' &&
      r.body?.includes('**AI Review')
  );
  if (existingReview) {
    return { type: 'pr_review', id: existingReview.id };
  }

  return null;
}

function getValidDiffLines(patch: string): Set<number> {
  const validLines = new Set<number>();
  let currentLine = 0;
  for (const line of patch.split('\n')) {
    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunkMatch) {
      currentLine = parseInt(hunkMatch[1], 10) - 1;
    } else if (line.startsWith('+')) {
      currentLine++;
      validLines.add(currentLine);
    } else if (!line.startsWith('-')) {
      currentLine++;
      validLines.add(currentLine);
    }
  }
  return validLines;
}

function resolveLineFromText(originalText: string, patch: string): number | null {
  if (!originalText || !patch) return null;
  const needle = originalText.trim();
  let currentLine = 0;
  for (const line of patch.split('\n')) {
    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunkMatch) {
      currentLine = parseInt(hunkMatch[1], 10) - 1;
    } else if (line.startsWith('-')) {
      // deleted line — skip, don't increment
    } else {
      currentLine++;
      const content = line.startsWith('+') ? line.slice(1) : line;
      if (content.includes(needle)) {
        return currentLine;
      }
    }
  }
  return null;
}

async function postReview(
  owner: string,
  repo: string,
  prNumber: number,
  pr: PRData,
  review: AIReview,
  config: Config,
  files: PRFile[]
): Promise<void> {
  const validLinesByFile = new Map<string, Set<number>>();
  for (const file of files) {
    if (file.patch) {
      validLinesByFile.set(file.filename, getValidDiffLines(file.patch));
    }
  }

  const comments: Array<{ path: string; line: number; side: string; body: string }> = [];

  const patchByFile = new Map<string, string>();
  for (const file of files) {
    if (file.patch) {
      patchByFile.set(file.filename, file.patch);
    }
  }

  for (const comment of review.comments.slice(0, config.feedback.max_inline_comments)) {
    if (comment.file) {
      const patch = patchByFile.get(comment.file);
      const validLines = validLinesByFile.get(comment.file);

      // Resolve line from original_text first; fall back to AI-reported line
      let resolvedLine = comment.original_text && patch
        ? resolveLineFromText(comment.original_text, patch)
        : null;
      console.log(`   🔍 ${comment.file}: original_text="${comment.original_text}" → resolvedLine=${resolvedLine}, AI line=${comment.line}`);
      if (!resolvedLine) resolvedLine = comment.line ?? null;

      if (!resolvedLine || !validLines || !validLines.has(resolvedLine)) {
        console.log(`   ⚠️ Skipping inline comment for ${comment.file}:${resolvedLine} (not in diff)`);
        continue;
      }
      comment.line = resolvedLine;

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
        side: 'RIGHT',
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

  const lastUpdated = new Date().toUTCString();
  const rerequestPrompt = `<sub>This comment is updated with each new review. Last reviewed: ${lastUpdated}. Once you've addressed the feedback, add or re-add the \`ai-review-style\` label to request a new review.</sub>`;

  if (review.comments.length === 0) {
    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review: Looks good!** No issues found.

${rerequestPrompt}`;
  } else {
    const commentsByFile = new Map<string, ReviewComment[]>();
    for (const c of review.comments) {
      const file = c.file || 'unknown';
      if (!commentsByFile.has(file)) commentsByFile.set(file, []);
      commentsByFile.get(file)!.push(c);
    }
    const issueList = Array.from(commentsByFile.entries()).map(([file, fileComments]) => {
      const emoji: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
      const items = fileComments.map(c => `  - ${emoji[c.severity] || '💬'} ${c.issue}`).join('\n');
      return `**\`${file}\`**\n${items}`;
    }).join('\n\n');

    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review** - ${review.comments.length} issue${review.comments.length === 1 ? '' : 's'} found:

${issueList}

<sub>See inline comments for details. Advisory only.</sub>

${rerequestPrompt}`;
  }

  // Post inline comments individually so `line`+`side` is used correctly.
  // createReview silently maps `line` to the legacy `position` field, which
  // is a diff offset rather than a file line number and causes comments to
  // land at the wrong location. createReviewComment handles line+side properly.
  const inlineComments = comments.filter(c => c.line > 0);
  let postedCount = 0;
  for (const comment of inlineComments) {
    try {
      await withRetry(async () => {
        await octokit.pulls.createReviewComment({
          owner,
          repo,
          pull_number: prNumber,
          commit_id: pr.head.sha,
          path: comment.path,
          line: comment.line,
          side: comment.side as 'LEFT' | 'RIGHT',
          body: comment.body,
        });
      });
      postedCount++;
    } catch {
      console.log(`⚠️ Could not post inline comment for ${comment.path}:${comment.line}, skipping`);
    }
  }
  if (postedCount > 0) {
    console.log(`✅ Posted ${postedCount} inline comment(s)`);
  }

  // Upsert the summary: edit the existing one wherever it lives, else create it
  const existing = await findExistingAIComment(owner, repo, prNumber);

  await withRetry(async () => {
    if (existing?.type === 'issue_comment') {
      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: existing.id,
        body: summaryBody,
      });
      console.log('✅ Updated existing AI review summary comment');
    } else if (existing?.type === 'pr_review') {
      await octokit.pulls.updateReview({
        owner,
        repo,
        pull_number: prNumber,
        review_id: existing.id,
        body: summaryBody,
      });
      console.log('✅ Updated existing AI review PR review body');
    } else {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: summaryBody,
      });
      console.log('✅ Created AI review summary comment');
    }
  });
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
  
  await postReview(owner, repo, prNumber, pr, review, config, filesToReview);
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
