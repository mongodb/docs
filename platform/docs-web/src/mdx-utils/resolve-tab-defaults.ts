import { parse as parseYaml } from 'yaml';
import { getDefaultTabs } from '@/utils/get-default-tabs';

// Leading `---` fenced YAML frontmatter block (the only frontmatter form used
// by the MDX content in this repo).
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Parse a page's frontmatter and return the default tab id per selector-driven
 * tabset (e.g. `{ drivers: 'shell' }`), using the same rules the rendered page
 * applies. Returns `{}` when the page declares no selectors. Never throws.
 */
export function resolveTabDefaults(mdxString: string): Record<string, string> {
  const match = FRONTMATTER_RE.exec(mdxString);
  if (!match) return {};

  let data: unknown;
  try {
    data = parseYaml(match[1]);
  } catch {
    return {};
  }

  const options = (data as { options?: unknown } | null)?.options as
    | { selectors?: Record<string, Record<string, unknown>>; default_tabs?: Record<string, string> }
    | undefined;
  const selectors = options?.selectors;
  if (!selectors || typeof selectors !== 'object' || Object.keys(selectors).length === 0) {
    return {};
  }

  const defaultTabs = options?.default_tabs ?? {};
  const choicesPerSelector: Record<string, { value: string }[]> = {};
  for (const selectorKey of Object.keys(selectors)) {
    choicesPerSelector[selectorKey] = Object.keys(selectors[selectorKey] ?? {}).map((value) => ({ value }));
  }

  return getDefaultTabs(choicesPerSelector, defaultTabs);
}
