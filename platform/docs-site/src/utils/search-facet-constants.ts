/**
 * Util file for keeping constants related to search server
 * Store query parameter names and response names here
 *
 */

// query param keys
export const TERM_PARAM = 'q';
export const PAGE_PARAM = 'page';
export const V1_SEARCH_FILTER_PARAM = 'searchProperty';

// facet param keys
// ie. facets.target_product>atlas>sub_product=atlas-cli
// translates to (target_products = atlas, target_products.atlas.sub_product = atlas-cli)
export const FACETS_KEY_PREFIX = 'facets.';
export const FACETS_LEVEL_KEY = '>';

export const VERSION_GROUP_ID = 'version';
// single select fields will be dropdown in UI,
// and remove its parent selection as child facet selection implies parent facet
export const SINGLE_SELECT_FIELDS = [VERSION_GROUP_ID];

export const requestHeaders: RequestInit = process.env['NEXT_PUBLIC_MARIAN_URL']?.includes('staging')
  ? {
      credentials: 'include' as RequestCredentials,
    }
  : {};
