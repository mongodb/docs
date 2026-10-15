import type { Docset, Version } from '../../../../versioning/types';
import { assertTrailingSlash } from '../utils';

export interface SearchProperties {
  active: boolean;
  url: string;
  searchProperty: string;
  includeInGlobalSearch: boolean;
}

/**
 * The published URL for a version. Unversioned sites publish at their prefix
 * with no version segment, which is why the segment is conditional.
 */
const constructUrl = (docset: Docset, version: Version, baseUrl: string) => {
  const versionSegment = docset.versions.length > 1 ? `/${version.versionName}` : '';
  return assertTrailingSlash(`${baseUrl}${docset.prefix}${versionSegment}`);
};

export const getSearchProperties = async ({
  version,
  docset,
  baseUrl,
}: {
  version: Version;
  docset: Docset;
  baseUrl: string;
}): Promise<SearchProperties> => {
  const url = constructUrl(docset, version, baseUrl);

  const categoryName = docset.search?.categoryName ?? docset.project;
  const searchProperty = `${categoryName}-${version.versionName}`;

  return {
    active: version.active,
    searchProperty,
    url,
    includeInGlobalSearch: version.stable,
  };
};
