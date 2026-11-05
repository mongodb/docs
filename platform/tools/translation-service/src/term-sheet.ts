/**
 * Term sheet
 *
 * Finds the glossary's terms in the English text and lists their allowed
 * options for the target locale, so the model can choose and adapt the right
 * word. Each term also matches the variations generated for it (see
 * term-variations), longest first, so "replica sets" matches the term
 * "replica set" rather than the shorter "replica". Non-translatable terms are
 * removed from the text before scanning, so the sheet never lists a term the
 * protection step keeps verbatim. Deterministic: the same text and glossary
 * always give the same sheet, in glossary order.
 */
import type { TranslatableTerms } from "./glossary.js";
import type { TermSheetEntry } from "./types.js";
import { detectTerms, removeTerm } from "./protection-helpers.js";
import { termMatches, type TermMatch } from "./term-variations.js";

const IGNORE_CASE = { ignoreCase: true };

/** Longest match first, then alphabetically, so the order is deterministic. */
function longestMatchFirst(a: TermMatch, b: TermMatch): number {
  return (
    b.match.length - a.match.length ||
    (a.match < b.match ? -1 : a.match > b.match ? 1 : 0)
  );
}

/**
 * `texts` with every non-translatable term removed (replaced by a space) for
 * term-sheet scanning only; the text sent to the backend is untouched. A
 * lowercase word that merely resembles one ("time windows") still reaches the
 * sheet.
 */
function removeNonTranslatableTerms(texts: string[], nonTranslatableTerms: string[]): string[] {
  if (nonTranslatableTerms.length === 0) return texts;
  const present = new Set<string>();
  for (const text of texts) {
    for (const term of detectTerms(text, nonTranslatableTerms)) present.add(term);
  }
  if (present.size === 0) return texts;
  const longestFirst = [...present].sort((a, b) => b.length - a.length);
  return texts.map((text) => longestFirst.reduce((acc, term) => removeTerm(acc, term), text));
}

export function buildTermSheet(
  texts: string[],
  translatableTerms: TranslatableTerms,
  targetLocale: string,
  nonTranslatableTerms: string[] = [],
): TermSheetEntry[] {
  const locale = targetLocale.toLowerCase();
  const matches = termMatches(translatableTerms).sort(longestMatchFirst);
  let remaining = removeNonTranslatableTerms(texts, nonTranslatableTerms);
  const found = new Set<string>();
  // Once a string is found, remove it from the text before checking shorter
  // strings, so "access" inside "access control" is not listed unless "access"
  // also appears on its own.
  for (const { match, term } of matches) {
    if (remaining.some((text) => detectTerms(text, [match], IGNORE_CASE).length > 0)) {
      found.add(term);
      remaining = remaining.map((text) => removeTerm(text, match, IGNORE_CASE));
    }
  }

  const sheet: TermSheetEntry[] = [];
  for (const [term, entries] of Object.entries(translatableTerms)) {
    if (!found.has(term)) continue;
    const options = entries.flatMap((entry) => {
      const option = Object.entries(entry.translations).find(
        ([key]) => key.toLowerCase() === locale,
      )?.[1];
      return option === undefined ? [] : [{ option, definition: entry.definition }];
    });
    if (options.length > 0) sheet.push({ term, options });
  }
  return sheet;
}
