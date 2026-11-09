import { describe, it, expect } from 'vitest';
import type { Glossary } from '@mongodb-docs/translation-service';
import type { JudgeOptions } from '../judge/judge.js';
import type { SegmentPair } from '../../types.js';
import { toEvalScorers, type RowInput, type RowMetadata } from './index.js';

const GLOSSARY: Glossary = {
  nonTranslatableTerms: ['MongoDB'],
  translatableTerms: { driver: [{ definition: 'd', translations: { es: 'driver' } }] },
};

const INPUT: RowInput = {
  source_text: 'Add a user.',
  target_locale: 'es',
  local_text: 'Añade un usuario.',
};
const METADATA: RowMetadata = {
  project: 'atlas',
  url: '/docs/atlas/alerts',
  slug: 'alerts',
  locale: 'es',
  run: 'r',
  kind: 'page',
};

const args = (
  output: string,
  expected: string,
  source = INPUT.source_text,
  segments?: SegmentPair[],
) => ({
  input: { ...INPUT, source_text: source, segments },
  output,
  expected,
  metadata: METADATA,
});

const driverSeg: SegmentPair[] = [{ key: 'paragraph[0]', en: 'Use the driver.', es: 'Usa el driver.' }];

function judgeReturning(payload: Record<string, unknown>): JudgeOptions {
  return {
    model: 'judge-model',
    transport: async () => JSON.stringify({ output_text: JSON.stringify(payload) }),
  };
}

