import type { SearchPropertyMapping } from '@/hooks/use-marian-manifests';

/**
 * Fetches SearchPropertyMapping
 * {
 *   [project: string]: {
 *     categoryTitle: string;
 *     versionSelectorLabel: string;
 *   };
 * }
 */
export const fetchSearchPropertyMapping = async (): Promise<SearchPropertyMapping> => {
  // Staging vs production is which host you call, not a query parameter: each
  // deploy serves the catalog from its own git ref.
  const res = await fetch(`/docs/platform/api/search-mapping/`);
  return res.json();
};
