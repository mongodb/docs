import { describe, expect, it } from 'vitest';
import { extractMetaDescription } from '../src/rst/metaDescription';

// Ported from audit-cli's internal/rst/meta_parser_test.go
describe('extractMetaDescription', () => {
  it('extracts a description alongside other options', () => {
    const content = `.. meta::
   :robots: noindex, nosnippet
   :description: Definition and structure of documents.

====
Docs
====
`;
    expect(extractMetaDescription(content)).toBe('Definition and structure of documents.');
  });

  it('extracts a description-only meta directive', () => {
    const content = `.. meta::
   :description: A short summary.

Title
=====
`;
    expect(extractMetaDescription(content)).toBe('A short summary.');
  });

  it('joins a multi-line description', () => {
    const content = `.. meta::
   :description: This description wraps
                  across multiple lines.

Title
=====
`;
    expect(extractMetaDescription(content)).toBe('This description wraps across multiple lines.');
  });

  it('returns empty string when there is no meta directive', () => {
    const content = `Title
=====

Some content.
`;
    expect(extractMetaDescription(content)).toBe('');
  });

  it('returns empty string when meta has no description', () => {
    const content = `.. meta::
   :robots: noindex

Title
=====
`;
    expect(extractMetaDescription(content)).toBe('');
  });
});
