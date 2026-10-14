import { describe, it, expect } from 'vitest';
import { translateSubstitutions, type SubValue } from './references.js';
import { loadConfig } from '../config.js';

describe('translateSubstitutions', () => {
  it('translates string values and rich .text, leaves other keys untouched', async () => {
    const cfg = loadConfig({});
    const subs: Record<string, SubValue> = {
      'ui-org-menu': 'Organizations menu',
      service: { text: 'Atlas', nodes: [] },
      unused: 'x',
    };
    const upper = async (payload: Record<string, string>) =>
      Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, v.toUpperCase()]));

    const out = await translateSubstitutions(subs, ['ui-org-menu', 'service'], cfg, 'es', upper);

    expect(out['ui-org-menu']).toBe('ORGANIZATIONS MENU');
    expect(out.service).toEqual({ text: 'ATLAS', nodes: [] });
    expect(out.unused).toBe('x');
  });

  it('keeps the original value when a key comes back null', async () => {
    const cfg = loadConfig({});
    const out = await translateSubstitutions({ a: 'one', b: 'two' }, ['a', 'b'], cfg, 'es', async () => ({
      a: 'uno',
      b: null,
    }));
    expect(out).toEqual({ a: 'uno', b: 'two' });
  });

  it('does not call the translate function when there is nothing to translate', async () => {
    const cfg = loadConfig({});
    const out = await translateSubstitutions({ a: 'one' }, ['missing'], cfg, 'es', async () => {
      throw new Error('should not be called');
    });
    expect(out).toEqual({ a: 'one' });
  });
});
