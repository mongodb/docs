import {
  JUDGE_RESPONSE_SCHEMA,
  JUDGE_SYSTEM_PROMPT,
  buildJudgePrompt,
  type JudgeInput,
} from './prompt.js';

/**
 * Sends a request body to the judge model and returns the raw response body.
 * Injected so the judge is unit-testable without a network. See `grove.ts` for
 * the Grove-backed implementation.
 */
export type JudgeTransport = (body: string) => Promise<string>;

export interface JudgeOptions {
  transport: JudgeTransport;
  model: string;
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
 * Locate the model's structured-output text within the Responses envelope.
 * Mirrors `parseGroveResponse`'s extraction in `translation-service`: prefer
 * the aggregated `output_text`, otherwise dig into the `message`-type output
 * item's `output_text` content part (models can interleave reasoning items).
 */
function extractOutputText(envelope: unknown): string {
  if (
    isRecord(envelope) &&
    typeof envelope['output_text'] === 'string' &&
    envelope['output_text'] !== ''
  ) {
    return envelope['output_text'];
  }
  if (isRecord(envelope) && Array.isArray(envelope['output'])) {
    for (const message of envelope['output']) {
      if (
        !isRecord(message) ||
        message['type'] !== 'message' ||
        !Array.isArray(message['content'])
      ) {
        continue;
      }
      for (const part of message['content']) {
        if (
          isRecord(part) &&
          part['type'] === 'output_text' &&
          typeof part['text'] === 'string'
        ) {
          return part['text'];
        }
      }
    }
  }
  throw new Error('Grove response envelope contained no output text');
}

export function buildJudgeRequest(input: JudgeInput, model: string): string {
  return JSON.stringify({
    model,
    input: [
      { role: 'system', content: [{ type: 'input_text', text: JUDGE_SYSTEM_PROMPT }] },
      { role: 'user', content: [{ type: 'input_text', text: buildJudgePrompt(input) }] },
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
  const raw = await opts.transport(buildJudgeRequest(input, opts.model));

  let envelope: unknown;
  try {
    envelope = JSON.parse(raw);
  } catch {
    throw new Error('Judge response body was not valid JSON');
  }

  const outputText = extractOutputText(envelope);

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
