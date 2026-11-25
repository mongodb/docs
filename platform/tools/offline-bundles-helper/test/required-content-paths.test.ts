import { describe, expect, it } from 'vitest';
import { getRequiredContentPathsForBundle } from '../src/required-content-paths.js';
import { contentEntry, makeContentData } from './fixtures.js';

const allContentData = makeContentData({
  docsPaths: {
    'docs/manual': contentEntry('docs', 'manual'),
    'docs/upcoming': contentEntry('docs', 'upcoming'),
    'docs/v7.0': contentEntry('docs', 'v7.0', false),
    landing: contentEntry('landing', ''),
    'cloud-docs': contentEntry('cloud-docs', ''),
    'golang/current': contentEntry('golang', 'current'),
  },
});

describe('getRequiredContentPathsForBundle', () => {
  it('requires only the requested versions of the bundle\'s own project', () => {
    expect(
      getRequiredContentPathsForBundle(
        'development.versioned.docs.ts',
        ['manual'],
        new Set(['docs', 'landing', 'cloud-docs']),
        allContentData,
      ),
    ).toEqual(new Set(['docs/manual', 'landing', 'cloud-docs']));
  });

  it('requires every active version when no versions are given', () => {
    expect(
      getRequiredContentPathsForBundle(
        'development.versioned.docs.ts',
        [],
        new Set(['docs']),
        allContentData,
      ),
    ).toEqual(new Set(['docs/manual', 'docs/upcoming']));
  });

  it('never requires an inactive version', () => {
    expect(
      getRequiredContentPathsForBundle(
        'development.versioned.docs.ts',
        ['v7.0'],
        new Set(['docs']),
        allContentData,
      ),
    ).toEqual(new Set());
  });

  it('skips projects the bundle does not reference', () => {
    expect(
      getRequiredContentPathsForBundle(
        'go.versioned.golang.ts',
        ['current'],
        new Set(['golang', 'landing']),
        allContentData,
      ),
    ).toEqual(new Set(['golang/current', 'landing']));
  });

  it('treats every referenced site as unversioned for a non-versioned bundle', () => {
    expect(
      getRequiredContentPathsForBundle(
        'tools.ts',
        [],
        new Set(['landing', 'cloud-docs']),
        allContentData,
      ),
    ).toEqual(new Set(['landing', 'cloud-docs']));
  });
});
