import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { Config } from '../config.js';
import type { RunManifest } from '../types.js';

export function newRunId(): string {
  const d = new Date().toISOString().slice(0, 10);
  return `${d}-${crypto.randomBytes(3).toString('hex')}`;
}

export function runDir(cfg: Config, project: string, runId: string): string {
  return path.join(cfg.dataDir, project, runId);
}

function manifestPath(cfg: Config, project: string, runId: string): string {
  return path.join(runDir(cfg, project, runId), 'manifest.json');
}

export function readManifestLatest(cfg: Config, project: string): string {
  const projectDir = path.join(cfg.dataDir, project);
  const runs = fs.existsSync(projectDir)
    ? fs
        .readdirSync(projectDir)
        .filter((id) => fs.existsSync(manifestPath(cfg, project, id)))
        .map((id) => ({ id, resolvedAt: readManifest(cfg, project, id).stages.resolve?.at ?? '' }))
        .sort((a, b) => b.resolvedAt.localeCompare(a.resolvedAt))
    : [];
  if (!runs[0]) throw new Error(`no runs found for "${project}" — run: pnpm resolve --project ${project}`);
  return runs[0].id;
}

export function readManifest(cfg: Config, project: string, runId: string): RunManifest {
  return JSON.parse(fs.readFileSync(manifestPath(cfg, project, runId), 'utf8')) as RunManifest;
}

export function writeManifest(cfg: Config, project: string, runId: string, m: RunManifest): void {
  const p = manifestPath(cfg, project, runId);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(m, null, 2));
}

export function setStage(
  cfg: Config,
  project: string,
  runId: string,
  stage: string,
  status: 'pending' | 'done' | 'failed',
): void {
  const m = readManifest(cfg, project, runId);
  m.stages[stage] = { status, at: new Date().toISOString() };
  writeManifest(cfg, project, runId, m);
}

export function setTranslator(
  cfg: Config,
  project: string,
  runId: string,
  translator: { provider: string; model: string | null },
): void {
  const m = readManifest(cfg, project, runId);
  m.translator = translator;
  writeManifest(cfg, project, runId, m);
}
