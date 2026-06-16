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
    max_diff_size: number;
  };
  feedback: {
    granularity: string;
    max_inline_comments: number;
    include_summary: boolean;
  };
}

interface Guidelines {
  styleGuide: string;
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
  category: 'style' | 'typo' | 'clarity' | 'structure';
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
  const stylePath = join(__dirname, '..', 'style-guide-reference.md');
  const styleGuide = readFileSync(stylePath, 'utf-8');
  return { styleGuide };
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

function truncatePatches(files: PRFile[], maxTotalSize: number): PRFile[] {
  let totalSize = 0;
  return files.map(file => {
    if (!file.patch) return file;
    const remaining = maxTotalSize - totalSize;
    if (remaining <= 0) return { ...file, patch: '(diff truncated — total diff size limit reached)' };
    if (file.patch.length > remaining) {
      totalSize += remaining;
      return { ...file, patch: file.patch.slice(0, remaining) + '\n... (truncated)' };
    }
    totalSize += file.patch.length;
    return file;
  });
}

// =============================================================================
// PROMPT BUILDING
// =============================================================================

function buildPrompt(files: PRFile[], guidelines: Guidelines, config: Config, reviewMode: string): string {
  const { styleGuide } = guidelines;

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

NOTE: The deterministic linter handles SEO and nested components — focus ONLY on:
- Writing clarity and readability
- Active vs passive voice
- Terminology consistency
- Sentence structure
- Audience appropriateness
- Flow and organization

Skip: SEO issues (title length, meta length) and nested components - the linter catches those.`
    : isFull
    ? `## Review Focus: Full Style Guide

Check for all issues — both prose quality and structural correctness:
- Writing style and clarity
- Terminology consistency
- Active voice usage
- Audience appropriateness
- Structural issues: cross-reference order, admonition types, list formatting, broken RST directives`
    : `## Review Focus: Critical Issues

Apply all 12 rules. Flag only violations you are absolutely certain about — raise the bar for certainty and skip anything marginal or context-dependent.`;

  return `You are an expert technical writing reviewer for MongoDB documentation.

${modeInstructions}

## Your Guidelines

${isStyleOnly || isFull ? `### Style Guide Reference:
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
1. **Wrong voice**: "the user", "the developer", or any third-person reference where second-person "you" is required.
2. **Passive voice**: "to be" + past participle constructions ("is saved", "has been installed", "can be restarted") — rewrite with an active subject. 
3. **Vague quantifiers**: always flag "various". Flag "some", "many", "several" when a specific count or enumerated list exists in context. If the same vague quantifier appears multiple times in one file, report it once and note it recurs — do not create a separate comment for each occurrence.
4. **Wrong admonition type**: \`.. warning::\` is correct ONLY for data loss, irreversible actions, or security vulnerabilities. Performance tips and best practices belong in \`.. tip::\`. Supplemental information belongs in \`.. note::\`. Essential prerequisites belong in \`.. important::\`. Flag any \`.. warning::\` whose content does not describe data loss, a destructive operation, or a security risk.
5. **Stacked admonitions**: two or more consecutive notes, tips, warnings, or important blocks — combine into one or move to a dedicated section
6. **Non-parallel list items**: list items that don't follow the same grammatical form (e.g., mixing imperative verbs with noun phrases)
7. **List introduction issues**: RST wraps lines at ~72 characters — a single sentence may span multiple consecutive \`+\` diff lines. Reconstruct the full sentence by joining all consecutive non-blank \`+\` lines before checking the final character. Only then: flag if the colon is absent from the last character of the reconstructed sentence immediately before list items begin. Do NOT flag a sentence that contains a colon mid-sentence followed by more prose (e.g., "The tutorial uses two files: an application file and a helpers file." — this is a complete sentence, not a list introduction). Also flag: "do the following" used as an introduction, or an introduction that counts items ("the following three methods").
8. **Cross-reference structure**: flag any sentence that opens with "See :ref:", "See :doc:", or "Refer to :ref:" followed by "to learn", "to understand", "for more information", or similar. Correct form puts the reason first: "To learn about X, see :ref:\`foo\`."
9. **Broken RST directives**: flag inline roles where the content after the role name is not wrapped in backticks. Correct RST role syntax: \`:rolename:\` followed immediately by a backtick, content, then a closing backtick. Examples of violations: \`:method:collection.insertOne\` (content has no backtick wrapper), \`:ref:my-label\` (same issue). Check :ref:, :method:, :class:, :attr:, :option:, and similar roles.
10. **Heading capitalization**: headings must use AP headline style. Scan every word in every heading. Capitalize: nouns, verbs, adjectives, adverbs, and the first and last word regardless of part of speech. Lowercase: articles (a, an, the), coordinating conjunctions (and, but, or, for, nor, so, yet), and prepositions (to, of, in, on, at, by, for, with, about, from, as, into, through, etc.) when they appear mid-heading. Example violation: "Performance And Tuning" — "And" is a coordinating conjunction and must be lowercase: "Performance and Tuning".
11. **List item punctuation consistency**: applies ONLY to standalone bulleted (\`-\`) or numbered (\`1.\`, \`#.\`) lists — you must see explicit RST list markers (\`-\`, \`*\`, \`1.\`, \`#.\`) at the start of lines to apply this rule. Do NOT apply to prose paragraphs, even if they end with periods. Do NOT apply to rows in \`.. list-table::\`, \`.. csv-table::\`, or \`.. table::\` directives — table cells are not list items. Do NOT apply to items consisting solely of inline code (double backtick markup), such as enumerated values like \`\`"insert"\`\`, \`\`"cdc"\`\`, \`\`{ truncate: int }\`\` — these do not require terminal punctuation. For qualifying lists: if ANY item ends with a period, ALL must end with a period; if NO item ends with a period, none should. Flag only when some items end with a period and others do not — e.g., "Install the driver." followed by "Copy your connection string" (no period).
12. **List items starting with articles**: list items must not begin with "a", "an", or "the". You must see explicit RST list markers (\`-\`, \`*\`, \`1.\`, \`#.\`) at the start of lines to apply this rule — do NOT apply to prose paragraphs. Only flag when an article is literally the first token of the item, before any markup. An item like \`- **kms_provider_name** - The KMS used...\` opens with bold markup, not an article — do not flag it. Do not apply inside \`.. list-table::\` rows.

**Additional instructions:**
- **Actionable**: Every comment must have a clear, specific fix
- **Concise**: One sentence for the issue, one sentence for the fix
- **No duplicates**: Report each distinct issue once per file, even if the same pattern recurs. Note recurrence in the single comment rather than filing multiple comments.
- **Never re-flag Vale rules**: The Simplicity rule covers "simply", "easy", "easily", "just" — never flag these words regardless of context. The full list of 52 Vale rules above are off-limits even when they appear alongside other issues.
- **Check ALL files in the PR** - the writer requested this review
- **Report every violation you are certain about, skip everything you are not** — do not artificially limit your findings, but do not flag anything you are uncertain about.

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
      "category": "style|typo|clarity|structure|nested",
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

**Remember: Quality over quantity.** Only flag issues you are certain violate a rule above. If you are uncertain, do not flag it — silence is better than a marginal flag. Writers benefit from precise, confident feedback. If the PR looks good, say so in the summary.`;
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
  // Apply severity filter based on granularity config before doing anything else
  const granularity = config.feedback.granularity;
  const filteredComments = review.comments.filter(c => {
    if (granularity === 'minimal') return c.severity === 'high';
    if (granularity === 'balanced') return c.severity === 'high' || c.severity === 'medium';
    return true; // 'detailed' — all severities
  });

  const validLinesByFile = new Map<string, Set<number>>();
  for (const file of files) {
    if (file.patch) {
      validLinesByFile.set(file.filename, getValidDiffLines(file.patch));
    }
  }

  const patchByFile = new Map<string, string>();
  for (const file of files) {
    if (file.patch) {
      patchByFile.set(file.filename, file.patch);
    }
  }

  const severityEmoji: Record<string, string> = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  };

  const categoryLabel: Record<string, string> = {
    style: 'Style Guide',
    typo: 'Typo',
    clarity: 'Clarity',
    structure: 'Structure',
  };

  // Resolve lines for ALL filtered comments before slicing to max_inline_comments.
  // Slicing first would discard valid later comments if early ones fail line resolution.
  const resolvedComments: Array<{ path: string; line: number; side: string; body: string }> = [];
  for (const comment of filteredComments) {
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

      resolvedComments.push({
        path: comment.file,
        line: resolvedLine,
        side: 'RIGHT',
        body: `${severityEmoji[comment.severity] || '💬'} **${categoryLabel[comment.category] || comment.category}**: ${comment.issue}

**Fix:** ${comment.suggestion}`
      });
    }
  }

