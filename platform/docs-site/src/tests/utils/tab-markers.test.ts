import { filterTabs, parseTabsParam } from '@/utils/tab-markers';

// Mirrors the shape mdx-to-md emits with `tabMarkers: true`. The writer asserts
// the same literal markers in tools/mdx-to-md/test/plugins.test.ts; if these two
// ever disagree, filtering silently stops matching.
const allTabsDoc = [
  '<!--',
  'Tab options on this page.',
  '-->',
  '',
  '# Connect',
  '',
  'Intro prose.',
  '',
  '<!--tab tabid="shell" tabset="drivers"-->',
  '',
  '### MongoDB Shell',
  '',
  'Shell content.',
  '',
  '<!--/tab-->',
  '',
  '<!--tab tabid="nodejs" tabset="drivers"-->',
  '',
  '### Node.js',
  '',
  'Node content.',
  '',
  '<!--/tab-->',
  '',
  'Outro prose.',
  '',
].join('\n');

describe('parseTabsParam', () => {
  it('splits a comma-separated list and trims each id', () => {
    expect(parseTabsParam('nodejs, shell')).toEqual(['nodejs', 'shell']);
  });

  it('returns an empty list for a missing or empty param', () => {
    expect(parseTabsParam(null)).toEqual([]);
    expect(parseTabsParam('')).toEqual([]);
    expect(parseTabsParam(' , ')).toEqual([]);
  });
});

describe('filterTabs', () => {
  it('keeps the requested tab and drops the others', () => {
    const result = filterTabs(allTabsDoc, ['nodejs']);
    expect(result).toContain('### Node.js');
    expect(result).toContain('Node content.');
    expect(result).not.toContain('### MongoDB Shell');
    expect(result).not.toContain('Shell content.');
  });

  it('leaves content outside the tab markers untouched', () => {
    const result = filterTabs(allTabsDoc, ['nodejs']);
    expect(result).toContain('Tab options on this page.');
    expect(result).toContain('# Connect');
    expect(result).toContain('Intro prose.');
    expect(result).toContain('Outro prose.');
  });

  it('keeps multiple requested tabs in document order', () => {
    const result = filterTabs(allTabsDoc, ['nodejs', 'shell']);
    expect(result.indexOf('### MongoDB Shell')).toBeLessThan(result.indexOf('### Node.js'));
  });

  it('matches tab ids case-insensitively and ignores surrounding whitespace', () => {
    expect(filterTabs(allTabsDoc, ['  NodeJS  '])).toContain('### Node.js');
  });

  it('drops every tab when no id matches, leaving surrounding prose', () => {
    const result = filterTabs(allTabsDoc, ['does-not-exist']);
    expect(result).not.toContain('### Node.js');
    expect(result).not.toContain('### MongoDB Shell');
    expect(result).toContain('Intro prose.');
    expect(result).toContain('Outro prose.');
  });

  it('drops a tab that has no tabid, since it is not addressable', () => {
    const doc = '<!--tab tabset="drivers"-->\n\nUnlabeled.\n\n<!--/tab-->\n';
    expect(filterTabs(doc, ['drivers'])).not.toContain('Unlabeled.');
  });

  it('returns the document unchanged when no ids are requested', () => {
    expect(filterTabs(allTabsDoc, [])).toBe(allTabsDoc);
  });

  it('does not collapse tabs into each other when a block is removed', () => {
    const result = filterTabs(allTabsDoc, ['shell']);
    expect(result).not.toMatch(/\n{3,}/);
  });

  // Removal must not reflow the rest of the document: blank lines are
  // significant inside a fenced code block.
  it('preserves consecutive blank lines outside the tab markers', () => {
    const doc = ['```js', 'const a = 1;', '', '', 'const b = 2;', '```', '', allTabsDoc].join('\n');
    expect(filterTabs(doc, ['nodejs'])).toContain('const a = 1;\n\n\nconst b = 2;');
  });
});
