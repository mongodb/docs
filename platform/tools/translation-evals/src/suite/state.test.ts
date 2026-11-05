import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import type { BackendName } from '@mongodb-docs/translation-service';
import { planRuns, suiteFingerprint, sha256Hex, readState, writeState } from './state.js';
import { expandPlan } from './plan.js';
import type { BatchState } from './state.js';
import type { SuiteConfig } from './config.js';
import type { Config } from '../config.js';

const suite: SuiteConfig = {
  name: 'b',
  project: 'atlas',
  pages: 'p.txt',
  locales: ['es'],
  judge: 'j',
  repeats: 2,
  translators: [{ backend: 'anthropic' as BackendName, model: 'm' }],
};
const its = expandPlan(suite);
const digest = sha256Hex('pages\n');

function stateWith(iterations: BatchState['iterations']): BatchState {
  return { name: 'b', project: 'atlas', createdAt: 't', iterations };
}

function record(fp: string, status: BatchState['iterations'][string]['status']) {
  return { id: 'anthropic:m#1', status, fingerprint: fp, runId: 'r1' };
}

describe('planRuns', () => {
  it('runs everything on a fresh state', () => {
    const { toRun, skipped, stale } = planRuns(suite, its, stateWith({}), digest, false);
    expect(toRun.map((i) => i.id)).toEqual(['anthropic:m#1', 'anthropic:m#2']);
    expect(skipped).toEqual([]);
    expect(stale).toEqual([]);
  });

  it('skips a completed iteration whose fingerprint matches', () => {
    const fp = suiteFingerprint(suite, its[0]!, digest);
    const { toRun, skipped } = planRuns(
      suite,
      its,
      stateWith({ 'anthropic:m#1': record(fp, 'completed') }),
      digest,
      false,
    );
    expect(skipped.map((i) => i.id)).toEqual(['anthropic:m#1']);
    expect(toRun.map((i) => i.id)).toEqual(['anthropic:m#2']);
  });

  it('re-attempts failed and running iterations', () => {
    const fp = suiteFingerprint(suite, its[0]!, digest);
    const st = stateWith({
      'anthropic:m#1': record(fp, 'failed'),
      'anthropic:m#2': record(fp, 'running'),
    });
    expect(planRuns(suite, its, st, digest, false).toRun.map((i) => i.id)).toEqual(['anthropic:m#1', 'anthropic:m#2']);
  });

  it('flags a completed iteration whose fingerprint no longer matches as stale', () => {
    const st = stateWith({ 'anthropic:m#1': record('stale-fp', 'completed') });
    const { stale, skipped } = planRuns(suite, its, st, digest, false);
    expect(stale.map((i) => i.id)).toEqual(['anthropic:m#1']);
    expect(skipped).toEqual([]);
  });

  it('re-runs everything when forced', () => {
    const fp = suiteFingerprint(suite, its[0]!, digest);
    const st = stateWith({
      'anthropic:m#1': record(fp, 'completed'),
      'anthropic:m#2': record(fp, 'completed'),
    });
    expect(planRuns(suite, its, st, digest, true).toRun).toHaveLength(2);
  });
});

describe('state file', () => {
  it('round-trips through disk and treats a missing file as empty', () => {
    const cfg = { dataDir: fs.mkdtempSync(path.join(os.tmpdir(), 'suite-')) } as Config;
    expect(readState(cfg, 'atlas', 'b').iterations).toEqual({});
    writeState(cfg, 'atlas', 'b', stateWith({ 'anthropic:m#1': record('fp', 'completed') }));
    expect(readState(cfg, 'atlas', 'b').iterations['anthropic:m#1']!.status).toBe('completed');
  });
});