  // Slice to cap AFTER resolution so the cap applies to postable comments only
  const toPost = resolvedComments.slice(0, config.feedback.max_inline_comments);

  // Post inline comments individually so `line`+`side` is used correctly.
  // createReview silently maps `line` to the legacy `position` field, which
  // is a diff offset rather than a file line number and causes comments to
  // land at the wrong location. createReviewComment handles line+side properly.
  let postedCount = 0;
  for (const comment of toPost) {
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

  if (config.feedback.include_summary === false) return;

  // Build summary from severity-filtered comments so counts match the active granularity.
  // Build after posting so postedCount is accurate for the inline note.
  const qualityEmoji: Record<string, string> = {
    good: '✅',
    needs_work: '⚠️',
    significant_issues: '🚨'
  };

  let summaryBody: string;

  const lastUpdated = new Date().toUTCString();
  const rerequestPrompt = `<sub>This comment is updated with each new review. Last reviewed: ${lastUpdated}. Once you've addressed the feedback, add or re-add the \`ai-review-style\` label to request a new review.</sub>`;

  if (filteredComments.length === 0) {
    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review: Looks good!** No issues found.

${rerequestPrompt}`;
  } else {
    const cap = config.feedback.max_inline_comments;
    const cappedComments = filteredComments.slice(0, cap);
    const truncatedCount = filteredComments.length - cappedComments.length;

    const commentsByFile = new Map<string, ReviewComment[]>();
    for (const c of cappedComments) {
      const file = c.file || 'unknown';
      if (!commentsByFile.has(file)) commentsByFile.set(file, []);
      commentsByFile.get(file)!.push(c);
    }
    const issueList = Array.from(commentsByFile.entries()).map(([file, fileComments]) => {
      const items = fileComments.map(c => `  - ${severityEmoji[c.severity] || '💬'} ${c.issue}`).join('\n');
      return `**\`${file}\`**\n${items}`;
    }).join('\n\n');

    const inlineNote = postedCount > 0
      ? `Inline comments pinned to changed lines for ${postedCount} of the above. `
      : '';
    const truncatedNote = truncatedCount > 0
      ? ` ${truncatedCount} additional finding${truncatedCount === 1 ? '' : 's'} not shown.`
      : '';

    summaryBody = `${qualityEmoji[review.overall_quality] || '📝'} **AI Review** - ${filteredComments.length} issue${filteredComments.length === 1 ? '' : 's'} found:

${issueList}

<sub>${inlineNote}Advisory only.${truncatedNote}</sub>

${rerequestPrompt}`;
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
  
  const maxDiffSize = config.review.max_diff_size || 100000;
  const truncatedFiles = truncatePatches(filesToReview, maxDiffSize);

  const prompt = buildPrompt(truncatedFiles, guidelines, config, reviewMode);
  
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
