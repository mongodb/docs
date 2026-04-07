import type {
  BranchEntry,
  ReposBranchesDocument,
  DocsetsDocument,
} from '../../util/databaseConnection/types';
import { assertTrailingSlash } from '../utils';

export interface SearchProperties {
  active: boolean;
  url: string;
  searchProperty: string;
  includeInGlobalSearch: boolean;
}

const constructUrl = (
  docsetEntry: DocsetsDocument,
  branchEntry: BranchEntry,
) => {
  const baseUrl = docsetEntry.url;
  const projectPrefix = docsetEntry.prefix;

  const assembledUrl = `${baseUrl}${projectPrefix}/${branchEntry.urlSlug ?? ''}`;
  return assertTrailingSlash(assembledUrl);
};

export const getSearchProperties = async ({
  branchEntry,
  docsetEntry,
  repoEntry,
}: {
  branchEntry: BranchEntry;
  docsetEntry: DocsetsDocument;
  repoEntry: ReposBranchesDocument;
}): Promise<SearchProperties> => {
  const url = constructUrl(docsetEntry, branchEntry);

  const version = branchEntry.urlSlug || branchEntry.gitBranchName;

  const searchProperty = `${repoEntry.search?.categoryName ?? repoEntry.project}-${version}`;
  const includeInGlobalSearch = branchEntry.isStableBranch ?? false;

  const active = branchEntry.active;

  return {
    active,
    searchProperty,
    url,
    includeInGlobalSearch,
  };
};
