import {
  bucketForModuleName,
  changedPackages,
  formatBytes,
  formatDelta,
  movedBeyondThreshold,
  packageFromModuleName,
  renderMarkdown,
  summarize,
  type BundleSummary,
  type StatsJson,
} from '../../../scripts/lib/bundle-stats';

const SHIPPED = {
  js: { rawBytes: 1000, gzipBytes: 400, files: 3 },
  css: { rawBytes: 200, gzipBytes: 80, files: 2 },
};
const OPTIONS = { generatedAt: '2026-08-11', commit: 'abc123', shipped: SHIPPED };

describe('packageFromModuleName', () => {
  it('returns null for first-party source', () => {
    expect(packageFromModuleName('./src/components/Button.tsx')).toBeNull();
  });

  it('reads the package from a plain node_modules path', () => {
    expect(packageFromModuleName('./node_modules/lodash/isEqual.js')).toBe('lodash');
  });

  it('reads a scoped package', () => {
    expect(packageFromModuleName('./node_modules/@leafygreen-ui/button/dist/index.js')).toBe('@leafygreen-ui/button');
  });

  it("uses the last node_modules segment so pnpm's virtual store does not collapse to .pnpm", () => {
    const name = './node_modules/.pnpm/@leafygreen-ui+button@25.0.3/node_modules/@leafygreen-ui/button/dist/index.js';
    expect(packageFromModuleName(name)).toBe('@leafygreen-ui/button');
  });

  it('strips webpack loader prefixes', () => {
    const name = 'babel-loader!./node_modules/@leafygreen-ui/icon/dist/index.js';
    expect(packageFromModuleName(name)).toBe('@leafygreen-ui/icon');
  });

  it('returns null for a scope with no package after it', () => {
    expect(packageFromModuleName('./node_modules/@leafygreen-ui/')).toBeNull();
  });
});

describe('bucketForModuleName', () => {
  it.each([
    ['./node_modules/@leafygreen-ui/button/dist/index.js', 'leafygreen'],
    ['./node_modules/@lg-chat/rich-links/dist/index.js', 'leafygreen'],
    ['./node_modules/@via-ds/core/dist/index.js', 'via'],
    ['./node_modules/react/index.js', 'thirdParty'],
    ['./src/app/page.tsx', 'firstParty'],
    ['./src/context/toc-data/data.copied.ts', 'generated'],
    ['./src/generated/dir-name-to-prefix.json', 'generated'],
  ])('buckets %s as %s', (name, expected) => {
    expect(bucketForModuleName(name)).toBe(expected);
  });

  it('keeps generated content data out of first-party', () => {
    // data.copied.ts is ~4.7 MB regenerated from content/, so leaving it in
    // first-party makes that bucket track content drift instead of code.
    const stats: StatsJson = {
      modules: [
        { name: './src/context/toc-data/data.copied.ts', size: 4687984 },
        { name: './src/app/page.tsx', size: 30 },
      ],
    };

    const result = summarize(stats, OPTIONS);
    expect(result.buckets.generated).toEqual({ bytes: 4687984, modules: 1 });
    expect(result.buckets.firstParty).toEqual({ bytes: 30, modules: 1 });
  });
});

describe('movedBeyondThreshold', () => {
  it('flags a change at exactly the threshold', () => {
    expect(movedBeyondThreshold(102, 100)).toBe(true);
  });

  it('does not flag a change below the threshold', () => {
    expect(movedBeyondThreshold(101, 100)).toBe(false);
  });

  it('flags shrinkage as well as growth', () => {
    expect(movedBeyondThreshold(97, 100)).toBe(true);
  });

  it('treats any growth from zero as significant', () => {
    expect(movedBeyondThreshold(1, 0)).toBe(true);
    expect(movedBeyondThreshold(0, 0)).toBe(false);
  });
});

