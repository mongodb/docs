import { removeTrailingSlash } from './remove-trailing-slash';

/**
 * Scrolls to an element on the page based on the provided hash
 * @param hash - The hash (including #) to scroll to
 */
export const loadHashIntoView = (hash: string): void => {
  if (hash) {
    // Decode the hash so '.' and '-' don't cause issues
    const hashWithoutSymbol = removeTrailingSlash(hash).substring(1);
    const decodedHash = decodeURIComponent(hashWithoutSymbol);
    const selector = '#' + CSS.escape(decodedHash);

    const el = document.querySelector(selector);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
