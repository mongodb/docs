import type { RemoteMetadata } from '@/types/data';
import { getNestedValue } from './get-nested-value';

/**
 * Given property metadata,
 * return the site title as a string
 */
export const getSiteTitle = (metadata: RemoteMetadata): string => {
  let title = (getNestedValue(['title'], metadata) as string) || '';
  if (!title) {
    return '';
  }
  const version = (getNestedValue(['branch'], metadata) as string) || '';
  title += typeof version === 'string' && version?.startsWith('v') ? ` ${version}` : '';
  return title;
};
