import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildRows, buildDataset } from './rows.js';
import { loadConfig } from '../config.js';
import { writeManifest } from '../run/manifest.js';
import type { ScrapedPage, PageRef } from '../types.js';

const en: ScrapedPage = { url: 'u', title: 't', content: 'English source' };
const ref: ScrapedPage = { url: 'u', title: 't', content: 'Traducción' };
const loc: ScrapedPage = { url: 'l', title: 't', content: 'Local output' };
const page: PageRef = { slug: 's', urlPath: '/docs/atlas/a', mdxPath: 'atlas/a.mdx' };

describe('buildRows', () => {
  it('joins source/reference/output into a row', () => {
    const row = buildRows(en, ref, loc, page, 'atlas', 'r', 'es')!;
    expect(row.input.source_text).toBe('English source');
    expect(row.input.local_text).toBe('Local output');
    expect(row.input.target_locale).toBe('es');
    expect(row.expected).toBe('Traducción');
    expect(row.metadata.locale).toBe('es');
  });

  it('returns null when any side is missing', () => {
    expect(buildRows(en, undefined, loc, page, 'atlas', 'r', 'es')).toBeNull();
  });
});

describe('buildDataset', () => {
  it('joins the prod-en, prod-locale and local scrapes and writes rows.json', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    const run = path.join(cfg.dataDir, 'atlas', 'r');
    const scrapes: Array<[string, string]> = [
      ['prod/en', 'English source'],
      ['prod/es', 'Traducción'],
      ['local/es', 'Local output'],
    ];
    for (const [dir, content] of scrapes) {
      fs.mkdirSync(path.join(run, dir), { recursive: true });
      fs.writeFileSync(path.join(run, dir, 's.json'), JSON.stringify({ url: 'u', title: 't', content }));
    }
    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: [page],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    });

    const rows = buildDataset(cfg, 'atlas', 'r');

    expect(rows).toHaveLength(1);
    expect(rows[0]!.input.source_text).toBe('English source');
    expect(rows[0]!.expected).toBe('Traducción');
    const written = JSON.parse(fs.readFileSync(path.join(run, 'dataset', 'rows.json'), 'utf8'));
    expect(written).toHaveLength(1);
  });
});
