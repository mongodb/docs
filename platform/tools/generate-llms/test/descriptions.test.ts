import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadDescriptions, resolveDescription, PLACEHOLDER_DESCRIPTION } from '../src/descriptions';

describe('resolveDescription', () => {
  it('returns the placeholder when the project has no entry', () => {
    expect(resolveDescription('unknown-project', 0, {})).toBe(PLACEHOLDER_DESCRIPTION);
  });

  it('applies a plain string to every part', () => {
    const descriptions = { atlas: 'A single description.' };
    expect(resolveDescription('atlas', 0, descriptions)).toBe('A single description.');
    expect(resolveDescription('atlas', 4, descriptions)).toBe('A single description.');
  });

  it('resolves an array entry by part index', () => {
    const descriptions = { manual: ['Part one.', 'Part two.', 'Part three.'] };
    expect(resolveDescription('manual', 0, descriptions)).toBe('Part one.');
    expect(resolveDescription('manual', 1, descriptions)).toBe('Part two.');
    expect(resolveDescription('manual', 2, descriptions)).toBe('Part three.');
  });

  it('reuses a single-entry array across every part', () => {
    const descriptions = { manual: ['Only one description.'] };
    expect(resolveDescription('manual', 0, descriptions)).toBe('Only one description.');
    expect(resolveDescription('manual', 3, descriptions)).toBe('Only one description.');
  });

  it('falls back to the placeholder for a part index beyond the array', () => {
    const descriptions = { manual: ['Part one.', 'Part two.'] };
    expect(resolveDescription('manual', 2, descriptions)).toBe(PLACEHOLDER_DESCRIPTION);
  });

  it('falls back to the placeholder for an empty array', () => {
    expect(resolveDescription('manual', 0, { manual: [] })).toBe(PLACEHOLDER_DESCRIPTION);
  });
});

describe('loadDescriptions', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-descriptions-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('parses a JSON descriptions file', async () => {
    const descriptionsPath = path.join(tmpDir, 'llms-descriptions.json');
    await fs.writeFile(descriptionsPath, JSON.stringify({ atlas: 'Atlas description.', manual: ['One', 'Two'] }));

    const descriptions = await loadDescriptions(descriptionsPath);
    expect(descriptions).toEqual({ atlas: 'Atlas description.', manual: ['One', 'Two'] });
  });

  it('returns an empty map when the file does not exist', async () => {
    const descriptions = await loadDescriptions(path.join(tmpDir, 'does-not-exist.json'));
    expect(descriptions).toEqual({});
  });
});
