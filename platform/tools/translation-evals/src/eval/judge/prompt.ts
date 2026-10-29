export interface JudgeInput {
  /** English source text — the ground truth. */
  source: string;
  /** The translation under evaluation. */
  output: string;
  /** Production (vendor) translation, used only to calibrate register. */
  reference: string;
  /** Target locale, e.g. `es`. */
  locale: string;
}

export const JUDGE_SYSTEM_PROMPT = [
  'You are a bilingual translation evaluator for MongoDB product documentation.',
  'Judge the OUTPUT on its own merits. Do not reward the OUTPUT for resembling the',
  'REFERENCE, and do not penalize it for differing from the REFERENCE when it is',
  'still faithful to the SOURCE.',
].join('\n');

export function buildJudgePrompt(i: JudgeInput): string {
  return [
    `You are evaluating a translation into locale "${i.locale}".`,
    'The SOURCE (English) is ground truth. The REFERENCE is one valid human translation; use it only to calibrate register and terminology, not as an answer key.',
    'Classify factuality of the OUTPUT against the SOURCE as one of:',
    '  A = omission (source meaning missing), B = addition (meaning not in source introduced),',
    '  C = faithful (full source meaning preserved), D = mistranslation (contradicts/distorts source).',
    'Also rate fluency of the OUTPUT in the target locale from 1 (poor) to 5 (native).',
    'Grammatical agreement (only for languages that mark grammatical gender or number agreement, e.g. Spanish, Portuguese):',
    'rate 1-5 how well the OUTPUT agrees within each segment — determiners, adjectives, and pronouns must match the gender and number of the noun or antecedent they modify.',
    'Rate 5 when there are no agreement errors.',
    'A consistent single-gender rendering of a source whose gender is genuinely ambiguous is NOT an agreement error.',
    'If the target language does not mark grammatical agreement (e.g. Chinese, Japanese, Korean), return null.',
    '',
    `SOURCE:\n${i.source}`,
    `REFERENCE:\n${i.reference}`,
    `OUTPUT:\n${i.output}`,
    '',
    'Respond as JSON: {"category":"A|B|C|D","rationale":"...","fluency":1-5,"agreement":1-5|null}.',
  ].join('\n');
}

export const JUDGE_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    category: { type: 'string', enum: ['A', 'B', 'C', 'D'] },
    rationale: { type: 'string' },
    fluency: { type: 'integer', minimum: 1, maximum: 5 },
    agreement: { type: ['integer', 'null'], minimum: 1, maximum: 5 },
  },
  required: ['category', 'rationale', 'fluency', 'agreement'],
  additionalProperties: false,
} as const;
