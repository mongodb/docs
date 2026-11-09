import { describe, expect, it } from 'vitest';
import { StubBackend } from '@mongodb-docs/translation-service';
import { makeTranslateFn, translateMdxFile } from './batch.js';

const MDX = `---
description: Connect to a cluster.
---

# Connect

Use \`mongosh\` to connect.
`;

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
});
