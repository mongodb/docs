import { getFullSlug } from '@/utils/get-full-slug';

// Mock isBrowser to return false so we use initialSlug instead of window.location
jest.mock('@/utils/is-browser', () => ({
  isBrowser: false,
}));

describe('getFullSlug', () => {
  const pathPrefix = 'docs/atlas';

  it('should handle root slash by concatenating with pathPrefix', () => {
    const initialSlug = '/';
    const result = getFullSlug(initialSlug, pathPrefix);
    expect(result).toBe('docs/atlas');
  });

  it('should wrap regular slug with pathPrefix and trailing slash', () => {
    const initialSlug = 'get-started';
    const result = getFullSlug(initialSlug, pathPrefix);
    expect(result).toBe('docs/atlas/get-started');
  });

  it('should return slug as-is when it starts with docs/', () => {
    const initialSlug = 'docs/atlas/search';
    const result = getFullSlug(initialSlug, pathPrefix);
    expect(result).toBe('docs/atlas/search');
  });

  it('should return slug as-is when it has a language prefix', () => {
    const initialSlug = 'pt-br/docs/atlas/get-started';
    const result = getFullSlug(initialSlug, pathPrefix);
    expect(result).toBe('pt-br/docs/atlas/get-started');
  });

  it('should handle empty string by concatenating with pathPrefix', () => {
    const initialSlug = '';
    const result = getFullSlug(initialSlug, pathPrefix);
    expect(result).toBe('docs/atlas');
  });
});
