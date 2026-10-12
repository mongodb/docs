import { describe, it, expect } from 'vitest';
import { buildIncludeGraph, computeClosure } from './closure.js';

const FILES: Record<string, string> = {
  'alerts.mdx': '<Include src="/_includes/a"><Replacement name="svc">Atlas</Replacement></Include>\n<Reference refKey="ui-org-menu" type="substitution" />',
  '_includes/a.mdx': 'text <Include src="/_includes/b" />',
  '_includes/b.mdx': 'deep <Reference refKey="service" type="substitution" />',
  '_includes/unused.mdx': 'never referenced',
};

describe('computeClosure', () => {
  it('collects transitive includes once and only referenced substitutions', () => {
    const graph = buildIncludeGraph('', Object.keys(FILES), (f) => FILES[f]!);
    const set = computeClosure(['alerts.mdx'], graph, { 'alerts.mdx': ['ui-org-menu'], '_includes/b.mdx': ['service'] }, new Set(['ui-org-menu', 'service', 'unused']));
    expect(set.includes.sort()).toEqual(['_includes/a.mdx', '_includes/b.mdx']);
    expect(set.substitutions.sort()).toEqual(['service', 'ui-org-menu']);
    expect(set.pages).toEqual(['alerts.mdx']);
  });

  it('terminates on include cycles', () => {
    const files: Record<string, string> = {
      'a.mdx': '<Include src="/_includes/x" />',
      '_includes/x.mdx': '<Include src="/_includes/y" />',
      '_includes/y.mdx': '<Include src="/_includes/x" />',
    };
    const graph = buildIncludeGraph('', Object.keys(files), (f) => files[f]!);
    const set = computeClosure(['a.mdx'], graph, {}, new Set());
    expect(set.includes).toEqual(['_includes/x.mdx', '_includes/y.mdx']);
  });

  it('drops refKeys that are absent from substitutionKeys', () => {
    const graph = buildIncludeGraph('', Object.keys(FILES), (f) => FILES[f]!);
    const set = computeClosure(['alerts.mdx'], graph, { 'alerts.mdx': ['ui-org-menu'] }, new Set(['unused']));
    expect(set.substitutions).toEqual([]);
  });

  it('yields empty output for empty seeds', () => {
    const graph = buildIncludeGraph('', Object.keys(FILES), (f) => FILES[f]!);
    const set = computeClosure([], graph, {}, new Set());
    expect(set).toEqual({ pages: [], includes: [], substitutions: [] });
  });
});
