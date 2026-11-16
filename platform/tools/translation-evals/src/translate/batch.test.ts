import { describe, it, expect } from 'vitest';
import {
  StubBackend,
  type TranslationBackend,
} from '@mongodb-docs/translation-service';
import { makeTranslateFn, translateMdxFile } from './batch.js';
import { loadConfig } from '../config.js';
import { RebuildError } from 'translation-mdx-adapter';

const SRC = `# Setup\n\nInstall with \`brew\` and read the [guide](/g).\n\n<Note>\n  Keep MongoDB running.\n</Note>\n`;

const INLINE_MARKUP = '# Setup\n\nClick **Save** to apply the **shard key**.\n';

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

describe('dropped inline placeholder recovery', () => {
  const cfg = loadConfig({});

  it('throws the adapter retryable error when a placeholder token was dropped', async () => {
    const backend = new StubBackend({
      errorFor: { b: { code: 'PLACEHOLDER_RESTORATION_FAILED', message: 'token dropped' } },
    });
    const fn = makeTranslateFn(cfg, 'es', backend);

    await expect(fn({ a: 'Hello', b: 'World' }, [])).rejects.toBeInstanceOf(RebuildError);
  });

  it('keeps throwing a plain error for a non-placeholder failure', async () => {
    const backend = new StubBackend({
      errorFor: { b: { code: 'BACKEND_ERROR', message: 'upstream 500' } },
    });
    const fn = makeTranslateFn(cfg, 'es', backend);

    const err = await fn({ a: 'Hello', b: 'World' }, []).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(Error);
    expect(err).not.toBeInstanceOf(RebuildError);
  });

  it('recovers a file when the backend drops an inline token on the first pass', async () => {
    let calls = 0;
    const dropping: TranslationBackend = {
      name: 'dropping',
      async translateBatch(batch) {
        calls++;
        return {
          items: batch.items.map((item) => ({
            key: item.key,
            status: 'ok' as const,
            text: calls === 1 ? item.text.replace(/__PROT\d+__/g, '') : item.text,
          })),
          meta: { provider: 'dropping', model: 'dropping-1' },
        };
      },
    };

    const out = await translateMdxFile(
      INLINE_MARKUP,
      cfg,
      'es',
      makeTranslateFn(cfg, 'es', dropping),
    );

    expect(calls).toBe(2);
    expect(out).toBe(INLINE_MARKUP);
  });

  it('does not retry more than once when the split pass also drops the token', async () => {
    let calls = 0;
    const alwaysDropping: TranslationBackend = {
      name: 'always-dropping',
      async translateBatch(batch) {
        calls++;
        return {
          items: batch.items.map((item) => ({
            key: item.key,
            status: 'ok' as const,
            text: item.text.replace(/__PROT\d+__/g, ''),
          })),
          meta: { provider: 'always-dropping', model: 'always-dropping-1' },
        };
      },
    };

    await expect(
      translateMdxFile(INLINE_MARKUP, cfg, 'es', makeTranslateFn(cfg, 'es', alwaysDropping)),
    ).rejects.toBeInstanceOf(RebuildError);
    expect(calls).toBe(2);
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
