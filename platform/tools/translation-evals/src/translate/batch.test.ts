import { describe, it, expect } from 'vitest';
import { StubBackend } from '@mongodb-docs/translation-service';
import { makeTranslateFn, translateMdxFile } from './batch.js';
import { loadConfig } from '../config.js';

const SRC = `# Setup\n\nInstall with \`brew\` and read the [guide](/g).\n\n<Note>\n  Keep MongoDB running.\n</Note>\n`;

describe('translateMdxFile', () => {
  it('returns reconstructed MDX when the backend echoes translations', async () => {
    const cfg = loadConfig({});
    const out = await translateMdxFile(SRC, cfg, 'es', ['MongoDB'], async (payload) => ({ ...payload }));
    expect(out).toContain('Keep MongoDB running.');
  });

  it('passes the caller terms to the translate function', async () => {
    const cfg = loadConfig({});
    let seen: string[] = [];
    await translateMdxFile(SRC, cfg, 'es', ['MongoDB'], async (payload, terms) => {
      seen = terms;
      return { ...payload };
    });
    expect(seen).toContain('MongoDB');
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
