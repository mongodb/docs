/**
 * OpenAI-Responses backend configuration. Both gateways serve GPT models
 * on the Responses path, so this backend speaks that wire format. The
 * gateway selection and the timeout primitives are shared with the other
 * gateway backends.
 */
import {
  AI_GATEWAY_BASE,
  blankToUndefined,
  resolveGateway,
  resolveTimeoutMs,
} from "../config.js";

export interface OpenAiConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
}

export const OPENAI_PROVIDER = "openai";

/** Responses path, shared by both gateways. */
export const OPENAI_PATH = "/openai/v1/responses";

export const OPENAI_DEFAULTS = {
  endpoint: `${AI_GATEWAY_BASE}${OPENAI_PATH}`,
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
  const gateway = resolveGateway(env, overrides.apiKey, "OpenAI");
  return {
    endpoint:
      overrides.endpoint ??
      blankToUndefined(env.OPENAI_ENDPOINT) ??
      `${gateway.baseUrl}${OPENAI_PATH}`,
    model:
      overrides.model ?? blankToUndefined(env.OPENAI_MODEL) ?? OPENAI_DEFAULTS.model,
    apiKey: gateway.apiKey,
    timeoutMs: resolveTimeoutMs(
      env,
      "OPENAI_TIMEOUT_MS",
      OPENAI_DEFAULTS.timeoutMs,
      overrides.timeoutMs,
    ),
  };
}