describe('summarize', () => {
  it('totals bytes and module counts per bucket', () => {
    const stats: StatsJson = {
      modules: [
        { name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 100 },
        { name: './node_modules/@leafygreen-ui/icon/dist/index.js', size: 50 },
        { name: './node_modules/react/index.js', size: 200 },
        { name: './src/app/page.tsx', size: 30 },
      ],
    };

    const result = summarize(stats, OPTIONS);

    expect(result.buckets.leafygreen).toEqual({ bytes: 150, modules: 2 });
    expect(result.buckets.thirdParty).toEqual({ bytes: 200, modules: 1 });
    expect(result.buckets.firstParty).toEqual({ bytes: 30, modules: 1 });
    expect(result.buckets.via).toEqual({ bytes: 0, modules: 0 });
  });

  it('breaks the leafygreen bucket out per package', () => {
    const stats: StatsJson = {
      modules: [
        { name: './node_modules/@leafygreen-ui/button/dist/a.js', size: 100 },
        { name: './node_modules/@leafygreen-ui/button/dist/b.js', size: 25 },
        { name: './node_modules/@leafygreen-ui/icon/dist/index.js', size: 50 },
      ],
    };

    expect(summarize(stats, OPTIONS).packages.leafygreen).toEqual({
      '@leafygreen-ui/button': 125,
      '@leafygreen-ui/icon': 50,
    });
  });

  it('does not double-count a module shared across chunks', () => {
    const stats: StatsJson = {
      modules: [
        {
          name: './node_modules/@leafygreen-ui/button/dist/index.js',
          identifier: '/abs/@leafygreen-ui/button/dist/index.js',
          size: 100,
        },
        {
          name: './node_modules/@leafygreen-ui/button/dist/index.js',
          identifier: '/abs/@leafygreen-ui/button/dist/index.js',
          size: 100,
        },
      ],
    };

    expect(summarize(stats, OPTIONS).buckets.leafygreen).toEqual({ bytes: 100, modules: 1 });
  });

  it('attributes concatenated modules to their children, not the scope entry', () => {
    // A scope is named after its entry, so crediting the parent would bill
    // first-party source for its LeafyGreen imports.
    const stats: StatsJson = {
      modules: [
        {
          name: './src/app/page.tsx + 2 modules',
          size: 300,
          modules: [
            { name: './src/app/page.tsx', size: 30 },
            { name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 200 },
            { name: './node_modules/@via-ds/core/dist/index.js', size: 70 },
          ],
        },
      ],
    };

    const result = summarize(stats, OPTIONS);
    expect(result.buckets.firstParty.bytes).toBe(30);
    expect(result.buckets.leafygreen.bytes).toBe(200);
    expect(result.buckets.via.bytes).toBe(70);
  });

  it('reports a zero Via bucket before any Via dependency exists', () => {
    const stats: StatsJson = {
      modules: [{ name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 100 }],
    };

    const result = summarize(stats, OPTIONS);
    expect(result.buckets.via).toEqual({ bytes: 0, modules: 0 });
    expect(result.packages.via).toEqual({});
  });

  it('carries the measurement date, commit, and shipped totals through', () => {
    const result = summarize({ modules: [] }, OPTIONS);
    expect(result.generatedAt).toBe('2026-08-11');
    expect(result.commit).toBe('abc123');
    expect(result.shipped).toEqual(SHIPPED);
  });

  it('counts modules webpack collapsed into an unnamed group', () => {
    // What a warm filesystem cache emits. Without the stats options in
    // next.config.mjs this is the entire module list and every bucket reads 0 B.
    const stats: StatsJson = {
      modules: [{ type: 'cached modules', filteredChildren: 1699, size: 23099767 }],
    };

    const result = summarize(stats, OPTIONS);
    expect(result.unattributedModules).toBe(1699);
  });

  it('counts collapsed groups nested inside concatenated modules', () => {
    const stats: StatsJson = {
      modules: [
        {
          name: './src/app/page.tsx + 2 modules',
          size: 100,
          modules: [
            { name: './src/app/page.tsx', size: 30 },
            { filteredChildren: 12, size: 70 },
          ],
        },
      ],
    };
    expect(summarize(stats, OPTIONS).unattributedModules).toBe(12);
  });

  it('does not count orphan or runtime groups as lost attribution', () => {
    // Both appear in every real build, so treating them as lost attribution
    // would fail always.
    const stats: StatsJson = {
      modules: [
        { type: 'orphan modules', filteredChildren: 465, size: 4460560 },
        { type: 'runtime modules', filteredChildren: 19, size: 10785 },
      ],
    };

    const result = summarize(stats, OPTIONS);
    expect(result.unattributedModules).toBe(0);
    expect(result.buckets.firstParty.bytes).toBe(0);
  });

  it('reports zero unattributed modules for a fully named module list', () => {
    const stats: StatsJson = {
      modules: [{ name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 100 }],
    };
    expect(summarize(stats, OPTIONS).unattributedModules).toBe(0);
  });

  it('tolerates modules with no size or name', () => {
    const stats: StatsJson = {
      modules: [{ size: 10 }, { name: './src/a.ts' }, { name: './src/b.ts', size: -5 }],
    };
    expect(summarize(stats, OPTIONS).buckets.firstParty).toEqual({ bytes: 0, modules: 2 });
  });
});

