import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { runDataset } from './index.js';
import type { Config } from '../config.js';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dataset-command-'));
  const cfg = { dataDir: path.join(root, 'data') } as Config;
  const run = path.join(cfg.dataDir, 'atlas', 'r');
  for (const [locale, content] of [['en', 'English'], ['es', 'Traducción']] as const) {
    fs.mkdirSync(path.join(run, 'prod', locale), { recursive: true });
    fs.writeFileSync(
      path.join(run, 'prod', locale, 's.json'),
      JSON.stringify({ url: 'u', title: 't', content }),
    );
  }
  fs.writeFileSync(
    path.join(run, 'manifest.json'),
    JSON.stringify({
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: [{ slug: 's', urlPath: '/docs/atlas/s', mdxPath: 'atlas/s.mdx' }],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    }),
  );
  return { cfg, run };
}

describe('runDataset --candidate', () => {
  it.each(['reference', 'bogus', true])('rejects %j', async (candidate) => {
    const { cfg } = fixture();
    await expect(runDataset({ project: 'atlas', run: 'r', candidate }, cfg)).rejects.toThrow(
      'expected "production"',
    );
  });

  it('requires --run when candidate is production', async () => {
    const { cfg } = fixture();

    await expect(runDataset({ project: 'atlas', candidate: 'production' }, cfg)).rejects.toThrow(
      '--run is required',
    );
  });

  it('writes production baseline rows when candidate is production', async () => {
    const { cfg, run } = fixture();

    await runDataset({ project: 'atlas', run: 'r', candidate: 'production' }, cfg);

    const rows = JSON.parse(fs.readFileSync(path.join(run, 'dataset', 'rows.json'), 'utf8'));
    expect(rows).toHaveLength(1);
    expect(rows[0].metadata.baseline).toBe('production');
    expect(rows[0].input.local_text).toBe('Traducción');
    expect(rows[0].expected).toBe('Traducción');
  });
});
