/**
 * Protection Helper Methods
 *
 * Non-translatable terms must survive translation byte-for-byte, so we
 * don't rely on prompt instructions. Instead we swap each protected term
 * for an opaque placeholder token before translation and swap it back
 * afterward. Matching is exact, case-sensitive, and on word boundaries — the
 * whole point is that these terms remain unchanged, and a term that only
 * occurs inside a larger word (`C` in `Connect`) is not that term.
 */

import { pluralVariationsOf } from "./term-variations.js";

/**
 * Characters that make an adjacent match a different word. `#` and `+` are
 * included so `C` does not match inside `C++`/`C#`; `-` is included so a
 * hyphenated compound (`MongoDB-related`) is treated as one word.
 */
const WORD_CHAR = "[\\p{L}\\p{N}_$#+-]";

/** True when a single character counts as a word character. */
const WORD_EDGE = new RegExp(`^${WORD_CHAR}$`, "u");

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * A fresh global regex matching `term` as a whole token. Callers must not
 * reuse one instance for both `test` and `replace`: `test` advances
 * `lastIndex` on a global regex.
 *
 * A boundary guard is only meaningful on an edge that is itself a word
 * character: a term whose edge is not one cannot be part of a larger word on
 * that side, so guarding it would reject the term's own occurrences. The MDX
 * adapter's inline tokens are exactly that shape — `U+E000 O0 U+E001`, with
 * Private Use Area delimiters as their edges — and they sit directly against
 * the text they wrap (`…O0<delim>Save`). An unconditional guard never matches
 * them, which leaves the raw tokens in the model input.
 */
function termPattern(term: string, ignoreCase = false): RegExp {
  const chars = [...term];
  const lookbehind = WORD_EDGE.test(chars[0] ?? "") ? `(?<!${WORD_CHAR})` : "";
  const lookahead = WORD_EDGE.test(chars[chars.length - 1] ?? "")
    ? `(?!${WORD_CHAR})`
    : "";
  return new RegExp(
    `${lookbehind}${escapeRegExp(term)}${lookahead}`,
    ignoreCase ? "giu" : "gu",
  );
}

/** Result of protecting a single string. */
export interface ProtectionResult {
  /** Text with protected terms replaced by `__PROTn__` tokens. */
  text: string;
  /** Map of token -> original term, needed to restore after translation. */
  placeholders: Record<string, string>;
}

/** Result of restoring a single translated string. */
export interface RestorationResult {
  text: string;
  /** False if any expected token was dropped or mangled during translation. */
  ok: boolean;
  /** Tokens that were expected but not found in the translated text. */
  missing: string[];
}

export interface DetectOptions {
  /** Match regardless of case. Off for protected terms, which must match exactly. */
  ignoreCase?: boolean;
}

/**
 * Returns the distinct terms that actually occur in `text` as whole
 * tokens, in the order they were supplied. Empty terms are ignored.
 */
export function detectTerms(
  text: string,
  terms: string[],
  options: DetectOptions = {},
): string[] {
  const seen = new Set<string>();
  const found: string[] = [];
  for (const term of terms) {
    if (term.length === 0 || seen.has(term)) continue;
    seen.add(term);
    if (termPattern(term, options.ignoreCase).test(text)) found.push(term);
  }
  return found;
}

/** `text` with every whole-token occurrence of `term` replaced by a space. */
export function removeTerm(text: string, term: string, options: DetectOptions = {}): string {
  return text.replace(termPattern(term, options.ignoreCase), " ");
}

/**
 * A keep-verbatim term must survive in its plural too: `string` is listed, but
 * `strings` would otherwise go out as an ordinary word and be translated.
 *
 * Every stage that narrows the term list must expand it the same way. The
 * matcher below expands, but normalize() pre-filters terms with `detectTerms`
 * and passes only the survivors on, so a term whose singular is absent from the
 * text would be dropped before the matcher ever saw it. Not folded into
 * `detectTerms` itself, which the term sheet also calls.
 */
