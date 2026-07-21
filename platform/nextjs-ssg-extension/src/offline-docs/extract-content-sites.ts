/**
 * Finds the byte offsets of every top-level-or-nested `{ ... }` object literal in `text`,
 * ignoring braces that appear inside string literals.
 */
const getObjectSpans = (
  text: string,
): { start: number; end: number }[] => {
  const spans: { start: number; end: number }[] = [];
  const openIndices: number[] = [];
  let inString: string | null = null;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inString) {
      if (char === '\\') {
        i++;
        continue;
      }
      if (char === inString) inString = null;
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      inString = char;
      continue;
    }

    if (char === '{') {
      openIndices.push(i);
    } else if (char === '}') {
      const start = openIndices.pop();
      if (start !== undefined) spans.push({ start, end: i });
    }
  }

  return spans;
};

/**
 * Returns the text of `span`'s direct properties only — any nested `{ ... }` or `[ ... ]`
 * values are blanked out so their contents can't be mistaken for direct properties of
 * the outer object (e.g. a nested item's own `url` shouldn't count as the parent's `url`).
 */
const getDirectPropsText = (
  text: string,
  span: { start: number; end: number },
): string => {
  let result = '';
  let depth = 0;
  let inString: string | null = null;

  for (let i = span.start + 1; i < span.end; i++) {
    const char = text[i];

    if (inString) {
      if (char === '\\') {
        result += ' ';
        i++;
        continue;
      }
      if (char === inString) inString = null;
      result += depth === 0 ? char : ' ';
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      if (depth === 0) {
        inString = char;
        result += char;
      } else {
        inString = char;
        result += ' ';
      }
      continue;
    }

    if (char === '{' || char === '[') {
      depth++;
      result += ' ';
      continue;
    }
    if (char === '}' || char === ']') {
      depth--;
      result += ' ';
      continue;
    }

    result += depth === 0 ? char : ' ';
  }

  return result;
};

/**
 * Extracts the set of `contentSite` values used by real page items (i.e. items with their
 * own `url`) in an offline TOC file's source text. Deliberately excludes `contentSite`
 * values that only label a decorative grouping object (`group: true`, no `url` of its own)
 * so that a group header referencing another contentSite doesn't cause that contentSite's
 * content to be treated as required — e.g. in `tools.ts`:
 *
 *   { label: 'For Agents', contentSite: 'docs', group: true, items: [
 *     { label: 'Agent Skills', contentSite: 'landing', url: '/docs/agent-skills' },
 *     ...
 *   ]}
 *
 * only `landing` is required here, not `docs`.
 */
export const extractContentSitesWithPages = (
  tocFileSource: string,
): Set<string> => {
  const contentSites = new Set<string>();

  for (const span of getObjectSpans(tocFileSource)) {
    const directProps = getDirectPropsText(tocFileSource, span);
    const contentSiteMatch = directProps.match(/contentSite:\s*'([^']+)'/);
    if (!contentSiteMatch) continue;

    const hasOwnUrl = /url:\s*['"]/.test(directProps);
    if (!hasOwnUrl) continue;

    contentSites.add(contentSiteMatch[1]);
  }

  return contentSites;
};
