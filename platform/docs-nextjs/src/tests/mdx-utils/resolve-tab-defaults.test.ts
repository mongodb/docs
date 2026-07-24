import { resolveTabDefaults } from '@/mdx-utils/resolve-tab-defaults';

const withFrontmatter = (yaml: string, body = 'content') => `---\n${yaml}\n---\n\n${body}\n`;

describe('resolveTabDefaults', () => {
  it('returns the configured default for a drivers selector', () => {
    const mdx = withFrontmatter(
      [
        'options:',
        '  selectors:',
        '    drivers:',
        '      shell:',
        '        - type: text',
        '          value: MongoDB Shell',
        '      python:',
        '        - type: text',
        '          value: Python',
        '  default_tabs:',
        '    drivers: python',
      ].join('\n'),
    );
    expect(resolveTabDefaults(mdx)).toEqual({ drivers: 'python' });
  });

  it('falls back to nodejs for drivers when default_tabs is absent', () => {
    const mdx = withFrontmatter(
      [
        'options:',
        '  selectors:',
        '    drivers:',
        '      shell:',
        '        - type: text',
        '          value: MongoDB Shell',
        '      nodejs:',
        '        - type: text',
        '          value: Node.js',
      ].join('\n'),
    );
    expect(resolveTabDefaults(mdx)).toEqual({ drivers: 'nodejs' });
  });

  it('returns an empty map when there are no selectors', () => {
    expect(resolveTabDefaults(withFrontmatter('title: Example'))).toEqual({});
  });

  it('returns an empty map when there is no frontmatter', () => {
    expect(resolveTabDefaults('# Just a heading\n')).toEqual({});
  });
});
