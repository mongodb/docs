import type { PartialFacet } from '@/mdx-components/SearchResults/search-context';

/**
 *
 * @param {obj} facet - contains key and id properties as returned by /v2/status ie.
 * https://docs-search-transport.mongodb.com/v2/status
 */
export const getFacetTagVariant = (facet: PartialFacet) => {
  if (facet.key === 'target_product') {
    return 'green';
  }
  return 'blue';
};
