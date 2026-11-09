import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { emptyManifest, sha256File } from './manifest.js';
import { isTranslatable, planSync } from './detect.js';

function fixture(): { sourceRoot: string; targetRoot: string } {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-'));
  const sourceRoot = path.join(base, 'source');
  const targetRoot = path.join(base, 'target');
  const write = (root: string, rel: string, body: string) => {
    const p = path.join(root, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, body);
  };
  write(sourceRoot, 'content-mdx/voyageai/index.mdx', '# Hello');
  write(sourceRoot, 'content-mdx/voyageai/_references.json', '{"substitutions":{},"refs":{}}');
  write(sourceRoot, 'content-mdx/voyageai/_site.json', '{}');
  write(sourceRoot, 'content-mdx/voyageai/images/a.png', 'PNG');
  write(sourceRoot, 'content-mdx/other/index.mdx', '# Other');
  write(targetRoot, 'content-mdx/voyageai/index.mdx', '# Hola');
  write(targetRoot, 'content-mdx/voyageai/gone.mdx', '# Gone');
  return { sourceRoot, targetRoot };
}

describe('isTranslatable', () => {
  it('treats mdx and _references.json as translatable', () => {
    expect(isTranslatable('content-mdx/voyageai/index.mdx')).toBe(true);
    expect(isTranslatable('content-mdx/voyageai/_includes/x.mdx')).toBe(true);
    expect(isTranslatable('content-mdx/voyageai/_references.json')).toBe(true);
    expect(isTranslatable('content-mdx/voyageai/_site.json')).toBe(false);
    expect(isTranslatable('content-mdx/voyageai/images/a.png')).toBe(false);
  });
});

describe('planSync', () => {
  it('translates new/changed text, copies assets, removes orphans, limits to scope', () => {
    const { sourceRoot, targetRoot } = fixture();
    const plan = planSync({
      sourceRoot,
      targetRoot,
      manifest: emptyManifest('es', 'src', null),
      scope: 'voyageai',
      mode: 'incremental',
    });
    expect(plan.translate.sort()).toEqual([
      'content-mdx/voyageai/_references.json',
      'content-mdx/voyageai/index.mdx',
    ]);
    expect(plan.copy).toEqual([
      'content-mdx/voyageai/_site.json',
      'content-mdx/voyageai/images/a.png',
    ]);
    expect(plan.remove).toEqual(['content-mdx/voyageai/gone.mdx']);
    expect(plan.unchanged).toEqual([]);
  });

  it('skips unchanged text in incremental mode and re-plans all in full mode', () => {
    const { sourceRoot, targetRoot } = fixture();
    const manifest = emptyManifest('es', 'src', null);
    manifest.files['content-mdx/voyageai/index.mdx'] = {
      sourceSha256: sha256File(path.join(sourceRoot, 'content-mdx/voyageai/index.mdx')),
      translatedAt: '2026-11-03T00:00:00Z',
      provider: 'openai',
      model: 'gpt-5.5',
    };
    const incremental = planSync({ sourceRoot, targetRoot, manifest, scope: 'voyageai', mode: 'incremental' });
    expect(incremental.unchanged).toEqual(['content-mdx/voyageai/index.mdx']);
    expect(incremental.translate).toEqual(['content-mdx/voyageai/_references.json']);

    const full = planSync({ sourceRoot, targetRoot, manifest, scope: 'voyageai', mode: 'full' });
    expect(full.translate.sort()).toEqual([
      'content-mdx/voyageai/_references.json',
      'content-mdx/voyageai/index.mdx',
    ]);
    expect(full.unchanged).toEqual([]);
  });

  it('fails instead of planning removals when the source base is missing', () => {
    const { sourceRoot, targetRoot } = fixture();
    fs.rmSync(path.join(sourceRoot, 'content-mdx'), { recursive: true });
    const manifest = emptyManifest('es', 'src', null);
    expect(() =>
      planSync({ sourceRoot, targetRoot, manifest, scope: null, mode: 'incremental' }),
    ).toThrow(/Source path does not exist/);
    expect(() =>
      planSync({ sourceRoot, targetRoot, manifest, scope: 'voyageai', mode: 'incremental' }),
    ).toThrow(/Source path does not exist/);
  });
});
