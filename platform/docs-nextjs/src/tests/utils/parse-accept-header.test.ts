import { parseAcceptHeader, prefersMarkdown } from '@/utils/parse-accept-header';

describe('parseAcceptHeader', () => {
  it('returns empty array for empty string', () => {
    expect(parseAcceptHeader('')).toEqual([]);
  });

  it('parses a single type', () => {
    const result = parseAcceptHeader('text/html');
    expect(result).toEqual([{ type: 'text', subtype: 'html', quality: 1 }]);
  });

  it('parses multiple types with quality values', () => {
    const result = parseAcceptHeader('text/html;q=0.9, text/markdown;q=1.0');
    expect(result[0]).toEqual({ type: 'text', subtype: 'markdown', quality: 1 });
    expect(result[1]).toEqual({ type: 'text', subtype: 'html', quality: 0.9 });
  });

  it('handles wildcard types', () => {
    const result = parseAcceptHeader('*/*');
    expect(result).toEqual([{ type: '*', subtype: '*', quality: 1 }]);
  });

  it('sorts by specificity when quality is equal', () => {
    const result = parseAcceptHeader('*/*, text/*, text/html');
    expect(result.map((r) => `${r.type}/${r.subtype}`)).toEqual([
      'text/html',
      'text/*',
      '*/*',
    ]);
  });

  it('clamps out-of-range quality values', () => {
    const result = parseAcceptHeader('text/html;q=5.0');
    expect(result[0]?.quality).toBe(1);
  });
});

describe('prefersMarkdown', () => {
  it('returns false for null header', () => {
    expect(prefersMarkdown(null)).toBe(false);
  });

  it('returns false for empty header', () => {
    expect(prefersMarkdown('')).toBe(false);
  });

  it('returns false for a typical browser Accept header', () => {
    expect(
      prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    ).toBe(false);
  });

  it('returns true when markdown is explicitly preferred', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
  });

  it('returns true when markdown has higher quality than html', () => {
    expect(prefersMarkdown('text/markdown;q=1.0, text/html;q=0.9')).toBe(true);
  });

  it('returns false when html has higher quality than markdown', () => {
    expect(prefersMarkdown('text/markdown;q=0.5, text/html;q=1.0')).toBe(false);
  });

  it('returns false when both have equal quality (defaults to HTML)', () => {
    expect(prefersMarkdown('text/markdown, text/html')).toBe(false);
  });

  it('returns true for text/markdown even with wildcard fallback', () => {
    expect(prefersMarkdown('text/markdown, */*;q=0.1')).toBe(true);
  });

  it('returns false for only */* (wildcard matches both equally)', () => {
    expect(prefersMarkdown('*/*')).toBe(false);
  });
});
