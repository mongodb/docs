import { describe, expect, it } from 'vitest';
import type { TranslateFn } from 'translation-mdx-adapter';
import { translateReferencesJson } from './references.js';

const INPUT = JSON.stringify({
  substitutions: { service: 'Atlas', plain: 'Rate Limits' },
  refs: { 'voyage-geographies': 'geographies#std-label-voyage-geographies' },
});

describe('translateReferencesJson', () => {
  it('translates substitution values and leaves refs untouched', async () => {
    const fn: TranslateFn = async (payload) =>
      Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, `es:${v}`]));
    const out = JSON.parse(await translateReferencesJson(INPUT, fn));
    expect(out.substitutions).toEqual({ service: 'es:Atlas', plain: 'es:Rate Limits' });
    expect(out.refs).toEqual({ 'voyage-geographies': 'geographies#std-label-voyage-geographies' });
  });

  it('translates the text of an object-valued substitution and keeps its url', async () => {
    const fn: TranslateFn = async (payload) =>
      Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, `es:${v}`]));
    const input = JSON.stringify({
      substitutions: { vercel: { text: 'Vercel', url: 'https://vercel.com' } },
      refs: {},
    });
    const out = JSON.parse(await translateReferencesJson(input, fn));
    expect(out.substitutions.vercel).toEqual({ text: 'es:Vercel', url: 'https://vercel.com' });
  });
});
