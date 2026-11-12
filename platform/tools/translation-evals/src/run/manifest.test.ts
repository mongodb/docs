import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../config.js';
import { newRunId, writeManifest, readManifest, setStage, setTranslator, mergeTranslatorMeta, readManifestLatest } from './manifest.js';

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

  it('records the translator on the manifest', () => {
    const cfg = tmpCfg();
    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: [],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    });
    setTranslator(cfg, 'atlas', 'r', { provider: 'aws-translate', model: null });
    expect(readManifest(cfg, 'atlas', 'r').translator).toEqual({
      provider: 'aws-translate',
      model: null,
    });
  });
});

describe('mergeTranslatorMeta', () => {
  it('records the configured terminology and unions the applied terms across locales', () => {
    const record = mergeTranslatorMeta('aws-translate', null, [
      {
        terminology: 'aws-translate-glossary',
        terminology_applied: [{ source_text: 'shard', target_text: 'partición' }],
      },
      {
        terminology: 'aws-translate-glossary',
        terminology_applied: [
          { source_text: 'shard', target_text: 'partición' },
          { source_text: 'query', target_text: 'query' },
        ],
      },
    ]);
    expect(record).toEqual({
      provider: 'aws-translate',
      model: null,
      terminology: 'aws-translate-glossary',
      appliedTerms: ['shard → partición', 'query → query'],
    });
  });

  it('records no terminology when the backend reported none', () => {
    expect(mergeTranslatorMeta('aws-translate', null, [{}, {}])).toEqual({
      provider: 'aws-translate',
      model: null,
      terminology: null,
      appliedTerms: [],
    });
  });
});

describe('readManifestLatest', () => {
  const manifestAt = (runId: string, at: string) => ({
    project: 'atlas',
    runId,
    locales: [],
    pages: [],
    translatable: { pages: [], includes: [], substitutions: [] },
    stages: { resolve: { status: 'done' as const, at } },
  });

  it('returns the run resolved most recently, regardless of later stage updates', () => {
    const cfg = tmpCfg();
    writeManifest(cfg, 'atlas', 'older', manifestAt('older', '2026-10-01T00:00:00.000Z'));
    writeManifest(cfg, 'atlas', 'newer', manifestAt('newer', '2026-10-02T00:00:00.000Z'));
    setStage(cfg, 'atlas', 'older', 'scrape-prod', 'done');

    expect(readManifestLatest(cfg, 'atlas')).toBe('newer');
  });

  it('throws a helpful error when the project has no runs', () => {
    expect(() => readManifestLatest(tmpCfg(), 'atlas')).toThrow('pnpm resolve --project atlas');
  });
});
