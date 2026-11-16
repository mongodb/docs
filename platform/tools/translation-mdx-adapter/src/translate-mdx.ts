import { extract } from './extract.js';
import { reconstruct, RebuildError } from './reconstruct.js';

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
  /**
   * Called when the first pass raises a `RebuildError` and the file is about
   * to be re-sent with its wrapped text split into separate entries. Fires at
   * most once, before the re-send, whether or not the retry succeeds. Must not
   * throw.
   *
   * `reason` names the phase that raised the error: `service` when the
   * caller's translate function threw (a dropped placeholder token),
   * `rebuild` when rebuilding the first pass failed.
   */
  onRetry?: (info: { reason: 'service' | 'rebuild' }) => void;
}

/**
 * Translate one MDX document end to end: extract → translate → reconstruct.
 * The adapter's inline tokens are always included in the terms passed to
 * `translate`, and `reconstruct` validates they survived — so non-translatable
 * content cannot be silently replaced (a dropped/altered token makes
 * reconstruct throw ReconstructionError).
 *
 * A wrapper keeps its text inside its sentence by default, as an open/close
 * pair, so the backend translates it in context. When a backend reorders such
 * a pair the rebuild cannot pair the tokens (RebuildError); the file is then
 * re-sent once with each wrapped text split into its own payload entry, where
 * no pair exists to invert. The retry also covers a `RebuildError` raised by
 * `translate` itself — a caller that detects a dropped token upstream signals
 * it the same way. The retry is bounded to that one case — a key that simply
 * failed is not re-sent.
 */
export async function translateMdx(
  mdx: string,
  translate: TranslateFn,
  options: TranslateMdxOptions = {},
): Promise<string> {
  const termsFor = (terms: string[]) => [
    ...new Set([...terms, ...(options.nonTranslatableTerms ?? [])]),
  ];

  let phase: 'service' | 'rebuild' = 'service';
  try {
    const content = extract(mdx);
    const translations = await translate(
      content.payload,
      termsFor(content.non_translatable_terms),
    );
    phase = 'rebuild';
    return reconstruct(translations, content);
  } catch (cause) {
    if (!(cause instanceof RebuildError)) throw cause;
    options.onRetry?.({ reason: phase });
    const split = extract(mdx, { splitTextWraps: true });
    const splitTranslations = await translate(
      split.payload,
      termsFor(split.non_translatable_terms),
    );
    return reconstruct(splitTranslations, split);
  }
}
