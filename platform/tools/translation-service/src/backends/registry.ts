/**
 * Selects a TranslationBackend by name so callers can swap providers
 * through configuration instead of importing a provider's factory.
 * Each factory builds its backend from the given `env` rather than
 * process.env, so selection is testable without mutating the process.
 */
import type { TranslationBackend } from "../types.js";
import { AwsTranslateBackend } from "./aws-translate/backend.js";
import { resolveAwsTranslateConfigFromEnv } from "./aws-translate/config.js";
import { GroveBackend } from "./llm/grove/backend.js";
import { resolveGroveConfigFromEnv } from "./llm/grove/config.js";
import { StubBackend } from "./stub-backend.js";

export enum BackendName {
  Grove = "grove",
  AwsTranslate = "aws-translate",
  Stub = "stub",
}

export const BACKEND_NAMES: readonly BackendName[] = Object.values(BackendName);

type BackendFactory = (env: NodeJS.ProcessEnv) => TranslationBackend;

const FACTORIES: Record<BackendName, BackendFactory> = {
  [BackendName.Grove]: (env) =>
    new GroveBackend({ config: resolveGroveConfigFromEnv(env) }),
  [BackendName.AwsTranslate]: (env) =>
    new AwsTranslateBackend({ config: resolveAwsTranslateConfigFromEnv(env) }),
  [BackendName.Stub]: () => new StubBackend(),
};

/** Narrows untyped input, such as a CLI flag, before calling createBackend. */
export function isBackendName(value: string): value is BackendName {
  return (BACKEND_NAMES as readonly string[]).includes(value);
}

export function createBackend(
  name: BackendName,
  env: NodeJS.ProcessEnv = process.env,
): TranslationBackend {
  return FACTORIES[name](env);
}
