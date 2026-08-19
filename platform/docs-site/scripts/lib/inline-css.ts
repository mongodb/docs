/**
 * Pure helpers for the inline-CSS byte report (see scripts/measure-inline-css.ts).
 *
 * Free of I/O so the parsing can be unit-tested and stays identical between the
 * baseline run and any later one.
 */

/** One `<style>` element found in a document. */
export interface StyleTag {
  /** Bytes of the whole element, `<style ...>` and `</style>` included. */
  tagBytes: number;
  /** Bytes of the CSS text inside it. */
  cssBytes: number;
  /** Carries a `data-emotion` attribute, i.e. came from app/emotion.tsx. */
  isEmotion: boolean;
}

export interface PageMeasurement {
  totalBytes: number;
  styleTagCount: number;
  /** Bytes of all `<style>` elements, markup included — the shipped cost. */
  inlineStyleBytes: number;
  /** CSS text only, excluding the surrounding tag markup. */
  inlineCssBytes: number;
  emotionStyleBytes: number;
  emotionTagCount: number;
  /** Fraction of the document that is inline `<style>`, 0-1. */
  inlineStyleShare: number;
  /** Bytes before the first `<main>`, or null if the document has none. */
  bytesBeforeMain: number | null;
}

/**
 * `[^>]*` on the open tag is safe here: Next's style tags carry no `>` inside an
 * attribute value, and CSS cannot contain `</style>`.
 */
const STYLE_TAG = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;

const byteLength = (value: string): number => Buffer.byteLength(value, 'utf8');

export function findStyleTags(html: string): StyleTag[] {
  const tags: StyleTag[] = [];

  // STYLE_TAG is a module-level /g regex, so it carries lastIndex between calls.
  STYLE_TAG.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = STYLE_TAG.exec(html)) !== null) {
    const [whole, attributes, css] = match;
    tags.push({
      tagBytes: byteLength(whole),
      cssBytes: byteLength(css),
      isEmotion: /\bdata-emotion\b/i.test(attributes),
    });
  }

  return tags;
}

export function measureHtml(html: string): PageMeasurement {
  const totalBytes = byteLength(html);
  const tags = findStyleTags(html);

  const inlineStyleBytes = tags.reduce((sum, tag) => sum + tag.tagBytes, 0);
  const emotionTags = tags.filter((tag) => tag.isEmotion);

  const mainIndex = html.search(/<main\b/i);

  return {
    totalBytes,
    styleTagCount: tags.length,
    inlineStyleBytes,
    inlineCssBytes: tags.reduce((sum, tag) => sum + tag.cssBytes, 0),
    emotionStyleBytes: emotionTags.reduce((sum, tag) => sum + tag.tagBytes, 0),
    emotionTagCount: emotionTags.length,
    inlineStyleShare: totalBytes === 0 ? 0 : inlineStyleBytes / totalBytes,
    bytesBeforeMain: mainIndex === -1 ? null : byteLength(html.slice(0, mainIndex)),
  };
}

/** Sums per-page measurements into a group or report total. */
export function totalMeasurements(measurements: PageMeasurement[]): PageMeasurement {
  const sum = (pick: (m: PageMeasurement) => number): number => measurements.reduce((acc, m) => acc + pick(m), 0);

  const totalBytes = sum((m) => m.totalBytes);
  const inlineStyleBytes = sum((m) => m.inlineStyleBytes);

  return {
    totalBytes,
    styleTagCount: sum((m) => m.styleTagCount),
    inlineStyleBytes,
    inlineCssBytes: sum((m) => m.inlineCssBytes),
    emotionStyleBytes: sum((m) => m.emotionStyleBytes),
    emotionTagCount: sum((m) => m.emotionTagCount),
    // Recomputed from the summed bytes, not averaged, so it stays the true share.
    inlineStyleShare: totalBytes === 0 ? 0 : inlineStyleBytes / totalBytes,
    // Only meaningful per page.
    bytesBeforeMain: null,
  };
}

/**
 * Some routes answer 200 with an empty body (a docset root with no page in the
 * build). Measuring that as zero inline CSS would quietly deflate the reported
 * share, so callers reject it instead.
 */
export function isHtmlDocument(body: string): boolean {
  return body.includes('<html');
}

/** One project's page group within the sample file. */
export interface SampleGroup {
  project: string;
  version: string;
  pages: unknown[];
}

/** Picks the requested group, or the only one when the sample defines a single group. */
export function selectGroup<T extends SampleGroup>(groups: T[], requested: string | undefined): T {
  const names = groups.map((group) => group.project).join(', ');

  if (requested === undefined) {
    if (groups.length === 1) return groups[0];
    throw new Error(`--group is required; the sample defines ${names}`);
  }

  const group = groups.find((candidate) => candidate.project === requested);
  if (!group) throw new Error(`Unknown group "${requested}"; the sample defines ${names}`);

  return group;
}

/**
 * Minimal `--flag value` parser; this package has no CLI dependency. Unknown
 * flags throw rather than being ignored, so a `--baseurl` typo reports itself
 * instead of surfacing as a confusing "missing --base-url".
 */
export function parseArgs(argv: string[], known: readonly string[]): Record<string, string> {
  const args: Record<string, string> = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) throw new Error(`Unexpected argument "${arg}"`);

    const name = arg.slice(2);
    if (!known.includes(name)) {
      throw new Error(`Unknown flag "${arg}". Known flags: ${known.map((k) => `--${k}`).join(', ')}`);
    }

    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) throw new Error(`Missing value for ${arg}`);

    args[name] = next;
    i++;
  }

  return args;
}

/** Joins a base URL and slug. docs-site redirects paths served without a trailing slash. */
export function pageUrl(baseUrl: string, slug: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  const trimmed = slug.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? `${base}/` : `${base}/${trimmed}/`;
}

/** Formats a byte count, e.g. `287.4 KB`. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Formats a 0-1 fraction, e.g. `60.5%`. */
export function formatShare(share: number): string {
  return `${(share * 100).toFixed(1)}%`;
}
