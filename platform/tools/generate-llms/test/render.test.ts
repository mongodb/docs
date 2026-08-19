import { describe, expect, it } from 'vitest';
import { codePointLength, renderContent, renderPageLine } from '../src/render';
import type { PageEntry } from '../src/types';

describe('renderContent', () => {
  const pages: PageEntry[] = [
    { title: 'Documents', url: 'https://ex.com/a.md', description: '', sourcePath: '', pagePath: '', l3: '' },
    { title: 'Quick Start', url: 'https://ex.com/b.md', description: '', sourcePath: '', pagePath: '', l3: '' },
  ];

  it('renders the header title as an H1', () => {
    const content = renderContent('Manual - (current)', '', pages, true);
    expect(content.startsWith('# Manual - (current)\n\n')).toBe(true);
  });

  it('includes the index description as a blockquote under the header when requested', () => {
    const content = renderContent('Manual - (current)', 'The MongoDB manual.', pages, true);
    expect(content).toContain('# Manual - (current)\n\n> The MongoDB manual.\n\n');
  });

  it('omits the blockquote entirely when the index description is empty', () => {
    const content = renderContent('Manual - (current)', '', pages, true);
    expect(content).not.toContain('>');
  });

  it('omits the blockquote when withDescription is false, even if an index description exists', () => {
    const content = renderContent('Manual - (current)', 'The MongoDB manual.', pages, false);
    expect(content).not.toContain('The MongoDB manual.');
  });

  it('lists a page with no meta description as a plain link', () => {
    const content = renderContent('Manual - (current)', 'The MongoDB manual.', pages, true);
    expect(content).toContain('- [Documents](https://ex.com/a.md)\n');
    expect(content).toContain('- [Quick Start](https://ex.com/b.md)\n');
  });

  it('appends a page`s own meta description inline when it has one', () => {
    const pagesWithDescriptions: PageEntry[] = [
      { ...pages[0], description: 'Learn about documents.' },
      pages[1],
    ];
    const content = renderContent('Manual - (current)', '', pagesWithDescriptions, true);
    expect(content).toContain('- [Documents](https://ex.com/a.md): Learn about documents.\n');
    expect(content).toContain('- [Quick Start](https://ex.com/b.md)\n');
  });

  it('omits every page`s inline description when withDescription is false', () => {
    const pagesWithDescriptions: PageEntry[] = [{ ...pages[0], description: 'Learn about documents.' }, pages[1]];
    const content = renderContent('Manual - (current)', '', pagesWithDescriptions, false);
    expect(content).not.toContain('Learn about documents.');
    expect(content).toContain('- [Documents](https://ex.com/a.md)\n');
  });
});

describe('renderPageLine', () => {
  const page: PageEntry = {
    title: 'Documents',
    url: 'https://ex.com/a.md',
    description: 'Learn about documents.',
    sourcePath: '',
    pagePath: '',
    l3: '',
  };

  it('appends ": description" when the page has one and withDescription is true', () => {
    expect(renderPageLine(page, true)).toBe('- [Documents](https://ex.com/a.md): Learn about documents.');
  });

  it('omits the description when withDescription is false', () => {
    expect(renderPageLine(page, false)).toBe('- [Documents](https://ex.com/a.md)');
  });

  it('omits the trailing colon when the page has no description', () => {
    expect(renderPageLine({ ...page, description: '' }, true)).toBe('- [Documents](https://ex.com/a.md)');
  });
});

describe('codePointLength', () => {
  it('counts ASCII text like string length', () => {
    expect(codePointLength('hello')).toBe(5);
  });

  it('counts a surrogate-pair emoji as a single code point', () => {
    expect(codePointLength('a😀b')).toBe(3);
    expect('a😀b'.length).toBe(4); // for contrast: UTF-16 code units differ
  });
});
