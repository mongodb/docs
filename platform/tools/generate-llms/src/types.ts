export interface PageEntry {
  title: string;
  /** Production URL of the .md version of this page. */
  url: string;
  /**
   * This page's own meta `:description:`, if it has one (with constants
   * and substitutions resolved). "" if the page has no meta description.
   * Rendered inline as `- [title](url): description`.
   */
  description: string;
  /** Absolute path to the source .txt file, for diagnostics only. */
  sourcePath: string;
  /**
   * The page's path within the project's source directory, e.g.
   * "reference/operator/eq" for a page at /docs/manual/reference/operator/eq,
   * or "" for the project's own root/index page. Pages are sorted by URL, so
   * pages sharing a path prefix are always contiguous; split.ts uses
   * leading segments of this to avoid cutting a section across two files
   * when a project (or an oversized section within one) has to be split.
   */
  pagePath: string;
  /**
   * The page's "L3": the first segment of `pagePath`, e.g. "reference" for
   * a page at "reference/operator/eq". "" for the project's own root/index
   * page. Equivalent to the depth-1 grouping split.ts derives from
   * `pagePath`; kept as its own field since it's the default/most common
   * grouping and is convenient for callers and diagnostics.
   */
  l3: string;
}

export interface ProjectResult {
  /** Top-level content directory name, e.g. "atlas-cli". */
  project: string;
  /** Version directory used, e.g. "current", "manual", or "" if unversioned. */
  version: string;
  pages: PageEntry[];
  /**
   * Every file written for this project: a single llms.txt if its content
   * fits under LLMS_TXT_CHAR_LIMIT, or multiple <project>-<n>-llms.txt part
   * files (in order) if it had to be split.
   */
  outputPaths: string[];
  /**
   * True if at least one written part still exceeds LLMS_TXT_CHAR_LIMIT.
   * This can only happen when a single L3 section is larger than the limit
   * on its own, since splitting otherwise never crosses an L3 boundary.
   */
  anyPartOverLimit: boolean;
  /**
   * The description used for this project's first (or only) part, resolved
   * from llms-descriptions.json (see descriptions.ts). PLACEHOLDER_DESCRIPTION
   * if the project has no entry there yet.
   */
  indexDescription: string;
  /** Rendered character count of the full, unsplit page list including the index description. */
  charsWithDescriptions: number;
  /** Rendered character count of the full, unsplit page list with the index description omitted. */
  charsWithoutDescriptions: number;
}

export interface GenerateOptions {
  /** Absolute path to the docs-mongodb-internal monorepo root. */
  monorepoPath: string;
  /** Absolute path to write generated <project>/llms.txt files under. */
  outputDir: string;
  /** Base production URL, e.g. "https://www.mongodb.com/docs". */
  baseUrl: string;
  /** Absolute path to llms-descriptions.json (see descriptions.ts). */
  descriptionsPath: string;
  /** If set, only generate llms.txt for this one content directory. */
  forProject?: string;
  /**
   * If true, omit both the summary blockquote (from llms-descriptions.json)
   * and every page's own inline `: description` from written files.
   */
  noDescriptions: boolean;
  /**
   * If set (and > 1), force every split project to write exactly this many
   * <project>-<n>-llms.txt parts, instead of the number automatically
   * computed from LLMS_TXT_CHAR_LIMIT. L3 section boundaries are still
   * respected, so a forced count can still leave a part over the limit, or
   * yield fewer parts than requested if there aren't enough L3 boundaries.
   */
  parts?: number;
  /**
   * If a single L3 section is still over LLMS_TXT_CHAR_LIMIT on its own
   * after the initial split, it's automatically recursed into
   * progressively deeper path segments (L4, e.g. "reference/operator";
   * L5; etc.) until it fits. Set this (and > 1) to force the *first* of
   * those recursive steps to produce exactly this many sub-parts, instead
   * of the number automatically computed; any further recursion beyond
   * that first step still uses the automatic count.
   */
  oversizedSectionParts?: number;
}

export const LLMS_TXT_CHAR_LIMIT = 50_000;

/** Base production URL that all generated page links are resolved against. */
export const PRODUCTION_BASE_URL = 'https://www.mongodb.com/docs';
