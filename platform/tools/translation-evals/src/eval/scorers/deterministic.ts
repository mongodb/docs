/** Fraction of the configured product terms that survive in the output verbatim. */
export function terminologyPreserved(output: string, terms: string[]): number {
  if (terms.length === 0) return 1;
  const kept = terms.filter((term) => output.includes(term)).length;
  return kept / terms.length;
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
