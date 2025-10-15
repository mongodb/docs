import { removeLeadingSlash } from '@/utils/remove-leading-slash';

it('should return a path without the leading slash(s)', () => {
  expect(removeLeadingSlash('/docs/foo/bar')).toBe('docs/foo/bar');
  expect(removeLeadingSlash('docs/foo/biz')).toBe('docs/foo/biz');
  expect(removeLeadingSlash('///foo/bar')).toBe('foo/bar');
});
