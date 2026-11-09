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
  /** The backend that produced the translated overlay. */
  translator?: { provider: string; model: string | null };
}

/** One adapter-keyed translatable string, with its translation in the row's locale. */
export interface SegmentPair {
  /** Key from the MDX adapter's `extract().payload`, e.g. "banner[0].paragraph[1]". */
  key: string;
  /** English source text for this segment. */
  en: string;
  /** Translated text for this segment in the row's locale. */
  es: string;
}

/** Why a file's segments are (or are not) usable. Recorded per row. */
export type SegmentStatus = 'ok' | 'no-translatable-content' | 'no-shared-keys';

/** One file the dataset stage reads segments from. */
export interface SegmentTarget {
  kind: 'page' | 'include';
  /** Project-relative, e.g. "aggregation.mdx" — the form the overlay uses. */
  rel: string;
  /** content-mdx-root-relative as recorded in the manifest, e.g. "manual/manual/aggregation.mdx". */
  mdxPath: string;
}

export interface DatasetRow {
  input: {
    source_text: string;
    target_locale: string;
    local_text: string;
    /** Absent on datasets built before segment scoring existed. */
    segments?: SegmentPair[];
    /** The adapter's inline tokens for this row's English text (translate.ts unions them into the NT list). */
    non_translatable_terms?: string[];
  };
  expected: string;
  metadata: {
    project: string;
    url: string;
    slug: string;
    locale: string;
    run: string;
    /** 'page' for a seed page, 'include' for a reachable include. */
    kind?: 'page' | 'include';
    /** content-mdx-relative path this row came from. */
    mdxPath?: string;
    segmentStatus?: SegmentStatus;
    segmentPairs?: number;
    enOnly?: number;
    esOnly?: number;
  };
}
