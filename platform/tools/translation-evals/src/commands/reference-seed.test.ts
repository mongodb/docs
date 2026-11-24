import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { referenceSeed } from './index.js';
import type { Config } from '../config.js';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-seed-'));
  const cfg = { dataDir: path.join(root, 'data') } as Config;
  const source = path.join(cfg.dataDir, 'atlas', 'base-run');
  fs.mkdirSync(path.join(source, 'prod', 'en'), { recursive: true });
  fs.writeFileSync(path.join(source, 'prod', 'en', 'index.json'), '{"content":"English"}');
  fs.writeFileSync(
    path.join(source, 'manifest.json'),
    JSON.stringify({
      project: 'atlas',
      runId: 'base-run',
      locales: ['es'],
      pages: [],
      translatable: { pages: [], includes: [], substitutions: [] },
      stages: {},
    }),
  );
  return { cfg, source };
}

describe('referenceSeed', () => {
  it.each([
    [{}, '--project'],
    [{ project: 'atlas' }, '--from'],
    [{ project: 'atlas', from: 'base-run' }, '--run'],
  ])('requires %j', (flags, flag) => {
    const { cfg } = fixture();
    expect(() => referenceSeed(flags, cfg)).toThrow(String(flag));
  });

  it.each(['project', 'from', 'run'])('rejects a valueless --%s flag', (flag) => {
    const { cfg } = fixture();
    const flags = { project: 'atlas', from: 'base-run', run: 'target', [flag]: true };
    expect(() => referenceSeed(flags, cfg)).toThrow(`--${flag} must be a string`);
  });

  it('refuses to overwrite an existing target run', () => {
    const { cfg } = fixture();
    const target = path.join(cfg.dataDir, 'atlas', 'existing');
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, 'keep.txt'), 'keep');

    expect(() => referenceSeed({ project: 'atlas', from: 'base-run', run: 'existing' }, cfg)).toThrow(
      /already exists/,
    );
    expect(fs.readFileSync(path.join(target, 'keep.txt'), 'utf8')).toBe('keep');
  });

  it('creates the developer-chosen baseline run from the source capture', () => {
    const { cfg } = fixture();

    referenceSeed({ project: 'atlas', from: 'base-run', run: 'my-baseline' }, cfg);

    const target = path.join(cfg.dataDir, 'atlas', 'my-baseline');
    const manifest = JSON.parse(fs.readFileSync(path.join(target, 'manifest.json'), 'utf8'));
    expect(manifest.runId).toBe('my-baseline');
    expect(fs.readFileSync(path.join(target, 'prod', 'en', 'index.json'), 'utf8')).toBe(
      '{"content":"English"}',
    );
  });
});
