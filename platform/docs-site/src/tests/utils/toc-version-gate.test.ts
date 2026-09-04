import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import type { ActiveVersions, AvailableVersions } from '@/context/version-context';
import { isTocItemAllowedForVersion } from '@/utils/toc-version-gate';
import { createParentFromToc, findParentBreadCrumb } from '@/mdx-components/Breadcrumbs/unified-toc-breadcrumbs';

const LIMITATIONS_URL = '/docs/:version/core/csfle/reference/limitations';

const V8_ONLY_LISTED_URL = '/docs/:version/core/queryable-encryption/fundamentals/keys-key-vaults';

const buildToc = ({ v7First = false }: { v7First?: boolean } = {}): TocItem[] => {
  const nonV7Subtree: TocItem = {
    label: 'In-Use Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/security-in-use-encryption',
    collapsible: true,
    versions: { excludes: ['v7.0'] },
    items: [
      {
        label: 'Comparing Approaches',
        contentSite: 'docs',
        url: '/docs/:version/core/queryable-encryption/about-qe-csfle',
        collapsible: true,
        items: [
          { label: 'CSFLE Limitations', contentSite: 'docs', url: LIMITATIONS_URL },
          { label: 'Keys and Key Vaults', contentSite: 'docs', url: V8_ONLY_LISTED_URL },
        ],
      },
    ],
  };

  const v7Subtree: TocItem = {
    label: 'In-Use Encryption ',
    contentSite: 'docs',
    url: '/docs/v7.0/core/security-in-use-encryption',
    collapsible: true,
    versions: { includes: ['v7.0'] },
    items: [
      {
        label: 'Client-Side Field Level Encryption',
        contentSite: 'docs',
        url: '/docs/:version/core/csfle/',
        collapsible: true,
        items: [
          {
            label: 'Reference',
            contentSite: 'docs',
            collapsible: true,
            items: [{ label: 'CSFLE Limitations', contentSite: 'docs', url: `${LIMITATIONS_URL}/` }],
          },
        ],
      },
    ],
  };

  const inUseEncryption = v7First ? [v7Subtree, nonV7Subtree] : [nonV7Subtree, v7Subtree];

  return [
    {
      label: 'Development',
      contentSite: 'landing',
      url: '/docs/development',
      items: [{ label: 'Database Manual', contentSite: 'docs', group: true, items: inUseEncryption }],
    },
  ] as TocItem[];
};

const branch = (gitBranchName: string, urlSlug: string, urlAliases: string[] | null = null) => ({
  gitBranchName,
  urlSlug,
  urlAliases,
  active: true,
  versionSelectorLabel: urlSlug,
  offlineUrl: '',
  noIndexing: false,
});

const availableVersions = {
  docs: [branch('v7.0', 'v7.0'), branch('v8.0', 'v8.0'), branch('master', 'v8.3', ['manual', 'current'])],
} as unknown as AvailableVersions;

// `activeVersions` holds git branch names, while gates are written in urlSlug
const activeVersionsFor = (gitBranchName: string): ActiveVersions => ({ docs: gitBranchName });

/** Composes the production path: annotate ancestry, resolve with the version gate, fall back unfiltered. */
const crumbsFor = (tree: TocItem[], gitBranchName: string, urlSlug: string, url = LIMITATIONS_URL) => {
  const withNewUrls = (items: TocItem[]): TocItem[] =>
    items.map((item) => ({
      ...item,
      newUrl: (item.url ?? '').replace(/:version/g, urlSlug),
      items: item.items ? withNewUrls(item.items) : undefined,
    })) as TocItem[];

  const annotated = createParentFromToc(withNewUrls(tree), [])!;
  const activeVersions = activeVersionsFor(gitBranchName);
  const isAllowed = (item: TocItem) => isTocItemAllowedForVersion(item, activeVersions, availableVersions);
  const slug = url.replace(/:version/g, urlSlug);

  return findParentBreadCrumb(slug, annotated, isAllowed) ?? findParentBreadCrumb(slug, annotated) ?? [];
};

const titlesFor = (...args: Parameters<typeof crumbsFor>) => crumbsFor(...args).map((crumb) => crumb.title);

describe('isTocItemAllowedForVersion', () => {
  it('resolves git branch names against urlSlug-space gates', () => {
    // activeVersions holds 'master'; the gate names the urlSlug 'v8.3'
    const item = { versions: { excludes: ['v8.3'] }, contentSite: 'docs' };
    expect(isTocItemAllowedForVersion(item, activeVersionsFor('master'), availableVersions)).toBe(false);
  });

  it('matches gates written against a urlAlias', () => {
    // 'manual' is an alias of the master/v8.3 branch, not its urlSlug
    const item = { versions: { excludes: ['manual'] }, contentSite: 'docs' };
    expect(isTocItemAllowedForVersion(item, activeVersionsFor('master'), availableVersions)).toBe(false);
  });

  describe('fails open rather than hiding real navigation', () => {
    it('keeps ungated items', () => {
      expect(isTocItemAllowedForVersion({ contentSite: 'docs' }, activeVersionsFor('v7.0'), availableVersions)).toBe(
        true,
      );
    });

    it('keeps gated items when the branch is unknown', () => {
      const item = { versions: { includes: ['v7.0'] }, contentSite: 'docs' };
      expect(isTocItemAllowedForVersion(item, { docs: 'nonexistent-branch' }, availableVersions)).toBe(true);
    });

    it('keeps gated items with no contentSite', () => {
      const item = { versions: { includes: ['v7.0'] } };
      expect(isTocItemAllowedForVersion(item, activeVersionsFor('v7.0'), availableVersions)).toBe(true);
    });
  });
});

describe('breadcrumbs for a page that moved between versions (DOP-7255)', () => {
  it('resolves v7.0 into the v7 subtree', () => {
    // 'Reference' is absent by design: it is a urlless section header, so
    // createParentFromToc cannot emit a crumb for it.
    expect(titlesFor(buildToc(), 'v7.0', 'v7.0')).toEqual([
      'Development',
      'In-Use Encryption ',
      'Client-Side Field Level Encryption',
    ]);
  });

  it('resolves v8.0 into the non-v7 subtree', () => {
    expect(titlesFor(buildToc(), 'v8.0', 'v8.0')).toEqual(['Development', 'In-Use Encryption', 'Comparing Approaches']);
  });

  it('emits no crumb linking to a page that does not exist in the active version', () => {
    const paths = crumbsFor(buildToc(), 'v7.0', 'v7.0').map((crumb) => crumb.path);
    expect(paths.some((path) => path.includes('about-qe-csfle'))).toBe(false);
    expect(paths.filter((path) => path.includes('/core/'))).toEqual([
      '/docs/v7.0/core/security-in-use-encryption',
      '/docs/v7.0/core/csfle',
    ]);
  });

  it('still resolves a page listed only inside a gated-out subtree', () => {
    expect(titlesFor(buildToc(), 'v7.0', 'v7.0', V8_ONLY_LISTED_URL)).toEqual([
      'Development',
      'In-Use Encryption',
      'Comparing Approaches',
    ]);
  });

  it('is independent of the order the subtrees are declared in', () => {
    expect(titlesFor(buildToc({ v7First: true }), 'v7.0', 'v7.0')).toEqual(titlesFor(buildToc(), 'v7.0', 'v7.0'));
    expect(titlesFor(buildToc({ v7First: true }), 'v8.0', 'v8.0')).toEqual(titlesFor(buildToc(), 'v8.0', 'v8.0'));
  });
});
