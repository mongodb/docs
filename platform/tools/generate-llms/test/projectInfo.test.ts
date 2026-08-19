import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { currentSourceDir, discoverAllVersions, isCurrentVersion, isVersionDirectory } from '../src/projectInfo';

describe('isVersionDirectory', () => {
  it('recognizes known version directory names', () => {
    expect(isVersionDirectory('current')).toBe(true);
    expect(isVersionDirectory('manual')).toBe(true);
    expect(isVersionDirectory('upcoming')).toBe(true);
    expect(isVersionDirectory('v8.0')).toBe(true);
    expect(isVersionDirectory('v1.56')).toBe(true);
  });

  it('rejects other directory names', () => {
    expect(isVersionDirectory('source')).toBe(false);
    expect(isVersionDirectory('includes')).toBe(false);
    expect(isVersionDirectory('random')).toBe(false);
  });
});

describe('isCurrentVersion', () => {
  it('treats "current" and "manual" as current', () => {
    expect(isCurrentVersion('current')).toBe(true);
    expect(isCurrentVersion('manual')).toBe(true);
  });

  it('treats other version directories as not current', () => {
    expect(isCurrentVersion('upcoming')).toBe(false);
    expect(isCurrentVersion('v8.0')).toBe(false);
  });
});

describe('discoverAllVersions and currentSourceDir', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'generate-llms-projectinfo-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('finds a non-versioned project source directory', async () => {
    const projectDir = path.join(tmpDir, 'atlas');
    await fs.mkdir(path.join(projectDir, 'source'), { recursive: true });

    const result = await currentSourceDir(projectDir);
    expect(result).toEqual({ sourceDir: path.join(projectDir, 'source'), version: '' });
  });

  it('finds the current version among several version directories', async () => {
    const projectDir = path.join(tmpDir, 'atlas-cli');
    for (const version of ['v1.54', 'v1.55', 'upcoming', 'current']) {
      await fs.mkdir(path.join(projectDir, version, 'source'), { recursive: true });
    }

    const versions = await discoverAllVersions(projectDir);
    expect(versions.sort()).toEqual(['current', 'upcoming', 'v1.54', 'v1.55'].sort());

    const result = await currentSourceDir(projectDir);
    expect(result).toEqual({ sourceDir: path.join(projectDir, 'current', 'source'), version: 'current' });
  });

  it('treats "manual" as the Manual project\'s current version', async () => {
    const projectDir = path.join(tmpDir, 'manual');
    for (const version of ['v8.0', 'upcoming', 'manual']) {
      await fs.mkdir(path.join(projectDir, version, 'source'), { recursive: true });
    }

    const result = await currentSourceDir(projectDir);
    expect(result).toEqual({ sourceDir: path.join(projectDir, 'manual', 'source'), version: 'manual' });
  });

  it('returns null when there is no resolvable current source directory', async () => {
    const projectDir = path.join(tmpDir, 'shared');
    await fs.mkdir(projectDir, { recursive: true });

    const result = await currentSourceDir(projectDir);
    expect(result).toBeNull();
  });

  it('returns null when only non-current versions exist', async () => {
    const projectDir = path.join(tmpDir, 'oldstuff');
    await fs.mkdir(path.join(projectDir, 'upcoming', 'source'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'v1.0', 'source'), { recursive: true });

    const result = await currentSourceDir(projectDir);
    expect(result).toBeNull();
  });

  it('prefers a real current-version source dir over a legacy top-level source/ (php-library case)', async () => {
    const projectDir = path.join(tmpDir, 'php-library');
    // Legacy shared-facets directory that happens to be named "source" but
    // isn't a non-versioned project root.
    await fs.mkdir(path.join(projectDir, 'source', 'tutorial'), { recursive: true });
    await fs.writeFile(path.join(projectDir, 'source', 'tutorial', 'facets.toml'), '');
    await fs.mkdir(path.join(projectDir, 'current', 'source'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'upcoming', 'source'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'v1.x', 'source'), { recursive: true });

    const result = await currentSourceDir(projectDir);
    expect(result).toEqual({ sourceDir: path.join(projectDir, 'current', 'source'), version: 'current' });
  });
});
