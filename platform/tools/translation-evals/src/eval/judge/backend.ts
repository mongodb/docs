import {
  createFetchTransport,
  resolveAnthropicConfigFromEnv,
  resolveOpenAiConfigFromEnv,
  type Transport,
} from '@mongodb-docs/translation-service';
import type { Config } from '../../config.js';
import { judgeFormatFor, type JudgeOptions, type JudgeTransport } from './judge.js';

/**
 * Build the judge's gateway wiring from the environment. `JUDGE_MODEL` is
 * required: falling back to the translator model would reintroduce the
 * self-preference bias the separate judge model exists to avoid.
 *
 * The model family selects the wire format, mirroring the translator's
 * backend selection: a `claude-*` judge model uses the Anthropic Messages
 * path, anything else the OpenAI Responses path.
 *
 * `transport` is injectable so the wiring can be tested without a network.
 */
export function createJudgeOptions(
  cfg: Config,
  env: NodeJS.ProcessEnv = process.env,
  transport?: Transport,
): JudgeOptions {
  if (!cfg.judgeModel) {
    throw new Error(
      'JUDGE_MODEL is required for the eval stage; it must differ from the translator model',
    );
  }

  if (judgeFormatFor(cfg.judgeModel) === 'messages') {
    const anthropic = resolveAnthropicConfigFromEnv(env, {
      model: cfg.judgeModel,
    });
    const send =
      transport ??
      createFetchTransport({ timeoutMs: anthropic.timeoutMs, provider: 'anthropic' });

    const judgeTransport: JudgeTransport = async (body) => {
      const response = await send({
        url: anthropic.endpoint,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropic.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body,
      });
      if (!response.ok) throw new Error(`Anthropic returned HTTP ${response.status}`);
      return response.text();
    };

    return {
      transport: judgeTransport,
      model: anthropic.model,
      maxTokens: anthropic.maxTokens,
    };
  }

  const openai = resolveOpenAiConfigFromEnv(env, {
    model: cfg.judgeModel,
  });
  const send =
    transport ??
    createFetchTransport({ timeoutMs: openai.timeoutMs, provider: 'openai' });

  const judgeTransport: JudgeTransport = async (body) => {
    const response = await send({
      url: openai.endpoint,
      headers: { 'Content-Type': 'application/json', 'api-key': openai.apiKey },
      body,
    });
    if (!response.ok) throw new Error(`Grove returned HTTP ${response.status}`);
    return response.text();
  };

  return { transport: judgeTransport, model: openai.model };
}
