import fs from 'node:fs';
import path from 'node:path';
import { sha256File } from './manifest.js';
import type { FilePlan, Manifest } from './types.js';

export function isTranslatable(relPath: string): boolean {
  return relPath.endsWith('.mdx') || path.posix.basename(relPath) === '_references.json';
}

function listFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) out.push(full);
    }
  };
  walk(root);
  return out;
}

function scopeRoot(root: string, scope: string | null): string {
  return scope ? path.join(root, 'content-mdx', scope) : path.join(root, 'content-mdx');
}

function toRel(root: string, file: string): string {
  return path.relative(root, file).split(path.sep).join('/');
}

export function planSync(input: {
  sourceRoot: string;
  targetRoot: string;
  manifest: Manifest;
  scope: string | null;
  mode: 'incremental' | 'full';
}): FilePlan {
  const { sourceRoot, targetRoot, manifest, scope, mode } = input;
  const sourceBase = scopeRoot(sourceRoot, scope);
  const targetBase = scopeRoot(targetRoot, scope);

  // An empty source tree (a clone that lacks content-mdx/, or a scope that no
  // longer exists) would otherwise mark every target file for removal. Refuse
  // to plan rather than wipe the mirror.
  if (!fs.existsSync(sourceBase) && fs.existsSync(targetBase)) {
    throw new Error(
      `Source path does not exist but the target does: ${sourceBase}. ` +
        'Refusing to plan removals; check --source and --scope.',
    );
  }

  const plan: FilePlan = { translate: [], copy: [], remove: [], unchanged: [] };
  const sourceRels = new Set<string>();

  for (const file of listFiles(sourceBase)) {
    const rel = toRel(sourceRoot, file);
    sourceRels.add(rel);
    if (!isTranslatable(rel)) {
      plan.copy.push(rel);
      continue;
    }
    const unchanged =
      mode === 'incremental' && manifest.files[rel]?.sourceSha256 === sha256File(file);
    (unchanged ? plan.unchanged : plan.translate).push(rel);
  }

  for (const file of listFiles(targetBase)) {
    const rel = toRel(targetRoot, file);
    if (!sourceRels.has(rel)) plan.remove.push(rel);
  }

  plan.translate.sort();
  plan.copy.sort();
  plan.remove.sort();
  plan.unchanged.sort();
  return plan;
}
