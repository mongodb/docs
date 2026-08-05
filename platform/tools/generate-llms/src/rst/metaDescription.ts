/**
 * Port of audit-cli's internal/rst/meta_parser.go (grove-platform/audit-cli#7).
 */

/**
 * Extracts the value of the `:description:` field from the first
 * `.. meta::` directive in RST source content.
 *
 * The meta directive looks like:
 *
 *   .. meta::
 *      :robots: noindex, nosnippet
 *      :description: A short summary of the page.
 *
 * The description value may wrap across multiple indented continuation
 * lines, which are joined with single spaces.
 *
 * Returns an empty string if there is no meta directive or no
 * `:description:` field.
 */
export function extractMetaDescription(content: string): string {
  const lines = content.split('\n');

  let inMeta = false;
  let collecting = false;
  const parts: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inMeta) {
      if (trimmed.startsWith('.. meta::')) {
        inMeta = true;
      }
      continue;
    }

    // Inside the meta directive.
    const indented = line.length > 0 && (line[0] === ' ' || line[0] === '\t');

    // A blank line does not end the directive on its own, but it does end a
    // multi-line description value.
    if (trimmed === '') {
      if (collecting) {
        break;
      }
      continue;
    }

    // A non-indented, non-blank line ends the meta directive block.
    if (!indented) {
      break;
    }

    if (collecting) {
      // Continuation lines are indented more deeply and are not new options.
      if (trimmed.startsWith(':')) {
        break;
      }
      parts.push(trimmed);
      continue;
    }

    // Look for the :description: option.
    if (trimmed.startsWith(':description:')) {
      const value = trimmed.slice(':description:'.length).trim();
      parts.push(value);
      collecting = true;
    }
  }

  return parts.join(' ').trim();
}
