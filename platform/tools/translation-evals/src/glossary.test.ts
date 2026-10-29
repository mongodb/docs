import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { glossaryIdentity, readGlossary } from './glossary.js';

const dirs: string[] = [];

function writeTemp(contents: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'glossary-'));
  dirs.push(dir);
  const file = path.join(dir, 'glossary.json');
  fs.writeFileSync(file, contents);
  return file;
}

afterEach(() => {
  for (const dir of dirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
});

describe('readGlossary', () => {
  it('returns an empty glossary when no path is configured', () => {
    expect(readGlossary(undefined)).toEqual({ nonTranslatableTerms: [], translatableTerms: {} });
  });

  it('reads both lists', () => {
    const file = writeTemp(
      JSON.stringify({
        nonTranslatableTerms: ['MongoDB'],
        translatableTerms: { shard: { es: ['partición'] } },
      }),
    );
    expect(readGlossary(file)).toEqual({
      nonTranslatableTerms: ['MongoDB'],
      translatableTerms: { shard: { es: ['partición'] } },
    });
  });

  it('throws when translatableTerms is not an object', () => {
    const file = writeTemp(
      JSON.stringify({ nonTranslatableTerms: ['MongoDB'], translatableTerms: ['shard'] }),
    );
    expect(() => readGlossary(file)).toThrow(/translatableTerms/);
  });

  it('throws when a term is blank or untrimmed', () => {
    const blank = writeTemp(
      JSON.stringify({ nonTranslatableTerms: ['MongoDB', ''], translatableTerms: {} }),
    );
    expect(() => readGlossary(blank)).toThrow(/blank or untrimmed/);
    const padded = writeTemp(
      JSON.stringify({ nonTranslatableTerms: [' MongoDB'], translatableTerms: {} }),
    );
    expect(() => readGlossary(padded)).toThrow(/blank or untrimmed/);
  });

  it('throws for an unrecognised shape', () => {
    const file = writeTemp(JSON.stringify({ terms: ['MongoDB'] }));
    expect(() => readGlossary(file)).toThrow(/nonTranslatableTerms/);
  });

  it('throws when the file does not exist', () => {
    expect(() => readGlossary('/nonexistent/glossary.json')).toThrow();
  });

  it('throws on malformed JSON', () => {
    const file = writeTemp('{ not json');
    expect(() => readGlossary(file)).toThrow();
  });
});

describe('glossaryIdentity', () => {
  const write = (terms: string[]) =>
    writeTemp(JSON.stringify({ nonTranslatableTerms: terms, translatableTerms: {} }));

  it('reports the term count and a short content hash', () => {
    const file = write(['MongoDB', 'Atlas']);
    const id = glossaryIdentity(file, readGlossary(file));
    expect(id.count).toBe(2);
    expect(id.sha256).toMatch(/^[0-9a-f]{12}$/);
  });

  it('changes the hash when the file contents change', () => {
    const a = write(['MongoDB']);
    const b = write(['MongoDB', 'Atlas']);
    expect(glossaryIdentity(a, readGlossary(a)).sha256).not.toBe(
      glossaryIdentity(b, readGlossary(b)).sha256,
    );
  });
});
