import type { EvalScorer } from 'braintrust';
import type { Glossary } from '@mongodb-docs/translation-service';
import type { DatasetRow } from '../../types.js';
import { judgeTranslation, scoreFactuality, type JudgeOptions } from '../judge/judge.js';
import type { IssueType } from '../judge/prompt.js';
import { referenceSimilarity, terminologyPreserved } from './deterministic.js';
import { languageIntegrity } from './language.js';
import { scoreGlossaryTerms } from './glossary-terms.js';

export type RowInput = DatasetRow['input'];
export type RowMetadata = DatasetRow['metadata'];
export type Scorer = EvalScorer<RowInput, string, string, RowMetadata>;

/** Locales that mark grammatical gender/number agreement. Others get a null score. */
const GENDERED_LOCALES = new Set(['es', 'pt-br']);

const INCLUDE_REASON = 'include row has no scraped text';
const EMPTY_SCRAPE_REASON = 'local scrape was empty';

const JUDGE_SCORE_NAMES = [
  'omission',
  'addition',
  'contradiction',
  'distortion',
  'faithful',
  'fluency',
  'grammatical_agreement',
] as const;

function nullJudgeScores(reason: string) {
  return JUDGE_SCORE_NAMES.map((name) => ({ name, score: null, metadata: { reason } }));
}

/**
 * `terms_exact` and `terms_plural` read the same tally as `glossary_terms_used`,
 * so they point at its metadata instead of repeating the whole object three
 * times per row.
 */
const HEADLINE_METADATA = { of: 'glossary_terms_used' };

/**
 * Set a scorer's function name. The Braintrust CLI bundles this file with
 * esbuild `--minify`, which mangles declared function names, so the name has to
 * be assigned at runtime for Braintrust to use it as the span label. Without it
 * the span falls back to `scorer_<index>`, which does not say which check it is.
 */
function named(name: string, scorer: Scorer): Scorer {
  return Object.defineProperty(scorer, 'name', { value: name, configurable: true });
}

/**
 * The eval's scorers, in order: the glossary scorer, then terminology, reference
 * similarity, language integrity, and the judge.
 *
 * The glossary scorer returns three named scores from ONE pass:
 * `glossary_terms_used` is the headline (literal + plural); `terms_exact` and
 * `terms_plural` split the same tally by kind.
 * `terminology_preserved`, `reference_similarity` and `language_integrity` are
 * deterministic. The judge makes one call per page, against the reference. It
 * lists the meaning issues it finds, each typed and given a severity, and the
 * factuality scores are computed from those lists: `omission` and `addition`
 * are 0 when the page has a critical one and 1 otherwise, `contradiction` is 0
 * when the page has any, and `distortion` falls with critical distortions per
 * segment. Minor issues are logged in the metadata but do not cost anything.
 * `faithful` is 0 when the page has any critical issue or contradiction and 1
 * otherwise. `grammatical_agreement` is null for locales that do not mark
 * grammatical gender.
 *
 * An include row has no scraped text, so every scorer that reads it returns null
 * rather than a misleading number, and the judge is never called. A page row
 * whose local scrape is blank gets the same treatment.
 * The glossary scorer is deliberately NOT guarded: it reads segments, and includes carry
 * glossary occurrences.
 */
export function toEvalScorers(glossary: Glossary, judgeOpts: JudgeOptions): Scorer[] {
  const isInclude = (metadata: RowMetadata) => metadata.kind === 'include';
  const isEmptyScrape = (output: string) => output.trim() === '';

  return [
    named('glossary', async ({ input }) => {
      // NOT guarded on include rows: an include has no scraped text, but it does
      // carry segments, and includes hold most of the glossary occurrences.
      const { score, metadata } = scoreGlossaryTerms(input.segments, glossary, input.target_locale);
      const { byKind } = metadata;
      return [
        { name: 'glossary_terms_used', score, metadata },
        { name: 'terms_exact', score: byKind.literal.score, metadata: HEADLINE_METADATA },
        { name: 'terms_plural', score: byKind.plural.score, metadata: HEADLINE_METADATA },
      ];
    }),
    named('terminology_preserved', async ({ input, output, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'terminology_preserved', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      if (isEmptyScrape(output)) {
        return { name: 'terminology_preserved', score: null, metadata: { reason: EMPTY_SCRAPE_REASON } };
      }
      const { score, denominator, numerator, missing } = terminologyPreserved(
        input.source_text,
        output,
        glossary.nonTranslatableTerms,
      );
      return { name: 'terminology_preserved', score, metadata: { denominator, numerator, missing } };
    }),
    named('reference_similarity', async ({ output, expected, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'reference_similarity', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      if (isEmptyScrape(output)) {
        return { name: 'reference_similarity', score: null, metadata: { reason: EMPTY_SCRAPE_REASON } };
      }
      return { name: 'reference_similarity', score: referenceSimilarity(output, expected) };
    }),
    named('judge', async ({ input, output, expected, metadata }) => {
      if (isInclude(metadata)) return nullJudgeScores(INCLUDE_REASON);
      if (isEmptyScrape(output)) return nullJudgeScores(EMPTY_SCRAPE_REASON);
      const result = await judgeTranslation(
        { source: input.source_text, output, reference: expected, locale: input.target_locale },
        judgeOpts,
      );
      const scores = scoreFactuality(result.issues, input.segments?.length ?? 0);
      const issuesOf = (type: IssueType) => {
        const issues = result.issues
          .filter((i) => i.type === type)
          .map((i) => ({ severity: i.severity, quote: i.quote, explanation: i.explanation }));
        return {
          critical: issues.filter((i) => i.severity === 'critical').length,
          minor: issues.filter((i) => i.severity === 'minor').length,
          issues,
        };
      };
      const agreement = GENDERED_LOCALES.has(input.target_locale) ? result.agreement : null;
      return [
        { name: 'omission', score: scores.omission, metadata: issuesOf('omission') },
        { name: 'addition', score: scores.addition, metadata: issuesOf('addition') },
        { name: 'contradiction', score: scores.contradiction, metadata: issuesOf('contradiction') },
        { name: 'distortion', score: scores.distortion, metadata: issuesOf('distortion') },
        {
          name: 'faithful',
          score: scores.faithful,
          metadata: { critical: result.issues.filter((i) => i.type === 'contradiction' || i.severity === 'critical').length },
        },
        { name: 'fluency', score: result.fluency, metadata: { rationale: result.rationale } },
        { name: 'grammatical_agreement', score: agreement, metadata: { rationale: result.rationale } },
      ];
    }),
    named('language_integrity', async ({ output, input, metadata }) => {
      if (isInclude(metadata)) {
        return { name: 'language_integrity', score: null, metadata: { reason: INCLUDE_REASON } };
      }
      if (isEmptyScrape(output)) {
        return { name: 'language_integrity', score: null, metadata: { reason: EMPTY_SCRAPE_REASON } };
      }
      const { score, flags } = languageIntegrity(
        output,
        input.target_locale,
        glossary.nonTranslatableTerms,
      );
      return { name: 'language_integrity', score, metadata: flags.length ? { flags } : undefined };
    }),
  ];
}
