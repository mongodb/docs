/**
 * Port of audit-cli's renderContent (grove-platform/audit-cli#7).
 */
import type { PageEntry } from './types.js';

/**
 * Builds the llms.txt body for a project.
 *
 * `headerTitle` is rendered as the H1 (e.g. "Atlas Architecture Center - (current)").
 * `indexDescription` — the project's (or, for a split project, this part's)
 * hand-maintained summary, from llms-descriptions.json, not any page's own
 * meta description — is rendered as a blockquote directly under the header
 * when `withDescription` is true and non-empty. Each page is then listed as
 * `- [Title](url): description` when it has its own meta `:description:`
 * and `withDescription` is true, or a plain `- [Title](url)` otherwise.
 */
export function renderContent(
  headerTitle: string,
  indexDescription: string,
  pages: PageEntry[],
  withDescription: boolean,
): string {
  const lines: string[] = [`# ${headerTitle}`, ''];
  if (withDescription && indexDescription !== '') {
    lines.push(`> ${indexDescription}`, '');
  }
  for (const page of pages) {
    lines.push(renderPageLine(page, withDescription));
  }
  return `${lines.join('\n')}\n`;
}

/** `- [title](url): description`, or `- [title](url)` if there's no description to show. */
export function renderPageLine(page: PageEntry, withDescription: boolean): string {
  if (withDescription && page.description !== '') {
    return `- [${page.title}](${page.url}): ${page.description}`;
  }
  return `- [${page.title}](${page.url})`;
}

/**
 * Counts Unicode code points in a string (matches Go's
 * utf8.RuneCountInString, as opposed to JS's UTF-16-code-unit-based
 * `.length`).
 */
export function codePointLength(text: string): number {
  return [...text].length;
}
