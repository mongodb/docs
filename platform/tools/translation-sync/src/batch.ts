import { translateMdx, type TranslateFn } from 'translation-mdx-adapter';
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
      throw new Error(
        `${failed.length} of ${Object.keys(payload).length} keys failed; ` +
          `first: "${key}" ${error.code}: ${error.message}`,
      );
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
