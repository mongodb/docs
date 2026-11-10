/**
 * Translator for the locale this site was built for.
 *
 * No React state and no `'use client'`, so server and client components can both
 * call it directly. The locale is fixed at build time (NEXT_PUBLIC_DOCS_LOCALE),
 * not read from the URL or cookie.
 */
import { getBuildLocale, type AvailableLocaleType } from '@/utils/locale';
import { FALLBACK_LOCALE, getCatalog, type PlatformStringKey } from './catalogs';
import { createTranslator, type Translator } from './translate';

const translators = new Map<AvailableLocaleType, Translator<PlatformStringKey>>();

export function getTranslator(locale: AvailableLocaleType = getBuildLocale()): Translator<PlatformStringKey> {
  let translator = translators.get(locale);
  if (!translator) {
    translator = createTranslator<PlatformStringKey>(locale, getCatalog(locale), getCatalog(FALLBACK_LOCALE));
    translators.set(locale, translator);
  }
  return translator;
}
