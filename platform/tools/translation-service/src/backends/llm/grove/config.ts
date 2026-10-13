/**
 * Grove backend configuration. Env reading is a pure function taking an
 * `env` argument so tests never mutate process.env.
 */
export interface GroveConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
}

export const GROVE_DEFAULTS = {
  endpoint:
    "https://grove-gateway-prod.azure-api.net/grove-foundry-prod/openai/v1/responses",
  model: "gpt-5.5",
  timeoutMs: 30000,
} as const;

/** Treat an unset OR empty-string env var as "not provided". */
function blankToUndefined(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value;
}

/**
 * Resolve config from env, with optional explicit `overrides` that take
 * precedence over env and defaults. Overrides are merged BEFORE the
 * required-field check, so a caller can supply `apiKey` even when
 * `GROVE_API_KEY` is absent from the environment.
 */
export function resolveGroveConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  overrides: Partial<GroveConfig> = {},
): GroveConfig {
  const apiKey = overrides.apiKey ?? blankToUndefined(env.GROVE_API_KEY);
  if (apiKey === undefined) {
    throw new Error(
      "GROVE_API_KEY is required to create the Grove translation backend",
    );
  }

  const timeoutRaw = blankToUndefined(env.GROVE_TIMEOUT_MS);
  const timeoutMs =
    overrides.timeoutMs ??
    (timeoutRaw === undefined ? GROVE_DEFAULTS.timeoutMs : Number(timeoutRaw));
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new Error(
      `GROVE_TIMEOUT_MS must be a positive number, got "${
        overrides.timeoutMs ?? timeoutRaw
      }"`,
    );
  }

  return {
    endpoint:
      overrides.endpoint ??
      blankToUndefined(env.GROVE_ENDPOINT) ??
      GROVE_DEFAULTS.endpoint,
    model:
      overrides.model ??
      blankToUndefined(env.GROVE_MODEL) ??
      GROVE_DEFAULTS.model,
    apiKey,
    timeoutMs,
  };
}
