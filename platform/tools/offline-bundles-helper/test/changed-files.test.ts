import { describe, expect, it } from 'vitest';
import { parseChangedFiles } from '../src/changed-files.js';

describe('parseChangedFiles', () => {
  it('drops blank lines and duplicates and sorts', () => {
    expect(parseChangedFiles('\nb.txt\na.txt\n\nb.txt\n')).toEqual(['a.txt', 'b.txt']);
  });

  it('returns an empty list for empty output', () => {
    expect(parseChangedFiles('')).toEqual([]);
  });
});
