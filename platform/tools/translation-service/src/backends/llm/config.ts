/**
 * Config primitives shared by the LLM backends that talk to a Grove
 * gateway. Both gateways serve the same paths, so the gateway selection,
 * the key resolution, and the numeric parsing are shared rather than
 * re-implemented per backend.
 */

/** Base URL for the AI Gateway. Each backend appends its own path. */
export const AI_GATEWAY_BASE = "https://ai-gateway.corp.mongodb.com";

/**
 * Legacy Azure Grove gateway. Publicly reachable, unlike the corp-only AI
 * Gateway, so it is the fallback for environments that cannot reach it.
 */
export const LEGACY_GROVE_BASE =
  "https://grove-gateway-prod.azure-api.net/grove-foundry-prod";

/** Header the Anthropic Messages path authenticates with, per gateway. */
export type GatewayAuthHeader = "x-api-key" | "api-key";

export interface Gateway {
  baseUrl: string;
  apiKey: string;
  anthropicAuthHeader: GatewayAuthHeader;
}

/** Treat an unset OR empty-string env var as "not provided". */
export function blankToUndefined(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value;
}

export function resolveTimeoutMs(
  env: NodeJS.ProcessEnv,
  varName: string,
  defaultMs: number,
  override: number | undefined,
): number {
  const raw = blankToUndefined(env[varName]);
  const value = override ?? (raw === undefined ? defaultMs : Number(raw));
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      `${varName} must be a positive number, got "${override ?? raw}"`,
    );
  }
  return value;
}

export function resolvePositiveInt(
  env: NodeJS.ProcessEnv,
  varName: string,
  defaultValue: number,
  override: number | undefined,
): number {
  const raw = blankToUndefined(env[varName]);
  const value = override ?? (raw === undefined ? defaultValue : Number(raw));
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `${varName} must be a positive integer, got "${override ?? raw}"`,
    );
  }
  return value;
}

/**
 * Resolve which gateway to call, its key, and the header the Anthropic
 * Messages path authenticates with there.
 *
 * Selection is key-driven and additive: the legacy gateway is chosen only
 * when AI_GATEWAY_API_KEY is absent AND no explicit override was passed, so
 * an environment holding the current key never switches silently. An
 * override therefore implies the AI Gateway; it exists so callers and tests
 * can inject a key.
 */
export function resolveGateway(
  env: NodeJS.ProcessEnv,
  override: string | undefined,
  backendLabel: string,
): Gateway {
  const overrideKey = blankToUndefined(override);
  const apiGatewayKey = blankToUndefined(env.AI_GATEWAY_API_KEY);
  const legacyKey = blankToUndefined(env.GROVE_API_KEY);

  const apiKey = overrideKey ?? apiGatewayKey ?? legacyKey;
  if (apiKey === undefined) {
    throw new Error(
      `AI_GATEWAY_API_KEY (or GROVE_API_KEY for the legacy Grove gateway) is required to create the ${backendLabel} translation backend`,
    );
  }

  const legacy = overrideKey === undefined && apiGatewayKey === undefined;
  return legacy
    ? { baseUrl: LEGACY_GROVE_BASE, apiKey, anthropicAuthHeader: "api-key" }
    : { baseUrl: AI_GATEWAY_BASE, apiKey, anthropicAuthHeader: "x-api-key" };
}
