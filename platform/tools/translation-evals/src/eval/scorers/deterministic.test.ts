import { describe, it, expect } from 'vitest';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';

describe('terminologyPreserved', () => {
  it('is the fraction of terms kept', () => {
    expect(terminologyPreserved('Usa MongoDB Atlas', ['MongoDB', 'Atlas'])).toBe(1);
    expect(terminologyPreserved('Usa MongoDB', ['MongoDB', 'Atlas'])).toBe(0.5);
    expect(terminologyPreserved('Usa MongoDB', ['MongoDB', 'Atlas', 'Realm'])).toBeCloseTo(1 / 3);
  });

  it('is 1 when no terms are configured', () => {
    expect(terminologyPreserved('anything', [])).toBe(1);
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
