/**
 * Protection Helper Methods
 *
 * Non-translatable terms must survive translation byte-for-byte, so we
 * don't rely on prompt instructions. Instead we swap each protected term
 * for an opaque placeholder token before translation and swap it back
 * afterward. Matching is exact and case-sensitive — the whole point is
 * that these terms remain unchanged.
 */

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

/**
 * Returns the distinct protected terms that actually occur in `text`,
 * in the order they were supplied. Empty terms are ignored.
 */
export function detectTerms(text: string, terms: string[]): string[] {
  const seen = new Set<string>();
  const found: string[] = [];
  for (const term of terms) {
    if (term.length === 0 || seen.has(term)) continue;
    seen.add(term);
    if (text.includes(term)) found.push(term);
  }
  return found;
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
export function protect(text: string, terms: string[]): ProtectionResult {
  const present = detectTerms(text, terms).sort((a, b) => b.length - a.length);
  const placeholders: Record<string, string> = {};
  let result = text;
  let n = 1;
  for (const term of present) {
    if (!result.includes(term)) continue;
    while (text.includes(`__PROT${n}__`)) n++;
    const token = `__PROT${n}__`;
    result = result.replaceAll(term, token);
    placeholders[token] = term;
    n++;
  }
  return { text: result, placeholders };
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
