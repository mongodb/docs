import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  snapshotPristine,
  restorePristine,
  pristineDir,
  pristineProjectDir,
  hasPristine,
} from './isolation.js';
import type { Config } from '../config.js';

function tempConfig(): Config {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'suite-iso-'));
  const cfg = {
    contentMdxDir: path.join(root, 'content-mdx'),
    dataDir: path.join(root, 'data'),
  } as Config;
  fs.mkdirSync(cfg.contentMdxDir, { recursive: true });
  return cfg;
}

describe('isolation', () => {
  it('restores the project tree to its pristine contents', () => {
    const cfg = tempConfig();
    const projectDir = path.join(cfg.contentMdxDir, 'atlas');
    fs.mkdirSync(path.join(projectDir, 'sub'), { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'a.mdx'), 'english');
    fs.writeFileSync(path.join(projectDir, 'sub', 'b.mdx'), 'english');
    snapshotPristine(cfg, 'atlas', 'batch');

    fs.writeFileSync(path.join(projectDir, 'a.mdx'), 'spanish');
    fs.rmSync(path.join(projectDir, 'sub'), { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'new.mdx'), 'extra');
    restorePristine(cfg, 'atlas', 'batch');

    expect(fs.readFileSync(path.join(projectDir, 'a.mdx'), 'utf8')).toBe('english');
    expect(fs.existsSync(path.join(projectDir, 'sub', 'b.mdx'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'new.mdx'))).toBe(false);
  });

  it('handles a nested project path', () => {
    const cfg = tempConfig();
    const projectDir = path.join(cfg.contentMdxDir, 'manual', 'manual');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'index.mdx'), 'english');
    snapshotPristine(cfg, 'manual/manual', 'batch');
    fs.writeFileSync(path.join(projectDir, 'index.mdx'), 'french');
    restorePristine(cfg, 'manual/manual', 'batch');
    expect(fs.readFileSync(path.join(projectDir, 'index.mdx'), 'utf8')).toBe('english');
    expect(pristineDir(cfg, 'manual/manual', 'batch')).toContain(path.join('manual', 'manual'));
  });

  it('snapshots through a temp dir so a leftover partial copy is never trusted', () => {
    const cfg = tempConfig();
    const projectDir = path.join(cfg.contentMdxDir, 'atlas');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'a.mdx'), 'english');
    const target = pristineProjectDir(cfg, 'atlas', 'batch');
    fs.mkdirSync(`${target}.tmp`, { recursive: true });
    fs.writeFileSync(path.join(`${target}.tmp`, 'partial.mdx'), 'partial');
    expect(hasPristine(cfg, 'atlas', 'batch')).toBe(false);

    snapshotPristine(cfg, 'atlas', 'batch');

    expect(hasPristine(cfg, 'atlas', 'batch')).toBe(true);
    expect(fs.existsSync(`${target}.tmp`)).toBe(false);
    expect(fs.readdirSync(target)).toEqual(['a.mdx']);
  });
});
