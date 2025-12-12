import type { SearchPropertyMapping } from '@/hooks/use-marian-manifests';
import type { SnootyEnv } from '@/types/data';

/**
 * Fetches SearchPropertyMapping
 * {
 *   [project: string]: {
 *     categoryTitle: string;
 *     versionSelectorLabel: string;
 *   };
 * }
 */
export const fetchSearchPropertyMapping = async (snootyEnv: SnootyEnv): Promise<SearchPropertyMapping> => {
  const isStaging = ['staging', 'development', 'dotcomstg'].includes(snootyEnv);
  const res = await fetch(`/api/search-mapping/${isStaging ? `?staging=true` : ''}`);
  return res.json();
};
