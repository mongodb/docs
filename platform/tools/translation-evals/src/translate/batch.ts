import { translateMdx, type TranslateFn } from 'translation-mdx-adapter';
import { translate, type TranslationBackend } from '@mongodb-docs/translation-service';
import type { Config } from '../config.js';
import { selectBackend } from './backend.js';

export function makeTranslateFn(
  cfg: Config,
  targetLocale: string,
  backend: TranslationBackend = selectBackend(cfg.translatorModel, cfg.translatorBackend),
): TranslateFn {
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
  cfg: Config,
  targetLocale: string,
  nonTranslatableTerms: string[],
  translateFn?: TranslateFn,
): Promise<string> {
  const fn = translateFn ?? makeTranslateFn(cfg, targetLocale);
  return translateMdx(mdx, fn, { nonTranslatableTerms });
}
