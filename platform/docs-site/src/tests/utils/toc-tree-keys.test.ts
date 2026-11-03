import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { getExpandedTocKeys } from '@/utils/toc-tree-keys';

const tree: TocItem[] = [
  {
    label: 'Atlas',
    newUrl: '/docs/atlas',
    items: [
      { label: 'Overview', group: true, items: [{ label: 'list', newUrl: '/docs/atlas/getting-started' }] },
      {
        label: 'Clusters',
        newUrl: '/docs/atlas/clusters',
        collapsible: true,
        items: [
          { label: 'Overview', newUrl: '/docs/atlas/clusters/overview' },
          {
            label: 'Architecture',
            newUrl: '/docs/atlas/architecture',
            collapsible: true,
            items: [{ label: 'list', newUrl: '/docs/atlas/architecture/deployment-paradigms' }],
          },
        ],
      },
      {
        label: 'Reference',
        group: true,
        collapsible: true,
        items: [{ label: 'list', newUrl: '/docs/atlas/reference/api#endpoints' }],
      },
    ],
  },
  {
    label: 'Atlas CLI',
    newUrl: '/docs/atlas-cli',
    items: [{ label: 'Overview', newUrl: '/docs/atlas/clusters/overview' }],
  },
];

const expanded = (slug: string, offline = false) => [...getExpandedTocKeys(tree, slug, { offline })].sort();

describe('getExpandedTocKeys', () => {
  it('expands every ancestor of a deep link and always-open groups, not the leaf', () => {
    expect(expanded('/docs/atlas/architecture/deployment-paradigms')).toEqual(['0', '0-0', '0-1', '0-1-1']);
  });

  it('expands the active node itself when it has children', () => {
    expect(expanded('/docs/atlas/clusters')).toEqual(['0', '0-0', '0-1']);
  });

  it('keeps collapsible groups closed unless they contain the active page', () => {
    expect(expanded('/docs/atlas/getting-started')).not.toContain('0-2');
    expect(expanded('/docs/atlas/reference/api')).toContain('0-2');
  });

  it('matches exact paths only, not path prefixes', () => {
    expect(expanded('/docs/atlas/architecture-guide')).toEqual(['0-0']);
    expect(expanded('/docs/atlas-cli')).toEqual(['0-0', '1']);
  });

  it('expands every branch containing a page that appears more than once', () => {
    expect(expanded('/docs/atlas/clusters/overview')).toEqual(['0', '0-0', '0-1', '1']);
  });

  it('expands only always-open groups when no page matches', () => {
    expect(expanded('')).toEqual(['0-0']);
  });

  it('keys relative to the array passed in, so a subtree panel matches its own ids', () => {
    const [atlas] = tree;
    expect([...getExpandedTocKeys(atlas.items!, '/docs/atlas/architecture/deployment-paradigms')].sort()).toEqual([
      '0',
      '1',
      '1-1',
    ]);
  });

  it('expands every node with children in offline builds', () => {
    expect(expanded('', true)).toEqual(['0', '0-0', '0-1', '0-1-1', '0-2', '1']);
  });
});
