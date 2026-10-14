import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadConfig } from '../config.js';
import { materialize } from './materialize.js';

describe('materialize', () => {
  it('overlays translated pages/includes/references onto the English base', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mat-'));
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    cfg.dataDir = path.join(root, 'data');
    const proj = path.join(cfg.contentMdxDir, 'atlas');
    fs.mkdirSync(path.join(proj, '_includes'), { recursive: true });
    fs.writeFileSync(path.join(proj, 'alerts.mdx'), '# ENGLISH');
    fs.writeFileSync(path.join(proj, '_includes', 'a.mdx'), 'EN-INC');
    fs.writeFileSync(path.join(proj, '_references.json'), '{"substitutions":{},"refs":{}}');
    const trDir = path.join(cfg.dataDir, 'atlas', 'r', 'translated', 'es');
    fs.mkdirSync(trDir, { recursive: true });
    fs.mkdirSync(path.join(trDir, '_includes'), { recursive: true });
    fs.writeFileSync(path.join(trDir, 'alerts.mdx'), '# SPANISH');
    fs.writeFileSync(path.join(trDir, '_includes', 'a.mdx'), 'ES-INC');
    fs.writeFileSync(path.join(trDir, '_references.json'), '{"substitutions":{"x":"y"},"refs":{}}');
    materialize(cfg, 'atlas', 'r', 'es');
    expect(fs.readFileSync(path.join(proj, 'alerts.mdx'), 'utf8')).toBe('# SPANISH');
    expect(fs.readFileSync(path.join(proj, '_includes', 'a.mdx'), 'utf8')).toBe('ES-INC');
    expect(fs.readFileSync(path.join(proj, '_references.json'), 'utf8')).toContain('"x":"y"');
  });

  it('throws when no translated overlay exists for the locale', () => {
    const cfg = loadConfig({});
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mat-'));
    cfg.contentMdxDir = path.join(root, 'content-mdx');
    cfg.dataDir = path.join(root, 'data');
    expect(() => materialize(cfg, 'atlas', 'r', 'es')).toThrow('es');
  });
});
