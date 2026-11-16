import {
  translateMdx,
  RebuildError,
  type TranslateFn,
  type TranslateMdxOptions,
} from 'translation-mdx-adapter';
import {
  translate,
  type TranslateResponse,
  type TranslationBackend,
} from '@mongodb-docs/translation-service';
import type { Config } from '../config.js';
import { selectBackend } from './backend.js';

export function makeTranslateFn(
  cfg: Config,
  targetLocale: string,
  backend: TranslationBackend = selectBackend(cfg.translatorModel, cfg.translatorBackend),
  onMeta?: (meta: TranslateResponse['meta']) => void,
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
    // Reported before the failure check, so the run's configured terminology
    // stays auditable even when some keys failed.
    onMeta?.(res.meta);
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
  cfg: Config,
  targetLocale: string,
  translateFn?: TranslateFn,
  onRetry?: TranslateMdxOptions['onRetry'],
): Promise<string> {
  const fn = translateFn ?? makeTranslateFn(cfg, targetLocale);
  return translateMdx(mdx, fn, { onRetry });
}
