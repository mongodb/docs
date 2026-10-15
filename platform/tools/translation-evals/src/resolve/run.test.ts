import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../config.js';
import { resolveProject } from './run.js';

function setup() {
  const cfg = loadConfig({});
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-'));
  cfg.dataDir = path.join(root, 'data');
  const projDir = path.join(root, 'content-mdx', 'atlas');
  fs.mkdirSync(path.join(projDir, '_includes'), { recursive: true });
  fs.writeFileSync(path.join(projDir, '_site.json'), JSON.stringify({ composablePages: {} }));
  fs.writeFileSync(path.join(projDir, 'alerts.mdx'), '<Include src="/_includes/a" />');
  fs.writeFileSync(path.join(projDir, 'connect.mdx'), '# Connect');
  fs.writeFileSync(path.join(projDir, '_includes', 'a.mdx'), 'body');
  fs.writeFileSync(path.join(projDir, '_references.json'), JSON.stringify({ substitutions: { svc: 'Atlas' }, refs: {} }));
  cfg.contentMdxDir = path.join(root, 'content-mdx');
  return { cfg, projDir };
}

const PREFIX_MAP = { atlas: 'docs/atlas' };

describe('resolveProject', () => {
  it('produces a manifest with pages and the closure', async () => {
    const { cfg } = setup();
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP });
    expect(manifest.pages.some((p) => p.urlPath === '/docs/atlas/alerts')).toBe(true);
    expect(manifest.translatable.includes).toContain('_includes/a.mdx');
  });

  it('filters the eval set to --pages by urlPath and mdxPath', async () => {
    const { cfg } = setup();
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', {
      dirNameToPrefix: PREFIX_MAP,
      pages: ['/docs/atlas/alerts', 'atlas/connect.mdx'],
    });
    expect(manifest.pages.map((p) => p.urlPath).sort()).toEqual(['/docs/atlas/alerts', '/docs/atlas/connect']);
    expect(manifest.translatable.pages).toEqual(['alerts.mdx', 'connect.mdx']);
  });

  it('throws when a --pages entry matches no enumerated page', async () => {
    const { cfg } = setup();
    await expect(
      resolveProject(cfg, 'atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP, pages: ['/docs/atlas/nope'] }),
    ).rejects.toThrow('matches no enumerated page');
  });

  it('overrides locales from options', async () => {
    const { cfg } = setup();
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', {
      dirNameToPrefix: PREFIX_MAP,
      locales: ['fr'],
    });
    expect(manifest.locales).toEqual(['fr']);
  });

  it('resolves the project root index page to its real mdx file path', async () => {
    const { cfg, projDir } = setup();
    fs.writeFileSync(path.join(projDir, 'index.mdx'), '# Atlas');
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP });
    const root = manifest.pages.find((p) => p.urlPath === '/docs/atlas');
    expect(root?.mdxPath).toBe('atlas/index.mdx');
    expect(manifest.translatable.pages).toContain('index.mdx');
  });

  it('resolves a nested index page to its real mdx file path', async () => {
    const { cfg, projDir } = setup();
    fs.mkdirSync(path.join(projDir, 'foo'), { recursive: true });
    fs.writeFileSync(path.join(projDir, 'foo', 'index.mdx'), '# Foo');
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP });
    const nested = manifest.pages.find((p) => p.urlPath === '/docs/atlas/foo');
    expect(nested?.mdxPath).toBe('atlas/foo/index.mdx');
    expect(manifest.translatable.pages).toContain('foo/index.mdx');
  });

  it('collects includes reached through an index page', async () => {
    const { cfg, projDir } = setup();
    fs.writeFileSync(path.join(projDir, '_includes', 'b.mdx'), 'body b');
    fs.writeFileSync(path.join(projDir, 'index.mdx'), '<Include src="/_includes/b" />');
    const { manifest } = await resolveProject(cfg, 'atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP });
    expect(manifest.translatable.pages).toContain('index.mdx');
    expect(manifest.translatable.includes).toContain('_includes/b.mdx');
  });

  it('resolves a versioned site and derives versioned URLs', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-v-'));
    const cfg = loadConfig({});
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    const site = path.join(cfg.contentMdxDir, 'manual', 'v8.0');
    fs.mkdirSync(site, { recursive: true });
    fs.writeFileSync(path.join(site, '_site.json'), JSON.stringify({ composablePages: {} }));
    fs.writeFileSync(path.join(site, 'about.mdx'), '# About');
    const { manifest } = await resolveProject(cfg, 'manual/v8.0', 'r', { dirNameToPrefix: { manual: 'docs' } });
    expect(manifest.pages[0]!.urlPath).toBe('/docs/v8.0/about');
    expect(manifest.translatable.pages).toEqual(['about.mdx']);
  });

  it('lists versions when a versioned project is passed without one', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-v2-'));
    const cfg = loadConfig({});
    cfg.dataDir = path.join(root, 'data');
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    for (const v of ['v8.0', 'v8.3']) {
      const d = path.join(cfg.contentMdxDir, 'manual', v);
      fs.mkdirSync(d, { recursive: true });
      fs.writeFileSync(path.join(d, '_site.json'), '{}');
    }
    await expect(resolveProject(cfg, 'manual', 'r', { dirNameToPrefix: { manual: 'docs' } })).rejects.toThrow(
      /versioned project.*v8\.0, v8\.3/s,
    );
  });

  it('rejects a --project path that escapes content-mdx/', async () => {
    const { cfg } = setup();
    await expect(resolveProject(cfg, '../atlas', 'test-run', { dirNameToPrefix: PREFIX_MAP })).rejects.toThrow(
      /escapes content-mdx/,
    );
  });
});
