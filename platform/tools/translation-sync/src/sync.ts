import fs from 'node:fs';
import path from 'node:path';
import { translateMdx, type TranslateFn } from 'translation-mdx-adapter';
import type { BackendName, TranslationBackend } from '@mongodb-docs/translation-service';
import { selectBackend } from './backend.js';
import { makeTranslateFn, translateMdxFile } from './batch.js';
import { planSync } from './detect.js';
import { MANIFEST_FILENAME, emptyManifest, readManifest, sha256File, writeManifest } from './manifest.js';
import { translateReferencesJson } from './references.js';
import type { ManifestEntry, SyncSummary } from './types.js';

export interface SyncOptions {
  sourceRoot: string;
  targetRoot: string;
  locale: string;
  scope: string | null;
  mode: 'incremental' | 'full';
  backend: BackendName;
  model?: string;
  sourceRepository: string;
  sourceCommit: string | null;
  dryRun: boolean;
}

export interface SyncDeps {
  translateFn?: TranslateFn;
  now?: () => Date;
}

function isReferencesJson(rel: string): boolean {
  return path.posix.basename(rel) === '_references.json';
}

function writeFile(dest: string, body: string): void {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body);
}

export async function runSync(options: SyncOptions, deps: SyncDeps = {}): Promise<SyncSummary> {
  const now = deps.now ?? (() => new Date());
  const manifestPath = path.join(options.targetRoot, MANIFEST_FILENAME);
  const manifest = readManifest(
    manifestPath,
    emptyManifest(options.locale, options.sourceRepository, options.sourceCommit),
  );

  const plan = planSync({
    sourceRoot: options.sourceRoot,
    targetRoot: options.targetRoot,
    manifest,
    scope: options.scope,
    mode: options.mode,
  });

  // The backend is built once per run, and only when the caller has not
  // injected a translateFn; an injected fn owns its own backend.
  let backend: TranslationBackend | undefined;
  let translateFn: TranslateFn;
  if (deps.translateFn) {
    translateFn = deps.translateFn;
  } else {
    backend = selectBackend(options.model, options.backend);
    translateFn = makeTranslateFn(backend, options.locale);
  }

  const translateSource = (rel: string, sourceText: string): Promise<string> => {
    if (isReferencesJson(rel)) return translateReferencesJson(sourceText, translateFn);
    return backend
      ? translateMdxFile(sourceText, backend, options.locale)
      : translateMdx(sourceText, translateFn);
  };

  const summary: SyncSummary = { translated: [], copied: [], removed: [], failures: [] };
  // Start from the existing entries so a scoped run preserves the manifest
  // entries of content paths outside its scope.
  const files: Record<string, ManifestEntry> = { ...manifest.files };

  // A file whose hash matches but which is missing from the target must be
  // restored, so the mirror never silently loses content.
  const missing = new Set(
    plan.unchanged.filter((rel) => !fs.existsSync(path.join(options.targetRoot, rel))),
  );

  for (const rel of [...plan.translate, ...missing]) {
    const source = path.join(options.sourceRoot, rel);
    try {
      const sourceText = fs.readFileSync(source, 'utf8');
      const output = await translateSource(rel, sourceText);

      if (!options.dryRun) writeFile(path.join(options.targetRoot, rel), output);
      files[rel] = {
        sourceSha256: sha256File(source),
        translatedAt: now().toISOString(),
        provider: options.backend,
        model: options.model ?? null,
      };
      summary.translated.push(rel);
    } catch (error) {
      summary.failures.push({ file: rel, error: error instanceof Error ? error.message : String(error) });
      const previous = manifest.files[rel];
      if (previous) files[rel] = previous;
    }
  }

  for (const rel of plan.copy) {
    if (!options.dryRun) {
      const dest = path.join(options.targetRoot, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(path.join(options.sourceRoot, rel), dest);
    }
    summary.copied.push(rel);
  }

  for (const rel of plan.remove) {
    if (!options.dryRun) fs.rmSync(path.join(options.targetRoot, rel), { force: true });
    delete files[rel];
    summary.removed.push(rel);
  }

  if (!options.dryRun) {
    writeManifest(manifestPath, {
      sourceRepository: options.sourceRepository,
      sourceCommit: options.sourceCommit,
      targetLocale: options.locale,
      files,
    });
  }

  return summary;
}
