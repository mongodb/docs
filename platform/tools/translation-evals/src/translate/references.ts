import type { TranslateFn } from 'translation-mdx-adapter';
import type { Config } from '../config.js';
import { makeTranslateFn } from './batch.js';

export type SubValue = string | { text: string; nodes?: unknown[]; url?: string; tooltip?: string };

export async function translateSubstitutions(
  subs: Record<string, SubValue>,
  keys: string[],
  cfg: Config,
  locale: string,
  translateFn?: TranslateFn,
): Promise<Record<string, SubValue>> {
  const fn = translateFn ?? makeTranslateFn(cfg, locale);
  const payload: Record<string, string> = {};
  for (const k of keys) {
    const v = subs[k];
    if (v === undefined) continue;
    payload[k] = typeof v === 'string' ? v : v.text;
  }
  if (Object.keys(payload).length === 0) return subs;
  const out = await fn(payload, []);
  const result: Record<string, SubValue> = { ...subs };
  for (const k of keys) {
    const v = subs[k];
    const t = out[k];
    if (t == null || v === undefined) continue;
    result[k] = typeof v === 'string' ? t : { ...v, text: t };
  }
  return result;
}
