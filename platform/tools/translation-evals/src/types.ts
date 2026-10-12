export type Locale = string;

export interface PageRef {
  /** Filesystem/URL slug used for output filenames. */
  slug: string;
  /** Production URL path, e.g. `/docs/atlas/alerts`. */
  urlPath: string;
  /** content-mdx-relative, e.g. `atlas/alerts.mdx`. */
  mdxPath: string;
  /** Composable-variant query string, e.g. `interface=atlas-cli`. */
  query?: string;
}

export interface ScrapedPage {
  url: string;
  title: string;
  content: string;
}

export interface TranslatableSet {
  /** Project-relative mdxPaths of the eval pages (relative to `content-mdx/<project>`). */
  pages: string[];
  /** Project-relative mdxPaths of reachable files that are not seed pages, each counted once. */
  includes: string[];
  /** Keys from `_references.json` referenced by the closure. */
  substitutions: string[];
}

export interface RunManifest {
  project: string;
  runId: string;
  locales: Locale[];
  pages: PageRef[];
  translatable: TranslatableSet;
  stages: Record<string, { status: 'pending' | 'done' | 'failed'; at?: string }>;
}

export interface DatasetRow {
  input: { source_text: string; target_locale: string; local_text: string };
  expected: string;
  metadata: { project: string; url: string; slug: string; locale: string; run: string };
}
