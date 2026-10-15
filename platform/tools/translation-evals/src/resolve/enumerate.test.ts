import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { enumeratePages } from './enumerate.js';

function fixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'enum-'));
  const proj = path.join(root, 'atlas');
  fs.mkdirSync(path.join(proj, 'v1', '_includes'), { recursive: true });
  fs.writeFileSync(path.join(proj, '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'index.mdx'), '# Home');
  fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# Alerts');
  fs.writeFileSync(path.join(proj, 'v1', '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'v1', 'connect.mdx'), '# Connect');
  fs.writeFileSync(path.join(proj, 'v1', '_includes', 'x.mdx'), 'nope');
  return root;
}

describe('enumeratePages', () => {
  it('lists pages, skips _includes, and pops trailing index', async () => {
    const root = fixture();
    const paths = await enumeratePages(path.join(root, 'atlas'), root);
    expect(paths.map((p) => p.join('/')).sort()).toEqual(['atlas', 'atlas/alerts', 'atlas/v1/connect']);
  });

  it('keeps the version segment for a versioned site', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'enum-v-'));
    const site = path.join(root, 'manual', 'v8.0');
    fs.mkdirSync(site, { recursive: true });
    fs.writeFileSync(path.join(site, '_site.json'), '{}');
    fs.writeFileSync(path.join(site, 'about.mdx'), '# About');
    const paths = await enumeratePages(site, root);
    expect(paths.map((p) => p.join('/'))).toEqual(['manual/v8.0/about']);
  });
});
