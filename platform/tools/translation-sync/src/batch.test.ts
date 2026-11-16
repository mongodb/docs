import { describe, expect, it } from 'vitest';
import { StubBackend, type TranslationBackend } from '@mongodb-docs/translation-service';
import { RebuildError } from 'translation-mdx-adapter';
import { makeTranslateFn, translateMdxFile } from './batch.js';

const MDX = `---
description: Connect to a cluster.
---

# Connect

Use \`mongosh\` to connect.
`;

const INLINE_MARKUP = '# Setup\n\nClick **Save** to apply the **shard key**.\n';

describe('translateMdxFile', () => {
  it('translates a document through the adapter and preserves markup', async () => {
    const backend = new StubBackend();
    const out = await translateMdxFile(MDX, backend, 'es');
    expect(out).not.toBe(MDX);
    expect(out).toContain('`mongosh`');
    expect(out).toContain('# ');
  });

  it('throws when a key fails so the caller can isolate the file', async () => {
    const backend = new StubBackend({
      errorFor: { a: { code: 'TRANSLATION_FAILED', message: 'boom' } },
    });
    const fn = makeTranslateFn(backend, 'es');
    await expect(fn({ a: 'Hello' }, [])).rejects.toThrow(/failed/);
  });

  it('signals a dropped placeholder token as the adapter retryable error', async () => {
    const backend = new StubBackend({
      errorFor: { a: { code: 'PLACEHOLDER_RESTORATION_FAILED', message: 'token dropped' } },
    });
    const fn = makeTranslateFn(backend, 'es');
    await expect(fn({ a: 'Hello' }, [])).rejects.toBeInstanceOf(RebuildError);
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

    const out = await translateMdxFile(INLINE_MARKUP, dropping, 'es');

    expect(calls).toBe(2);
    expect(out).toBe(INLINE_MARKUP);
  });
});
