/**
 * Findability / taxonomy linter — pure rules (no I/O except optional allowlist load from caller).
 *
 * Checks: facet names/values, meta keywords vs synonyms & title echo, docs.mongodb.com trailing slashes,
 * optional "code example" keyword when code blocks are present.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { LintIssue } from './seo-lint-rules.js';

export type { LintIssue };

const __dirname = dirname(fileURLToPath(import.meta.url));

interface FacetAllowlist {
  knownFacetNames: string[];
  genre: string[];
  programming_language: string[];
  target_product: string[];
  sub_product: string[];
}

let cachedAllowlist: FacetAllowlist | null = null;

function loadFacetAllowlist(): FacetAllowlist {
  if (cachedAllowlist) return cachedAllowlist;
  const raw = readFileSync(join(__dirname, 'facet-allowlist.json'), 'utf-8');
  cachedAllowlist = JSON.parse(raw) as FacetAllowlist;
  return cachedAllowlist;
}

export interface FindabilityLintOptions {
  /** Parsed lowercase terms from synonyms.csv (all comma-separated tokens per line). */
  synonymTerms?: Set<string>;
}

function isAgentToolingFile(filename: string): boolean {
  const normalizedPath = filename.replace(/\\/g, '/').toLowerCase();
  return (
    normalizedPath.includes('.github/agents/') ||
    normalizedPath.includes('/.claude/') ||
    normalizedPath.startsWith('.claude/')
  );
}

function isIncludeFile(filename: string): boolean {
  const normalizedPath = filename.replace(/\\/g, '/').toLowerCase();
  return normalizedPath.includes('/includes/') || normalizedPath.includes('/include/');
}

function findLineNumber(content: string, searchString: string): number {
  const index = content.indexOf(searchString);
  if (index === -1) return 1;
  return content.substring(0, index).split('\n').length;
}

function lineFromIndex(content: string, index: number): number {
  if (index < 0) return 1;
  return content.substring(0, index).split('\n').length;
}

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'is', 'it', 'its',
  'of', 'on', 'or', 'the', 'this', 'that', 'to', 'with', 'your', 'using', 'use', 'docs', 'mongodb',
  'mongo', 'data', 'api', 'set', 'get', 'into', 'can', 'our', 'we', 'you', 'all', 'any', 'not',
]);

/** Extract a simple page title string for keyword-overlap checks (RST + MD). */
function extractHeadingTitleLine(content: string, filename: string): { text: string; line: number } | null {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.md') || lower.endsWith('.mdx')) {
    const fm = content.match(/^---\n([\s\S]*?)\n---/);
    if (fm) {
      const m = fm[1].match(/^title:\s*["']?([^"'\n]+)["']?\s*$/m);
      if (m) return { text: m[1].trim(), line: findLineNumber(content, m[0]) };
    }
    const h = content.match(/^#\s+(.+)$/m);
    if (h) return { text: h[1].trim(), line: findLineNumber(content, h[0]) };
    return null;
  }
  const titleMeta = content.match(/^:title:\s*(.+)$/m);
  if (titleMeta) return { text: titleMeta[1].trim(), line: findLineNumber(content, titleMeta[0]) };
  const lines = content.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    if (next && /^=+$/.test(next) && line.trim() && !line.startsWith('..')) {
      return { text: line.trim(), line: i + 1 };
    }
  }
  return null;
}

/** All `.. meta::` blocks with a :keywords: line (pages may repeat meta per section). */
export function extractMetaKeywordBlocks(content: string): { text: string; line: number }[] {
  const out: { text: string; line: number }[] = [];
  const re = /\.\.\s+meta::([\s\S]*?)(?=\n\S|\n\n\S|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const block = m[0];
    const kw = block.match(/:keywords:\s*(.+)$/m);
    if (!kw) continue;
    out.push({ text: kw[1].trim(), line: findLineNumber(content, kw[0]) });
  }
  return out;
}

interface FacetBlock {
  line: number;
  name: string;
  valuesRaw: string;
}

function extractFacetBlocks(content: string): FacetBlock[] {
  const blocks: FacetBlock[] = [];
  const re = /\.\.\s+facet::\s*\n((?:[ \t]+:[^:\n]+:.*\n)+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const body = m[1];
    const blockStart = m.index;
    const nameMatch = body.match(/:name:\s*(\S+)/);
    const valuesMatch = body.match(/:values:\s*(.+)/);
    if (!nameMatch || !valuesMatch) continue;
    blocks.push({
      line: lineFromIndex(content, blockStart),
      name: nameMatch[1].trim(),
      valuesRaw: valuesMatch[1].trim(),
    });
  }
  return blocks;
}

