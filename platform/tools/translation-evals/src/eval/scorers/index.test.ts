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

const NO_ISSUES = { critical: 0, minor: 0, issues: [] };
const faithfulScores = (rationale: string, agreement: number | null = 1) => [
  { name: 'omission', score: 1, metadata: NO_ISSUES },
  { name: 'addition', score: 1, metadata: NO_ISSUES },
  { name: 'contradiction', score: 1, metadata: NO_ISSUES },
  { name: 'distortion', score: 1, metadata: NO_ISSUES },
  { name: 'faithful', score: 1, metadata: { critical: 0 } },
  { name: 'fluency', score: 1, metadata: { rationale } },
  { name: 'grammatical_agreement', score: agreement, metadata: { rationale } },
];

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
      judgeReturning({ issues: [], rationale: 'faithful', fluency: 5, agreement: 5 }),
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

    expect(await scorers[3]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual(faithfulScores('faithful'));
  });

  it('gives each scorer a stable name so Braintrust labels its span', () => {
    const scorers = toEvalScorers(
      GLOSSARY,
      judgeReturning({ category: 'C', rationale: 'ok', fluency: 5 }),
    );
    expect(scorers.map((scorer) => scorer.name)).toEqual([
      'glossary',
      'terminology_preserved',
      'reference_similarity',
      'judge',
      'language_integrity',
    ]);
  });

  it('emits a null terminology score when the source holds no configured non-translatable terms', async () => {
    const scorers = toEvalScorers(GLOSSARY, judgeReturning({ issues: [], rationale: 'ok', fluency: 5 }));
    expect(await scorers[1]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual({
      name: 'terminology_preserved',
      score: null,
      metadata: { denominator: 0, numerator: 0, missing: [] },
    });
  });

  it('reports grammatical agreement as null for locales without grammatical gender', async () => {
    const scorers = toEvalScorers(
      GLOSSARY,
      judgeReturning({ issues: [], rationale: 'ok', fluency: 5, agreement: 5 }),
    );
    const jaArgs = {
      input: { ...INPUT, target_locale: 'ja-jp' },
      output: 'x',
      expected: 'y',
      metadata: { ...METADATA, locale: 'ja-jp' },
    };
    expect(await scorers[3]!(jaArgs)).toEqual(faithfulScores('ok', null));
  });

  it('scores dropped terms and passes the source text and locale to the judge', async () => {
    let body = '';
    const judge: JudgeOptions = {
      model: 'judge-model',
      transport: async (requestBody) => {
        body = requestBody;
        return JSON.stringify({
          output_text: JSON.stringify({
            issues: [{ type: 'contradiction', severity: 'critical', quote: 'q', explanation: 'e' }],
            rationale: 'drift',
            fluency: 2,
          }),
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
    const issue = { severity: 'critical', quote: 'q', explanation: 'e' };
    expect(await scorers[3]!(args('Usa Atlas', 'x'))).toEqual([
      { name: 'omission', score: 1, metadata: NO_ISSUES },
      { name: 'addition', score: 1, metadata: NO_ISSUES },
      { name: 'contradiction', score: 0, metadata: { critical: 1, minor: 0, issues: [issue] } },
      { name: 'distortion', score: 1, metadata: NO_ISSUES },
      { name: 'faithful', score: 0, metadata: { critical: 1 } },
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
      judgeReturning({ issues: [], rationale: 'ok', fluency: 5, agreement: 5 }),
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
    const scorers = toEvalScorers(GLOSSARY, judgeReturning({ issues: [], rationale: 'ok', fluency: 5 }));
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
        return JSON.stringify({ output_text: JSON.stringify({ issues: [], rationale: 'ok', fluency: 5 }) });
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

  it('judges the page in one call, with the reference, and scales distortion by segment count', async () => {
    const prompts: string[] = [];
    const judge: JudgeOptions = {
      model: 'judge-model',
      transport: async (requestBody) => {
        const sent = JSON.parse(requestBody) as { input: Array<{ content: Array<{ text: string }> }> };
        prompts.push(sent.input[1]!.content[0]!.text);
        return JSON.stringify({
          output_text: JSON.stringify({
            issues: [{ type: 'distortion', severity: 'critical', quote: 'q', explanation: 'e' }],
            rationale: 'r',
            fluency: 5,
            agreement: 5,
          }),
        });
      },
    };
    const segments: SegmentPair[] = Array.from({ length: 20 }, (_, i) => ({
      key: `p[${i}]`,
      en: `s${i}.`,
      es: `t${i}.`,
    }));
    const scorers = toEvalScorers(GLOSSARY, judge);
    const result = (await scorers[3]!(args('x', 'y', 'x', segments))) as Array<{
      name: string;
      score: number | null;
    }>;
    const byName = Object.fromEntries(result.map((r) => [r.name, r.score]));

    expect(prompts).toHaveLength(1);
    expect(prompts[0]).toContain('REFERENCE:\ny');
    expect(byName['distortion']).toBeCloseTo(1 - 1 / 20);
    expect(byName['omission']).toBe(1);
    expect(byName['contradiction']).toBe(1);
    expect(byName['faithful']).toBe(0);
    expect(byName['fluency']).toBe(1);
  });

  describe('a page row whose local scrape is empty', () => {
    const emptyRow = (segments?: SegmentPair[]) => ({
      input: { ...INPUT, local_text: '', segments },
      output: '  \n',
      expected: 'Usa MongoDB',
      metadata: METADATA,
    });

    it('returns null for every scorer that reads the scraped text, and does not call the judge', async () => {
      let judgeCalled = false;
      const judge: JudgeOptions = {
        model: 'judge-model',
        transport: async () => {
          judgeCalled = true;
          return '{}';
        },
      };
      const scorers = toEvalScorers(GLOSSARY, judge);
      const row = emptyRow();

      for (const scorer of [scorers[1]!, scorers[2]!, scorers[3]!, scorers[4]!]) {
        const result = await scorer(row);
        const list = Array.isArray(result) ? result : [result];
        for (const entry of list) {
          expect(entry).toMatchObject({ score: null, metadata: { reason: 'local scrape was empty' } });
        }
      }
      expect(judgeCalled).toBe(false);
    });
  });
});
