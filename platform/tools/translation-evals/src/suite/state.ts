import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { Config } from '../config.js';
import type { SuiteConfig } from './config.js';
import type { Iteration } from './plan.js';

export type IterationStatus = 'running' | 'completed' | 'partial' | 'failed';

export interface IterationRecord {
  id: string;
  status: IterationStatus;
  fingerprint: string;
  runId: string;
  experimentName?: string;
  startedAt?: string;
  finishedAt?: string;
  stage?: string;
  error?: string;
}

export interface BatchState {
  name: string;
  project: string;
  createdAt: string;
  baseFingerprint?: string;
  prodYield?: { present: number; expected: number };
  iterations: Record<string, IterationRecord>;
}

export function suiteDir(cfg: Config, project: string, name: string): string {
  return path.join(cfg.dataDir, project, name, 'suite');
}

function stateFile(cfg: Config, project: string, name: string): string {
  return path.join(suiteDir(cfg, project, name), 'state.json');
}

export function readState(cfg: Config, project: string, name: string): BatchState {
  const file = stateFile(cfg, project, name);
  if (!fs.existsSync(file)) {
    return { name, project, createdAt: new Date().toISOString(), iterations: {} };
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as BatchState;
}

export function writeState(cfg: Config, project: string, name: string, state: BatchState): void {
  const file = stateFile(cfg, project, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(state, null, 2));
}

export function sha256Hex(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function baseFingerprint(cfg: SuiteConfig, pagesDigest: string): string {
  return sha256Hex(
    JSON.stringify({ project: cfg.project, pages: pagesDigest, locales: [...cfg.locales].sort() }),
  );
}

// Repeat is deliberately excluded: the record is already keyed by the
// iteration id, which encodes the repeat, so repeats of one translator share a
// fingerprint and a matching one is never stale merely because it is a re-run.
export function suiteFingerprint(cfg: SuiteConfig, it: Iteration, pagesDigest: string): string {
  return sha256Hex(
    JSON.stringify({
      project: cfg.project,
      pages: pagesDigest,
      locales: [...cfg.locales].sort(),
      judge: cfg.judge,
      backend: it.backend,
      model: it.model,
    }),
  );
}

export function planRuns(
  cfg: SuiteConfig,
  iterations: Iteration[],
  state: BatchState,
  pagesDigest: string,
  force: boolean,
): { toRun: Iteration[]; skipped: Iteration[]; stale: Iteration[] } {
  const toRun: Iteration[] = [];
  const skipped: Iteration[] = [];
  const stale: Iteration[] = [];

  for (const it of iterations) {
    const rec = state.iterations[it.id];
    const fp = suiteFingerprint(cfg, it, pagesDigest);
    if (force || !rec) toRun.push(it);
    else if (rec.fingerprint !== fp) stale.push(it);
    else if (rec.status === 'failed' || rec.status === 'running') toRun.push(it);
    else skipped.push(it);
  }
  return { toRun, skipped, stale };
}