function checkFacets(content: string, filename: string, allow: FacetAllowlist): LintIssue[] {
  const issues: LintIssue[] = [];
  const known = new Set(allow.knownFacetNames.map(s => s.toLowerCase()));
  const genreOk = new Set(allow.genre.map(s => s.toLowerCase()));
  const plOk = new Set(allow.programming_language.map(s => s.toLowerCase()));

  for (const block of extractFacetBlocks(content)) {
    const nameLower = block.name.toLowerCase();
    if (!known.has(nameLower)) {
      issues.push({
        file: filename,
        line: block.line,
        rule: 'facet-unknown-name',
        severity: 'warning',
        message: `Unknown facet name "${block.name}" (expected one of: ${allow.knownFacetNames.join(', ')})`,
        suggestion: 'Use a documented facet name or update facet-allowlist.json if Snooty added a new facet',
        current: block.name,
      });
      continue;
    }

    const values = block.valuesRaw.split(',').map(v => v.trim()).filter(Boolean);
    if (nameLower === 'genre') {
      for (const v of values) {
        if (!genreOk.has(v.toLowerCase())) {
          issues.push({
            file: filename,
            line: block.line,
            rule: 'facet-invalid-genre',
            severity: 'error',
            message: `Invalid genre value "${v}"`,
            suggestion: `Use one of: ${allow.genre.join(', ')}`,
            current: v,
          });
        }
      }
    } else if (nameLower === 'programming_language') {
      for (const v of values) {
        if (!plOk.has(v.toLowerCase())) {
          issues.push({
            file: filename,
            line: block.line,
            rule: 'facet-invalid-programming-language',
            severity: 'error',
            message: `Invalid programming_language value "${v}"`,
            suggestion:
              'Use a value from facet-allowlist.json (synced with taxonomy); add new languages there after rstspec/taxonomy update',
            current: v,
          });
        }
      }
    } else if (nameLower === 'target_product') {
      const tpOk = new Set(allow.target_product.map(s => s.toLowerCase()));
      for (const v of values) {
        if (!tpOk.has(v.toLowerCase())) {
          issues.push({
            file: filename,
            line: block.line,
            rule: 'facet-invalid-target-product',
            severity: 'error',
            message: `Invalid target_product value "${v}"`,
            suggestion: 'Use a value from facet-allowlist.json (synced with snooty-parser taxonomy.toml)',
            current: v,
          });
        }
      }
    } else if (nameLower === 'sub_product') {
      const spOk = new Set(allow.sub_product.map(s => s.toLowerCase()));
      for (const v of values) {
        if (!spOk.has(v.toLowerCase())) {
          issues.push({
            file: filename,
            line: block.line,
            rule: 'facet-invalid-sub-product',
            severity: 'error',
            message: `Invalid sub_product value "${v}"`,
            suggestion: 'Use a value from facet-allowlist.json (synced with snooty-parser taxonomy.toml)',
            current: v,
          });
        }
      }
    }
  }
  return issues;
}

function parseSynonymTermsFromCsv(csv: string): Set<string> {
  const out = new Set<string>();
  for (const line of csv.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    for (const part of t.split(',')) {
      const s = part.trim().toLowerCase();
      if (s.length >= 3) out.add(s);
    }
  }
  return out;
}

export function loadSynonymTermsFromFile(path: string): Set<string> {
  const csv = readFileSync(path, 'utf-8');
  return parseSynonymTermsFromCsv(csv);
}

function checkKeywordSynonymsOne(
  filename: string,
  kwLine: number,
  keywordsRaw: string,
  synonymTerms: Set<string>,
): LintIssue[] {
  const issues: LintIssue[] = [];
  const phrases = keywordsRaw.split(',').map(k => k.trim()).filter(Boolean);
  for (const phrase of phrases) {
    const lower = phrase.toLowerCase();
    if (synonymTerms.has(lower)) {
      issues.push({
        file: filename,
        line: kwLine,
        rule: 'keyword-in-synonyms-file',
        severity: 'warning',
        message: `Keyword "${phrase}" appears in the search synonyms list — prefer expanding synonyms.csv, not duplicating as a meta keyword`,
        suggestion: 'Remove from :keywords: if covered by docs-search-transport synonyms.csv',
        current: phrase,
      });
    }
  }
  return issues;
}

