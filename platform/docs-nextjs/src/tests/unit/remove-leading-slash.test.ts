import { removeLeadingSlash } from '@/utils/remove-leading-slash';

it('should remove leading slashes to file pathnames if found', () => {
  const pathNameWithSlash = '/path/to/image.png';

  const pathNameWithMultipleSlashes = '////path/to/image.png';

  const pathNameWithoutSlash = 'path/to/image.png';

  expect(removeLeadingSlash(pathNameWithSlash)).toBe(pathNameWithoutSlash);
  expect(removeLeadingSlash(pathNameWithMultipleSlashes)).toBe(pathNameWithoutSlash);
  expect(removeLeadingSlash(pathNameWithoutSlash)).toBe(pathNameWithoutSlash);
});
