/**
 * Attribution and rendering for the bundle size report (UXE-697).
 *
 * No fs/process access, so it can be tested against synthetic webpack stats
 * without running a Next build. The I/O wrapper is scripts/bundle-report.ts.
 */

export type Bucket = 'leafygreen' | 'via' | 'thirdParty' | 'generated' | 'firstParty';

export const BUCKETS: readonly Bucket[] = ['leafygreen', 'via', 'thirdParty', 'generated', 'firstParty'];

export const BUCKET_LABELS: Record<Bucket, string> = {
  leafygreen: 'LeafyGreen',
  via: 'Via',
  thirdParty: 'Other third-party',
  generated: 'Generated content data',
  firstParty: 'First-party',
};

/** Buckets broken out per-package, so a single offending import is nameable. */
const DETAILED_BUCKETS: readonly Bucket[] = ['leafygreen', 'via'];

/**
 * Generated sources that live under src/ but track content, not platform code.
 * data.copied.ts alone is ~4.7 MB; left in first-party, a platform-only PR would
 * show a delta caused purely by content drift.
 */
const GENERATED_SOURCE_PATTERNS = ['src/context/toc-data/', 'src/generated/'];

/** Minimal shape relied on from `stats.toJson()`. */
export interface StatsModule {
  name?: string;
  identifier?: string;
  size?: number;
  /** Group label for a collapsed set, e.g. 'orphan modules'. */
  type?: string;
  /** Children of a ModuleConcatenationPlugin scope. */
  modules?: StatsModule[];
  /** Count of modules webpack collapsed and left unnamed — real bytes, no owner. */
  filteredChildren?: number;
}

export interface StatsJson {
  modules?: StatsModule[];
}

export interface BucketTotal {
  bytes: number;
  modules: number;
}

export interface AssetTotal {
  rawBytes: number;
  gzipBytes: number;
  files: number;
}

/**
 * CSS is tracked separately because LeafyGreen ships styles as emotion inside
 * the JS bundle. A design system that ships static CSS moves those bytes to
 * .css, and a JS-only metric would score that swap as a pure win.
 */
export interface ShippedTotals {
  js: AssetTotal;
  css: AssetTotal;
}

export interface BundleSummary {
  /** ISO-8601 date (YYYY-MM-DD). */
  generatedAt: string;
  commit: string;
  /** Pre-minification module sizes: which dependency grew, not how much shipped. */
  buckets: Record<Bucket, BucketTotal>;
  packages: Record<string, Record<string, number>>;
  /** Non-zero means attribution is degraded and every bucket is understated. */
  unattributedModules: number;
  shipped: ShippedTotals;
}

/**
 * The npm package a module belongs to, or null for first-party source.
 *
 * Matches the LAST `node_modules/` segment: pnpm nests the real path inside its
 * virtual store (`.pnpm/@leafygreen-ui+button@25.0.3/node_modules/@leafygreen-ui/button/…`),
 * so matching the first would bucket every dependency as `.pnpm`.
 */
export function packageFromModuleName(rawName: string): string | null {
  // Loader syntax `babel-loader!./src/x.ts` puts the real path last.
  const name = rawName.includes('!') ? rawName.slice(rawName.lastIndexOf('!') + 1) : rawName;

  const marker = 'node_modules/';
  const idx = name.lastIndexOf(marker);
  if (idx === -1) return null;

  const rest = name.slice(idx + marker.length);
  const segments = rest.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  if (segments[0].startsWith('@')) {
    // A bare scope resolves to no package.
    return segments.length >= 2 ? `${segments[0]}/${segments[1]}` : null;
  }
  return segments[0];
}

/**
 * `@lg-chat/*` counts as LeafyGreen: it drains out with the same migration, so
 * filing it under third-party would understate what is left to remove.
 */
export function bucketForPackage(pkg: string | null): Bucket {
  if (pkg === null) return 'firstParty';
  if (pkg.startsWith('@leafygreen-ui/') || pkg.startsWith('@lg-chat/')) return 'leafygreen';
  if (pkg.startsWith('@via-ds/')) return 'via';
  return 'thirdParty';
}

export function isGeneratedSource(name: string): boolean {
  return GENERATED_SOURCE_PATTERNS.some((pattern) => name.includes(pattern));
}

export function bucketForModuleName(name: string): Bucket {
  const pkg = packageFromModuleName(name);
  if (pkg !== null) return bucketForPackage(pkg);
  return isGeneratedSource(name) ? 'generated' : 'firstParty';
}

