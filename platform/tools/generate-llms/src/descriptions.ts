/**
 * Hand-maintained per-project summary descriptions, read from
 * llms-descriptions.json (package root). Rendered as the blockquote
 * ("> ...") under each written llms.txt / <project>-<n>-llms.txt header.
 *
 * These are edited by hand, not extracted from a page's RST
 * `:description:` meta tag: that gives full editorial control over what an
 * agent reads first, independent of a page's SEO description (which isn't
 * necessarily the best summary for this purpose) and of exactly which pages
 * land in which split part as content grows over time.
 *
 * Schema: `{ [contentDirectoryName]: string | string[] }`
 *   - A plain string applies to every part of that project, including a
 *     project that isn't split at all.
 *   - An array supplies one description per part, in part order. If the
 *     array has exactly one entry, it's reused for every part instead
 *     (same effect as a plain string).
 *   - A project (or a part with no corresponding array entry) that isn't
 *     in the file at all resolves to PLACEHOLDER_DESCRIPTION, so it's
 *     obvious from the written output that it still needs a real one.
 */
import fs from 'node:fs/promises';

export type DescriptionsMap = Record<string, string | string[]>;

export const PLACEHOLDER_DESCRIPTION = 'INSERT DESCRIPTION HERE';

/** Returns {} (every project falls back to the placeholder) if the file is missing. */
export async function loadDescriptions(descriptionsPath: string): Promise<DescriptionsMap> {
  let raw: string;
  try {
    raw = await fs.readFile(descriptionsPath, 'utf-8');
  } catch {
    console.warn(
      `No descriptions file found at ${descriptionsPath}; every project will use "${PLACEHOLDER_DESCRIPTION}".`,
    );
    return {};
  }
  return JSON.parse(raw) as DescriptionsMap;
}

/**
 * Resolves the description for one part of a project.
 *
 * `partIndex` is 0-based; pass 0 for a project that isn't split.
 */
export function resolveDescription(project: string, partIndex: number, descriptions: DescriptionsMap): string {
  const entry = descriptions[project];
  if (entry === undefined) {
    return PLACEHOLDER_DESCRIPTION;
  }
  if (typeof entry === 'string') {
    return entry;
  }
  if (entry.length === 0) {
    return PLACEHOLDER_DESCRIPTION;
  }
  if (entry.length === 1) {
    return entry[0];
  }
  return entry[partIndex] ?? PLACEHOLDER_DESCRIPTION;
}
