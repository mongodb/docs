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
  const fluency = typeof parsed['fluency'] === 'number' ? parsed['fluency'] : 0;

  return {
    factuality: CATEGORY_SCORE[category] ?? 0,
    fluency: Math.max(0, Math.min(1, (fluency - 1) / 4)),
    rationale: typeof parsed['rationale'] === 'string' ? parsed['rationale'] : '',
  };
}
