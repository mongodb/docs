import {
  ANTHROPIC_DEFAULTS,
  extractAnthropicText,
  extractOutputText,
} from '@mongodb-docs/translation-service';
import {
  JUDGE_RESPONSE_SCHEMA,
  JUDGE_SYSTEM_PROMPT,
  buildJudgePrompt,
  type JudgeInput,
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
  /** 0-1. See `CATEGORY_SCORE`. */
  factuality: number;
  /** 0-1, mapped from the model's 1-5 rating. */
  fluency: number;
  /** 0-1, mapped from the model's 1-5 rating, or null when the judge returns null. */
  agreement: number | null;
  rationale: string;
}

const CATEGORY_SCORE: Record<string, number> = { A: 0.4, B: 0.6, C: 1, D: 0 };

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

  const category = typeof parsed['category'] === 'string' ? parsed['category'] : '';
  const fluency = mapRating(parsed['fluency']) ?? 0;

  return {
    factuality: CATEGORY_SCORE[category] ?? 0,
    fluency,
    agreement: mapRating(parsed['agreement']),
    rationale: typeof parsed['rationale'] === 'string' ? parsed['rationale'] : '',
  };
}
