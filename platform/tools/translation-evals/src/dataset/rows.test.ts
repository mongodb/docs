import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildRows, buildDataset, buildProductionBaselineRows } from './rows.js';
import { loadConfig } from '../config.js';
import { writeManifest } from '../run/manifest.js';
import type { ScrapedPage, PageRef } from '../types.js';
import type { PageSegments } from './page-segments.js';

const en: ScrapedPage = { url: 'u', title: 't', content: 'English source' };
const ref: ScrapedPage = { url: 'u', title: 't', content: 'Traducción' };
const loc: ScrapedPage = { url: 'l', title: 't', content: 'Local output' };
const page: PageRef = { slug: 's', urlPath: '/docs/atlas/a', mdxPath: 'atlas/a.mdx' };

const bundle = (overrides: Partial<PageSegments> = {}): PageSegments => ({
  pairs: [],
  ownPairCount: 0,
  includedPairCount: 0,
  enOnly: [],
  esOnly: [],
  status: 'ok',
  includedFiles: [],
  ...overrides,
});

describe('buildRows', () => {
  it('joins source/reference/output into a row', () => {
    const row = buildRows(en, ref, loc, page, 'atlas', 'r', 'es', bundle());
    expect(row.input.source_text).toBe('English source');
    expect(row.input.local_text).toBe('Local output');
    expect(row.input.target_locale).toBe('es');
    expect(row.expected).toBe('Traducción');
    expect(row.metadata.locale).toBe('es');
  });

  it('throws with the page path and locale when any scrape is missing', () => {
    expect(() => buildRows(en, undefined, loc, page, 'atlas', 'r', 'es', bundle())).toThrow(
      'missing page scrape for "atlas/a.mdx" [es]',
    );
  });
});