describe('toEvalScorers', () => {
  it('returns five scorers, the glossary one producing three named scores', async () => {
    const scorers = toEvalScorers(
      GLOSSARY,
      judgeReturning({ category: 'C', rationale: 'faithful', fluency: 5, agreement: 5 }),
    );
    expect(scorers).toHaveLength(5);

    const glossary = await scorers[0]!(
      args('Usa el driver.', 'Usa el driver.', 'Use the driver.', driverSeg),
    );
    expect(glossary).toEqual([
      { name: 'glossary_terms_used', score: 1, metadata: expect.any(Object) },
      { name: 'terms_exact', score: 1, metadata: expect.any(Object) },
      { name: 'terms_plural', score: null, metadata: expect.any(Object) },
    ]);

    expect(
      await scorers[1]!(args('Usa MongoDB', 'Usa MongoDB', 'Add a user to MongoDB.')),
    ).toEqual({
      name: 'terminology_preserved',
      score: 1,
      metadata: { denominator: 1, numerator: 1, missing: [] },
    });

    expect(await scorers[2]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual({
      name: 'reference_similarity',
      score: 1,
    });

    expect(await scorers[3]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual([
      { name: 'factuality', score: 1, metadata: { rationale: 'faithful' } },
      { name: 'fluency', score: 1, metadata: { rationale: 'faithful' } },
      { name: 'grammatical_agreement', score: 1, metadata: { rationale: 'faithful' } },
    ]);
  });

  it('emits a null terminology score when the source holds no configured non-translatable terms', async () => {
    const scorers = toEvalScorers(GLOSSARY, judgeReturning({ category: 'C', rationale: 'ok', fluency: 5 }));
    expect(await scorers[1]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual({
      name: 'terminology_preserved',
      score: null,
      metadata: { denominator: 0, numerator: 0, missing: [] },
    });
  });

  it('reports grammatical agreement as null for locales without grammatical gender', async () => {
    const scorers = toEvalScorers(
      GLOSSARY,
      judgeReturning({ category: 'C', rationale: 'ok', fluency: 5, agreement: 5 }),
    );
    const jaArgs = {
      input: { ...INPUT, target_locale: 'ja-jp' },
      output: 'x',
      expected: 'y',
      metadata: { ...METADATA, locale: 'ja-jp' },
    };
    expect(await scorers[3]!(jaArgs)).toEqual([
      { name: 'factuality', score: 1, metadata: { rationale: 'ok' } },
      { name: 'fluency', score: 1, metadata: { rationale: 'ok' } },
      { name: 'grammatical_agreement', score: null, metadata: { rationale: 'ok' } },
    ]);
  });

  it('scores dropped terms and passes the source text and locale to the judge', async () => {
    let body = '';
    const judge: JudgeOptions = {
      model: 'judge-model',
      transport: async (requestBody) => {
        body = requestBody;
        return JSON.stringify({
          output_text: JSON.stringify({ category: 'D', rationale: 'drift', fluency: 2 }),
        });
      },
    };
    const g: Glossary = {
      nonTranslatableTerms: ['MongoDB', 'Atlas'],
      translatableTerms: {},
    };
    const scorers = toEvalScorers(g, judge);

    expect(await scorers[1]!(args('Usa Atlas', 'x', 'MongoDB and Atlas are products.'))).toEqual({
      name: 'terminology_preserved',
      score: 0.5,
      metadata: { denominator: 2, numerator: 1, missing: ['MongoDB'] },
    });
    expect(await scorers[3]!(args('Usa Atlas', 'x'))).toEqual([
      { name: 'factuality', score: 0, metadata: { rationale: 'drift' } },
      { name: 'fluency', score: 0.25, metadata: { rationale: 'drift' } },
      { name: 'grammatical_agreement', score: null, metadata: { rationale: 'drift' } },
    ]);

    const sent = JSON.parse(body) as { input: Array<{ content: Array<{ text: string }> }> };
    const userPrompt = sent.input[1]!.content[0]!.text;
    expect(userPrompt).toContain('Add a user.');
    expect(userPrompt).toContain('"es"');
  });

  it('adds a language_integrity scorer that flags non-target segments', async () => {
    const scorers = toEvalScorers(
      GLOSSARY,
      judgeReturning({ category: 'C', rationale: 'ok', fluency: 5, agreement: 5 }),
    );
    expect(scorers).toHaveLength(5);
    const result = await scorers[4]!({
      input: INPUT,
      output: 'This paragraph was never translated at all.',
      expected: 'x',
      metadata: METADATA,
    });
    expect(result).toMatchObject({ name: 'language_integrity' });
    expect((result as { score: number }).score).toBeLessThan(1);
  });

  it('scores an include row with segments, but does not judge it', async () => {
    const scorers = toEvalScorers(GLOSSARY, judgeReturning({ category: 'C', rationale: 'ok', fluency: 5 }));
    const includeWithSegments = {
      input: {
        source_text: '',
        target_locale: 'es',
        local_text: '',
        segments: [{ key: 'paragraph[0]', en: 'Use the driver.', es: 'Usa el driver.' }],
      },
      output: '',
      expected: '',
      metadata: { ...METADATA, kind: 'include' as const },
    };
    const glossary = (await scorers[0]!(includeWithSegments)) as Array<{ name: string; score: number | null }>;
    expect(glossary[0]).toMatchObject({ name: 'glossary_terms_used', score: 1 });
  });

  it('does not score or judge an include row', async () => {
    let judgeCalled = false;
    const judge: JudgeOptions = {
      model: 'judge-model',
      transport: async () => {
        judgeCalled = true;
        return JSON.stringify({ output_text: JSON.stringify({ category: 'C', rationale: 'ok', fluency: 5 }) });
      },
    };
    const scorers = toEvalScorers(GLOSSARY, judge);
    const includeRow = {
      input: { source_text: '', target_locale: 'es', local_text: '', segments: [] },
      output: '',
      expected: '',
      metadata: { ...METADATA, kind: 'include' as const },
    };

    for (const scorer of scorers) {
      const result = await scorer(includeRow);
      const list = Array.isArray(result) ? result : [result];
      for (const entry of list) {
        if (entry === null || entry === undefined || typeof entry === 'number') {
          throw new Error(`expected a named score object, got ${String(entry)}`);
        }
        expect(entry.score).toBeNull();
      }
    }
    expect(judgeCalled).toBe(false);
  });
});
