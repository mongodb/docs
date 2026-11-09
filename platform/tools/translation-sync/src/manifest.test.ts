// src/manifest.test.ts
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { emptyManifest, readManifest, sha256File, writeManifest } from './manifest.js';

function tmp(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'translation-sync-'));
}

describe('manifest', () => {
  it('returns the fallback when the file is absent', () => {
    const fallback = emptyManifest('es', '10gen/docs-mdx-en-us', null);
    expect(readManifest(path.join(tmp(), 'missing.json'), fallback)).toEqual(fallback);
  });

  it('round-trips a manifest', () => {
    const dir = tmp();
    const file = path.join(dir, 'translation-manifest.json');
    const manifest = emptyManifest('es', '10gen/docs-mdx-en-us', 'deadbeef');
    manifest.files['content-mdx/voyageai/index.mdx'] = {
      sourceSha256: 'sha',
      translatedAt: '2026-11-03T00:00:00Z',
      provider: 'openai',
      model: 'gpt-5.5',
    };
    writeManifest(file, manifest);
    expect(readManifest(file, emptyManifest('es', 'x', null))).toEqual(manifest);
  });

  it('hashes file contents deterministically', () => {
    const dir = tmp();
    const file = path.join(dir, 'a.txt');
    fs.writeFileSync(file, 'hello');
    const helloHash = sha256File(file);
    expect(sha256File(file)).toBe(helloHash);
    fs.writeFileSync(file, 'world');
    expect(sha256File(file)).not.toBe(helloHash);
  });
});
