import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import type { TranslateFn } from 'translation-mdx-adapter';
import { BackendName } from '@mongodb-docs/translation-service';
import * as batch from './batch.js';
import { runSync } from './sync.js';
import { emptyManifest, readManifest, writeManifest } from './manifest.js';

vi.mock('./batch.js', async () => {
  const actual = await vi.importActual<typeof batch>('./batch.js');
  return { ...actual, translateMdxFile: vi.fn(actual.translateMdxFile) };
});

function fixture(): { sourceRoot: string; targetRoot: string } {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-'));
  const sourceRoot = path.join(base, 'source');
  const targetRoot = path.join(base, 'target');
  const write = (root: string, rel: string, body: string) => {
    const p = path.join(root, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, body);
  };
  write(sourceRoot, 'content-mdx/voyageai/index.mdx', '# Hello');
  write(sourceRoot, 'content-mdx/voyageai/_references.json', '{"substitutions":{"service":"Atlas"},"refs":{}}');
  write(sourceRoot, 'content-mdx/voyageai/_site.json', '{"branch":"main"}');
  write(sourceRoot, 'content-mdx/voyageai/images/a.png', 'PNG');
  write(targetRoot, 'content-mdx/voyageai/gone.mdx', '# Gone');
  return { sourceRoot, targetRoot };
}

const opts = (f: ReturnType<typeof fixture>) => ({
  sourceRoot: f.sourceRoot,
  targetRoot: f.targetRoot,
  locale: 'es',
  scope: 'voyageai',
  mode: 'incremental' as const,
  backend: BackendName.Stub,
  sourceRepository: '10gen/docs-mdx-en-us',
  sourceCommit: 'deadbeef',
  dryRun: false,
});

const esFn: TranslateFn = async (payload) =>
  Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, `es:${v}`]));

describe('runSync', () => {
  it('translates text, copies assets, removes orphans, and writes a manifest', async () => {
    const f = fixture();
    const summary = await runSync(opts(f), { translateFn: esFn });
    expect(summary.translated.sort()).toEqual([
      'content-mdx/voyageai/_references.json',
      'content-mdx/voyageai/index.mdx',
    ]);
    expect(summary.copied).toEqual(['content-mdx/voyageai/_site.json', 'content-mdx/voyageai/images/a.png']);
    expect(summary.removed).toEqual(['content-mdx/voyageai/gone.mdx']);
    expect(summary.failures).toEqual([]);

    expect(fs.readFileSync(path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx'), 'utf8')).toContain('es:Hello');
    expect(fs.existsSync(path.join(f.targetRoot, 'content-mdx/voyageai/gone.mdx'))).toBe(false);
    expect(fs.readFileSync(path.join(f.targetRoot, 'content-mdx/voyageai/_site.json'), 'utf8')).toBe('{"branch":"main"}');

    const manifest = readManifest(
      path.join(f.targetRoot, 'translation-manifest.json'),
      emptyManifest('es', 'x', null),
    );
    expect(Object.keys(manifest.files).sort()).toEqual([
      'content-mdx/voyageai/_references.json',
      'content-mdx/voyageai/index.mdx',
    ]);
    expect(manifest.sourceCommit).toBe('deadbeef');
  });

  it('isolates a failing file and keeps its previous translation', async () => {
    const f = fixture();
    fs.writeFileSync(path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx'), '# Hola previa');
    const failing: TranslateFn = async () => {
      throw new Error('backend down');
    };
    const summary = await runSync(opts(f), { translateFn: failing });
    expect(summary.failures.map((x) => x.file)).toEqual([
      'content-mdx/voyageai/_references.json',
      'content-mdx/voyageai/index.mdx',
    ]);
    expect(fs.readFileSync(path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx'), 'utf8')).toBe('# Hola previa');
  });

  it('writes nothing on a dry run', async () => {
    const f = fixture();
    await runSync({ ...opts(f), dryRun: true }, { translateFn: esFn });
    expect(fs.existsSync(path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx'))).toBe(false);
    expect(fs.existsSync(path.join(f.targetRoot, 'translation-manifest.json'))).toBe(false);
  });

  it('re-translates a file whose target copy is missing even when its hash matches', async () => {
    const f = fixture();
    await runSync(opts(f), { translateFn: esFn });
    const targetIndex = path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx');
    fs.rmSync(targetIndex);
    const summary = await runSync(opts(f), { translateFn: esFn });
    expect(summary.translated).toContain('content-mdx/voyageai/index.mdx');
    expect(fs.readFileSync(targetIndex, 'utf8')).toContain('es:Hello');
  });

  it("keeps a failed file's previous manifest entry so it retries next run", async () => {
    const f = fixture();
    await runSync(opts(f), { translateFn: esFn });
    const manifestPath = path.join(f.targetRoot, 'translation-manifest.json');
    const before = readManifest(manifestPath, emptyManifest('es', 'x', null)).files[
      'content-mdx/voyageai/index.mdx'
    ];
    expect(before).toBeDefined();

    fs.writeFileSync(path.join(f.sourceRoot, 'content-mdx/voyageai/index.mdx'), '# Hello again');
    const failing: TranslateFn = async () => {
      throw new Error('backend down');
    };
    const second = await runSync(opts(f), { translateFn: failing });
    expect(second.failures.map((x) => x.file)).toContain('content-mdx/voyageai/index.mdx');

    const after = readManifest(manifestPath, emptyManifest('es', 'x', null)).files[
      'content-mdx/voyageai/index.mdx'
    ];
    expect(after).toEqual(before);
  });

  it('preserves manifest entries outside the synced scope', async () => {
    const f = fixture();
    await runSync(opts(f), { translateFn: esFn });
    const manifestPath = path.join(f.targetRoot, 'translation-manifest.json');
    const seeded = readManifest(manifestPath, emptyManifest('es', 'x', null));
    seeded.files['content-mdx/atlas/index.mdx'] = {
      sourceSha256: 'other',
      translatedAt: '2026-01-01T00:00:00Z',
      provider: 'openai',
      model: 'gpt-5.5',
    };
    writeManifest(manifestPath, seeded);

    fs.writeFileSync(path.join(f.sourceRoot, 'content-mdx/voyageai/index.mdx'), '# Changed');
    await runSync(opts(f), { translateFn: esFn });

    const after = readManifest(manifestPath, emptyManifest('es', 'x', null));
    expect(after.files['content-mdx/atlas/index.mdx']).toBeDefined();
  });

  it('does not call translateMdxFile when a translateFn is injected', async () => {
    const f = fixture();
    await runSync(opts(f), { translateFn: esFn });
    expect(vi.mocked(batch.translateMdxFile)).not.toHaveBeenCalled();
  });

  it('uses translateMdxFile with the selected backend when no translateFn is injected', async () => {
    const f = fixture();
    const summary = await runSync(opts(f));
    expect(vi.mocked(batch.translateMdxFile)).toHaveBeenCalled();
    expect(summary.failures).toEqual([]);
    expect(fs.readFileSync(path.join(f.targetRoot, 'content-mdx/voyageai/index.mdx'), 'utf8')).toContain('[es]');
  });
});
