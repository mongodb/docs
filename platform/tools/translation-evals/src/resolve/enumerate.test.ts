import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { enumeratePages } from './enumerate.js';

function fixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'enum-'));
  const proj = path.join(root, 'atlas');
  fs.mkdirSync(path.join(proj, 'v1'), { recursive: true });
  fs.mkdirSync(path.join(proj, 'v1', '_includes'), { recursive: true });
  fs.writeFileSync(path.join(proj, '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'index.mdx'), '# Home');
  fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# Alerts');
  fs.writeFileSync(path.join(proj, 'v1', '_site.json'), '{}');
  fs.writeFileSync(path.join(proj, 'v1', 'connect.mdx'), '# Connect');
  fs.writeFileSync(path.join(proj, 'v1', '_includes', 'x.mdx'), 'nope');
  return proj;
}

describe('enumeratePages', () => {
  it('lists pages, skips _includes, and pops trailing index', async () => {
    const paths = await enumeratePages(fixture());
    const joined = paths.map((p) => p.join('/')).sort();
    expect(joined).toEqual(['atlas', 'atlas/alerts', 'atlas/v1/connect']);
  });
});
