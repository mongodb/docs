/**
 * Quotes text for inclusion in an error message, truncated so a long
 * translation can't bloat the response. JSON-quoting makes whitespace
 * and control characters visible when debugging a failed key.
 */
export const EXCERPT_MAX_CHARS = 300;

export function excerpt(text: string, maxChars = EXCERPT_MAX_CHARS): string {
  if (text.length <= maxChars) return JSON.stringify(text);
  const omitted = text.length - maxChars;
  return `${JSON.stringify(text.slice(0, maxChars))} (+${omitted} more chars)`;
}
