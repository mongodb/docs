import fs from 'node:fs';
import path from 'node:path';
import type { TranslateFn } from 'translation-mdx-adapter';
import type { Config } from '../config.js';
import { readManifest, runDir, setStage, setTranslator } from '../run/manifest.js';
import { makeTranslateFn, translateMdxFile } from './batch.js';
import { resolveBackendName } from './backend.js';
import { translateSubstitutions, type SubValue } from './references.js';
import { writeOverlay } from './overlay.js';

export interface TranslateFailure {
  file: string;
  error: string;
}

export interface TranslateSummary {
  translated: number;
  failures: Record<string, TranslateFailure[]>;
}

const REFERENCES_FILE = '_references.json';
const FAILURES_FILE = 'translate-failures.json';

function readTerms(cfg: Config): string[] {
  if (!cfg.termsFile) return [];
  return JSON.parse(fs.readFileSync(cfg.termsFile, 'utf8')).terms ?? [];
}

function describe(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export async function translateRun(
  cfg: Config,
  project: string,
  runId: string,
  locales?: string[],
  translateFn?: TranslateFn,
): Promise<TranslateSummary> {
  const m = readManifest(cfg, project, runId);
  const targets = locales ?? m.locales;
  const terms = readTerms(cfg);
  const projectDir = path.join(cfg.contentMdxDir, project);
  const dir = runDir(cfg, project, runId);
  const summary: TranslateSummary = { translated: 0, failures: {} };

  for (const locale of targets) {
    const fn = translateFn ?? makeTranslateFn(cfg, locale);
    const files: Record<string, string> = {};
    const failures: TranslateFailure[] = [];

    for (const rel of [...m.translatable.pages, ...m.translatable.includes]) {
      try {
        const src = fs.readFileSync(path.join(projectDir, rel), 'utf8');
        files[rel] = await translateMdxFile(src, cfg, locale, terms, fn);
      } catch (err) {
        failures.push({ file: rel, error: describe(err) });
      }
    }

    const refsPath = path.join(projectDir, REFERENCES_FILE);
    if (fs.existsSync(refsPath)) {
      try {
        const refs = JSON.parse(fs.readFileSync(refsPath, 'utf8')) as {
          substitutions?: Record<string, SubValue>;
        };
        refs.substitutions = await translateSubstitutions(
          refs.substitutions ?? {},
          m.translatable.substitutions,
          cfg,
          locale,
          fn,
        );
        files[REFERENCES_FILE] = JSON.stringify(refs, null, 2);
      } catch (err) {
        failures.push({ file: REFERENCES_FILE, error: describe(err) });
      }
    }

    writeOverlay(dir, locale, files);
    summary.translated += Object.keys(files).length;
    summary.failures[locale] = failures;
  }

  const failuresPath = path.join(dir, FAILURES_FILE);
  const previous = fs.existsSync(failuresPath)
    ? (JSON.parse(fs.readFileSync(failuresPath, 'utf8')) as Record<string, TranslateFailure[]>)
    : {};
  fs.writeFileSync(failuresPath, JSON.stringify({ ...previous, ...summary.failures }, null, 2));
  setTranslator(cfg, project, runId, {
    provider: resolveBackendName(cfg.translatorModel, cfg.translatorBackend),
    model: cfg.translatorModel ?? null,
  });
  setStage(cfg, project, runId, 'translate', 'done');
  return summary;
}
