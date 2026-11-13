import {
  ANTHROPIC_DEFAULTS,
  extractAnthropicText,
  extractOutputText,
} from '@mongodb-docs/translation-service';
import {
  ISSUE_SEVERITIES,
  ISSUE_TYPES,
  JUDGE_RESPONSE_SCHEMA,
  JUDGE_SYSTEM_PROMPT,
  buildJudgePrompt,
  type IssueType,
  type JudgeInput,
  type JudgeIssue,
} from './prompt.js';

/**
 * Sends a request body to the judge model and returns the raw response body.
 * Injected so the judge is unit-testable without a network. See `backend.ts`
 * for the gateway-backed implementation.
 */
export type JudgeTransport = (body: string) => Promise<string>;

/** The gateway wire format a judge model is served on. */
export type JudgeFormat = 'responses' | 'messages';

export interface JudgeRequestConfig {
  model: string;
  /**
   * Required by the Messages envelope, ignored on the Responses path. The
   * Anthropic config resolver supplies the resolved value; the Messages
   * branch falls back to the backend default when it is absent.
   */
  maxTokens?: number;
}

export interface JudgeOptions extends JudgeRequestConfig {
  transport: JudgeTransport;
}

export interface JudgeResult {
  /** Every meaning-level issue the judge found; empty when the translation is faithful. */
  issues: JudgeIssue[];
  /** 0-1, mapped from the model's 1-5 rating. */
  fluency: number;
  /** 0-1, mapped from the model's 1-5 rating, or null when the judge returns null. */
  agreement: number | null;
  rationale: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * The judge routes by model family the same way the translator does (see
 * `translate/backend.ts`): every `anthropic`-type model in the gateway
 * catalog is named `claude-*`, and everything else is served on the
 * Responses path.
 */
export function judgeFormatFor(model: string): JudgeFormat {
  return model.startsWith('claude-') ? 'messages' : 'responses';
}

export function buildJudgeRequest(
  input: JudgeInput,
  config: JudgeRequestConfig,
): string {
  const prompt = buildJudgePrompt(input);

  if (judgeFormatFor(config.model) === 'messages') {
    return JSON.stringify({
      model: config.model,
      max_tokens: config.maxTokens ?? ANTHROPIC_DEFAULTS.maxTokens,
      system: JUDGE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
      output_config: {
        format: { type: 'json_schema', schema: JUDGE_RESPONSE_SCHEMA },
      },
    });
  }

  return JSON.stringify({
    model: config.model,
    input: [
      { role: 'system', content: [{ type: 'input_text', text: JUDGE_SYSTEM_PROMPT }] },
      { role: 'user', content: [{ type: 'input_text', text: prompt }] },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'judge_response',
        schema: JUDGE_RESPONSE_SCHEMA,
        strict: true,
      },
    },
  });
}

/** Map a 1-5 rating onto 0-1, clamping out-of-range values; null when absent. */
function mapRating(value: unknown): number | null {
  if (typeof value !== 'number') return null;
  return Math.max(0, Math.min(1, (value - 1) / 4));
}

/**
 * An absent or malformed issue list throws instead of defaulting to "no
 * issues", which would score a page perfect on the strength of a bad response.
 */
function parseIssues(value: unknown): JudgeIssue[] {
  if (!Array.isArray(value)) throw new Error('Judge output had no issues array');
  return value.map((item, i) => {
    if (!isRecord(item)) throw new Error(`Judge issue ${i} was not an object`);
    const lower = (v: unknown) => (typeof v === 'string' ? v.trim().toLowerCase() : v);
    const type = lower(item['type']);
    const severity = lower(item['severity']);
    if (!(ISSUE_TYPES as readonly unknown[]).includes(type)) {
      throw new Error(`Judge issue ${i} had an unknown type: ${String(type)}`);
    }
    if (!(ISSUE_SEVERITIES as readonly unknown[]).includes(severity)) {
      throw new Error(`Judge issue ${i} had an unknown severity: ${String(severity)}`);
    }
    return {
      type: type as JudgeIssue['type'],
      severity: severity as JudgeIssue['severity'],
      quote: typeof item['quote'] === 'string' ? item['quote'] : '',
      explanation: typeof item['explanation'] === 'string' ? item['explanation'] : '',
    };
  });
}

export async function judgeTranslation(
  input: JudgeInput,
  opts: JudgeOptions,
): Promise<JudgeResult> {
  const raw = await opts.transport(buildJudgeRequest(input, opts));

  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch {
    throw new Error('Judge response body was not valid JSON');
  }

  const outputText =
    judgeFormatFor(opts.model) === 'messages'
      ? extractAnthropicText(envelope)
      : extractOutputText(envelope);

  let parsed: unknown;
  try {
    parsed = JSON.parse(outputText);
  } catch {
    throw new Error('Judge output text was not valid JSON');
  }
  if (!isRecord(parsed)) throw new Error('Judge output was not a JSON object');

  const fluency = mapRating(parsed['fluency']) ?? 0;

  return {
    issues: parseIssues(parsed['issues']),
    fluency,
    agreement: mapRating(parsed['agreement']),
    rationale: typeof parsed['rationale'] === 'string' ? parsed['rationale'] : '',
  };
}

export interface FactualityScores {
  /** 0 when any critical omission was found, else 1. Minor omissions are acceptable. */
  omission: number;
  /** 0 when any critical addition was found, else 1. Minor additions are acceptable. */
  addition: number;
  /** 0 when any contradiction was found, else 1. */
  contradiction: number;
  /** 1 minus critical distortions per segment, floored at 0. Minor distortions are acceptable. */
  distortion: number;
  /** 0 when the page has any critical issue or any contradiction, else 1. */
  faithful: number;
}

/** Turn the judge's issue list into the page's factuality scores. */
export function scoreFactuality(
  issues: readonly JudgeIssue[],
  segmentCount: number,
): FactualityScores {
  const critical = (type: IssueType) =>
    issues.filter((i) => i.type === type && i.severity === 'critical').length;
  return {
    omission: critical('omission') > 0 ? 0 : 1,
    addition: critical('addition') > 0 ? 0 : 1,
    contradiction: issues.some((i) => i.type === 'contradiction') ? 0 : 1,
    distortion: Math.max(0, 1 - critical('distortion') / Math.max(1, segmentCount)),
    faithful: issues.some((i) => i.type === 'contradiction' || i.severity === 'critical') ? 0 : 1,
  };
}
