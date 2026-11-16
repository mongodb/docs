import { translateMdx, RebuildError, type TranslateFn } from 'translation-mdx-adapter';
import { translate, type TranslationBackend } from '@mongodb-docs/translation-service';

export function makeTranslateFn(backend: TranslationBackend, targetLocale: string): TranslateFn {
  return async (payload, nonTranslatableTerms) => {
    const res = await translate(
      {
        source_locale: 'en-us',
        target_locale: targetLocale,
        content_type: 'platform_strings',
        payload,
        non_translatable_terms: nonTranslatableTerms,
      },
      { backend },
    );
    const failed = Object.entries(res.errors);
    if (failed.length > 0) {
      const [key, error] = failed[0]!;
      const message =
        `${failed.length} of ${Object.keys(payload).length} keys failed; ` +
        `first: "${key}" ${error.code}: ${error.message}`;
      // A dropped inline placeholder token is recoverable: translateMdx retries
      // the file with the wrapped text split into its own entry, where there is
      // no open/close pair to lose. Signal it with the adapter's retryable error.
      if (failed.some(([, e]) => e.code === 'PLACEHOLDER_RESTORATION_FAILED')) {
        throw new RebuildError(message);
      }
      throw new Error(message);
    }
    return res.translations;
  };
}

export async function translateMdxFile(
  mdx: string,
  backend: TranslationBackend,
  targetLocale: string,
): Promise<string> {
  return translateMdx(mdx, makeTranslateFn(backend, targetLocale));
}
