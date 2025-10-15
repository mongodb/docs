import { normalizePath } from '@/utils/normalize-path';

it('should return a normalized path', () => {
  expect(normalizePath('foo/bar/biz')).toBe('foo/bar/biz');
  expect(normalizePath('foo//bar/biz')).toBe('foo/bar/biz');
  expect(normalizePath('foo////bar////biz')).toBe('foo/bar/biz');
  expect(normalizePath('//foo/bar/biz')).toBe('/foo/bar/biz');
  expect(normalizePath('///')).toBe('/');
});
