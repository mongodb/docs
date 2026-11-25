import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  filterActiveVersions,
  findAllActiveVersionsForProject,
  getChangedProjectAndVersions,
} from '../src/active-versions.js';
import { contentEntry, docset, version } from './fixtures.js';

const docsetsByProject = {
  docs: docset('docs', [version('manual'), version('v7.0', false)]),
};

describe('findAllActiveVersionsForProject', () => {
  it('returns only active version names', () => {
    expect(findAllActiveVersionsForProject('docs', docsetsByProject)).toEqual([
      'manual',
    ]);
  });

  it('returns undefined for an unknown project', () => {
    expect(findAllActiveVersionsForProject('nope', docsetsByProject)).toBeUndefined();
  });
});

describe('filterActiveVersions', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('drops inactive versions', () => {
    expect(
      filterActiveVersions({ docs: ['manual', 'v7.0'] }, docsetsByProject),
    ).toEqual({ docs: ['manual'] });
  });

  it('keeps every version for a project with no docset', () => {
    expect(filterActiveVersions({ nope: ['a', 'b'] }, docsetsByProject)).toEqual({
      nope: ['a', 'b'],
    });
  });
});

describe('getChangedProjectAndVersions', () => {
  it('groups changed content paths by project and skips unversioned names', () => {
    expect(
      getChangedProjectAndVersions(['docs/manual', 'docs/upcoming', 'landing', 'unknown'], {
        'docs/manual': contentEntry('docs', 'manual'),
        'docs/upcoming': contentEntry('docs', 'upcoming'),
        landing: contentEntry('landing', ''),
      }),
    ).toEqual({ docs: ['manual', 'upcoming'], landing: [] });
  });
});