describe('formatBytes / formatDelta', () => {
  it.each([
    [512, '512 B'],
    [2048, '2.0 kB'],
    [1024 * 1024 * 3, '3.00 MB'],
  ])('formats %i as %s', (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected);
  });

  it('renders no-change as a dash', () => {
    expect(formatDelta(100, 100)).toBe('—');
  });

  it('signs growth and shrinkage', () => {
    expect(formatDelta(110, 100)).toBe('+10 B (+10.0%)');
    expect(formatDelta(90, 100)).toBe('-10 B (-10.0%)');
  });

  it('labels growth from a zero baseline as new rather than dividing by zero', () => {
    expect(formatDelta(100, 0)).toBe('+100 B (new)');
  });
});

describe('renderMarkdown', () => {
  const current = summarize(
    {
      modules: [
        { name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 100 },
        { name: './src/app/page.tsx', size: 30 },
      ],
    },
    OPTIONS,
  );

  it('states it is non-blocking', () => {
    const md = renderMarkdown(current, null);
    expect(md).toContain('does not block the PR');
  });

  it('includes the marker so the comment can be updated in place', () => {
    expect(renderMarkdown(current, null)).toContain('<!-- bundle-size-report -->');
  });

  it('notes the missing baseline on a first run', () => {
    expect(renderMarkdown(current, null)).toContain('No baseline found');
  });

  it('cites the baseline commit and date when comparing', () => {
    const baseline: BundleSummary = { ...current, commit: 'def456', generatedAt: '2026-08-01' };
    const md = renderMarkdown(current, baseline);
    expect(md).toContain('def456');
    expect(md).toContain('2026-08-01');
  });

  it('flags a bucket that moved past the threshold', () => {
    const baseline: BundleSummary = {
      ...current,
      buckets: { ...current.buckets, leafygreen: { bytes: 50, modules: 1 } },
    };
    expect(renderMarkdown(current, baseline)).toContain('⚠️');
  });

  it('reports CSS separately from JS', () => {
    // Static-CSS components move bytes from JS to .css; a JS-only metric would
    // score that swap as a pure win.
    const md = renderMarkdown(current, null);
    expect(md).toContain('JS (gzipped)');
    expect(md).toContain('CSS (gzipped)');
  });

  it('describes the baseline as hand-refreshed rather than automatic', () => {
    const baseline: BundleSummary = { ...current, commit: 'def456', generatedAt: '2026-08-01' };
    expect(renderMarkdown(current, baseline)).toContain('refreshed by hand');
  });

  it('warns when attribution is incomplete', () => {
    const degraded: BundleSummary = { ...current, unattributedModules: 1699 };
    expect(renderMarkdown(degraded, null)).toContain('understate every bucket');
  });

  it('does not warn when attribution is complete', () => {
    expect(renderMarkdown(current, null)).not.toContain('understate every bucket');
  });

  it('does not flag a bucket that barely moved', () => {
    const baseline: BundleSummary = {
      ...current,
      buckets: { ...current.buckets, leafygreen: { bytes: 100, modules: 1 } },
      shipped: current.shipped,
    };
    expect(renderMarkdown(current, baseline)).not.toContain('⚠️');
  });
});

describe('changedPackages', () => {
  const base = summarize(
    {
      modules: [
        { name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 100 },
        { name: './node_modules/@leafygreen-ui/icon/dist/index.js', size: 500 },
      ],
    },
    OPTIONS,
  );

  it('reports added, removed, and resized packages, largest movement first', () => {
    const current = summarize(
      {
        modules: [
          { name: './node_modules/@leafygreen-ui/button/dist/index.js', size: 120 },
          { name: './node_modules/@via-ds/core/dist/index.js', size: 300 },
        ],
      },
      OPTIONS,
    );

    expect(changedPackages(current, base)).toEqual([
      { pkg: '@leafygreen-ui/icon', base: 500, cur: 0 },
      { pkg: '@via-ds/core', base: 0, cur: 300 },
      { pkg: '@leafygreen-ui/button', base: 100, cur: 120 },
    ]);
  });

  it('is empty when nothing moved', () => {
    expect(changedPackages(base, base)).toEqual([]);
  });
});
