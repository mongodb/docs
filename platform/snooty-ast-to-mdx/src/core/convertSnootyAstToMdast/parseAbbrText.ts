/** Matches Snooty's raw `:abbr:` text, e.g. "AWS (Amazon Web Services)". */
const ABBR_EXPANSION_PATTERN = /^(.+?)\s*\((.+)\)$/;

export interface ParsedAbbrText {
  term: string;
  tooltip?: string;
}

/**
 * Splits the combined "term (expansion)" text Snooty produces for `:abbr:` roles
 * into its term and tooltip parts, e.g. "AWS (Amazon Web Services)" -> { term: "AWS",
 * tooltip: "Amazon Web Services" }. Falls back to the full text as the term when there's
 * no parenthetical expansion to split off.
 */
export const parseAbbrText = (textContent: string): ParsedAbbrText => {
  const match = textContent.match(ABBR_EXPANSION_PATTERN);
  if (!match) return { term: textContent };
  const [, term, tooltip] = match;
  return { term, tooltip };
};
