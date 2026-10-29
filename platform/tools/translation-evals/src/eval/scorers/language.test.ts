import { describe, it, expect } from 'vitest';
import { languageIntegrity, isException, type DetectFn } from './language.js';

const ES = 'Esta es una frase completa en español.';
const PT = 'Esta frase foi escrita em português hoje.';
const EN = 'This paragraph was never translated at all.';

const always = (code: string): DetectFn => () => code;

describe('languageIntegrity', () => {
  it('scores 1 when every segment is in the target locale', () => {
    const r = languageIntegrity(`${ES}\n${ES}`, 'es', [], always('spa'));
    expect(r.score).toBe(1);
    expect(r.flags).toEqual([]);
  });

  it('flags a wrong-language segment and scores the fraction in-target', () => {
    const r = languageIntegrity(`${ES}\n${PT}`, 'es', [], (t) => (t === PT ? 'por' : 'spa'));
    expect(r.flags).toEqual([{ segment: PT, detected: 'por' }]);
    expect(r.score).toBe(0.5);
  });

  it('flags an untranslated (source-language) segment', () => {
    const r = languageIntegrity(EN, 'es', [], always('eng'));
    expect(r.flags).toEqual([{ segment: EN, detected: 'eng' }]);
    expect(r.score).toBe(0);
  });

  it('abstains on "und" and ignores exception segments', () => {
    const r = languageIntegrity(`${ES}\n${PT}\n12345 67890 12345 67890 12345`, 'es', [], (t) => (t === PT ? 'und' : 'spa'));
    expect(r.score).toBe(1);
    expect(r.flags).toEqual([]);
  });

  it('passes every known locale plus English as candidates', () => {
    let seen: string[] = [];
    languageIntegrity(ES, 'es', [], (_t, c) => { seen = c; return 'spa'; });
    expect(seen).toContain('spa');
    expect(seen).toContain('por');
    expect(seen).toContain('jpn');
    expect(seen).toContain('eng');
  });

  it('is 1 for empty output', () => {
    expect(languageIntegrity('', 'es', []).score).toBe(1);
  });

  it('uses the real detector when none is injected', () => {
    const r = languageIntegrity(`${ES}\n${PT}`, 'es', []);
    expect(r.flags).toHaveLength(1);
    expect(r.flags[0]!.segment).toBe(PT);
    expect(r.score).toBe(0.5);
  });

  it('throws for a locale with no ISO 639-3 mapping', () => {
    expect(() => languageIntegrity('x', 'fr', [])).toThrow();
  });
});

describe('isException', () => {
  it('skips short, numeric, URL, and term-only segments', () => {
    expect(isException('Ok', [])).toBe(true);
    expect(isException('12345 67890 12345 67890 12345', [])).toBe(true);
    expect(isException('https://www.mongodb.com/docs/atlas', [])).toBe(true);
    expect(isException('MongoDB Atlas MongoDB Atlas MongoDB Atlas', ['MongoDB', 'Atlas'])).toBe(true);
  });

  it('skips code lines', () => {
    expect(isException('const result = await collection.insertOne(document);', [])).toBe(true);
    expect(isException('import { MongoClient } from "mongodb";', [])).toBe(true);
    expect(isException('mongosh "mongodb+srv://cluster0.example.mongodb.net/myFirstDatabase"', [])).toBe(true);
  });

  it('keeps normal prose sentences', () => {
    expect(isException(ES, [])).toBe(false);
    expect(isException(PT, [])).toBe(false);
    expect(isException('Esta es una frase completa en español.', [])).toBe(false);
  });
});
