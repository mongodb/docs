/**
 * Detects whether the hand-maintained root llms.txt has fallen out of sync
 * with what's actually published.
 *
 * Three kinds of drift, all found deterministically here so the weekly job
 * only needs editorial judgement (which section a new project belongs in,
 * what to call it) and never has to work out *what* changed:
 *
 *   1. A per-project file exists on S3 but nothing links to it - a new
 *      project, or a project that gained parts when it was re-split.
 *   2. A link in the root file points at a file that no longer exists.
 *   3. A "(Part N of M)" label disagrees with how many parts are published.
 *
 * Plus a fourth for content/landing, whose pages are listed directly in the
 * root file rather than in a per-project file of their own: a landing page
 * that exists but isn't linked. That section is a curated subset, not a
 * complete listing, so those are reported as candidates for a human to
 * accept or ignore - never as something that must be added.
 *
 * Reads nothing and writes nothing: callers supply the root file's content,
 * the published keys, and landing's page URLs.
 */
import { PRODUCTION_BASE_URL } from './types.js';
import { isVersionDirectory } from './projectInfo.js';

/** A per-project file that is published but not linked from the root file. */
export interface UnlinkedFile {
  key: string;
  url: string;
  /** Content-derived project name, e.g. "manual" for manual-3-llms.txt. */
  project: string;
}

export interface PartCountMismatch {
  project: string;
  /** The "of M" the root file's labels claim. */
  labelledParts: number;
  /** How many parts are actually published. */
  publishedParts: number;
}

export interface LandingPageCandidate {
  url: string;
  title: string;
}

export interface DriftReport {
  unlinkedFiles: UnlinkedFile[];
  deadLinks: string[];
  partCountMismatches: PartCountMismatch[];
  landingPageCandidates: LandingPageCandidate[];
  deadLandingLinks: string[];
  hasDrift: boolean;
}

const ROOT_LLMS_KEY = 'docs/llms.txt';
const PART_FILENAME = /^(.+)-(\d+)-llms\.txt$/;
const PART_LABEL = /\(Part\s+(\d+)\s+of\s+(\d+)\)/i;

function origin(): string {
  return new URL(PRODUCTION_BASE_URL).origin;
}

export function keyToUrl(key: string): string {
  return `${origin()}/${key}`;
}

/**
 * Whether a linked URL is one this check is responsible for. The root file
 * also links out to MongoDB's site-wide https://www.mongodb.com/llms.txt,
 * which we neither generate nor publish, so only URLs under the docs
 * prefix are candidates for being "dead".
 */
export function isDocsUrl(url: string): boolean {
  return url.startsWith(`${PRODUCTION_BASE_URL.replace(/\/+$/, '')}/`);
}

/** Every absolute docs URL the root file links to, in document order. */
export function extractLinkedUrls(rootLlmsContent: string): string[] {
  const matches = rootLlmsContent.matchAll(/\((https:\/\/[^)\s]+)\)/g);
  return [...matches].map((match) => match[1]);
}

/**
 * The project a published key belongs to: the part-file stem when the file
 * is one of several parts ("manual-3-llms.txt" -> "manual"), otherwise the
 * last path segment before the filename, skipping version directories so
 * "docs/drivers/go/current/llms.txt" reports "go" rather than "current".
 */
export function projectForKey(key: string): string {
  const filename = key.split('/').pop() ?? '';
  const part = PART_FILENAME.exec(filename);
  if (part) {
    return part[1];
  }
  const segments = key.split('/').slice(0, -1);
  for (let i = segments.length - 1; i >= 0; i--) {
    if (!isVersionDirectory(segments[i])) {
      return segments[i];
    }
  }
  return segments[segments.length - 1] ?? '';
}

/** Published parts per project, keyed by the same name projectForKey returns. */
function publishedPartCounts(keys: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const key of keys) {
    const filename = key.split('/').pop() ?? '';
    if (!PART_FILENAME.test(filename)) {
      continue;
    }
    const project = projectForKey(key);
    counts.set(project, (counts.get(project) ?? 0) + 1);
  }
  return counts;
}

