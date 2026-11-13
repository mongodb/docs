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

export const ISSUE_TYPES = ['omission', 'addition', 'contradiction', 'distortion'] as const;
export const ISSUE_SEVERITIES = ['critical', 'minor'] as const;
export type IssueType = (typeof ISSUE_TYPES)[number];
export type IssueSeverity = (typeof ISSUE_SEVERITIES)[number];

export interface JudgeIssue {
  type: IssueType;
  severity: IssueSeverity;
  /** The shortest span of the OUTPUT (or SOURCE, for an omission) that shows the issue. */
  quote: string;
  explanation: string;
}

export function buildJudgePrompt(i: JudgeInput): string {
  return [
    `You are evaluating a translation into locale "${i.locale}".`,
    'The SOURCE (English) is ground truth. The REFERENCE is one valid human translation; use it only to calibrate register and terminology, not as an answer key.',
    '',
    'FACTUALITY. List every issue where the meaning of the OUTPUT differs from the SOURCE. Report nothing for text that is faithful, even when it reads awkwardly; awkward wording belongs under fluency, not here.',
    'Each issue has a type:',
    '  omission = information in the SOURCE is missing from the OUTPUT.',
    '  addition = the OUTPUT introduces information that is not in the SOURCE.',
    '  contradiction = the OUTPUT states the opposite of the SOURCE, or something incompatible with it (a dropped negation, a wrong value, limit or condition, the wrong operator). A contradiction is always critical.',
    '  distortion = the OUTPUT stays on the same point but shifts its meaning, emphasis or scope.',
    'Each issue has a severity, judged as a careful human reader of the documentation would:',
    '  critical = a reader relying on the OUTPUT could do the wrong thing or reach a wrong conclusion. Examples: a missing or wrong step, warning, prerequisite, condition, parameter, value, limit, code sample, or a data-loss or security caveat; an invented claim about how a feature behaves.',
    '  minor = a reader would not be misled. Examples: a dropped filler word, transition or redundant clause; a small added connective; a nuance that shifts slightly but whose meaning is still recoverable. For example, "unique expression values" rendered as "valores de expresión único" attaches the uniqueness to the wrong noun, but the meaning is still clear, so it is a minor distortion.',
    'If unsure between critical and minor, ask whether a reader following the OUTPUT would be misled in practice; if not, use minor.',
    'Quote the shortest span that shows each issue. Report each problem once, under its single best type. Return an empty list when there are no issues.',
    '',
    'FLUENCY. Rate the OUTPUT in the target locale from 1 (poor) to 5 (native).',
    '',
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
    'Respond as JSON: {"issues":[{"type":"omission|addition|contradiction|distortion","severity":"critical|minor","quote":"...","explanation":"..."}],"rationale":"...","fluency":1-5,"agreement":1-5|null}.',
  ].join('\n');
}

/**
 * The judge's response contract, sent on both the Responses and Messages paths.
 * Ratings are expressed as `enum` lists rather than `minimum`/`maximum`: the
 * latter are valid JSON Schema but unsupported by Anthropic's structured
 * outputs, which rejects the whole request (HTTP 400). `anyOf` with a `null`
 * branch is the nullable form both providers accept.
 */
export const JUDGE_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: [...ISSUE_TYPES] },
          severity: { type: 'string', enum: [...ISSUE_SEVERITIES] },
          quote: { type: 'string' },
          explanation: { type: 'string' },
        },
        required: ['type', 'severity', 'quote', 'explanation'],
        additionalProperties: false,
      },
    },
    rationale: { type: 'string' },
    fluency: { type: 'integer', enum: [1, 2, 3, 4, 5] },
    agreement: {
      anyOf: [
        { type: 'integer', enum: [1, 2, 3, 4, 5] },
        { type: 'null' },
      ],
    },
  },
  required: ['issues', 'rationale', 'fluency', 'agreement'],
  additionalProperties: false,
} as const;
