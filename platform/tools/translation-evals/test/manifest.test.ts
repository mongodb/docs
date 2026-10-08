import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { newRunId, writeManifest, readManifest, setStage } from '../src/run/manifest.js';

function tmpCfg() {
  const cfg = loadConfig({});
  cfg.dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'te-'));
  return cfg;
}

describe('manifest', () => {
  it('round-trips a manifest and tracks stage status', () => {
    const cfg = tmpCfg();
    const id = newRunId();
    writeManifest(cfg, 'atlas', id, {
      project: 'atlas',
      runId: id,
      locales: ['es'],
      pages: [],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    });
    setStage(cfg, 'atlas', id, 'resolve', 'done');
    const m = readManifest(cfg, 'atlas', id);
    expect(m.stages.resolve!.status).toBe('done');
    expect(m.stages.resolve!.at).toBeTruthy();
  });
});
