import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  buildAllContentData,
  findContentPaths,
  findOwningContentPath,
  readProjectName,
} from '../src/content-metadata.js';
import { docset, version } from './fixtures.js';

const docsetsByProject = {
  docs: docset('docs', [version('manual'), version('v7.0', false)]),
  intellij: docset('intellij', [version('main')]),
};

describe('content metadata', () => {
  let contentDir: string;

  const writeToml = (contentPath: string, name: string) => {
    const dir = path.join(contentDir, contentPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'snooty.toml'), `name = "${name}"\n`);
  };

  beforeEach(() => {
    contentDir = fs.mkdtempSync(path.join(os.tmpdir(), 'content-'));
    writeToml('manual/manual', 'docs');
    writeToml('manual/v7.0', 'docs');
    writeToml('mongodb-intellij', 'intellij');
  });

  afterEach(() => {
    fs.rmSync(contentDir, { recursive: true, force: true });
  });

  it('finds unversioned and versioned content paths', () => {
    expect(findContentPaths(contentDir)).toEqual([
      'manual/manual',
      'manual/v7.0',
      'mongodb-intellij',
    ]);
  });

  it('reads the project name from snooty.toml, not the directory', () => {
    expect(readProjectName(contentDir, 'mongodb-intellij')).toBe('intellij');
  });

  it('throws when a content path has no registered docset', () => {
    writeToml('mystery', 'mystery');

    expect(() =>
      buildAllContentData({ contentDir, docsetsByProject, gitChangedFiles: [] }),
    ).toThrow(/No docset registered for project "mystery"/);
  });

  it('prefers the deepest content path that owns a file', () => {
    expect(
      findOwningContentPath('content/manual/manual/source/a.txt', ['manual', 'manual/manual']),
    ).toBe('manual/manual');
    expect(findOwningContentPath('platform/a.ts', ['manual'])).toBeUndefined();
  });

  it('derives project, version and active state, and queues changed active paths', () => {
    const data = buildAllContentData({
      contentDir,
      docsetsByProject,
      gitChangedFiles: [
        'content/manual/manual/source/a.txt',
        'content/manual/v7.0/source/b.txt',
        'content/mongodb-intellij/source/c.txt',
        'platform/unrelated.ts',
      ],
    });

    expect(data.docsPaths['manual/manual']).toMatchObject({
      projectName: 'docs',
      projectDirName: 'manual',
      versionName: 'manual',
      active: true,
      changed: true,
    });
    expect(data.docsPaths['manual/v7.0']).toMatchObject({ active: false, changed: true });
    expect(data.docsPaths['mongodb-intellij']).toMatchObject({
      projectName: 'intellij',
      versionName: '',
      active: true,
    });
    expect(data.pathsToBuild.sort()).toEqual(['manual/manual', 'mongodb-intellij']);
  });
});
