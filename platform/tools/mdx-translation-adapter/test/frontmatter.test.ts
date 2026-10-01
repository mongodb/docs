import { describe, it, expect } from 'vitest';
import { parseMdx, stringifyMdx } from '../src/mdast.js';
import {
  extractFrontmatter,
  applyFrontmatter,
  TRANSLATABLE_FRONTMATTER_KEYS,
} from '../src/frontmatter.js';

const SOURCE = `---
fileId: view-metrics.txt
description: Learn how to view replica set metrics.
robots: index
keywords: metrics, s3, add pagerduty
---

# Body
`;

describe('extractFrontmatter', () => {
  it('extracts only allowlisted, non-empty string fields', () => {
    const fields = extractFrontmatter(parseMdx(SOURCE));
    const byKey = Object.fromEntries(fields.map((f) => [f.key, f.value]));
    expect(byKey['frontmatter.description']).toBe('Learn how to view replica set metrics.');
    // non-allowlisted keys never appear
    expect(byKey['frontmatter.fileId']).toBeUndefined();
    expect(byKey['frontmatter.robots']).toBeUndefined();
    expect(byKey['frontmatter.keywords']).toBeUndefined();
  });

  it('returns [] when there is no frontmatter', () => {
    expect(extractFrontmatter(parseMdx('# No frontmatter\n'))).toEqual([]);
  });

  it('only extracts keys that are in the approved list', () => {
    for (const f of extractFrontmatter(parseMdx(SOURCE))) {
      expect(TRANSLATABLE_FRONTMATTER_KEYS).toContain(f.field);
    }
  });
});

describe('applyFrontmatter', () => {
  it('writes translated values back, leaving other fields intact', () => {
    const tree = parseMdx(SOURCE);
    applyFrontmatter(tree, {
      'frontmatter.description': 'Aprenda a ver las métricas del conjunto de réplicas.',
    });
    const out = stringifyMdx(tree);
    expect(out).toContain('description: Aprenda a ver las métricas del conjunto de réplicas.');
    expect(out).toContain('fileId: view-metrics.txt'); // untouched
    expect(out).toContain('robots: index'); // untouched
    expect(out).toContain('keywords: metrics, s3, add pagerduty'); // untouched
  });

  it('ignores null (failed) translations and unknown keys', () => {
    const tree = parseMdx(SOURCE);
    applyFrontmatter(tree, { 'frontmatter.description': null, 'frontmatter.nope': 'x' });
    const out = stringifyMdx(tree);
    expect(out).toContain('description: Learn how to view replica set metrics.'); // unchanged, null skipped
  });

  it('is a no-op when there is no frontmatter', () => {
    const tree = parseMdx('# No frontmatter\n');
    expect(() => applyFrontmatter(tree, { 'frontmatter.description': 'x' })).not.toThrow();
  });
});

const RICH_SOURCE = `---
fileId: view-metrics.txt
description: "Learn how to view metrics."
robots: index
keywords: metrics, s3
---

# Body
`;

describe('applyFrontmatter — no spurious re-serialization', () => {
  it('leaves the raw frontmatter node untouched on an identity translation', () => {
    const tree = parseMdx(RICH_SOURCE);
    const yamlNode = tree.children.find((c) => c.type === 'yaml') as { value: string };
    const before = yamlNode.value;
    const desc = extractFrontmatter(tree).find((f) => f.field === 'description')!.value;
    applyFrontmatter(tree, { 'frontmatter.description': desc }); // same value = identity
    expect(yamlNode.value).toBe(before); // not re-serialized
    // and the whole doc still matches the parse->stringify baseline
    expect(stringifyMdx(tree)).toBe(stringifyMdx(parseMdx(RICH_SOURCE)));
  });

  it('rewrites only when the value actually changes, preserving other fields', () => {
    const tree = parseMdx(RICH_SOURCE);
    applyFrontmatter(tree, { 'frontmatter.description': 'Nueva descripción.' });
    const out = stringifyMdx(tree);
    expect(out).toContain('Nueva descripción.');
    expect(out).toContain('fileId: view-metrics.txt');
    expect(out).toContain('robots: index');
    expect(out).toContain('keywords: metrics, s3');
  });
});