export function expandKeepVerbatimTerms(terms: string[]): string[] {
  return [...terms, ...terms.flatMap(pluralVariationsOf)];
}

/**
 * Replaces every occurrence of each protected term with a placeholder.
 *
 * Terms are replaced longest-first so an overlapping shorter term can't
 * consume part of a longer one (e.g. "Atlas" inside "Atlas Search").
 * Terms no longer present after a longer replacement are skipped, so the
 * returned `placeholders` only ever contains tokens actually inserted.
 *
 * Source text is untrusted and may already contain a `__PROTn__`-shaped
 * substring unrelated to protection. A token number is only used once
 * confirmed absent from the original `text`, so every token this function
 * inserts is guaranteed novel — restore() can then safely replace it
 * without touching pre-existing look-alike text.
 */
export function protect(text: string, nonTranslatableTerms: string[]): ProtectionResult {
  const expanded = expandKeepVerbatimTerms(nonTranslatableTerms);
  const present = detectTerms(text, expanded).sort((a, b) => b.length - a.length);
  const placeholders: Record<string, string> = {};
  const tokenForTerm = new Map<string, string>();
  const matches = findTermMatches(text, present);
  let result = "";
  let cursor = 0;
  let n = 1;
  let index = 0;

  while (index < matches.length) {
    // Terms that touch are protected as one placeholder. A run of adjacent
    // terms (a wrap token immediately followed by the token it wraps) holds
    // no words for the backend to anchor it to, so it may reorder or drop
    // tokens inside the run; a single placeholder cannot be taken apart.
    let end = matches[index]!.end;
    const run = [matches[index]!.term];
    let next = index + 1;
    while (next < matches.length && matches[next]!.start === end) {
      run.push(matches[next]!.term);
      end = matches[next]!.end;
      next++;
    }

    const term = run.join("");
    let token = run.length === 1 ? tokenForTerm.get(term) : undefined;
    if (token === undefined) {
      while (text.includes(`__PROT${n}__`)) n++;
      token = `__PROT${n}__`;
      n++;
      if (run.length === 1) tokenForTerm.set(term, token);
    }

    result += text.slice(cursor, matches[index]!.start) + token;
    placeholders[token] = term;
    cursor = end;
    index = next;
  }

  return { text: result + text.slice(cursor), placeholders };
}

/** A non-overlapping occurrence of a protected term, earliest first. */
interface TermMatch {
  start: number;
  end: number;
  term: string;
}

/** Earliest-first, longest-at-a-position term occurrences. */
function findTermMatches(text: string, terms: readonly string[]): TermMatch[] {
  const matches: TermMatch[] = [];
  let pos = 0;
  while (pos < text.length) {
    let best: TermMatch | null = null;
    for (const term of terms) {
      const pattern = termPattern(term);
      pattern.lastIndex = pos;
      const found = pattern.exec(text);
      if (found === null) continue;
      const start = found.index;
      const end = start + found[0].length;
      if (best === null || start < best.start || (start === best.start && end > best.end)) {
        best = { start, end, term: found[0] };
      }
    }
    if (best === null) break;
    matches.push(best);
    pos = best.end;
  }
  return matches;
}

/**
 * Reverses {@link protect}, swapping each token back to its term. If a
 * token is missing from the translated text (the backend dropped or
 * altered it), it's reported in `missing` and `ok` is false — the caller
 * maps this to a PLACEHOLDER_RESTORATION_FAILED error for that key.
 */
export function restore(
  text: string,
  placeholders: Record<string, string>,
): RestorationResult {
  const missing: string[] = [];
  let result = text;
  for (const [token, term] of Object.entries(placeholders)) {
    if (!result.includes(token)) {
      missing.push(token);
      continue;
    }
    result = result.replaceAll(token, term);
  }
  return { text: result, ok: missing.length === 0, missing };
}
