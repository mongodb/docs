import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  buildUrl,
  computePagePath,
  getUrlSlugForDir,
  loadDirNameToPrefixMap,
  stripDocsPrefix,
  toMarkdownUrl,
} from '../src/urlResolver';

describe('stripDocsPrefix', () => {
  it('strips a leading "docs" segment', () => {
    expect(stripDocsPrefix('docs/atlas/cli')).toBe('atlas/cli');
  });

  it('collapses a bare "docs" prefix to an empty string', () => {
    expect(stripDocsPrefix('docs')).toBe('');
  });

  it('leaves prefixes without a "docs" segment unchanged', () => {
    expect(stripDocsPrefix('atlas/cli')).toBe('atlas/cli');
  });
});

describe('getUrlSlugForDir', () => {
  const dirNameToPrefix = {
    'atlas-cli': 'docs/atlas/cli',
    manual: 'docs',
    landing: 'docs',
  };

  it('maps known content directories to their stripped URL slug', () => {
    expect(getUrlSlugForDir(dirNameToPrefix, 'atlas-cli')).toBe('atlas/cli');
  });

  it('returns an empty slug for directories served at the docs root', () => {
    expect(getUrlSlugForDir(dirNameToPrefix, 'manual')).toBe('');
    expect(getUrlSlugForDir(dirNameToPrefix, 'landing')).toBe('');
  });

  it('returns undefined for directories with no known prefix', () => {
    expect(getUrlSlugForDir(dirNameToPrefix, 'standby-clusters')).toBeUndefined();
  });
});

describe('loadDirNameToPrefixMap', () => {
  let monorepoPath: string;

  beforeEach(async () => {
    monorepoPath = await fs.mkdtemp(path.join(os.tmpdir(), 'generate-llms-dirmap-'));
  });

  afterEach(async () => {
    await fs.rm(monorepoPath, { recursive: true, force: true });
  });

  it('reads and parses the generated dir-name-to-prefix.json', async () => {
    const mapPath = path.join(monorepoPath, 'platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json');
    await fs.mkdir(path.dirname(mapPath), { recursive: true });
    await fs.writeFile(mapPath, JSON.stringify({ atlas: 'docs/atlas' }), 'utf-8');

    const map = await loadDirNameToPrefixMap(monorepoPath);
    expect(map).toEqual({ atlas: 'docs/atlas' });
  });

  it('throws an actionable error when the file has not been generated yet', async () => {
    await expect(loadDirNameToPrefixMap(monorepoPath)).rejects.toThrow(/build:prefix-map/);
  });
});

describe('buildUrl', () => {
  it('builds a versioned project URL', () => {
    expect(buildUrl('https://www.mongodb.com/docs', 'atlas/cli', 'current', 'quickstart')).toBe(
      'https://www.mongodb.com/docs/atlas/cli/current/quickstart/',
    );
  });

  it('builds the Manual URL (empty slug, version doubles as the URL segment)', () => {
    expect(buildUrl('https://www.mongodb.com/docs', '', 'manual', 'core/document')).toBe(
      'https://www.mongodb.com/docs/manual/core/document/',
    );
  });

  it('builds a non-versioned project root URL', () => {
    expect(buildUrl('https://www.mongodb.com/docs', 'atlas', '', '')).toBe('https://www.mongodb.com/docs/atlas/');
  });

  it('trims a trailing slash on the base URL', () => {
    expect(buildUrl('https://www.mongodb.com/docs/', 'atlas', '', '')).toBe('https://www.mongodb.com/docs/atlas/');
  });
});

// Ported from audit-cli's commands/generate/llms/generator_test.go (TestToMarkdownURL)
describe('toMarkdownUrl', () => {
  it('converts a regular page to its .md form', () => {
    expect(toMarkdownUrl('https://www.mongodb.com/docs/manual/core/document/', false)).toBe(
      'https://www.mongodb.com/docs/manual/core/document.md',
    );
  });

  it('converts a nested section index to its .md form', () => {
    expect(toMarkdownUrl('https://www.mongodb.com/docs/manual/crud/', false)).toBe(
      'https://www.mongodb.com/docs/manual/crud.md',
    );
  });

  it('converts a root landing page to its /index.md form', () => {
    expect(toMarkdownUrl('https://www.mongodb.com/docs/manual/', true)).toBe(
      'https://www.mongodb.com/docs/manual/index.md',
    );
  });

  it('converts a versioned root landing page to its /index.md form', () => {
    expect(toMarkdownUrl('https://www.mongodb.com/docs/atlas/cli/current/', true)).toBe(
      'https://www.mongodb.com/docs/atlas/cli/current/index.md',
    );
  });
});

describe('computePagePath', () => {
  const sourceDir = '/repo/content/atlas/source';

  it('strips the source dir prefix and .txt extension', () => {
    expect(computePagePath(sourceDir, '/repo/content/atlas/source/tutorial/install.txt')).toBe('tutorial/install');
  });

  it('collapses the project root index to an empty path', () => {
    expect(computePagePath(sourceDir, '/repo/content/atlas/source/index.txt')).toBe('');
  });

  it('does not collapse a nested index page', () => {
    expect(computePagePath(sourceDir, '/repo/content/atlas/source/core/index.txt')).toBe('core/index');
  });
});
