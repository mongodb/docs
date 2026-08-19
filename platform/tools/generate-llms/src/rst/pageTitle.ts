/**
 * Port of audit-cli's internal/rst/page_title.go (grove-platform/audit-cli#7).
 */

/**
 * Characters RST commonly uses as heading overline/underline adornment.
 * A heading underline/overline is a line made up entirely of one repeated
 * character from this set.
 */
const HEADING_ADORNMENT_CHARS = new Set([
  '=',
  '-',
  '~',
  '^',
  '"',
  "'",
  '`',
  ':',
  '.',
  '_',
  '*',
  '+',
  '#',
  '<',
  '>',
]);

/**
 * Returns true if `line` is an RST heading underline/overline: one or more
 * repetitions of a single adornment character, with nothing else on the line.
 */
export function isHeadingUnderline(line: string): boolean {
  if (line.length === 0) {
    return false;
  }
  const first = line[0];
  if (!HEADING_ADORNMENT_CHARS.has(first)) {
    return false;
  }
  for (const char of line) {
    if (char !== first) {
      return false;
    }
  }
  return true;
}

/**
 * Extracts a page's H1 title from RST source content.
 *
 * Finds the first section heading, supporting both underline-only headings:
 *
 *   Page Title
 *   ==========
 *
 * and overline+underline headings:
 *
 *   ==========
 *   Page Title
 *   ==========
 *
 * Directive lines (starting with "..") and RST field/option lines (starting
 * with ":") are not considered valid titles.
 *
 * Returns an empty string if no heading is found.
 */
export function extractPageTitle(content: string): string {
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (!isHeadingUnderline(lines[i].trim())) {
      continue;
    }

    // The title is the immediately preceding non-empty text line.
    if (i === 0) {
      continue;
    }
    const candidate = lines[i - 1].trim();
    if (candidate === '') {
      continue;
    }
    // Skip directives, field lists, and overline rows.
    if (candidate.startsWith('..') || candidate.startsWith(':')) {
      continue;
    }
    if (isHeadingUnderline(candidate)) {
      continue;
    }
    return candidate;
  }

  return '';
}
