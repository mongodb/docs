/**
 * Platform-string translation.
 *
 * Resolves a stable key to its message in the active locale bundle, falling back
 * to the English source catalog, then formats it with ICU MessageFormat
 * (interpolation, plurals, and rich-text tags). Bundles are generated ahead of
 * time; this layer only does lookup and formatting.
 *
 * - `t(key, values?)` -> string (plain copy, interpolation, plurals)
 * - `t_rich(key, values?)` -> ReactNode (messages with `<tag>…</tag>` slots)
 */
import { IntlMessageFormat, type FormatXMLElementFn, type PrimitiveType } from 'intl-messageformat';
import type { ReactNode } from 'react';

/** Flat key -> message map for one locale. */
export type Catalog = Record<string, string>;

/** A tag function turns the chunks inside `<tag>…</tag>` into a rendered node. */
export type TagRenderer = FormatXMLElementFn<ReactNode>;

export type TranslateValues = Record<string, PrimitiveType | ReactNode | TagRenderer>;

export interface Translator<Key extends string = string> {
  /** Resolve and format a key as a plain string. */
  t: (key: Key, values?: TranslateValues) => string;
  /** Resolve and format a key that contains rich-text tags into a ReactNode. */
  t_rich: (key: Key, values?: TranslateValues) => ReactNode;
}

/** Compiled-message cache keyed by `locale message`, shared across translators. */
const messageCache = new Map<string, IntlMessageFormat>();

function compile(locale: string, message: string): IntlMessageFormat {
  const cacheKey = `${locale} ${message}`;
  const cached = messageCache.get(cacheKey);
  if (cached) return cached;
  const compiled = new IntlMessageFormat(message, locale);
  messageCache.set(cacheKey, compiled);
  return compiled;
}

/**
 * Build a translator bound to one locale, its bundle, and the English fallback.
 *
 * Lookup order: active bundle -> fallback bundle -> the key itself. Any ICU parse
 * or format failure falls back to the raw message so a bad string never throws
 * at render time.
 */
export function createTranslator<Key extends string = string>(
  locale: string,
  bundle: Catalog,
  fallback: Catalog,
): Translator<Key> {
  function format(key: string, values: TranslateValues | undefined): ReactNode {
    const message = bundle[key] ?? fallback[key];
    if (message === undefined) return key;
    try {
      return compile(locale, message).format<ReactNode>(values);
    } catch {
      return message;
    }
  }

  return {
    t: (key, values) => {
      const result = format(key, values);
      return typeof result === 'string' ? result : String(result ?? key);
    },
    t_rich: (key, values) => format(key, values),
  };
}