/**
 * Descend into concatenated scopes. A scope is named after its entry module
 * only, so attributing by the parent would bill one package for all of them.
 */
function* walkModules(modules: readonly StatsModule[]): Generator<StatsModule> {
  for (const mod of modules) {
    if (mod.modules && mod.modules.length > 0) {
      yield* walkModules(mod.modules);
    } else {
      yield mod;
    }
  }
}

/**
 * Collapsed groups that are safe to skip: orphans are pre-concatenation copies
 * of modules already counted, and runtime modules (~10 kB) belong to no package.
 * Anything else — notably `cached modules` on a warm cache — is lost attribution.
 */
const BENIGN_FILTERED_TYPES = new Set(['orphan modules', 'runtime modules']);

function countFiltered(modules: readonly StatsModule[]): number {
  let total = 0;
  for (const mod of modules) {
    if (mod.filteredChildren && !BENIGN_FILTERED_TYPES.has(mod.type ?? '')) {
      total += mod.filteredChildren;
    }
    if (mod.modules) total += countFiltered(mod.modules);
  }
  return total;
}

function emptyBuckets(): Record<Bucket, BucketTotal> {
  return {
    leafygreen: { bytes: 0, modules: 0 },
    via: { bytes: 0, modules: 0 },
    thirdParty: { bytes: 0, modules: 0 },
    generated: { bytes: 0, modules: 0 },
    firstParty: { bytes: 0, modules: 0 },
  };
}

export interface SummarizeOptions {
  generatedAt: string;
  commit: string;
  shipped: ShippedTotals;
}

export function summarize(stats: StatsJson, options: SummarizeOptions): BundleSummary {
  const buckets = emptyBuckets();
  const packages: Record<string, Record<string, number>> = {};
  for (const bucket of DETAILED_BUCKETS) packages[bucket] = {};

  // Stats list a shared module once per chunk; counting each would inflate
  // whichever dependency is most widely imported.
  const seen = new Set<string>();

  for (const mod of walkModules(stats.modules ?? [])) {
    const name = mod.name ?? mod.identifier;
    if (!name) continue;

    const key = mod.identifier ?? name;
    if (seen.has(key)) continue;
    seen.add(key);

    const size = typeof mod.size === 'number' && mod.size > 0 ? mod.size : 0;
    const pkg = packageFromModuleName(name);
    const bucket = bucketForModuleName(name);

    buckets[bucket].bytes += size;
    buckets[bucket].modules += 1;

    if (pkg !== null && packages[bucket]) {
      packages[bucket][pkg] = (packages[bucket][pkg] ?? 0) + size;
    }
  }

  return {
    generatedAt: options.generatedAt,
    commit: options.commit,
    buckets,
    packages,
    unattributedModules: countFiltered(stats.modules ?? []),
    shipped: options.shipped,
  };
}

