export interface NonTranslatableTermScore {
  /** null when the source holds none of the non-translatable terms — the row was not measured. */
  score: number | null;
  denominator: number;
  numerator: number;
  missing: string[];
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * True when `term` occurs as a whole token. `#` and `+` are word characters so
 * `C` does not match inside `C++`/`C#`; `-` is one too, so `MongoDB` does not
 * match inside `MongoDB-related` (a known trade-off, plan section 6.4).
 */
function occursAsTerm(text: string, term: string): boolean {
  return new RegExp(
    `(?<![\\p{L}\\p{N}_$#+-])${escapeRegExp(term)}(?![\\p{L}\\p{N}_$#+-])`,
    'u',
  ).test(text);
}

/**
 * Fraction of the configured non-translatable terms that occur in the source
 * and survive verbatim in the output. Source-scoped: a term the page never
 * mentioned can be neither preserved nor lost, and a term only the output
 * carries was not preserved.
 */
export function terminologyPreserved(
  source: string,
  output: string,
  nonTranslatableTerms: string[],
): NonTranslatableTermScore {
  const presentInSource = nonTranslatableTerms.filter((term) => occursAsTerm(source, term));
  const missingTerms = presentInSource.filter((term) => !occursAsTerm(output, term));
  const numerator = presentInSource.length - missingTerms.length;
  return {
    score: presentInSource.length === 0 ? null : numerator / presentInSource.length,
    denominator: presentInSource.length,
    numerator,
    missing: missingTerms,
  };
}

function bigrams(text: string): Set<string> {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const out = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i++) out.add(normalized.slice(i, i + 2));
  return out;
}

/**
 * Character-bigram F1 (chrF-like) against the production translation. This is
 * a calibration signal, not a pass/fail: a faithful translation can score low
 * simply by wording the same content differently.
 */
export function referenceSimilarity(output: string, reference: string): number {
  if (output === reference) return 1;
  const a = bigrams(output);
  const b = bigrams(reference);
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const gram of a) if (b.has(gram)) intersection++;
  const precision = intersection / a.size;
  const recall = intersection / b.size;
  if (precision + recall === 0) return 0;
  return (2 * precision * recall) / (precision + recall);
}