describe('buildProductionBaselineRows', () => {
  it('scores the production reference as the candidate without an overlay', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const run = path.join(cfg.dataDir, 'atlas', 'r');
    for (const [dir, content] of [
      ['prod/en', 'English source'],
      ['prod/es', 'Traducción'],
    ] as Array<[string, string]>) {
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

    const rows = buildProductionBaselineRows(cfg, 'atlas', 'r');

    expect(rows).toHaveLength(1);
    expect(rows[0]!.input.local_text).toBe('Traducción');
    expect(rows[0]!.expected).toBe('Traducción');
    expect(rows[0]!.input.segments).toEqual([{ key: 's', en: 'English source', es: 'Traducción' }]);
    expect(rows[0]!.metadata.baseline).toBe('production');
  });

  it('fails a degraded capture instead of silently dropping a page', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const run = path.join(cfg.dataDir, 'atlas', 'r');
    fs.mkdirSync(path.join(run, 'prod', 'en'), { recursive: true });
    fs.writeFileSync(
      path.join(run, 'prod', 'en', 's.json'),
      JSON.stringify({ url: 'u', title: 't', content: 'English source' }),
    );
    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: [page],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    });

    expect(() => buildProductionBaselineRows(cfg, 'atlas', 'r')).toThrow(
      'baseline needs prod/en and prod/es for s — re-run scrape-prod',
    );
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
      translatable: {
        pages: [],
        includes: [],
        substitutions: [],
        pageIncludes: { 'a.mdx': [] },
      },
      stages: {},
    });

    const rows = buildDataset(cfg, 'atlas', 'r');

    expect(rows).toHaveLength(1);
    expect(rows[0]!.input.source_text).toBe('English source');
    expect(rows[0]!.expected).toBe('Traducción');
    // Every pair names the file it came from, even when the page owns no includes.
    expect(rows[0]!.input.segments).toEqual([
      { key: 'paragraph[0]', en: 'English source', es: 'Traducción', source: 'a.mdx' },
    ]);
    expect(rows[0]!.metadata.own_segments).toBe(1);
    expect(rows[0]!.metadata.included_segments).toBe(0);
    expect(rows[0]!.metadata.included_files).toEqual([]);
    const written = JSON.parse(fs.readFileSync(path.join(run, 'dataset', 'rows.json'), 'utf8'));
    expect(written).toHaveLength(1);
  });

  // The convention that bit: `pages[].mdxPath` is content-mdx-root-relative while
  // `translatable.*` and the translated overlay are project-relative. Joining the
  // wrong one silently produces a doubled prefix and no segments at all.
  it('folds a reachable include into the page row that inlines it', () => {
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
      translatable: {
        pages: ['aggregation.mdx'],
        includes: ['_includes/n.mdx'],
        substitutions: [],
        pageIncludes: { 'aggregation.mdx': ['_includes/n.mdx'] },
      },
      stages: {},
    });

    const rows = buildDataset(cfg, 'manual/manual', 'r');

    // One page row per locale; the include no longer gets a row of its own.
    expect(rows).toHaveLength(1);
    const pageRow = rows[0]!;
    expect(pageRow.metadata.kind).toBe('page');
    expect(pageRow.metadata.segmentStatus).toBe('ok');
    expect(pageRow.metadata.own_segments).toBe(1);
    expect(pageRow.metadata.included_segments).toBe(1);
    expect(pageRow.metadata.segmentPairs).toBe(2);
    expect(pageRow.metadata.included_files).toEqual([
      { file: '_includes/n.mdx', pairCount: 1, status: 'ok' },
    ]);
    // Each pair still names the file that holds its text.
    expect(pageRow.input.segments).toEqual([
      { key: 'paragraph[0]', en: 'English source', es: 'Traducción', source: 'aggregation.mdx' },
      { key: 'paragraph[0]', en: 'Note.', es: 'Nota.', source: '_includes/n.mdx' },
    ]);
  });

  // An include with no translatable content contributes no pairs, but the page
  // still records that it was reached and that it was empty.
  it('records an include with no segments in the page metadata rather than inventing text', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ds-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const run = path.join(cfg.dataDir, 'manual', 'manual', 'r');

    const write = (p: string, body: string) => {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, body);
    };
    write(path.join(cfg.contentMdxDir, 'manual', 'manual', 'aggregation.mdx'), 'English source\n');
    write(path.join(run, 'translated', 'es', 'aggregation.mdx'), 'Traducción\n');
    write(path.join(cfg.contentMdxDir, 'manual', 'manual', '_includes', 'empty.mdx'), '\n');
    write(path.join(run, 'translated', 'es', '_includes', 'empty.mdx'), '\n');
    for (const [dir, content] of [
      ['prod/en', 'English source'],
      ['prod/es', 'Traducción'],
      ['local/es', 'Local output'],
    ] as Array<[string, string]>) {
      write(path.join(run, dir, 's.json'), JSON.stringify({ url: 'u', title: 't', content }));
    }
    writeManifest(cfg, 'manual/manual', 'r', {
      project: 'manual/manual',
      runId: 'r',
      locales: ['es'],
      pages: [{ slug: 's', urlPath: '/docs/a', mdxPath: 'manual/manual/aggregation.mdx' }],
      translatable: {
        pages: ['aggregation.mdx'],
        includes: ['_includes/empty.mdx'],
        substitutions: [],
        pageIncludes: { 'aggregation.mdx': ['_includes/empty.mdx'] },
      },
      stages: {},
    });

    const rows = buildDataset(cfg, 'manual/manual', 'r');

    expect(rows).toHaveLength(1);
    const pageRow = rows[0]!;
    expect(pageRow.metadata.included_files).toEqual([
      { file: '_includes/empty.mdx', pairCount: 0, status: 'no-translatable-content' },
    ]);
    expect(pageRow.metadata.included_segments).toBe(0);
    expect(pageRow.metadata.own_segments).toBe(1);
    expect(pageRow.input.segments).toEqual([
      { key: 'paragraph[0]', en: 'English source', es: 'Traducción', source: 'aggregation.mdx' },
    ]);
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
      translatable: {
        pages: ['a.mdx'],
        includes: [],
        substitutions: [],
        pageIncludes: { 'a.mdx': [] },
      },
      stages: {},
    });

    const rows = buildDataset(cfg, 'atlas', 'r');

    expect(rows).toHaveLength(2);
    expect(rows.map((r) => r.input.local_text)).toEqual(['variant one', 'variant two']);
    for (const row of rows) {
      expect(row.input.segments).toHaveLength(1);
      expect(row.metadata.included_files).toEqual([]);
    }
    // Every variant gets its own logical identity so Braintrust can compare
    // runs case by case, and a content fingerprint for compatibility checks.
    const ids = rows.map((row) => row.metadata.case_id);
    expect(new Set(ids).size).toBe(rows.length);
    for (const row of rows) {
      expect(row.metadata.case_id).toEqual(
        ['atlas', 'page', row.metadata.slug, row.metadata.locale].join(':'),
      );
      expect(row.metadata.source_digest).toEqual(expect.any(String));
      expect(row.metadata.source_digest).toHaveLength(64);
    }
  });

  // The identity must survive a retranslation and follow only the English
  // source: a changed Spanish string keeps the same case_id and digest, an
  // English edit moves the digest.
  it('keeps case identity stable across translations while the digest tracks the English source', () => {
    const setup = () => {
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
      write(path.join(cfg.contentMdxDir, 'atlas', 'b.mdx'), 'Second page\n');
      write(path.join(run, 'translated', 'es', 'a.mdx'), 'Traducción\n');
      write(path.join(run, 'translated', 'es', 'b.mdx'), 'Segunda página\n');
      for (const [slug, en] of [
        ['a', 'English source'],
        ['b', 'Second page'],
      ] as Array<[string, string]>) {
        for (const [dir, content] of [
          ['prod/en', en],
          ['prod/es', 'Traducción'],
          ['local/es', 'Local output'],
        ] as Array<[string, string]>) {
          write(path.join(run, dir, `${slug}.json`), JSON.stringify({ url: 'u', title: 't', content }));
        }
      }
      writeManifest(cfg, 'atlas', 'r', {
        project: 'atlas',
        runId: 'r',
        locales: ['es'],
        pages: [
          { slug: 'a', urlPath: '/docs/a', mdxPath: 'atlas/a.mdx' },
          { slug: 'b', urlPath: '/docs/b', mdxPath: 'atlas/b.mdx' },
        ],
        translatable: {
          pages: ['a.mdx', 'b.mdx'],
          includes: [],
          substitutions: [],
          pageIncludes: { 'a.mdx': [], 'b.mdx': [] },
        },
        stages: {},
      });
      return cfg;
    };

    const first = buildDataset(setup(), 'atlas', 'r');

    // Re-translate: same English, different Spanish overlay and local scrape.
    const cfg2 = setup();
    fs.writeFileSync(
      path.join(cfg2.dataDir, 'atlas', 'r', 'translated', 'es', 'a.mdx'),
      'Otra traducción\n',
    );
    fs.writeFileSync(
      path.join(cfg2.dataDir, 'atlas', 'r', 'local', 'es', 'a.json'),
      JSON.stringify({ url: 'u', title: 't', content: 'Salida nueva' }),
    );
    const second = buildDataset(cfg2, 'atlas', 'r');

    expect(second.map((row) => row.metadata.case_id)).toEqual(first.map((row) => row.metadata.case_id));
    expect(second.map((row) => row.metadata.source_digest)).toEqual(
      first.map((row) => row.metadata.source_digest),
    );

    // An English source edit moves the digest but not the identity.
    const cfg3 = setup();
    fs.writeFileSync(
      path.join(cfg3.dataDir, 'atlas', 'r', 'prod', 'en', 'a.json'),
      JSON.stringify({ url: 'u', title: 't', content: 'Edited English source' }),
    );
    const third = buildDataset(cfg3, 'atlas', 'r');

    expect(third.map((row) => row.metadata.case_id)).toEqual(first.map((row) => row.metadata.case_id));
    expect(third[0]!.metadata.source_digest).not.toBe(first[0]!.metadata.source_digest);
    expect(third[1]!.metadata.source_digest).toBe(first[1]!.metadata.source_digest);
  });

  it('fails when the manifest has no ownership entry for a page', () => {
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
    for (const dir of ['prod/en', 'prod/es', 'local/es']) {
      fs.mkdirSync(path.join(run, dir), { recursive: true });
      fs.writeFileSync(path.join(run, dir, 's.json'), JSON.stringify({ url: 'u', title: 't', content: 'x' }));
    }
    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: [page],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    });

    expect(() => buildDataset(cfg, 'atlas', 'r')).toThrow(
      'no include ownership for "a.mdx" in run "r"',
    );
  });

  it('fails missing page coverage instead of silently dropping rows', () => {
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

    // Two variants of one page. Only the first has a local scrape, so the
    // dataset fails with the path rather than copying what it has and
    // reducing the page/include population with only a warning.
    const variants = ['s', 's2'];
    for (const slug of variants) {
      for (const dir of ['prod/en', 'prod/es']) {
        write(path.join(run, dir, `${slug}.json`), JSON.stringify({ url: 'u', title: 't', content: 'x' }));
      }
    }
    write(path.join(run, 'local', 'es', 's.json'), JSON.stringify({ url: 'l', title: 't', content: 'Local output' }));

    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: variants.map((slug) => ({ slug, urlPath: '/docs/atlas/a', mdxPath: 'atlas/a.mdx' })),
      translatable: {
        pages: [],
        includes: [],
        substitutions: [],
        pageIncludes: { 'a.mdx': [] },
      },
      stages: {},
    });

    expect(() => buildDataset(cfg, 'atlas', 'r')).toThrow(
      'missing page scrape for "atlas/a.mdx" [es]',
    );
  });

  it('logs no dataset warn when nothing is dropped', () => {
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

    for (const slug of ['s', 's2']) {
      for (const dir of ['prod/en', 'prod/es', 'local/es']) {
        write(path.join(run, dir, `${slug}.json`), JSON.stringify({ url: 'u', title: 't', content: 'x' }));
      }
    }

    writeManifest(cfg, 'atlas', 'r', {
      project: 'atlas',
      runId: 'r',
      locales: ['es'],
      pages: ['s', 's2'].map((slug) => ({ slug, urlPath: '/docs/atlas/a', mdxPath: 'atlas/a.mdx' })),
      translatable: {
        pages: [],
        includes: [],
        substitutions: [],
        pageIncludes: { 'a.mdx': [] },
      },
      stages: {},
    });

    const lines: string[] = [];
    const spy = vi.spyOn(console, 'log').mockImplementation((l: string) => void lines.push(l));
    try {
      buildDataset(cfg, 'atlas', 'r');
    } finally {
      spy.mockRestore();
      fs.rmSync(root, { recursive: true, force: true });
    }
    expect(lines.some((l) => /warn {2}dataset /.test(l))).toBe(false);
    expect(lines.some((l) => /info {2}stage=dataset locale=es rows=2\/2/.test(l))).toBe(true);
  });
});
