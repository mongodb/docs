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
    cfg.contentMdxDir = path.join(root, 'content-mdx');
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
    // The build stops on a missing source, so both sides must exist.
    for (const [file, body] of [
      [path.join(cfg.contentMdxDir, 'atlas', 'a.mdx'), 'English source\n'],
      [path.join(run, 'translated', 'es', 'a.mdx'), 'Traducción\n'],
    ] as Array<[string, string]>) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, body);
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

  // The convention that bit: `pages[].mdxPath` is content-mdx-root-relative while
  // `translatable.*` and the translated overlay are project-relative. Joining the
  // wrong one silently produces a doubled prefix and no segments at all.
  it('resolves a versioned project where the manifest and page paths use different conventions', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const run = path.join(cfg.dataDir, 'manual', 'manual', 'r');

    for (const [dir, content] of [
      ['prod/en', 'English source'],
      ['prod/es', 'Traducción'],
      ['local/es', 'Local output'],
    ] as Array<[string, string]>) {
      fs.mkdirSync(path.join(run, dir), { recursive: true });
      fs.writeFileSync(path.join(run, dir, 's.json'), JSON.stringify({ url: 'u', title: 't', content }));
    }

    const write = (p: string, body: string) => {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, body);
    };
    write(path.join(cfg.contentMdxDir, 'manual', 'manual', 'aggregation.mdx'), 'English source\n');
    write(path.join(cfg.contentMdxDir, 'manual', 'manual', '_includes', 'n.mdx'), 'Note.\n');
    write(path.join(run, 'translated', 'es', 'aggregation.mdx'), 'Traducción\n');
    write(path.join(run, 'translated', 'es', '_includes', 'n.mdx'), 'Nota.\n');

    writeManifest(cfg, 'manual/manual', 'r', {
      project: 'manual/manual',
      runId: 'r',
      locales: ['es'],
      pages: [{ slug: 's', urlPath: '/docs/a', mdxPath: 'manual/manual/aggregation.mdx' }],
      translatable: { pages: ['aggregation.mdx'], includes: ['_includes/n.mdx'], substitutions: [] },
      stages: {},
    });

    const rows = buildDataset(cfg, 'manual/manual', 'r');

    const pageRow = rows.find((r) => r.metadata.kind === 'page')!;
    expect(pageRow.input.segments).toEqual([
      { key: 'paragraph[0]', en: 'English source', es: 'Traducción' },
    ]);
    expect(pageRow.metadata.segmentStatus).toBe('ok');

    const includeRow = rows.find((r) => r.metadata.kind === 'include')!;
    expect(includeRow.metadata.segmentStatus).toBe('ok');
    expect(includeRow.input.source_text).toBe('');
  });

  // A composable page emits one PageRef per variant, all sharing one mdxPath.
  // The overlay has one file per mdxPath, so variants share segments — the file
  // must be read once, but every variant still gets its own row and its own scrape.
  it('emits one row per composable variant without duplicating the file', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const run = path.join(cfg.dataDir, 'atlas', 'r');

    const write = (p: string, body: string) => {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, body);
    };
    write(path.join(cfg.contentMdxDir, 'atlas', 'a.mdx'), 'English source\n');
    write(path.join(run, 'translated', 'es', 'a.mdx'), 'Traducción\n');

    // Two variants of the same page, plus their two distinct scrapes.
    const variants = [
      { slug: 'a', content: 'variant one' },
      { slug: 'a__interface=atlas-cli', content: 'variant two' },
    ];
    for (const v of variants) {
      for (const [dir, content] of [
        ['prod/en', v.content],
        ['prod/es', 'Traducción'],
        ['local/es', v.content],
      ] as Array<[string, string]>) {
        write(path.join(run, dir, `${v.slug}.json`), JSON.stringify({ url: 'u', title: 't', content }));
      }
    }

    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: variants.map((v) => ({ slug: v.slug, urlPath: `/docs/a`, mdxPath: 'atlas/a.mdx' })),
      translatable: { pages: ['a.mdx'], includes: [], substitutions: [] },
      stages: {},
    });

    const rows = buildDataset(cfg, 'atlas', 'r');

    expect(rows).toHaveLength(2);
    expect(rows.map((r) => r.input.local_text)).toEqual(['variant one', 'variant two']);
    for (const row of rows) expect(row.input.segments).toHaveLength(1);
  });
});
