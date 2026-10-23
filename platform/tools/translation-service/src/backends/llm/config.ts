/**
 * Config primitives shared by the LLM backends that talk to the Grove AI
 * Gateway. The gateway is one host with one key, so the key variable and
 * the numeric parsing are shared rather than re-implemented per backend.
 */

/** Base URL for the AI Gateway. Each backend appends its own path. */
export const AI_GATEWAY_BASE = "https://ai-gateway.corp.mongodb.com";

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
 * Resolve the gateway key. An override can satisfy the requirement even
 * when the env var is absent, so callers and tests can inject a key.
 */
export function requireGatewayApiKey(
  env: NodeJS.ProcessEnv,
  override: string | undefined,
  backendLabel: string,
): string {
  const apiKey = blankToUndefined(override) ?? blankToUndefined(env.AI_GATEWAY_API_KEY);
  if (apiKey === undefined) {
    throw new Error(
      `AI_GATEWAY_API_KEY is required to create the ${backendLabel} translation backend`,
    );
  }
  return apiKey;
}