/**
 * The "of M" each project's labels claim in the root file, taken from the
 * first labelled link for that project. A project whose labels disagree
 * with each other is reported against the first one, which is enough to
 * flag it for a human.
 */
function labelledPartCounts(rootLlmsContent: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const line of rootLlmsContent.split('\n')) {
    const label = PART_LABEL.exec(line);
    const url = /\((https:\/\/[^)\s]+)\)/.exec(line);
    if (!label || !url) {
      continue;
    }
    const project = projectForKey(new URL(url[1]).pathname.replace(/^\//, ''));
    if (!counts.has(project)) {
      counts.set(project, Number.parseInt(label[2], 10));
    }
  }
  return counts;
}

export interface DetectDriftInput {
  /** Contents of llms-output/llms.txt. */
  rootLlmsContent: string;
  /** Every *llms.txt key currently published, including docs/llms.txt. */
  publishedKeys: string[];
  /** Markdown page URLs generated for content/landing. */
  landingPages: LandingPageCandidate[];
}

export function detectDrift(input: DetectDriftInput): DriftReport {
  const { rootLlmsContent, publishedKeys, landingPages } = input;

  const linkedUrls = new Set(extractLinkedUrls(rootLlmsContent));
  const projectKeys = publishedKeys.filter((key) => key.endsWith('llms.txt') && key !== ROOT_LLMS_KEY);

  const unlinkedFiles: UnlinkedFile[] = projectKeys
    .filter((key) => !linkedUrls.has(keyToUrl(key)))
    .map((key) => ({ key, url: keyToUrl(key), project: projectForKey(key) }));

  const publishedUrls = new Set(projectKeys.map(keyToUrl));
  const deadLinks = [...linkedUrls].filter(
    (url) => isDocsUrl(url) && url.endsWith('llms.txt') && !publishedUrls.has(url),
  );

  const published = publishedPartCounts(projectKeys);
  const labelled = labelledPartCounts(rootLlmsContent);
  const partCountMismatches: PartCountMismatch[] = [];
  for (const [project, labelledParts] of labelled) {
    const publishedParts = published.get(project) ?? 0;
    if (publishedParts !== labelledParts) {
      partCountMismatches.push({ project, labelledParts, publishedParts });
    }
  }

  const landingPageCandidates = landingPages.filter((page) => !linkedUrls.has(page.url));
  const landingUrls = new Set(landingPages.map((page) => page.url));
  const deadLandingLinks = [...linkedUrls].filter(
    (url) => isDocsUrl(url) && url.endsWith('.md') && !landingUrls.has(url),
  );

  return {
    unlinkedFiles,
    deadLinks,
    partCountMismatches,
    landingPageCandidates,
    deadLandingLinks,
    // Landing candidates alone are not drift: that section is curated, so a
    // page being absent is usually a deliberate editorial choice.
    hasDrift:
      unlinkedFiles.length > 0 ||
      deadLinks.length > 0 ||
      partCountMismatches.length > 0 ||
      deadLandingLinks.length > 0,
  };
}

/** Human-readable report for a terminal or a CI log. */
export function formatDriftReport(report: DriftReport): string {
  const lines: string[] = [];

  if (report.unlinkedFiles.length > 0) {
    lines.push(`Published but not linked from the root llms.txt (${report.unlinkedFiles.length}):`);
    for (const file of report.unlinkedFiles) {
      lines.push(`  + ${file.url}`);
    }
    lines.push('');
  }

  if (report.deadLinks.length > 0) {
    lines.push(`Linked from the root llms.txt but not published (${report.deadLinks.length}):`);
    for (const url of report.deadLinks) {
      lines.push(`  - ${url}`);
    }
    lines.push('');
  }

  if (report.partCountMismatches.length > 0) {
    lines.push(`Part counts that disagree with what's published (${report.partCountMismatches.length}):`);
    for (const mismatch of report.partCountMismatches) {
      lines.push(
        `  ~ ${mismatch.project}: labelled "of ${mismatch.labelledParts}", ${mismatch.publishedParts} published`,
      );
    }
    lines.push('');
  }

  if (report.deadLandingLinks.length > 0) {
    lines.push(`Landing pages linked but no longer present (${report.deadLandingLinks.length}):`);
    for (const url of report.deadLandingLinks) {
      lines.push(`  - ${url}`);
    }
    lines.push('');
  }

  if (report.landingPageCandidates.length > 0) {
    lines.push(
      `Landing pages not linked (${report.landingPageCandidates.length}) - this section is curated, ` +
        'so these are candidates, not required additions:',
    );
    for (const page of report.landingPageCandidates) {
      lines.push(`  ? ${page.title}: ${page.url}`);
    }
    lines.push('');
  }

  if (lines.length === 0) {
    return 'Root llms.txt is up to date: every published file is linked, and every link resolves.';
  }
  return lines.join('\n').trimEnd();
}

