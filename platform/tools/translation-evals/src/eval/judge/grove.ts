import {
  createGroveTransport,
  resolveGroveConfigFromEnv,
  type Transport,
} from '@mongodb-docs/translation-service';
import type { Config } from '../../config.js';
import type { JudgeOptions, JudgeTransport } from './judge.js';

/**
 * Build the judge's Grove wiring from the environment. `JUDGE_MODEL` is
 * required: falling back to the translator model would reintroduce the
 * self-preference bias the separate judge model exists to avoid.
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

  const grove = resolveGroveConfigFromEnv(env, {
    apiKey: cfg.grove.apiKey,
    endpoint: cfg.grove.endpoint,
    timeoutMs: cfg.grove.timeoutMs,
    model: cfg.judgeModel,
  });
  const send = transport ?? createGroveTransport(grove.timeoutMs);

  const judgeTransport: JudgeTransport = async (body) => {
    const response = await send({
      url: grove.endpoint,
      headers: { 'Content-Type': 'application/json', 'api-key': grove.apiKey },
      body,
    });
    if (!response.ok) throw new Error(`Grove returned HTTP ${response.status}`);
    return response.text();
  };

  return { transport: judgeTransport, model: grove.model };
}
