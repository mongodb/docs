interface MediaRange {
  type: string;
  subtype: string;
  quality: number;
}

/**
 * Parses an HTTP Accept header into an ordered list of media ranges.
 * Supports quality values (q=0.0–1.0) and wildcard types.
 *
 * @example
 *   parseAcceptHeader('text/markdown;q=1.0, text/html;q=0.9')
 *   // → [{ type: 'text', subtype: 'markdown', quality: 1 },
 *   //    { type: 'text', subtype: 'html', quality: 0.9 }]
 */
function parseAcceptHeader(header: string): MediaRange[] {
  if (!header) return [];

  return header
    .split(',')
    .map((entry) => {
      const parts = entry.trim().split(';');
      const [type = '*', subtype = '*'] = (parts[0] ?? '').trim().split('/');

      let quality = 1;
      for (const param of parts.slice(1)) {
        const [key, value] = param.trim().split('=');
        if (key?.trim() === 'q' && value !== undefined) {
          quality = Math.max(0, Math.min(1, Number.parseFloat(value)));
          if (Number.isNaN(quality)) quality = 1;
        }
      }

      return { type, subtype, quality };
    })
    .sort((a, b) => {
      if (b.quality !== a.quality) return b.quality - a.quality;
      // More-specific types win ties: exact > partial-wildcard > full-wildcard
      const specificity = (m: MediaRange) => (m.type === '*' ? 0 : m.subtype === '*' ? 1 : 2);
      return specificity(b) - specificity(a);
    });
}

/**
 * Returns true when the Accept header indicates the client prefers
 * `text/markdown` over `text/html`.
 *
 * Defaults to false when the header is missing, empty, or when the two
 * types have equal effective quality — browsers always send text/html so
 * this keeps the default behavior unchanged.
 */
function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const ranges = parseAcceptHeader(acceptHeader);
  if (ranges.length === 0) return false;

  const mdQuality = effectiveQuality(ranges, 'text', 'markdown');
  const htmlQuality = effectiveQuality(ranges, 'text', 'html');

  // Strictly prefer — equal quality falls through to HTML (the default).
  return mdQuality > htmlQuality;
}

/** Resolve the effective quality for a concrete media type by walking
 *  the parsed ranges from most to least specific. */
function effectiveQuality(ranges: MediaRange[], type: string, subtype: string): number {
  for (const r of ranges) {
    if (r.type === type && r.subtype === subtype) return r.quality;
  }
  for (const r of ranges) {
    if (r.type === type && r.subtype === '*') return r.quality;
  }
  for (const r of ranges) {
    if (r.type === '*' && r.subtype === '*') return r.quality;
  }
  return 0;
}

export { parseAcceptHeader, prefersMarkdown };
export type { MediaRange };
