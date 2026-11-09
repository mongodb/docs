import type { TranslateFn } from 'translation-mdx-adapter';

export type SubValue = string | { text: string; nodes?: unknown[]; url?: string; tooltip?: string };

export async function translateReferencesJson(
  json: string,
  translateFn: TranslateFn,
): Promise<string> {
  const parsed = JSON.parse(json) as {
    substitutions?: Record<string, SubValue>;
    refs?: Record<string, string>;
  };
  const subs = parsed.substitutions ?? {};
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(subs)) {
    payload[key] = typeof value === 'string' ? value : value.text;
  }

  if (Object.keys(payload).length > 0) {
    const out = await translateFn(payload, []);
    for (const [key, value] of Object.entries(subs)) {
      const translated = out[key];
      if (translated == null) continue;
      subs[key] = typeof value === 'string' ? translated : { ...value, text: translated };
    }
  }

  return `${JSON.stringify({ ...parsed, substitutions: subs }, null, 2)}\n`;
}
