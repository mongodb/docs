import type { EvalScorer } from 'braintrust';
import type { DatasetRow } from '../../types.js';
import { judgeTranslation, type JudgeOptions } from '../judge/judge.js';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';
import { languageIntegrity } from './language.js';

export type RowInput = DatasetRow['input'];
export type RowMetadata = DatasetRow['metadata'];
export type Scorer = EvalScorer<RowInput, string, string, RowMetadata>;

/** Locales that mark grammatical gender/number agreement. Others get a null score. */
const GENDERED_LOCALES = new Set(['es', 'pt-br']);

/**
 * The eval's scorers. `terminology_preserved`, `reference_similarity`, and
 * `language_integrity` are deterministic; `factuality`, `fluency`, and
 * `grammatical_agreement` come from one judge call per row, which returns all
 * three so a row never pays for the judge twice. `grammatical_agreement` is
 * null for locales that do not mark grammatical gender.
 */
export function toEvalScorers(
  nonTranslatableTerms: string[],
  judgeOpts: JudgeOptions,
): Scorer[] {
  return [
    async ({ input, output }) => {
      const { score, denominator, numerator, missing } = terminologyPreserved(
        input.source_text,
        output,
        nonTranslatableTerms,
      );
      return {
        name: 'terminology_preserved',
        score,
        metadata: { denominator, numerator, missing },
      };
    },
    async ({ output, expected }) => ({
      name: 'reference_similarity',
      score: referenceSimilarity(output, expected),
    }),
    async ({ input, output, expected }) => {
      const result = await judgeTranslation(
        { source: input.source_text, output, reference: expected, locale: input.target_locale },
        judgeOpts,
      );
      const agreement = GENDERED_LOCALES.has(input.target_locale) ? result.agreement : null;
      return [
        { name: 'factuality', score: result.factuality, metadata: { rationale: result.rationale } },
        { name: 'fluency', score: result.fluency, metadata: { rationale: result.rationale } },
        { name: 'grammatical_agreement', score: agreement, metadata: { rationale: result.rationale } },
      ];
    },
    async ({ output, input }) => {
      const { score, flags } = languageIntegrity(output, input.target_locale, nonTranslatableTerms);
      return { name: 'language_integrity', score, metadata: flags.length ? { flags } : undefined };
    },
  ];
}
