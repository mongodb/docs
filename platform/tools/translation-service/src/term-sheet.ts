/**
 * Term sheet
 *
 * Finds the glossary's translatable terms in the English text and lists their
 * allowed options for the target locale, so the model can choose and adapt
 * the right word. Deterministic: the same text and glossary always give the
 * same sheet, in glossary order.
 */
import type { TranslatableTerms } from "./glossary.js";
import type { TermSheetEntry } from "./types.js";
import { detectTerms, removeTerm } from "./protection-helpers.js";

const IGNORE_CASE = { ignoreCase: true };

export function buildTermSheet(
  texts: string[],
  translatableTerms: TranslatableTerms,
  targetLocale: string,
): TermSheetEntry[] {
  const locale = targetLocale.toLowerCase();
  // Remove each found term before checking shorter ones, so "access" inside
  // "access control" is not listed unless it also appears on its own.
  const longestFirst = Object.keys(translatableTerms).sort((a, b) => b.length - a.length);
  let remaining = texts;
  const found = new Set<string>();
  for (const term of longestFirst) {
    if (remaining.some((text) => detectTerms(text, [term], IGNORE_CASE).length > 0)) {
      found.add(term);
      remaining = remaining.map((text) => removeTerm(text, term, IGNORE_CASE));
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
