import { stripDocsPrefix } from '../../src/blobUploads/utils';

describe('stripDocsPrefix', () => {
  it('strips "docs/" prefix', () => {
    expect(stripDocsPrefix('docs/atlas/cli')).toBe('atlas/cli');
  });

  it('strips "/docs/" prefix', () => {
    expect(stripDocsPrefix('/docs/atlas/cli')).toBe('atlas/cli');
  });

  it('strips bare "docs" prefix (no trailing slash)', () => {
    expect(stripDocsPrefix('docs')).toBe('');
  });

  it('strips bare "/docs" prefix (no trailing slash)', () => {
    expect(stripDocsPrefix('/docs')).toBe('');
  });

  it('returns non-docs prefixes unchanged', () => {
    expect(stripDocsPrefix('languages/python')).toBe('languages/python');
  });

  it('does not strip prefixes that only start with "doc"', () => {
    expect(stripDocsPrefix('doctrine/current')).toBe('doctrine/current');
  });
});