export interface ValidateUpdateInput {
  /** The root llms.txt before the edit. */
  before: string;
  /** The proposed replacement. */
  after: string;
  /** The drift the edit was supposed to resolve. */
  drift: DriftReport;
  /** Published keys the drift was computed against. */
  publishedKeys: string[];
}

/**
 * Checks a proposed root llms.txt against the drift it was meant to fix.
 * Returns one message per problem, empty when the edit is acceptable.
 *
 * This is the deterministic half of the weekly update: an agent proposes
 * the edit, and the same detector that found the drift decides whether to
 * accept it. Beyond "is the drift gone", it also guards the blast radius,
 * since an edit that fixes the reported problem while quietly dropping
 * unrelated links would otherwise pass.
 */
export function validateRootLlmsUpdate(input: ValidateUpdateInput): string[] {
  const { before, after, drift, publishedKeys } = input;
  const problems: string[] = [];

  if (!after.startsWith('# ')) {
    problems.push('The updated file does not start with a heading.');
  }
  if (publishedKeys.length === 0) {
    problems.push('No published keys were supplied, so the result cannot be verified.');
    return problems;
  }

  const remaining = detectDrift({
    rootLlmsContent: after,
    publishedKeys,
    landingPages: drift.landingPageCandidates,
  });
  if (remaining.unlinkedFiles.length > 0) {
    problems.push(`Still not linked: ${remaining.unlinkedFiles.map((file) => file.url).join(', ')}`);
  }
  if (remaining.deadLinks.length > 0) {
    problems.push(`Still links files that are not published: ${remaining.deadLinks.join(', ')}`);
  }
  for (const mismatch of remaining.partCountMismatches) {
    problems.push(
      `Part count still wrong for ${mismatch.project}: labelled ${mismatch.labelledParts}, ` +
        `${mismatch.publishedParts} published.`,
    );
  }

  // A link that was valid before must survive the edit: catches unrelated
  // entries being dropped while fixing something else.
  const linksBefore = new Set(before.match(/https:\/\/[^)\s]+/g) ?? []);
  const linksAfter = new Set(after.match(/https:\/\/[^)\s]+/g) ?? []);
  const removed = [...linksBefore].filter((url) => !linksAfter.has(url) && !drift.deadLinks.includes(url));
  if (removed.length > 0) {
    problems.push(`Removed links that are still published: ${removed.join(', ')}`);
  }

  return problems;
}

/**
 * Content directories that look like documentation projects but have no
 * entry in the dir-name-to-prefix map, so no URL can be computed for them.
 *
 * This matters when the map is a committed snapshot rather than one built
 * fresh from the docsets database: a brand-new docset is absent from a
 * stale snapshot, and would otherwise be silently skipped - which is the
 * exact case the weekly check exists to catch. Reporting it turns a silent
 * miss into "refresh the snapshot".
 */
export function unmappedProjects(contentDirs: string[], mappedDirs: string[], excluded: Set<string>): string[] {
  const mapped = new Set(mappedDirs);
  return contentDirs.filter((dir) => !mapped.has(dir) && !excluded.has(dir)).sort();
}
