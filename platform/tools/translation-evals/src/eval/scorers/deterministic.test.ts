import { describe, it, expect } from 'vitest';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';

describe('terminologyPreserved', () => {
  const nonTranslatableTerms = ['MongoDB', 'Atlas', 'BSON'];

  it('scores the fraction of source non-translatable terms that survive', () => {
    const r = terminologyPreserved(
      'MongoDB Atlas is a database.',
      'MongoDB Atlas es una base de datos.',
      nonTranslatableTerms,
    );
    expect(r).toEqual({ score: 1, denominator: 2, numerator: 2, missing: [] });
  });

  it('reports the non-translatable terms that were dropped', () => {
    const r = terminologyPreserved(
      'MongoDB Atlas is a database.',
      'MongoDB es una base de datos.',
      nonTranslatableTerms,
    );
    expect(r.score).toBe(0.5);
    expect(r.missing).toEqual(['Atlas']);
  });

  it('ignores non-translatable terms the source never mentions', () => {
    // BSON is not on the page, so it can be neither preserved nor lost.
    const r = terminologyPreserved('MongoDB is a database.', 'MongoDB es una base de datos.', nonTranslatableTerms);
    expect(r).toEqual({ score: 1, denominator: 1, numerator: 1, missing: [] });
  });

  it('does not credit a term that appears only in the output', () => {
    // Atlas is in the output but the source never mentioned it — chrome, or a
    // term the translator added. It was not preserved, so it must not raise the
    // score above 1.
    const r = terminologyPreserved(
      'MongoDB is a database.',
      'MongoDB Atlas es una base de datos.',
      nonTranslatableTerms,
    );
    expect(r).toEqual({ score: 1, denominator: 1, numerator: 1, missing: [] });
  });

  it('returns a null score when the source holds none of the non-translatable terms', () => {
    const r = terminologyPreserved('A database.', 'Una base de datos.', nonTranslatableTerms);
    expect(r.score).toBeNull();
    expect(r.denominator).toBe(0);
    expect(r.numerator).toBe(0);
  });

  it('matches on word boundaries, not substrings', () => {
    // `C` must not match inside `C++`, nor inside `Copy`.
    expect(terminologyPreserved('C++ is fast.', 'C++ es rápido.', ['C']).denominator).toBe(0);
    expect(terminologyPreserved('Copy page', 'Copy page', ['C']).denominator).toBe(0);
    // ...but a standalone `C` does match.
    expect(terminologyPreserved('C is fast.', 'C es rápido.', ['C']).denominator).toBe(1);
  });

  it('matches terms containing + and # as whole terms', () => {
    const r = terminologyPreserved(
      'C++ and C# are languages.',
      'C++ y C# son lenguajes.',
      ['C++', 'C#'],
    );
    expect(r).toEqual({ score: 1, denominator: 2, numerator: 2, missing: [] });
  });

  it('does not match a term inside a larger word', () => {
    expect(terminologyPreserved('mongosh is a shell.', 'mongosh es un shell.', ['mongo']).denominator).toBe(0);
    expect(terminologyPreserved('_id is a field.', '_id es un campo.', ['id']).denominator).toBe(0);
  });

  it('treats a hyphen as part of the word, so a hyphenated use does not match', () => {
    // Known trade-off of the boundary class (plan section 6.4): `MongoDB` in
    // `MongoDB-related` is not matched.
    const r = terminologyPreserved('MongoDB-related content.', 'Contenido relacionado.', ['MongoDB']);
    expect(r.denominator).toBe(0);
    expect(r.score).toBeNull();
  });

  it('is a null score when no non-translatable terms are configured', () => {
    expect(terminologyPreserved('anything', 'anything', []).score).toBeNull();
  });

  it('is case-sensitive', () => {
    // The glossary fixes exact casing, so a lowercased term is a loss.
    const r = terminologyPreserved(
      'MongoDB is a database.',
      'mongodb es una base de datos.',
      ['MongoDB'],
    );
    expect(r.denominator).toBe(1);
    expect(r.score).toBe(0);
    expect(r.missing).toEqual(['MongoDB']);
  });

  it('does not match a term adjacent to CJK text', () => {
    // Consequence of the boundary class (plan section 6.4). This is why the
    // scorer skips rows whose locale has no term list rather than scoring them.
    const r = terminologyPreserved('MongoDB is great.', 'MongoDBのデータベース', ['MongoDB']);
    expect(r.denominator).toBe(1);
    expect(r.score).toBe(0);
  });
});

describe('referenceSimilarity', () => {
  it('is 1 for identical strings', () => {
    expect(referenceSimilarity('hola', 'hola')).toBe(1);
  });

  it('is between 0 and 1 for partial overlap', () => {
    const score = referenceSimilarity('hola mundo', 'hola');
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(1);
  });

  it('is 0 for unrelated strings and for an empty side', () => {
    expect(referenceSimilarity('zzz', 'qqq')).toBe(0);
    expect(referenceSimilarity('', 'hola')).toBe(0);
  });

  it('ignores case and repeated whitespace', () => {
    expect(referenceSimilarity('Hola   Mundo', 'hola mundo')).toBe(1);
  });
});
