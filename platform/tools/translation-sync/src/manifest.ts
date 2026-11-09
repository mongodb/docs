import { createHash } from 'node:crypto';
import fs from 'node:fs';
import type { Manifest } from './types.js';

export const MANIFEST_FILENAME = 'translation-manifest.json';

export function emptyManifest(
  targetLocale: string,
  sourceRepository: string,
  sourceCommit: string | null,
): Manifest {
  return { sourceRepository, sourceCommit, targetLocale, files: {} };
}

export function readManifest(file: string, fallback: Manifest): Manifest {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Manifest;
}

export function writeManifest(file: string, manifest: Manifest): void {
  fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`);
}

export function sha256File(file: string): string {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
