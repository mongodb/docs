import { MARIAN_URL } from '@/constants';
import { assertTrailingSlash } from './assert-trailing-slash';
import {
  TERM_PARAM,
  PAGE_PARAM,
  V1_SEARCH_FILTER_PARAM,
  FACETS_KEY_PREFIX,
  FACETS_LEVEL_KEY,
  SINGLE_SELECT_FIELDS,
} from './search-facet-constants';

const getFilterParams = (searchParams: URLSearchParams) => {
  const res: Array<string> = [];
  searchParams.forEach((value, key) => {
    if (key.startsWith(FACETS_KEY_PREFIX)) {
      res.push(`${key}=${value}`);
    }
  });
  return res.join('&');
};

/**
 * Removes parent filter selections in search params if any
 * since existence of child filter selection already implies
 * the existence of parent filter
 * ie. target_products>atlas>versions=master
 *     already implies target_products=atlas
 *     within the data returned
 */
function removeParentSelections(searchParams: URLSearchParams) {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const key of searchParams.keys()) {
    // break down key to its parent key.
    const parts = key.split(FACETS_LEVEL_KEY);
    // if it doesn't have parent, keep it in searchParams
    if (parts.length <= 1) {
      continue;
    }

    // if not within fields that you can only select one value
    if (SINGLE_SELECT_FIELDS.indexOf(parts[parts.length - 1]) === -1) {
      continue;
    }

    const parentKey = parts.slice(0, parts.length - 2).join(FACETS_LEVEL_KEY);
    const parentValue = parts[parts.length - 2];
    newSearchParams.delete(parentKey, parentValue);
  }
  return newSearchParams;
}

/**
 * Search helper function to generate marian URL from params and filters
 * Extracts query params from search params and appends to new request URL as string
 * Route is used to return search document results
 *
 */
export const searchParamsToURL = (searchParams: URLSearchParams) => {
  const modifiedSearchParams = removeParentSelections(searchParams);
  const searchTerm = modifiedSearchParams.get(TERM_PARAM);
  const page = modifiedSearchParams.get(PAGE_PARAM) || 1;
  const searchProperty = modifiedSearchParams.get(V1_SEARCH_FILTER_PARAM);
  const filters = getFilterParams(modifiedSearchParams);

  const queryParams = `?q=${searchTerm}&page=${page}${searchProperty ? `&searchProperty=${searchProperty}` : ''}${
    filters.length ? `&${filters}` : ''
  }`;
  return `${assertTrailingSlash(MARIAN_URL)}search${queryParams}`;
};

/**
 * Search helper function to generate marian URL from params and filters
 * Extracts query params from search params and appends to new request URL as string
 * Route is used to return meta data for search params
 *
 */
export const searchParamsToMetaURL = (searchParams: URLSearchParams | null, searchTerm?: string | null) => {
  const modifiedSearchParams = searchParams ? removeParentSelections(searchParams) : new URLSearchParams();
  const queryString = searchTerm || modifiedSearchParams.get(TERM_PARAM);

  let queryParams = `?q=${queryString}`;
  const searchProperty = modifiedSearchParams.get(V1_SEARCH_FILTER_PARAM);
  const filters = getFilterParams(modifiedSearchParams);
  queryParams += `${searchProperty ? `&searchProperty=${searchProperty}` : ''}${filters.length ? `&${filters}` : ''}`;
  const META_PATH = `v2/search/meta`;
  return `${assertTrailingSlash(MARIAN_URL)}${META_PATH}${queryParams}`;
};
