import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BACKEND_NAMES,
  isBackendName,
  type BackendName,
} from '@mongodb-docs/translation-service';
import type { Locale } from './types.js';

export interface Config {
  prodOrigin: string;
  localOrigin: string;
  locales: Locale[];
  contentMdxDir: string;
  dataDir: string;
  /** Translator model. Its family selects the backend unless translatorBackend is set. */
  translatorModel?: string;
  /** Explicit translator backend; overrides the model-family heuristic when set. */
  translatorBackend?: BackendName;
  judgeModel?: string;
  braintrustProject: string;
  glossaryFile?: string;
  /** Overrides the derived Braintrust experiment name (EVAL_EXPERIMENT_NAME). */
  experimentName?: string;
}

const DEFAULT_LOCALES = ['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn'];

// The `braintrust` CLI bundles the eval entrypoint as CJS, where
// `import.meta.url` is empty. The eval stage runs that bundle with its cwd set
// to the package root (see src/eval/run.ts), so fall back to cwd there.
const PKG_ROOT = import.meta.url
  ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  : process.cwd();

/**
 * Read TRANSLATOR_BACKEND, validating against the service's own registry so
 * a typo fails here with the valid values rather than deep inside a backend.
 * A blank value is unset, matching the blank-to-undefined rule below.
 */
function resolveTranslatorBackend(
  env: NodeJS.ProcessEnv,
): BackendName | undefined {
  const raw = (env.TRANSLATOR_BACKEND ?? '').trim();
  if (raw === '') return undefined;
  if (!isBackendName(raw)) {
    throw new Error(
      `TRANSLATOR_BACKEND must be one of: ${BACKEND_NAMES.join(', ')}; got "${raw}"`,
    );
  }
  return raw;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const raw = (env.TARGET_LOCALES ?? '').trim();
  return {
    prodOrigin: 'https://www.mongodb.com',
    localOrigin: 'http://localhost:3000',
    locales: raw
      ? raw.split(',').map((s) => s.trim()).filter(Boolean)
      : [...DEFAULT_LOCALES],
    // platform/tools/translation-evals -> repo root -> content-mdx
    contentMdxDir: path.resolve(PKG_ROOT, '..', '..', '..', 'content-mdx'),
    dataDir: path.join(PKG_ROOT, 'data'),
    // `cp .env.example .env` leaves these present but empty, and Node's
    // `--env-file` loads them as "". Treat a blank as unset so it falls back
    // to the backend default instead of counting as an override.
    translatorModel: env.TRANSLATOR_MODEL || undefined,
    translatorBackend: resolveTranslatorBackend(env),
    judgeModel: env.JUDGE_MODEL || undefined,
    braintrustProject: env.BRAINTRUST_PROJECT ?? 'docs-translations',
    // Resolved against the package root so `translate` (in-process, cwd =
    // wherever the CLI ran) and `eval` (child cd's to PKG_ROOT) agree.
    glossaryFile: env.GLOSSARY_FILE ? path.resolve(PKG_ROOT, env.GLOSSARY_FILE) : undefined,
    experimentName: env.EVAL_EXPERIMENT_NAME || undefined,
  };
}
