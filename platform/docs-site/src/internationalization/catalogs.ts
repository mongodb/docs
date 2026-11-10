/**
 * Locale catalog registry.
 *
 * Maps every supported locale code to its platform-string bundle. English is the
 * source catalog and the fallback. A locale that is not translated yet has an
 * empty bundle and resolves to English.
 */
import type { AvailableLocaleType } from '@/utils/locale';
import type { Catalog } from './translate';
import enUs from './platform-strings.en-us.json';
import es from './platform-strings.es.json';
import jaJp from './platform-strings.ja-jp.json';
import koKr from './platform-strings.ko-kr.json';
import ptBr from './platform-strings.pt-br.json';
import zhCn from './platform-strings.zh-cn.json';

/** Every key in the English catalog. `t()` only accepts these, so a misspelled key fails type-check. */
export type PlatformStringKey = keyof typeof enUs;

/** Locale whose catalog is the source of truth and the lookup fallback. */
export const FALLBACK_LOCALE: AvailableLocaleType = 'en-us';

const catalogs: Record<AvailableLocaleType, Catalog> = {
  'en-us': enUs,
  'pt-br': ptBr,
  es,
  'ko-kr': koKr,
  'ja-jp': jaJp,
  'zh-cn': zhCn,
};

/** Catalog for a locale, falling back to English for an unrecognized locale code. */
export function getCatalog(locale: string): Catalog {
  return catalogs[locale as AvailableLocaleType] ?? enUs;
}
