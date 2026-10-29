import { describe, it, expect } from 'vitest';
import type { JudgeOptions } from '../judge/judge.js';
import { toEvalScorers, type RowInput, type RowMetadata } from './index.js';

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
};

const args = (output: string, expected: string, source = INPUT.source_text) => ({
  input: { ...INPUT, source_text: source },
  output,
  expected,
  metadata: METADATA,
});

function judgeReturning(payload: Record<string, unknown>): JudgeOptions {
  return {
    model: 'judge-model',
    transport: async () => JSON.stringify({ output_text: JSON.stringify(payload) }),
  };
}

describe('toEvalScorers', () => {
  it('returns the deterministic and judge scorers', async () => {
    const scorers = toEvalScorers(['MongoDB'], judgeReturning({ category: 'C', rationale: 'faithful', fluency: 5 }));
    expect(scorers).toHaveLength(4);

    expect(
      await scorers[0]!(args('Usa MongoDB', 'Usa MongoDB', 'Add a user to MongoDB.')),
    ).toEqual({
      name: 'terminology_preserved',
      score: 1,
      metadata: { denominator: 1, numerator: 1, missing: [] },
    });
    expect(await scorers[1]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual({
      name: 'reference_similarity',
      score: 1,
    });
  });

  it('emits a null terminology score when the source holds no configured non-translatable terms', async () => {
    const scorers = toEvalScorers(['MongoDB'], judgeReturning({ category: 'C', rationale: 'ok', fluency: 5 }));
    expect(await scorers[0]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual({
      name: 'terminology_preserved',
      score: null,
      metadata: { denominator: 0, numerator: 0, missing: [] },
    });
  });

  it('returns factuality and fluency from a single judge call', async () => {
    const scorers = toEvalScorers(['MongoDB'], judgeReturning({ category: 'C', rationale: 'faithful', fluency: 5 }));
    expect(await scorers[2]!(args('Usa MongoDB', 'Usa MongoDB'))).toEqual([
      { name: 'factuality', score: 1, metadata: { rationale: 'faithful' } },
      { name: 'fluency', score: 1, metadata: { rationale: 'faithful' } },
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
    const scorers = toEvalScorers(['MongoDB', 'Atlas'], judge);

    expect(await scorers[0]!(args('Usa Atlas', 'x', 'MongoDB and Atlas are products.'))).toEqual({
      name: 'terminology_preserved',
      score: 0.5,
      metadata: { denominator: 2, numerator: 1, missing: ['MongoDB'] },
    });
    expect(await scorers[2]!(args('Usa Atlas', 'x'))).toEqual([
      { name: 'factuality', score: 0, metadata: { rationale: 'drift' } },
      { name: 'fluency', score: 0.25, metadata: { rationale: 'drift' } },
    ]);

    const sent = JSON.parse(body) as { input: Array<{ content: Array<{ text: string }> }> };
    const userPrompt = sent.input[1]!.content[0]!.text;
    expect(userPrompt).toContain('Add a user.');
    expect(userPrompt).toContain('"es"');
  });

  it('adds a language_integrity scorer that flags non-target segments', async () => {
    const scorers = toEvalScorers(['MongoDB'], judgeReturning({ category: 'C', rationale: 'ok', fluency: 5, agreement: 5 }));
    expect(scorers).toHaveLength(4);
    const result = await scorers[3]!({
      input: INPUT,
      output: 'This paragraph was never translated at all.',
      expected: 'x',
      metadata: METADATA,
    });
    expect(result).toMatchObject({ name: 'language_integrity' });
    expect((result as { score: number }).score).toBeLessThan(1);
  });
});
