import { describe, it, expect } from 'vitest';
import {
  StubBackend,
  type TranslationBackend,
} from '@mongodb-docs/translation-service';
import { makeTranslateFn, translateMdxFile } from './batch.js';
import { loadConfig } from '../config.js';

const SRC = `# Setup\n\nInstall with \`brew\` and read the [guide](/g).\n\n<Note>\n  Keep MongoDB running.\n</Note>\n`;

describe('translateMdxFile', () => {
  it('returns reconstructed MDX when the backend echoes translations', async () => {
    const cfg = loadConfig({});
    const out = await translateMdxFile(SRC, cfg, 'es', async (payload) => ({ ...payload }));
    expect(out).toContain('Keep MongoDB running.');
  });
});

describe('adapter tokens reach the model protected', () => {
  // The adapter delimits every inline placeholder with Private Use Area
  // characters and glues it to the text it wraps, so the service's
  // word-boundary protection has to match a token exactly as emitted. If it
  // does not, the raw delimiters reach the model, which drops them and makes
  // reconstruction fail.
  const INLINE_MARKUP = '# Setup\n\nClick **Save** to apply the **shard key**.\n';
  const PUA = /[\uE000\uE001]/;

  it('sends no raw placeholder delimiter to the backend', async () => {
    const cfg = loadConfig({});
    const seen: string[] = [];
    const capturing: TranslationBackend = {
      name: 'capturing',
      async translateBatch(batch) {
        seen.push(...batch.items.map((item) => item.text));
        return {
          items: batch.items.map((item) => ({
            key: item.key,
            status: 'ok' as const,
            text: item.text,
          })),
          meta: { provider: 'capturing', model: 'capturing-1' },
        };
      },
    };

    await translateMdxFile(
      INLINE_MARKUP,
      cfg,
      'es',
      makeTranslateFn(cfg, 'es', capturing),
    );

    expect(seen.length).toBeGreaterThan(0);
    expect(seen.filter((text) => PUA.test(text))).toEqual([]);
  });
});

describe('makeTranslateFn', () => {
  const cfg = loadConfig({});

  it('returns the backend translations', async () => {
    const fn = makeTranslateFn(cfg, 'es', new StubBackend());
    const out = await fn({ a: 'Hello' }, []);
    expect(out.a).toContain('Hello');
  });

  it('throws with the service error code and message when a key fails', async () => {
    const backend = new StubBackend({
      errorFor: { b: { code: 'BACKEND_ERROR', message: 'upstream 500' } },
    });
    const fn = makeTranslateFn(cfg, 'es', backend);

    await expect(fn({ a: 'Hello', b: 'World' }, [])).rejects.toThrow(
      '1 of 2 keys failed; first: "b" BACKEND_ERROR: upstream 500',
    );
  });

  it('uses the configured backend when none is injected', async () => {
    const cfg = loadConfig({ TRANSLATOR_BACKEND: 'stub' });
    const fn = makeTranslateFn(cfg, 'es');
    const out = await fn({ a: 'Hello' }, []);
    expect(out.a).toContain('Hello');
  });
});
