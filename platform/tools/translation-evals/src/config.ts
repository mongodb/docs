import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Locale } from './types.js';

export interface Config {
  prodOrigin: string;
  localOrigin: string;
  locales: Locale[];
  contentMdxDir: string;
  dataDir: string;
  /** Translator model. Its family selects the backend (see translate/backend.ts). */
  translatorModel?: string;
  judgeModel?: string;
  braintrustProject: string;
  termsFile?: string;
}

const DEFAULT_LOCALES = ['pt-br', 'es', 'ko-kr', 'ja-jp', 'zh-cn'];

// The `braintrust` CLI bundles the eval entrypoint as CJS, where
// `import.meta.url` is empty. The eval stage runs that bundle with its cwd set
// to the package root (see src/eval/run.ts), so fall back to cwd there.
const PKG_ROOT = import.meta.url
  ? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  : process.cwd();

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
    judgeModel: env.JUDGE_MODEL || undefined,
    braintrustProject: env.BRAINTRUST_PROJECT ?? 'docs-translations',
    termsFile: env.TERMS_FILE,
  };
}