export function formatBytes(bytes: number): string {
  const abs = Math.abs(bytes);
  if (abs < 1024) return `${bytes} B`;
  if (abs < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatDelta(current: number, baseline: number): string {
  const delta = current - baseline;
  if (delta === 0) return '—';
  const sign = delta > 0 ? '+' : '';
  const pct = baseline === 0 ? null : (delta / baseline) * 100;
  const pctText = pct === null ? 'new' : `${sign}${pct.toFixed(1)}%`;
  return `${sign}${formatBytes(delta)} (${pctText})`;
}

/** Percent change at or above which a row is flagged. */
export const FLAG_THRESHOLD_PCT = 2;

export function movedBeyondThreshold(current: number, baseline: number): boolean {
  if (baseline === 0) return current > 0;
  return Math.abs(((current - baseline) / baseline) * 100) >= FLAG_THRESHOLD_PCT;
}

export const COMMENT_MARKER = '<!-- bundle-size-report -->';

function shippedRows(summary: BundleSummary): Array<[string, number]> {
  return [
    ['JS (raw)', summary.shipped.js.rawBytes],
    ['JS (gzipped)', summary.shipped.js.gzipBytes],
    ['CSS (raw)', summary.shipped.css.rawBytes],
    ['CSS (gzipped)', summary.shipped.css.gzipBytes],
  ];
}

/** `baseline` is null before one has been committed; absolute sizes still render. */
export function renderMarkdown(current: BundleSummary, baseline: BundleSummary | null): string {
  const lines: string[] = [COMMENT_MARKER, '## 📦 Bundle size report', ''];

  if (baseline === null) {
    lines.push('> No baseline found at `platform/docs-site/bundle-baseline.json`. Showing absolute sizes only.', '');
  } else {
    lines.push(
      `> Compared against \`bundle-baseline.json\`, last refreshed by hand from \`main\` at \`${baseline.commit.slice(
        0,
        12,
      )}\` on ${baseline.generatedAt}. Deltas are cumulative since that refresh, not per-PR.`,
      '',
    );
  }

  lines.push('### Shipped to the browser', '');
  lines.push(
    baseline === null ? '| Asset | Current |' : '| Asset | Baseline | Current | Delta |',
    baseline === null ? '| --- | ---: |' : '| --- | ---: | ---: | ---: |',
  );

  const currentShipped = shippedRows(current);
  const baseShipped = baseline === null ? null : shippedRows(baseline);
  currentShipped.forEach(([label, cur], i) => {
    if (baseShipped === null) {
      lines.push(`| ${label} | ${formatBytes(cur)} |`);
    } else {
      const base = baseShipped[i][1];
      const flag = movedBeyondThreshold(cur, base) ? ' ⚠️' : '';
      lines.push(`| ${label} | ${formatBytes(base)} | ${formatBytes(cur)} | ${formatDelta(cur, base)}${flag} |`);
    }
  });

  lines.push('', '### Attribution by source', '');
  if (current.unattributedModules > 0) {
    lines.push(
      `> ⚠️ ${current.unattributedModules} modules were collapsed by webpack into an unnamed group, so the figures below understate every bucket.`,
      '',
    );
  }
  lines.push(
    '_Pre-minification module sizes. Use these to see **which** dependency moved, not how much shipped. `@emotion/*` sits in "Other third-party" even though it is LeafyGreen\'s style runtime, so the LeafyGreen row understates what a full migration removes._',
    '',
  );
  lines.push(
    baseline === null ? '| Source | Current | Modules |' : '| Source | Baseline | Current | Delta |',
    baseline === null ? '| --- | ---: | ---: |' : '| --- | ---: | ---: | ---: |',
  );

  for (const bucket of BUCKETS) {
    const cur = current.buckets[bucket];
    if (baseline === null) {
      lines.push(`| ${BUCKET_LABELS[bucket]} | ${formatBytes(cur.bytes)} | ${cur.modules} |`);
    } else {
      const base = baseline.buckets[bucket];
      const flag = movedBeyondThreshold(cur.bytes, base.bytes) ? ' ⚠️' : '';
      lines.push(
        `| ${BUCKET_LABELS[bucket]} | ${formatBytes(base.bytes)} | ${formatBytes(cur.bytes)} | ${formatDelta(
          cur.bytes,
          base.bytes,
        )}${flag} |`,
      );
    }
  }

  const changed = baseline === null ? [] : changedPackages(current, baseline);
  if (changed.length > 0) {
    lines.push('', '<details>', '<summary>Packages that changed</summary>', '');
    lines.push('| Package | Baseline | Current | Delta |', '| --- | ---: | ---: | ---: |');
    for (const { pkg, base, cur } of changed) {
      lines.push(`| \`${pkg}\` | ${formatBytes(base)} | ${formatBytes(cur)} | ${formatDelta(cur, base)} |`);
    }
    lines.push('', '</details>');
  }

  lines.push(
    '',
    'ℹ️ This report is informational and does not block the PR. Bundle size is expected to grow during the LeafyGreen → Via hybrid period and to fall below baseline as LeafyGreen drains out.',
  );

  return lines.join('\n');
}

interface PackageChange {
  pkg: string;
  base: number;
  cur: number;
}

export function changedPackages(current: BundleSummary, baseline: BundleSummary): PackageChange[] {
  const changes: PackageChange[] = [];

  for (const bucket of DETAILED_BUCKETS) {
    const curPkgs = current.packages[bucket] ?? {};
    const basePkgs = baseline.packages[bucket] ?? {};
    for (const pkg of new Set([...Object.keys(curPkgs), ...Object.keys(basePkgs)])) {
      const cur = curPkgs[pkg] ?? 0;
      const base = basePkgs[pkg] ?? 0;
      if (cur !== base) changes.push({ pkg, base, cur });
    }
  }

  // Largest movement first — that's the one worth explaining.
  return changes.sort((a, b) => Math.abs(b.cur - b.base) - Math.abs(a.cur - a.base));
}
