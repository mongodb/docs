import { describe, expect, it } from 'vitest';
import { extractContentSitesWithPages } from '../src/extract-content-sites.js';

describe('extractContentSitesWithPages', () => {
  it('returns every contentSite that has pages', () => {
    const source = `export default [
      { label: 'Home', contentSite: 'landing', url: '/docs/' },
      { label: 'Guide', contentSite: 'golang', url: '/docs/golang/' },
    ];`;

    expect(extractContentSitesWithPages(source)).toEqual(
      new Set(['landing', 'golang']),
    );
  });

  it('ignores a group header that only labels its children (tools.ts)', () => {
    const source = `[
      { label: 'For Agents', contentSite: 'docs', group: true, items: [
        { label: 'Agent Skills', contentSite: 'landing', url: '/docs/agent-skills' },
      ]},
    ]`;

    expect(extractContentSitesWithPages(source)).toEqual(new Set(['landing']));
  });

  it('does not credit a parent with the url of its nested item', () => {
    const source = `[
      { label: 'Parent', contentSite: 'docs', items: [
        { label: 'Child', url: '/docs/child' },
      ]},
    ]`;

    expect(extractContentSitesWithPages(source)).toEqual(new Set());
  });

  it('accepts double-quoted urls', () => {
    const source = `[{ label: 'Page', contentSite: 'atlas', url: "/docs/atlas" }]`;

    expect(extractContentSitesWithPages(source)).toEqual(new Set(['atlas']));
  });

  it('ignores braces inside string literals', () => {
    const source = `[
      { label: 'Use {curly} braces', contentSite: 'docs', url: '/docs/braces' },
      { label: 'Next', contentSite: 'landing', url: '/docs/next' },
    ]`;

    expect(extractContentSitesWithPages(source)).toEqual(
      new Set(['docs', 'landing']),
    );
  });

  it('returns an empty set when no item has a contentSite and a url', () => {
    expect(extractContentSitesWithPages(`[{ label: 'x', url: '/x' }]`)).toEqual(
      new Set(),
    );
  });
});
