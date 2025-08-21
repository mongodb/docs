import { isRelativeUrl } from '@/utils/is-relative-url';

it('should return false for any absolute or external links', () => {
  expect(isRelativeUrl('http://foo.bar')).toBe(false);
  expect(isRelativeUrl('https://foo.bar')).toBe(false);
  expect(isRelativeUrl('mailto:test@test.com')).toBe(false);
});

it('should return true for any relative links', () => {
  expect(isRelativeUrl('/foo')).toBe(true);
  expect(isRelativeUrl('/foo/')).toBe(true);
  expect(isRelativeUrl('foo')).toBe(true);
});
