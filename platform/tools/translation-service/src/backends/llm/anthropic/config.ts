/**
 * Anthropic-Messages backend configuration. Both gateways serve Claude
 * models on the Messages path, which is a different wire format from the
 * Responses path, so this backend has its own endpoint variable. The
 * gateways differ in the auth header that path takes, so the resolved
 * config carries the header rather than the backend hardcoding one.
 */
import {
  AI_GATEWAY_BASE,
  blankToUndefined,
  resolveGateway,
  resolvePositiveInt,
  resolveTimeoutMs,
  type GatewayAuthHeader,
} from "../config.js";

export interface AnthropicConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
  maxTokens: number;
  /** Header this gateway's Messages path authenticates with. */
  authHeader: GatewayAuthHeader;
}

export const ANTHROPIC_PROVIDER = "anthropic";

/** Messages path, shared by both gateways. */
export const ANTHROPIC_PATH = "/anthropic/v1/messages";

export const ANTHROPIC_DEFAULTS = {
  endpoint: `${AI_GATEWAY_BASE}${ANTHROPIC_PATH}`,
  model: "claude-sonnet-5-5",
  timeoutMs: 120000,
  maxTokens: 16000,
} as const;

export function resolveAnthropicConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  overrides: Partial<AnthropicConfig> = {},
): AnthropicConfig {
  const gateway = resolveGateway(env, overrides.apiKey, "Anthropic");
  return {
    endpoint:
      overrides.endpoint ??
      blankToUndefined(env.ANTHROPIC_ENDPOINT) ??
      `${gateway.baseUrl}${ANTHROPIC_PATH}`,
    model:
      overrides.model ??
      blankToUndefined(env.ANTHROPIC_MODEL) ??
      ANTHROPIC_DEFAULTS.model,
    apiKey: gateway.apiKey,
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
    authHeader: gateway.anthropicAuthHeader,
  };
}
