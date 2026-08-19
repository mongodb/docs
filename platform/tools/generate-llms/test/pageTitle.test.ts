import { describe, expect, it } from 'vitest';
import { extractPageTitle, isHeadingUnderline } from '../src/rst/pageTitle';

describe('isHeadingUnderline', () => {
  it('recognizes single-character repeated lines', () => {
    expect(isHeadingUnderline('=========')).toBe(true);
    expect(isHeadingUnderline('---')).toBe(true);
    expect(isHeadingUnderline('~')).toBe(true);
  });

  it('rejects mixed or empty content', () => {
    expect(isHeadingUnderline('')).toBe(false);
    expect(isHeadingUnderline('Documents')).toBe(false);
    expect(isHeadingUnderline('==-==')).toBe(false);
  });
});

// Ported from audit-cli's internal/rst/page_title_test.go
describe('extractPageTitle', () => {
  it('extracts an underline-only heading', () => {
    const content = `Documents
=========

Body text.
`;
    expect(extractPageTitle(content)).toBe('Documents');
  });

  it('extracts an overline and underline heading', () => {
    const content = `=========
Documents
=========

Body text.
`;
    expect(extractPageTitle(content)).toBe('Documents');
  });

  it('extracts the title after a meta directive', () => {
    const content = `.. meta::
   :description: A summary.

================================
Rotate Keys for Sharded Clusters
================================
`;
    expect(extractPageTitle(content)).toBe('Rotate Keys for Sharded Clusters');
  });

  it('skips directives and field lists', () => {
    const content = `.. default-domain:: mongodb

My Page Title
=============
`;
    expect(extractPageTitle(content)).toBe('My Page Title');
  });

  it('returns empty string when there is no heading', () => {
    const content = `.. include:: /includes/foo.rst

Just a paragraph with no heading.
`;
    expect(extractPageTitle(content)).toBe('');
  });
});
