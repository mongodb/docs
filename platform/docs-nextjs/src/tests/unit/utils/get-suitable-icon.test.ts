import { getSuitableIcon } from '@/utils/get-suitable-icon';
import { DOTCOM_BASE_URL, ICONS_BASE_URL } from '@/constants';

describe('getSuitableIcon', () => {
  describe('relative icon paths (starting with /)', () => {
    it('should return full URL with siteBasePrefix for relative icon in light mode', () => {
      const result = getSuitableIcon({
        icon: '/icons/c.svg',
        isDarkMode: false,
        siteBasePrefix: 'docs/drivers',
      });
      expect(result).toBe(`${DOTCOM_BASE_URL}/docs/drivers/icons/c.svg`);
    });

    it('should return iconDark URL when dark mode is enabled and iconDark is provided', () => {
      const result = getSuitableIcon({
        icon: '/icons/c.svg',
        iconDark: '/icons/c-dark.svg',
        isDarkMode: true,
        siteBasePrefix: 'docs/drivers',
      });
      expect(result).toBe(`${DOTCOM_BASE_URL}/docs/drivers/icons/c-dark.svg`);
    });

    it('should return regular icon URL with siteBasePrefix for relative icon when dark mode is enabled and iconDark is not provided', () => {
      const result = getSuitableIcon({
        icon: '/icons/c.svg',
        isDarkMode: true,
        siteBasePrefix: 'docs/drivers',
      });
      expect(result).toBe(`${DOTCOM_BASE_URL}/docs/drivers/icons/c.svg`);
    });

    it('should return regular icon URL when dark mode is disabled even if iconDark is provided', () => {
      const result = getSuitableIcon({
        icon: '/icons/c.svg',
        iconDark: '/icons/c-dark.svg',
        isDarkMode: false,
        siteBasePrefix: 'docs/drivers',
      });
      expect(result).toBe(`${DOTCOM_BASE_URL}/docs/drivers/icons/c.svg`);
    });
  });

  describe('icon names (non-relative paths)', () => {
    it('should return icon URL from ICONS_BASE_URL without siteBasePrefix in light mode', () => {
      const result = getSuitableIcon({
        icon: 'check-square',
        isDarkMode: false,
        siteBasePrefix: 'atlas',
      });
      expect(result).toBe(`${ICONS_BASE_URL}check-square.svg`);
    });

    it('should append _inverse suffix in dark mode', () => {
      const result = getSuitableIcon({
        icon: 'check-square',
        isDarkMode: true,
        siteBasePrefix: 'atlas',
      });
      expect(result).toBe(`${ICONS_BASE_URL}check-square_inverse.svg`);
    });

    it('should ignore iconDark for non-relative icon paths', () => {
      const result = getSuitableIcon({
        icon: 'bell',
        iconDark: 'bell-dark',
        isDarkMode: true,
        siteBasePrefix: 'compass',
      });
      expect(result).toBe(`${ICONS_BASE_URL}bell_inverse.svg`);
    });
  });

  describe('icon is undefined edge case', () => {
    it('should return empty string when icon is undefined', () => {
      const result = getSuitableIcon({
        icon: undefined,
        isDarkMode: false,
        siteBasePrefix: 'university',
      });
      expect(result).toBe('');
    });

    it('should handle empty siteBasePrefix without extra slash', () => {
      const result = getSuitableIcon({
        icon: '/icons/c.svg',
        isDarkMode: false,
        siteBasePrefix: '',
      });
      expect(result).toBe(`${DOTCOM_BASE_URL}/icons/c.svg`);
    });
  });
});
