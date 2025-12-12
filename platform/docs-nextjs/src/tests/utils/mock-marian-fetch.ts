import { MARIAN_URL } from '@/constants';
import { statusV2 } from '@/tests/data/search-results.test.json';

interface MockFetchResponse<T> {
  json: () => T;
}

const allowJsonPromise = <T>(x: T): MockFetchResponse<T> => ({ json: () => x });

export const FILTERED_RESULT = {
  title: 'stitch (realm filter)',
  preview: 'Stitch preview (with realm filter)',
  url: 'stitch.withfilters',
  searchProperty: ['realm-master'],
};

export const UNFILTERED_RESULT = {
  title: 'stitch (no filters)',
  preview: 'Stitch preview (no filters)',
  url: 'stitch.nofilters',
  searchProperty: ['realm-master'],
};

export const RESULT_ILL_FORMED_SEARCHPROPERTY = {
  title: 'realm (no filters)',
  preview: 'Realm preview (no filters)',
  url: 'realm.nofilters',
  searchProperty: ['realm-'],
};

export const mockMarianFetch = (url: string) => {
  let endpoint = url;
  // Extract endpoint from full URL - handle both with and without trailing slash
  const marianUrlBase = MARIAN_URL.replace(/\/$/, ''); // Remove trailing slash
  if (endpoint.includes(marianUrlBase)) {
    const parts = endpoint.split(marianUrlBase);
    endpoint = parts[1] || endpoint;
  }
  // Remove leading slash if present
  endpoint = endpoint.replace(/^\/+/, '');

  // Handle v2/status (for facets)
  if (endpoint === 'v2/status' || endpoint.startsWith('v2/status')) {
    return allowJsonPromise(statusV2);
  }

  // Handle search endpoints with query params
  if (endpoint.startsWith('search')) {
    if (endpoint.includes('searchProperty=realm-master')) {
      return allowJsonPromise({
        results: [FILTERED_RESULT],
      });
    }
    if (endpoint.includes('q=stitch')) {
      return allowJsonPromise({
        results: [UNFILTERED_RESULT],
      });
    }
    if (endpoint.includes('q=realm')) {
      return allowJsonPromise({
        results: [RESULT_ILL_FORMED_SEARCHPROPERTY],
      });
    }
    if (endpoint.includes('q=noresultsreturned')) {
      return allowJsonPromise({
        results: [],
      });
    }
    // Default for other search queries
    return allowJsonPromise({
      results: [],
    });
  }

  // Handle v2/search/meta endpoints
  if (endpoint.startsWith('v2/search/meta')) {
    if (
      endpoint.includes('facets.genre=tutorial') &&
      endpoint.includes('facets.target_product>atlas>sub_product=atlas-cli')
    ) {
      return allowJsonPromise({
        count: 99,
        facets: statusV2,
      });
    }
    if (endpoint.includes('q=test')) {
      return allowJsonPromise({
        count: 10,
        facets: statusV2,
      });
    }
    // Default for other meta queries
    return allowJsonPromise({
      count: 0,
      facets: [],
    });
  }

  // Handle status endpoint (v1)
  if (endpoint === 'status' || endpoint.startsWith('status')) {
    return allowJsonPromise({ manifests: ['realm-master'] });
  }

  // Default fallback
  return allowJsonPromise({ results: [], count: 0, facets: [] });
};
