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