function tokenizeMeaningful(text: string): Set<string> {
  const words = text.toLowerCase().match(/[a-z0-9][a-z0-9+.#-]*/g) || [];
  const out = new Set<string>();
  for (const w of words) {
    if (w.length < 4 || STOPWORDS.has(w)) continue;
    out.add(w);
  }
  return out;
}

function checkKeywordTitleEchoOne(
  filename: string,
  kwLine: number,
  keywordsRaw: string,
  titleText: string,
): LintIssue[] {
  const issues: LintIssue[] = [];
  const titleTokens = tokenizeMeaningful(titleText);
  if (titleTokens.size === 0) return issues;

  const phrases = keywordsRaw.split(',').map(k => k.trim()).filter(Boolean);
  for (const phrase of phrases) {
    const pl = phrase.toLowerCase();
    if (pl.length < 4) continue;
    if (titleTokens.has(pl)) {
      issues.push({
        file: filename,
        line: kwLine,
        rule: 'keyword-echoes-title',
        severity: 'warning',
        message: `Keyword "${phrase}" already appears as a significant token in the title — may be redundant for search weighting`,
        suggestion: 'Drop the keyword if it duplicates the title/H1 (per taxonomy guidance)',
        current: phrase,
      });
    }
  }
  return issues;
}

const ASSET_EXT = /\.(png|jpe?g|gif|svg|ico|pdf|zip|tar|gz)(\?|#|$)/i;

function checkMongoTrailingSlash(content: string, filename: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const re = /https?:\/\/(?:www\.)?mongodb\.com[^\s\])>'"]+/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    let url = m[0];
    // Strip trailing punctuation (RST/MD markup and sentence-ending chars)
    url = url.replace(/[`"'»«.,;:)]+$/, '');
    let pathPart = url;
    const q = pathPart.search(/[?#]/);
    if (q !== -1) pathPart = pathPart.slice(0, q);
    if (ASSET_EXT.test(pathPart)) continue;
    if (pathPart.endsWith('/')) continue;
    // Root URL without path — optional trailing slash; allow
    try {
      const u = new URL(pathPart);
      if (!u.pathname || u.pathname === '/') continue;
    } catch {
      continue;
    }
    issues.push({
      file: filename,
      line: lineFromIndex(content, m.index),
      rule: 'docs-url-missing-trailing-slash',
      severity: 'warning',
      message: `MongoDB URL should use a trailing slash before query or fragment (canonical SEO): ${url}`,
      suggestion: 'Add / before ? or #, or at end of path (e.g. .../manual/reference/)',
      current: url,
    });
  }
  return issues;
}

function hasLanguageCodeBlocks(content: string, filename: string): boolean {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.md') || lower.endsWith('.mdx')) {
    const fence = /^```([a-zA-Z0-9][a-zA-Z0-9+-]*)\s*$/gm;
    let fm: RegExpExecArray | null;
    while ((fm = fence.exec(content)) !== null) {
      const lang = fm[1].toLowerCase();
      if (lang && lang !== 'text') return true;
    }
    return false;
  }
  const codeBlock = /^\.\.\s+code-block::\s*(\S+)/gm;
  let m: RegExpExecArray | null;
  while ((m = codeBlock.exec(content)) !== null) {
    const lang = m[1].toLowerCase();
    if (lang && lang !== 'none' && lang !== 'text') return true;
  }
  if (/^\.\.\s+code::\s*\S+/m.test(content)) return true;
  return false;
}

function checkCodeExampleKeyword(content: string, filename: string): LintIssue[] {
  if (isIncludeFile(filename)) return [];
  if (!hasLanguageCodeBlocks(content, filename)) return [];
  const blocks = extractMetaKeywordBlocks(content);
  if (blocks.length === 0) return [];
  if (blocks.some(b => b.text.toLowerCase().includes('code example'))) return [];
  const first = blocks[0];
  return [
    {
      file: filename,
      line: first.line,
      rule: 'code-example-keyword-missing',
      severity: 'warning',
      message:
        'Page has language-tagged code blocks but :keywords: does not include "code example" (taxonomy guidance)',
      suggestion: 'Add "code example" to .. meta:: :keywords: when the page demonstrates code',
      current: first.text,
    },
  ];
}

/**
 * Run all findability checks. Facet rules apply to .txt/.rst (Snooty); URL + keyword rules also apply to MD.
 */
export function lintFindabilityContent(
  content: string,
  filename: string,
  options: FindabilityLintOptions = {},
): LintIssue[] {
  const issues: LintIssue[] = [];

  if (isAgentToolingFile(filename)) return issues;

  const lower = filename.toLowerCase();
  const isRstLike = lower.endsWith('.txt') || lower.endsWith('.rst');

  if (isRstLike) {
    const allow = loadFacetAllowlist();
    issues.push(...checkFacets(content, filename, allow));
  }

  if (isRstLike) {
    const kwBlocks = extractMetaKeywordBlocks(content);
    const titleInfo = extractHeadingTitleLine(content, filename);
    for (const metaKw of kwBlocks) {
      if (options.synonymTerms && options.synonymTerms.size > 0) {
        issues.push(...checkKeywordSynonymsOne(filename, metaKw.line, metaKw.text, options.synonymTerms));
      }
      if (titleInfo) {
        issues.push(...checkKeywordTitleEchoOne(filename, metaKw.line, metaKw.text, titleInfo.text));
      }
    }
  }

  if (isRstLike || lower.endsWith('.md') || lower.endsWith('.mdx')) {
    issues.push(...checkMongoTrailingSlash(content, filename));
  }

  if (isRstLike) {
    issues.push(...checkCodeExampleKeyword(content, filename));
  }

  return issues;
}

export { parseSynonymTermsFromCsv };
