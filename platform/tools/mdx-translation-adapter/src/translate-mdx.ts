import { extract } from './extract.js';
import { reconstruct } from './reconstruct.js';

/**
 * Caller-supplied translator: maps the flat payload plus the terms that must
 * survive verbatim to translated values. The caller owns all configuration
 * (locales, backend/provider, etc.) by closing over it here.
 */
export type TranslateFn = (
  payload: Record<string, string>,
  nonTranslatableTerms: string[],
) => Promise<Record<string, string | null>>;

export interface TranslateMdxOptions {
  /**
   * Extra terms the caller wants protected verbatim (product names,
   * identifiers, etc.). Merged (deduped) with the adapter's own inline
   * placeholder tokens; the union is passed to `translate`.
   */
  nonTranslatableTerms?: string[];
}

/**
 * Translate one MDX document end to end: extract → translate → reconstruct.
 * The adapter's inline tokens are always included in the terms passed to
 * `translate`, and `reconstruct` validates they survived — so non-translatable
 * content cannot be silently replaced (a dropped/altered token makes
 * reconstruct throw ReconstructionError).
 */
export async function translateMdx(
  mdx: string,
  translate: TranslateFn,
  options: TranslateMdxOptions = {},
): Promise<string> {
  const content = extract(mdx);
  const terms = [
    ...new Set([...content.non_translatable_terms, ...(options.nonTranslatableTerms ?? [])]),
  ];
  const translations = await translate(content.payload, terms);
  return reconstruct(translations, content);
}
