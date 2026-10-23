/**
 * OpenAI-Responses backend configuration. The AI Gateway serves GPT models
 * on the Responses path, so this backend speaks that wire format. The key
 * and timeout primitives are shared with the other gateway backends.
 */
import {
  AI_GATEWAY_BASE,
  blankToUndefined,
  requireGatewayApiKey,
  resolveTimeoutMs,
} from "../config.js";

export interface OpenAiConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
}

export const OPENAI_PROVIDER = "openai";

export const OPENAI_DEFAULTS = {
  endpoint: `${AI_GATEWAY_BASE}/openai/v1/responses`,
  model: "gpt-5.5",
  timeoutMs: 30000,
} as const;

/**
 * Resolve config from env, with optional explicit `overrides` that take
 * precedence over env and defaults. Overrides are merged BEFORE the
 * required-field check, so a caller can supply `apiKey` even when
 * `AI_GATEWAY_API_KEY` is absent from the environment.
 */
export function resolveOpenAiConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  overrides: Partial<OpenAiConfig> = {},
): OpenAiConfig {
  return {
    endpoint:
      overrides.endpoint ??
      blankToUndefined(env.OPENAI_ENDPOINT) ??
      OPENAI_DEFAULTS.endpoint,
    model:
      overrides.model ?? blankToUndefined(env.OPENAI_MODEL) ?? OPENAI_DEFAULTS.model,
    apiKey: requireGatewayApiKey(env, overrides.apiKey, "OpenAI"),
    timeoutMs: resolveTimeoutMs(
      env,
      "OPENAI_TIMEOUT_MS",
      OPENAI_DEFAULTS.timeoutMs,
      overrides.timeoutMs,
    ),
  };
}
