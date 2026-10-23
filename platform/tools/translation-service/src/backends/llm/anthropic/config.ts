/**
 * Anthropic-Messages backend configuration. The AI Gateway serves Claude
 * models on the Messages path, which is a different wire format from the
 * Responses path, so this backend has its own endpoint variable. The API
 * key and timeout primitives are shared with the other gateway backends.
 */
import {
  AI_GATEWAY_BASE,
  blankToUndefined,
  requireGatewayApiKey,
  resolvePositiveInt,
  resolveTimeoutMs,
} from "../config.js";

export interface AnthropicConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
  maxTokens: number;
}

export const ANTHROPIC_PROVIDER = "anthropic";

export const ANTHROPIC_DEFAULTS = {
  endpoint: `${AI_GATEWAY_BASE}/anthropic/v1/messages`,
  model: "claude-sonnet-5-5",
  timeoutMs: 120000,
  maxTokens: 16000,
} as const;

export function resolveAnthropicConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  overrides: Partial<AnthropicConfig> = {},
): AnthropicConfig {
  return {
    endpoint:
      overrides.endpoint ??
      blankToUndefined(env.ANTHROPIC_ENDPOINT) ??
      ANTHROPIC_DEFAULTS.endpoint,
    model:
      overrides.model ??
      blankToUndefined(env.ANTHROPIC_MODEL) ??
      ANTHROPIC_DEFAULTS.model,
    apiKey: requireGatewayApiKey(env, overrides.apiKey, "Anthropic"),
    timeoutMs: resolveTimeoutMs(
      env,
      "ANTHROPIC_TIMEOUT_MS",
      ANTHROPIC_DEFAULTS.timeoutMs,
      overrides.timeoutMs,
    ),
    maxTokens: resolvePositiveInt(
      env,
      "ANTHROPIC_MAX_TOKENS",
      ANTHROPIC_DEFAULTS.maxTokens,
      overrides.maxTokens,
    ),
  };
}
