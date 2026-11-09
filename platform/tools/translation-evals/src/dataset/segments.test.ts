import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildSegmentPairs, segmentTargets, readFileSegmentResult } from './segments.js';
import { projectRelativeMdx } from '../resolve/run.js';
import { loadConfig } from '../config.js';
import type { RunManifest, SegmentTarget } from '../types.js';

describe('buildSegmentPairs', () => {
  it('zips the English and Spanish payloads by adapter key', () => {
    const { pairs, enOnly, esOnly } = buildSegmentPairs(
      '# Title\n\nA paragraph.\n',
      '# Título\n\nUn párrafo.\n',
    );
    expect(enOnly).toEqual([]);
    expect(esOnly).toEqual([]);
    expect(pairs).toEqual([
      { key: 'heading[0]', en: 'Title', es: 'Título' },
      { key: 'paragraph[0]', en: 'A paragraph.', es: 'Un párrafo.' },
    ]);
  });

  it('reports one-sided keys instead of dropping them silently', () => {
    const { pairs, enOnly, esOnly } = buildSegmentPairs('First.\n\nSecond.\n', 'Primero.\n');
    expect(pairs).toEqual([{ key: 'paragraph[0]', en: 'First.', es: 'Primero.' }]);
    expect(enOnly).toEqual(['paragraph[1]']);
    expect(esOnly).toEqual([]);
  });
});

describe('projectRelativeMdx', () => {
  it('strips the project prefix', () => {
    expect(projectRelativeMdx('manual/manual', 'manual/manual/aggregation.mdx')).toBe('aggregation.mdx');
  });

  it('throws when the prefix is absent', () => {
    expect(() => projectRelativeMdx('manual/manual', 'aggregation.mdx')).toThrow(/not under content-mdx/);
  });
});

describe('segmentTargets', () => {
  it('lists pages first then includes, converting page paths to project-relative', () => {
    const m = {
      project: 'manual/manual',
      translatable: { pages: ['aggregation.mdx'], includes: ['_includes/n.mdx'], substitutions: [] },
      pages: [{ slug: 'a', urlPath: '/docs/a', mdxPath: 'manual/manual/aggregation.mdx' }],
    } as unknown as RunManifest;
    expect(segmentTargets(m)).toEqual([
      { kind: 'page', rel: 'aggregation.mdx', mdxPath: 'manual/manual/aggregation.mdx' },
      { kind: 'include', rel: '_includes/n.mdx', mdxPath: '_includes/n.mdx' },
    ]);
  });
});

describe('readFileSegmentResult', () => {
  const EN_REL = '_includes/n.mdx';

  function setup() {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'segments-'));
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const m = {
      project: 'manual/manual',
      runId: 'r',
      locales: ['es'],
      pages: [],
      translatable: { pages: [], includes: [EN_REL], substitutions: [] },
      stages: {},
    } as unknown as RunManifest;
    const target: SegmentTarget = { kind: 'include', rel: EN_REL, mdxPath: EN_REL };
    const writeEn = (body: string) =>
      write(path.join(cfg.contentMdxDir, 'manual', 'manual', EN_REL), body);
    const writeEs = (body: string) =>
      write(path.join(cfg.dataDir, 'manual', 'manual', 'r', 'translated', 'es', EN_REL), body);
    return { cfg, m, target, writeEn, writeEs };
  }

  function write(p: string, body: string) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, body);
  }

  it('pairs the two sides when both exist', () => {
    const { cfg, m, target, writeEn, writeEs } = setup();
    writeEn('Note.\n');
    writeEs('Nota.\n');
    const r = readFileSegmentResult(cfg, m, 'es', target);
    expect(r.status).toBe('ok');
    expect(r.pairs).toEqual([{ key: 'paragraph[0]', en: 'Note.', es: 'Nota.' }]);
  });

  it('reports no-shared-keys when the two sides extract disjoint keys', () => {
    const { cfg, m, target, writeEn, writeEs } = setup();
    writeEn('Alpha.\n');
    writeEs('# Beta\n');
    const r = readFileSegmentResult(cfg, m, 'es', target);
    expect(r.status).toBe('no-shared-keys');
    expect(r.enOnly).toEqual(['paragraph[0]']);
    expect(r.esOnly).toEqual(['heading[0]']);
  });

  it('reports no-translatable-content when neither side extracts anything', () => {
    const { cfg, m, target, writeEn, writeEs } = setup();
    writeEn('```\ncode only\n```\n');
    writeEs('```\ncode only\n```\n');
    expect(readFileSegmentResult(cfg, m, 'es', target).status).toBe('no-translatable-content');
  });

  it('stops when the English source is missing', () => {
    const { cfg, m, target } = setup();
    expect(() => readFileSegmentResult(cfg, m, 'es', target)).toThrow(/missing English MDX/);
  });

  it('stops when the translated overlay is missing', () => {
    const { cfg, m, target, writeEn } = setup();
    writeEn('Note.\n');
    expect(() => readFileSegmentResult(cfg, m, 'es', target)).toThrow(/missing translated overlay/);
  });
});
