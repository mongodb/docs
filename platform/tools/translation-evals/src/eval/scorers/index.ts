import type { EvalScorer } from 'braintrust';
import type { DatasetRow } from '../../types.js';
import { judgeTranslation, type JudgeOptions } from '../judge/judge.js';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';

export type RowInput = DatasetRow['input'];
export type RowMetadata = DatasetRow['metadata'];
export type Scorer = EvalScorer<RowInput, string, string, RowMetadata>;

/**
 * The eval's scorers. `terminology_preserved` and `reference_similarity` are
 * deterministic; `factuality` and `fluency` come from one judge call per row,
 * which returns both so a row never pays for the judge twice.
 */
export function toEvalScorers(terms: string[], judgeOpts: JudgeOptions): Scorer[] {
  return [
    async ({ output }) => ({
      name: 'terminology_preserved',
      score: terminologyPreserved(output, terms),
    }),
    async ({ output, expected }) => ({
      name: 'reference_similarity',
      score: referenceSimilarity(output, expected),
    }),
    async ({ input, output, expected }) => {
      const result = await judgeTranslation(
        { source: input.source_text, output, reference: expected, locale: input.target_locale },
        judgeOpts,
      );
      return [
        { name: 'factuality', score: result.factuality, metadata: { rationale: result.rationale } },
        { name: 'fluency', score: result.fluency, metadata: { rationale: result.rationale } },
      ];
    },
  ];
}
