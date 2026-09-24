import { describe, expect, it } from 'vitest';
import { contentDirFromDocsProject } from '../src/publishProject';
import { isExcludedFromUpload } from '../src/uploadManifest';

describe('contentDirFromDocsProject', () => {
  it('returns a bare project name unchanged', () => {
    expect(contentDirFromDocsProject('manual')).toBe('manual');
  });

  it('takes the first path segment of a versioned DOCS_PROJECT value', () => {
    expect(contentDirFromDocsProject('pymongo-driver/current')).toBe('pymongo-driver');
  });

  it('tolerates a leading slash and surrounding whitespace', () => {
    expect(contentDirFromDocsProject('  /atlas/v2 ')).toBe('atlas');
  });

  it('returns undefined when unset or empty', () => {
    expect(contentDirFromDocsProject(undefined)).toBeUndefined();
    expect(contentDirFromDocsProject('  ')).toBeUndefined();
  });
});

describe('isExcludedFromUpload', () => {
  it('excludes landing, whose file would collide with the root llms.txt key', () => {
    expect(isExcludedFromUpload('landing')).toBe(true);
  });

  it('does not exclude an ordinary project', () => {
    expect(isExcludedFromUpload('atlas')).toBe(false);
  });
});
