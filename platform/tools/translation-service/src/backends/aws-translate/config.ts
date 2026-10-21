/**
 * AWS Translate backend configuration. Env reading is a pure function
 * taking an `env` argument so tests never mutate process.env. Credentials
 * are deliberately absent: the AWS SDK resolves them from its default
 * provider chain (env vars, AWS_PROFILE / SSO, instance roles).
 */
export interface AwsTranslateConfig {
  region: string;
  timeoutMs: number;
  /** Maximum TranslateText calls in flight at once for a single batch. */
  concurrency: number;
}

export const AWS_TRANSLATE_PROVIDER = "aws-translate";

/** AWS Translate has no model choice, so `meta.model` is a fixed label. */
export const AWS_TRANSLATE_MODEL = "translate-text";

export const AWS_TRANSLATE_DEFAULTS = {
  region: "us-east-1",
  timeoutMs: 30000,
  concurrency: 5,
} as const;

/** Treat an unset OR empty-string env var as "not provided". */
function blankToUndefined(value: string | undefined): string | undefined {
  return value === undefined || value === "" ? undefined : value;
}

function resolveTimeoutMs(
  env: NodeJS.ProcessEnv,
  override: number | undefined,
): number {
  const raw = blankToUndefined(env.AWS_TRANSLATE_TIMEOUT_MS);
  const value =
    override ??
    (raw === undefined ? AWS_TRANSLATE_DEFAULTS.timeoutMs : Number(raw));
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      `AWS_TRANSLATE_TIMEOUT_MS must be a positive number, got "${override ?? raw}"`,
    );
  }
  return value;
}

function resolveConcurrency(
  env: NodeJS.ProcessEnv,
  override: number | undefined,
): number {
  const raw = blankToUndefined(env.AWS_TRANSLATE_CONCURRENCY);
  const value =
    override ??
    (raw === undefined ? AWS_TRANSLATE_DEFAULTS.concurrency : Number(raw));
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `AWS_TRANSLATE_CONCURRENCY must be a positive integer, got "${override ?? raw}"`,
    );
  }
  return value;
}

/**
 * Resolve config from env, with optional explicit `overrides` that take
 * precedence over env and defaults. AWS_TRANSLATE_REGION wins over the
 * SDK-standard AWS_REGION so this backend can target a different region
 * than other AWS tooling sharing the same shell.
 */
export function resolveAwsTranslateConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
  overrides: Partial<AwsTranslateConfig> = {},
): AwsTranslateConfig {
  const region =
    overrides.region ??
    blankToUndefined(env.AWS_TRANSLATE_REGION) ??
    blankToUndefined(env.AWS_REGION) ??
    AWS_TRANSLATE_DEFAULTS.region;

  return {
    region,
    timeoutMs: resolveTimeoutMs(env, overrides.timeoutMs),
    concurrency: resolveConcurrency(env, overrides.concurrency),
  };
}
