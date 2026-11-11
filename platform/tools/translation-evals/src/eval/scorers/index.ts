import type { EvalScorer } from 'braintrust';
import type { Glossary } from '@mongodb-docs/translation-service';
import type { DatasetRow } from '../../types.js';
import { judgeTranslation, type JudgeOptions } from '../judge/judge.js';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';
import { languageIntegrity } from './language.js';
import { scoreGlossaryTerms } from './glossary-terms.js';

export type RowInput = DatasetRow['input'];
export type RowMetadata = DatasetRow['metadata'];
export type Scorer = EvalScorer<RowInput, string, string, RowMetadata>;

/** Locales that mark grammatical gender/number agreement. Others get a null score. */
const GENDERED_LOCALES = new Set(['es', 'pt-br']);

const INCLUDE_REASON = 'include row has no scraped text';

/**
 * `terms_exact` and `terms_plural` read the same tally as `glossary_terms_used`,
 * so they point at its metadata instead of repeating the whole object three
 * times per row.
 */
const HEADLINE_METADATA = { of: 'glossary_terms_used' };

/**
 * The eval's scorers, in order: the glossary scorer, then terminology, reference
 * similarity, language integrity, and the judge.
 *
 * The glossary scorer returns three named scores from ONE pass:
 * `glossary_terms_used` is the headline (literal + plural); `terms_exact` and
 * `terms_plural` split the same tally by kind.
 * `terminology_preserved`, `reference_similarity` and `language_integrity` are
 * deterministic; `factuality`, `fluency` and `grammatical_agreement` come from
 * one judge call per row, which returns all three so a row never pays for the
 * judge twice. `grammatical_agreement` is null for locales that do not mark
 * grammatical gender.
 *
 * An include row has no scraped text, so every scorer that reads it returns null
 * rather than a misleading number, and the judge is never called. The glossary
 * scorer is deliberately NOT guarded: it reads segments, and includes carry
 * glossary occurrences.
 */
export function toEvalScorers(glossary: Glossary, judgeOpts: JudgeOptions): Scorer[] {
  const isInclude = (metadata: RowMetadata) => metadata.kind === 'include';

  return [
    async ({ input }) => {
      // NOT guarded on include rows: an include has no scraped text, but it does
      // carry segments, and includes hold most of the glossary occurrences.
      const { score, metadata } = scoreGlossaryTerms(input.segments, glossary, input.target_locale);
      const { byKind } = metadata;
      return [
        { name: 'glossary_terms_used', score, metadata },
        { name: 'terms_exact', score: byKind.literal.score, metadata: HEADLINE_METADATA },
        { name: 'terms_plural', score: byKind.plural.score, metadata: HEADLINE_METADATA },
      ];
    },
    async ({ input, output, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'terminology_preserved', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      const { score, denominator, numerator, missing } = terminologyPreserved(
        input.source_text,
        output,
        glossary.nonTranslatableTerms,
      );
      return { name: 'terminology_preserved', score, metadata: { denominator, numerator, missing } };
    },
    async ({ output, expected, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'reference_similarity', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      return { name: 'reference_similarity', score: referenceSimilarity(output, expected) };
    },
    async ({ input, output, expected, metadata }) => {
      if (isInclude(metadata)) {
        const includeMetadata = { reason: INCLUDE_REASON };
        return [
          { name: 'factuality', score: null, metadata: includeMetadata },
          { name: 'fluency', score: null, metadata: includeMetadata },
          { name: 'grammatical_agreement', score: null, metadata: includeMetadata },
        ];
      }
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
    async ({ output, input, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'language_integrity', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      const { score, flags } = languageIntegrity(
        output,
        input.target_locale,
        glossary.nonTranslatableTerms,
      );
      return { name: 'language_integrity', score, metadata: flags.length ? { flags } : undefined };
    },
  ];
}
