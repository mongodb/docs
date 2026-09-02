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
    max_tokens: number;
    // Model id served by the Grove gateway (Anthropic-format endpoint).
    model: string;
    // Base URL for the Grove gateway. The Anthropic SDK appends
    // `/v1/messages`, so this must stop at the `/anthropic` path segment.
    base_url: string;
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
  if (!process.env.GROVE_API_KEY) {
    throw new Error('Missing GROVE_API_KEY.\n' +
      'This is the Grove gateway API key. Add it as a repository secret: ' +
      'Settings → Secrets → Actions → New repository secret');
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

// Load config at module scope so the client can be pointed at the Grove
// gateway base URL. Function declarations are hoisted, so loadConfig is
// available here even though it's defined below.
const moduleConfig = loadConfig();

// Initialize clients.
//
// Requests go through the Grove gateway's Anthropic-format endpoint rather
// than api.anthropic.com. The gateway authenticates with the `api-key`
// header (Azure APIM), not the SDK's default `x-api-key`, so the key is
// supplied via defaultHeaders. The SDK still requires an apiKey to be set,
// so the same value is passed there; the gateway ignores the resulting
// `x-api-key` header.
const anthropic = new Anthropic({
  apiKey: process.env.GROVE_API_KEY,
  baseURL: moduleConfig.ai.base_url,
  defaultHeaders: {
    'api-key': process.env.GROVE_API_KEY!,
  },
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

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

// Convert a glob pattern to an anchored RegExp with correct `**` handling.
// `**` (globstar) spans path segments; `*` matches within a single segment.
// A naive sequential replace of `**` then `*` corrupts the output (the second
// replace rewrites the `*` inside the `.*` produced by the first), so `**` is
// resolved via segment-aware rules before single `*` is handled.
function globToRegExp(glob: string): RegExp {
  // Tokenize the glob wildcards into sentinels first, then expand the
  // sentinels. Expanding directly would let a later replace rewrite the `*`
  // characters inside an earlier replacement's output.
  const converted = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&') // escape regex metachars (not * or /)
    .replace(/\/\*\*\//g, '\x00')          // /**/ -> zero or more directories
    .replace(/^\*\*\//g, '\x01')           // leading **/
    .replace(/\/\*\*$/g, '\x02')           // trailing /**
    .replace(/\*\*/g, '\x03')              // any remaining ** -> match anything
    .replace(/\*/g, '\x04')                // * -> match within a segment
    .replace(/\x00/g, '/(?:.*/)?')
    .replace(/\x01/g, '(?:.*/)?')
    .replace(/\x02/g, '(?:/.*)?')
    .replace(/\x03/g, '.*')
    .replace(/\x04/g, '[^/]*');
  return new RegExp('^' + converted + '$');
}

function filterFiles(files: PRFile[], config: Config): PRFile[] {
  const includePatterns = config.review.include_patterns.map(globToRegExp);
  const excludePatterns = config.review.exclude_patterns.map(globToRegExp);
  
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

interface ReviewPrompt {
  // Static across PRs for a given review mode — sent as a cached system block
  // so its input tokens are billed at the discounted cache-read rate on repeat
  // runs instead of re-billed in full on every PR.
  system: string;
  // Per-PR diff plus the trailing review instruction — never cached.
  user: string;
}

function buildPrompt(files: PRFile[], guidelines: Guidelines, config: Config, reviewMode: string): ReviewPrompt {
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

Prioritize the prose and word-choice rules below — Group A (voice, grammar, word choice), Group C (lists), and the terminology and naming rules (Group I). You may still flag structural rules when certain, but emphasize prose quality.

Only the numbered rules are flaggable: do NOT raise general "flow", "organization", "readability", or "audience" concerns unless they match a specific numbered rule as written.

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

Apply all 42 rules. Flag only violations you are absolutely certain about — raise the bar for certainty and skip anything marginal or context-dependent.`;

  const system = `You are an expert technical writing reviewer for MongoDB documentation.

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

*Vale (all 53 active rules — do not re-flag any of these):*
- Abbreviations: unspelled-out acronyms on first use
- AbbreviationsPeriods: periods in acronyms/initialisms
- Accessibility: non-descriptive link text
- Adverbs: unnecessary adverbs
- AmbiguousPronouns: sentences starting with ambiguous "This" or "That"
- Ampersands: "&" instead of "and" in prose
- Anthropomorphism: attributing human qualities to software
- AvoidAccessible: misuse of "accessible"
- AvoidFirstPerson: first-person pronouns ("I", "we", "our") — except the approved "we recommend" phrasing required by Rule 8, which is an intentional exception and must not be flagged
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
- ConsistencyEarlierLater: "8.0 or higher" → "8.0 or later" in version references
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

**Flag ONLY issues that pattern-matching tools cannot catch, and ONLY issues that literally match one of the numbered rules below. This numbered list is a closed set: if a passage does not match a rule as written, do not comment on it.**
The rules are organized into groups for navigation only. The grouping does not change any rule — each rule keeps its own number and applies exactly as written. When you cite a rule, use its number regardless of its group.

**Group A — Voice, grammar, and word choice:**
1. **Wrong voice**: flag any instances of "the user", "the developer", or any third-person reference. Use the second-person "you" instead.
2. **Passive voice**: "to be" + past participle constructions ("is saved", "has been installed", "can be restarted") are against the style guide — rewrite with an active subject.
3. **Vague quantifiers**: always flag "various". Flag "some", "many", "several" when a specific count or enumerated list exists in context. If the same vague quantifier appears multiple times in one file, report it once and note it recurs — do not create a separate comment for each occurrence.
4. **Weak main verbs**: flag forms of "be", "have", "make", or "do" used as a sentence's main action verb when a precise verb exists (e.g., "make a change to" → "change", "do an installation of" → "install").
5. **Subject-verb agreement**: the verb number must match the subject. Treat collective nouns ("group", "team", "set") and "X or Y" subjects as singular.
6. **Dangling or ambiguous gerunds/participles**: flag introductory "-ing" phrases with no clear actor ("When using the driver, the connection opens") — rewrite with an explicit subject ("When you use the driver, ...").
7. **Unclear pronoun antecedents**: flag "it", "there", "that", or "this" whose referent is ambiguous (this extends beyond the sentence-initial cases Vale catches) — name the noun instead.
8. **Recommendation phrasing**: "MongoDB recommends", "it is recommended", or "it's best" → "we recommend". Keep point of view consistent — do not switch between "you", "the user", and "we". The "we recommend" phrasing is an approved exception to Vale's AvoidFirstPerson rule; do not treat "we"/"our" in this phrasing as a first-person violation.

**Group B — Structure: paragraphs, procedures, and tables:**
9. **Paragraph and sentence structure**: flag paragraphs longer than ~5 sentences and single-sentence paragraphs; conditional sentences must lead with the condition ("If X, do Y", not "Do Y if X"); convert three or more items embedded in one sentence into a bulleted list.
10. **Task and procedure steps**: use imperative step and task titles; one action per step; do not write system responses as their own steps; write a single-step procedure as a paragraph; keep procedures to 10 or less steps.
11. **Tables**: introduce each table with a sentence and give it a title; keep cell entries parallel; order parameter descriptions consistently and label required parameters.

**Group C — Lists:**
12. **Non-parallel list items**: list items that don't follow the same grammatical form (e.g., mixing imperative verbs with noun phrases)
13. **List introduction missing colon**: RST wraps lines at ~72 characters — a single sentence may span multiple consecutive `+` diff lines. Reconstruct the full sentence by joining all consecutive non-blank `+` lines before checking the final character. Only then: flag if the colon is absent from the last character of the reconstructed sentence immediately before list items begin. Do NOT flag a sentence that contains a colon mid-sentence followed by more prose (e.g., "The tutorial uses two files: an application file and a helpers file." — this is a complete sentence, not a list introduction). Cite this rule ONLY when the colon is genuinely absent; if a colon is present, do NOT flag under this rule.
14. **"Do the following" list introduction**: flag "do the following" (or "do the below") used to introduce a list. The verb "do" is weak and "following" is misused as a noun. Recommend a stronger, specific verb — for example "perform the following tasks:" or "The following methods are available:". Apply this independently of the colon check in Rule 13.
15. **List introduction that counts items**: flag a list introduction that states the number of items ("the following three methods", "these two steps") — the count breaks if the list changes. Recommend removing the number (for example, "the following methods").
16. **List item punctuation consistency**: applies ONLY to standalone bulleted (\`-\`) or numbered (\`1.\`, \`#.\`) lists — you must see explicit RST list markers (\`-\`, \`*\`, \`1.\`, \`#.\`) at the start of lines to apply this rule. Do NOT apply to prose paragraphs, even if they end with periods. Do NOT apply to rows in \`.. list-table::\`, \`.. csv-table::\`, or \`.. table::\` directives — table cells are not list items. Do NOT apply to items consisting solely of inline code (double backtick markup), such as enumerated values like \`\`"insert"\`\`, \`\`"cdc"\`\`, \`\`{ truncate: int }\`\` — these do not require terminal punctuation. For qualifying lists: if ANY item ends with a period, ALL must end with a period; if NO item ends with a period, none should. Flag only when some items end with a period and others do not — e.g., "Install the driver." followed by "Copy your connection string" (no period).
17. **List items starting with articles**: list items must not begin with "a", "an", or "the". You must see explicit RST list markers (\`-\`, \`*\`, \`1.\`, \`#.\`) at the start of lines to apply this rule — do NOT apply to prose paragraphs. Only flag when an article is literally the first token of the item, before any markup. An item like \`- **kms_provider_name** - The KMS used...\` opens with bold markup, not an article — do not flag it. Do not apply inside \`.. list-table::\` rows.

**Group D — Headings:**
18. **Heading capitalization**: headings must use AP headline style. Scan every word in every heading. Capitalize: nouns, verbs, adjectives, adverbs, and the first and last word regardless of part of speech. Lowercase: articles (a, an, the), coordinating conjunctions (and, but, or, for, nor, so, yet), and prepositions (to, of, in, on, at, by, for, with, about, from, as, into, through, etc.) when they appear mid-heading. Example violation: "Performance And Tuning" — "And" is a coordinating conjunction and must be lowercase: "Performance and Tuning".
19. **Heading hierarchy**: do not skip heading levels, leave a heading empty, or use bold text in place of a heading.

**Group E — Admonitions and callouts:**
20. **Wrong admonition type**: \`.. warning::\` is correct ONLY for data loss, irreversible actions, or security vulnerabilities. Performance tips and best practices belong in \`.. tip::\`. Supplemental information belongs in \`.. note::\`. Essential prerequisites belong in \`.. important::\`. Flag any \`.. warning::\` whose content does not describe data loss, a destructive operation, or a security risk.
21. **Stacked admonitions**: two or more consecutive notes, tips, warnings, or important blocks are not allowed — combine into one or move to a dedicated section
22. **Callout usage**: do not put callouts in tables or code blocks, use a callout for a link only, or use deprecated directives (\`.. admonition::\`, \`.. caution::\`, \`.. danger::\`, \`.. example::\`, \`.. see::\`, \`.. see also::\`, \`.. topic::\`).

**Group F — RST markup and text formatting:**
23. **Broken RST directives**: flag inline roles where the content after the role name is not wrapped in backticks. Correct RST role syntax: \`:rolename:\` followed immediately by a backtick, content, then a closing backtick. Examples of violations: \`:method:collection.insertOne\` (content has no backtick wrapper), \`:ref:my-label\` (same issue). Check :ref:, :method:, :class:, :attr:, :option:, and similar roles.
24. **camelCase or ALL-CAPS in prose**: flag code-style identifiers written in running prose without monospace markup; wrap them in double backticks or rephrase.
25. **Format by element type**: use monospace for code, commands, paths, and user-typed text; \`:guilabel:\` for UI labels; \`:kbd:\` for keys; italics for the first use of a new term. Do not apply bold, italic, or monospace formatting inside a heading.
26. **Overcapitalization**: do not capitalize common or feature nouns mid-sentence ("Cluster", "Region", "Backups"), job titles, or whole words for emphasis.

**Group G — Cross-references, links, and accessibility:**
27. **Cross-reference structure**: Apply this rule ONLY by the following exact test. Flag a sentence if and ONLY IF BOTH conditions are true: (a) the sentence's FIRST word is literally "See" or the sentence's first two words are literally "Refer to" (case-insensitive), AND (b) a cross-reference role written literally as \`:ref:\`, \`:doc:\`, \`:guide:\`, or \`:manual:\` appears BEFORE the sentence's main verb or purpose clause. If either condition fails, do NOT flag — no exceptions. This rule does not cover any other opener, verb, or phrasing. Specifically, do NOT flag: sentences that place the cross-reference at the end (for example "For details, see :ref:\`foo\`." or "To learn about X, see :ref:\`foo\`."), sentences beginning with any word other than "See" or "Refer", or any phrase you judge to be a "weak", "vague", or "filler" opener. You have no authority under this rule to flag phrases such as "For details", "For more information", "For a list of", "In this section", or similar; those are correct. Correct form for a genuine violation puts the reason first: "To learn about X, see :ref:\`foo\`."
28. **Sensory or directional UI references**: do not identify UI elements only by color, shape, size, or position ("the green button", "the button on the right", "at the top of the page") — name the label instead.
29. **Link annotations**: note when a link opens a new window or downloads a file, and separate adjacent links with text so screen readers do not merge them.
30. **Images**: every image needs descriptive alt text, and information must not be conveyed through an image of text.

**Group H — Numbers, units, symbols, dates, and time:**
31. **Units**: put a space between a number and its unit ("256 MB", not "256MB"); capitalize "B" for byte and lowercase "b" for bit ("GB" vs. "Gb"); hyphenate units used as compound modifiers ("100-Mbps link").
32. **Symbols in prose**: spell out symbol names ("45 percent", not "45%") and put spaces around ">" in menu paths ("File > Open").
33. **Number formatting**: do not begin a sentence with a numeral; use a comma in numbers with five or more digits; write ranges as "from X through Y" or "between X and Y", not with a dash. Apply only to cases Vale's Numbers rule (numerals vs. spelled-out) does not already catch — do not re-flag anything Vale covers.
34. **Plural constructions**: avoid "(s)", "/s", and "is/are" to signal optional plurals — use "one or more files" instead of "file(s)".
35. **Time formatting**: use 12-hour time with "AM"/"PM" (no periods) and spelled-out "noon"/"midnight" (not "12 noon"); keep time formats consistent.
36. **Date formatting**: do not use ordinals in dates ("January 1", not "January 1st").

**Group I — Naming, terminology, and example values:**
37. **Product and version names**: use the full product name on first mention, then the short form; put the product name before an inline version number ("MongoDB 5.0"); lowercase user-created items ("database", "cluster") when they are not part of a product name.
38. **Placeholders**: format placeholder tokens in camelCase (for example, "yourUserName"); do not abbreviate placeholders; introduce them with a "where" clause.
39. **Example values**: use reserved example domains ("example.com"), documentation IP ranges (not private CIDR blocks), the reserved "555-01xx" phone range with "+1", and fictional names — never real or copyrighted names. Write "IP address", not bare "IP".
40. **Keyboard keys**: use standardized key names ("Ctrl", "Esc"); use "press" for keys and "type" for text; do not use "hit", "strike", or "punch".
41. **American English and consistent terms**: use American spellings ("color", "gray"); do not alternate between synonyms for one concept ("version"/"release", "window"/"dialog box", "panel"/"screen"); avoid neologisms.
42. **In-text location references**: use "following"/"preceding" for on-page references, not "above"/"below"/"earlier"/"later".

**Additional instructions:**
- **Actionable**: Every comment must have a clear, specific fix
- **Concise**: One sentence for the issue, one sentence for the fix
- **No duplicates**: Report each distinct issue once per file, even if the same pattern recurs. If the same pattern recurs, note the recurrence in the single comment rather than filing multiple comments.
- **Never re-flag Vale rules**: The Simplicity rule covers "simply", "easy", "easily", "just" — never flag these words regardless of context. The full list of 53 Vale rules above are off-limits even when they appear alongside other issues.
- **Check ALL files in the PR** - the writer requested this review
- **Report every violation you are certain about, skip everything you are not** — do not artificially limit your findings, but do not flag anything you are uncertain about.
- **Stay strictly within the numbered rules**: Every comment MUST correspond to exactly one of the 42 numbered rules above, and you must apply that rule only as literally written — matching its exact trigger words, phrases, and conditions. Do not generalize a rule beyond its stated scope, do not combine rules into a broader principle, and do not invent new categories or labels (for example "weak opener", "awkward phrasing", "could be clearer", "wordy"). If a passage bothers you but does not literally match a numbered rule's stated conditions, do NOT comment on it. Begin each comment's \`issue\` field with the matched rule number in the form "(Rule N)" so the mapping is auditable.
- **Only emit confirmed violations — never think out loud**: A comment is permitted ONLY when you have concluded a rule is violated AND you are recommending a specific change. Do all weighing, checking, and reasoning silently before you decide. Never debate whether an issue exists, consider alternatives, note something is acceptable, or conclude with statements like "no issue here", "disregard", "this is fine", "correct as written", "No change needed", or an empty/no-op \`suggestion\`. If your analysis concludes that no change is needed, that item does not become a comment at all — omit it entirely from the \`comments\` array. Every comment's \`issue\` must assert a definite violation and every \`suggestion\` must state a concrete edit.

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
      "category": "style|typo|clarity|structure",
      "issue": "Brief description of the issue",
      "suggestion": "How to fix it",
      "original_text": "The problematic text (if applicable)"
    }
  ]
}
\`\`\`

## Files to Review

**How to read the diff — review ADDED lines only:** Each file is a unified diff. Lines beginning with \`+\` are ADDED (the new content). Lines beginning with \`-\` are REMOVED (the old content, deleted by this PR). Lines beginning with a space are unchanged context. You may review ONLY \`+\` (added) lines. Removed (\`-\`) lines exist solely as context to help you understand the change — NEVER flag, quote, or comment on a \`-\` line, because that text no longer exists after the PR merges. If a problem appears only on a removed line, it is already fixed by the removal; do not comment. When you set \`original_text\`, copy it verbatim from an added (\`+\`) line (omit the leading \`+\`), never from a removed line.`;

  const user = `${filesContent}

Now review these changes and provide your feedback as JSON.

**Remember: Quality over quantity.** Only flag issues you are certain violate a rule above. If you are uncertain, do not flag it — silence is better than a marginal flag. Writers benefit from precise, confident feedback. If the PR looks good, say so in the summary.`;

  return { system, user };
}

// =============================================================================
// AI REVIEW
// =============================================================================

// Drop non-actionable "thinking out loud" comments: the model sometimes
// weighs an issue and concludes no change is needed. Such comments must never
// reach the PR or the CI summary. Filter any whose issue/suggestion signals a
// no-op or that lacks a concrete suggested fix.
const NO_OP_PATTERN = /\b(no\s+(change|issue|action|fix|edit)\s+(is\s+)?(needed|required|necessary)|no\s+change|disregard|nothing\s+to\s+(fix|change)|this\s+is\s+(fine|correct|acceptable)|correct\s+as\s+(written|is)|already\s+correct|leave\s+as[- ]is|not\s+an\s+issue|no\s+violation)\b/i;

function stripNonActionableComments(comments: AIReview['comments']): AIReview['comments'] {
  if (!Array.isArray(comments)) return comments;
  return comments.filter(c => {
    const suggestion = (c.suggestion ?? '').trim();
    const issue = (c.issue ?? '').trim();
    if (!suggestion || NO_OP_PATTERN.test(suggestion) || NO_OP_PATTERN.test(issue)) {
      console.log(`   🚫 Dropping non-actionable comment for ${c.file}: issue="${issue}" suggestion="${suggestion}"`);
      return false;
    }
    return true;
  });
}

async function getAIReview(prompt: ReviewPrompt, config: Config): Promise<AIReview> {
  // Check prompt size (rough token estimate: ~4 chars per token)
  const estimatedTokens = Math.ceil((prompt.system.length + prompt.user.length) / 4);
  if (estimatedTokens > 100000) {
    console.log(`   ⚠️ Warning: Large prompt (~${estimatedTokens} tokens). May hit limits.`);
    writeToSummary(`⚠️ Warning: Large diff size (~${estimatedTokens} estimated tokens)`);
  }

  const model = config.ai.model;
  console.log(`   ✓ Using model: ${model}`);

  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: model,
      max_tokens: config.ai.max_tokens,
      // The static rules/style-guide prefix is sent as a cached system block.
      // On repeat runs (traffic keeps the 5-min cache warm) its input tokens
      // are billed at the cache-read rate instead of re-billed in full.
      system: [
        {
          type: 'text',
          text: prompt.system,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: prompt.user,
        },
      ],
    });
    
    // Log cache usage so cache effectiveness is visible in CI logs.
    const usage = response.usage as typeof response.usage & {
      cache_creation_input_tokens?: number;
      cache_read_input_tokens?: number;
    };
    console.log(
      `   💰 Tokens — input: ${usage.input_tokens}, ` +
      `cache write: ${usage.cache_creation_input_tokens ?? 0}, ` +
      `cache read: ${usage.cache_read_input_tokens ?? 0}, ` +
      `output: ${usage.output_tokens}`
    );

    const textBlock = response.content.find(block => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      const types = response.content.map(b => b.type).join(', ') || 'empty';
      throw new Error(`No text block in response. Content types: ${types}`);
    }
    const content = textBlock.text;

    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) ||
                      content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr) as AIReview;
      parsed.comments = stripNonActionableComments(parsed.comments);
      return parsed;
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

// Collapse all runs of whitespace (including newlines) to a single space so
// text that is hard-wrapped across multiple physical lines can be matched
// against the model's single-string `original_text`.
function normalizeForMatch(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

// Resolve the file line where `originalText` begins. RST prose is hard-wrapped
// at 72 characters, so a flagged sentence usually spans several physical lines
// and never appears in full on any single diff line. To handle that, the
// added/context lines of the patch are collected with their line numbers, and
// the needle is matched against a normalized sliding window that joins each
// starting line with the lines that follow it. The match anchors to the line
// where the text starts.
function resolveLineFromText(originalText: string, patch: string): number | null {
  if (!originalText || !patch) return null;
  const needle = normalizeForMatch(originalText);
  if (!needle) return null;

  // Collect the addressable (added/context) lines in file-line order.
  const lines: Array<{ lineNumber: number; content: string }> = [];
  let currentLine = 0;
  for (const line of patch.split('\n')) {
    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunkMatch) {
      currentLine = parseInt(hunkMatch[1], 10) - 1;
    } else if (line.startsWith('-')) {
      // deleted line — skip, don't increment
    } else {
      currentLine++;
      lines.push({
        lineNumber: currentLine,
        content: line.startsWith('+') ? line.slice(1) : line,
      });
    }
  }

  // Fast path: the whole needle sits on a single line.
  for (const { lineNumber, content } of lines) {
    if (normalizeForMatch(content).includes(needle)) {
      return lineNumber;
    }
  }

  // Wrapped path: grow a normalized window from each starting line and match
  // the needle against it. A window that starts on an earlier line can also
  // *contain* the needle, so a plain `includes` would anchor too early. To
  // anchor to the line where the text actually begins, the needle's match
  // position must fall within the start line's own content — i.e. before the
  // boundary where the next line's text was appended. The window can extend at
  // most the start line's length plus the needle's length; past that, no match
  // beginning on this line is possible and we move on.
  for (let start = 0; start < lines.length; start++) {
    const startContent = normalizeForMatch(lines[start].content);
    const maxWindowLength = needle.length + startContent.length;
    let window = startContent;
    for (let end = start + 1; end < lines.length && window.length <= maxWindowLength; end++) {
      window = normalizeForMatch(`${window} ${lines[end].content}`);
      // idx must fall strictly within the start line's own content. Using `<`
      // (not `<=`) means an empty or whitespace-only start line, whose text
      // begins exactly at the boundary of the next line, cannot be the anchor.
      const idx = window.indexOf(needle);
      if (idx !== -1 && idx < startContent.length) {
        return lines[start].lineNumber;
      }
    }
  }

  return null;
}

// True when originalText appears on a removed (`-`) line of the patch. Used to
// suppress comments the model made about deleted text: that content no longer
// exists after the PR merges, so a comment on it is never actionable.
function textAppearsOnRemovedLine(originalText: string, patch: string): boolean {
  if (!originalText || !patch) return false;
  const needle = originalText.trim();
  if (!needle) return false;
  for (const line of patch.split('\n')) {
    if (line.startsWith('-') && !line.startsWith('---') && line.slice(1).includes(needle)) {
      return true;
    }
  }
  return false;
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

      // Resolve the line strictly from original_text. The model's own
      // comment.line is an unreliable estimate (often off by a few lines),
      // so it is NOT used as a fallback: a comment whose text cannot be
      // located in the diff is skipped rather than mis-anchored.
      const resolvedLine = comment.original_text && patch
        ? resolveLineFromText(comment.original_text, patch)
        : null;
      console.log(`   🔍 ${comment.file}: original_text="${comment.original_text}" → resolvedLine=${resolvedLine}, AI line=${comment.line}`);

      // Drop comments about removed text: if original_text did not resolve to an
      // added/context line but does appear on a removed (`-`) line, the comment
      // targets deleted content that no longer exists after merge.
      if (!resolvedLine && comment.original_text && patch &&
          textAppearsOnRemovedLine(comment.original_text, patch)) {
        console.log(`   🚫 Skipping comment on removed text for ${comment.file}: original_text="${comment.original_text}"`);
        continue;
      }

      if (!resolvedLine || !validLines || !validLines.has(resolvedLine)) {
        console.log(`   ⚠️ Skipping inline comment for ${comment.file}:${resolvedLine} (text not located in diff)`);
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
      body: '🤖 **AI Documentation Review**\n\nNo documentation source files (`.txt` or `.rst` under `content/**/source/`) found in this PR. Skipping review.',
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
