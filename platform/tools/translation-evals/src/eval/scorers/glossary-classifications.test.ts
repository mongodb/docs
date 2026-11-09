import { describe, it, expect } from 'vitest';
import { DEFAULT_GLOSSARY, type Glossary } from '@mongodb-docs/translation-service';
import { activeClassifications, codeNameSpans } from './glossary-classifications.js';
import { scoreGlossaryTerms } from './glossary-terms.js';
import type { SegmentPair } from '../../types.js';

const seg = (en: string, es: string, key = 'paragraph[0]'): SegmentPair => ({ key, en, es });

function clone(g: Glossary): Glossary {
  return JSON.parse(JSON.stringify(g)) as Glossary;
}

describe('activeClassifications', () => {
  it('activates every set against the bundled glossary', () => {
    const c = activeClassifications(DEFAULT_GLOSSARY);
    expect(c.inactive).toEqual([]);
    expect(c.badData).toEqual({ write: 'guardar', mode: 'moda', batch: 'agrupar' });
    expect(c.phrase).toContain('projection');
    expect(Object.keys(c.drift).sort()).toEqual([
      'array',
      'driver',
      'pipeline',
      'query',
      'replica set',
      'shard',
      'shard key',
    ]);
  });

  it('disables badData per-entry when an option changed', () => {
    const g = clone(DEFAULT_GLOSSARY);
    g.translatableTerms.write = [{ definition: 'd', translations: { es: 'escribir' } }];
    const c = activeClassifications(g);
    expect(c.badData).toEqual({ mode: 'moda', batch: 'agrupar' });
    expect(c.inactive).toContain('badData');
  });

  it('disables the WHOLE drift set when any one entry drifts', () => {
    const g = clone(DEFAULT_GLOSSARY);
    g.translatableTerms.pipeline = [{ definition: 'd', translations: { es: 'tubería' } }];
    const c = activeClassifications(g);
    expect(c.drift).toEqual({});
    expect(c.inactive).toContain('drift');
  });

  it('names every dropped set against an empty glossary', () => {
    const c = activeClassifications({ nonTranslatableTerms: [], translatableTerms: {} });
    expect(c.inactive).toEqual(['badData', 'drift', 'phrase']);
  });

  it('matches dotted identifiers and slash literals structurally', () => {
    const spans = codeNameSpans('Node.js and db.collection.findOneAndUpdate() and /pattern/ and Bulk.write()');
    expect(spans).toHaveLength(4);
  });

  it('does not treat a sentence boundary as a dotted name', () => {
    expect(codeNameSpans('The collection. Next paragraph.')).toHaveLength(0);
  });

  it('finds a code-name span without leaking lastIndex', () => {
    expect(codeNameSpans('See db.collection.find() here.')).toEqual([[4, 24]]);
    expect(codeNameSpans('/pattern/ again')).toEqual([[0, 9]]);
    expect(codeNameSpans('nothing here')).toEqual([]);
  });
});

describe('classifications label, they do not move verdicts', () => {
  it('labels a bad-data term but still credits the occurrence when the option is used', () => {
    const r = scoreGlossaryTerms([seg('Write the data.', 'Guarda los datos.')], DEFAULT_GLOSSARY, 'es');
    expect(r.metadata.correct).toBe(1);
    expect(r.metadata.wrong).toBe(0);
    expect(r.metadata.terms.find((t) => t.term === 'write')!.flags).toContain(
      'glossary option is known-bad data',
    );
  });

  it('labels a verbal use without changing whether it is wrong', () => {
    const g = { nonTranslatableTerms: [], translatableTerms: { query: [{ definition: 'd', translations: { es: 'query' } }] } };
    const r = scoreGlossaryTerms([seg('Query the collection.', 'Consulte la colección.')], g, 'es');
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.wrongByReason['verbal use of the term']).toBe(1);
  });
});
