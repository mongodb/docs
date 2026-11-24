import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';
import type { BranchData, ReposBranchesDocument } from '@/types/data';

export type SearchPropertyMapping = {
  [k: string]: {
    categoryTitle: string;
    versionSelectorLabel: string;
  };
};

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isStaging = searchParams.get('staging') === 'true';
  const dbName = isStaging ? 'pool_test' : 'pool';

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<ReposBranchesDocument>('repos_branches');

    const query = {
      search: { $exists: true },
    };

    const repos = await collection.find(query).toArray();

    const searchPropertyMapping: SearchPropertyMapping = {};
    repos.forEach((repo) => {
      parseRepoForSearchProperties(searchPropertyMapping, repo);
    });

    return withCORS(NextResponse.json(searchPropertyMapping));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}

// Add search properties for each branch of a category.
// A search property is typically in the form of "<category>-<version>"
const addSearchProperties = (
  searchPropertyMapping: SearchPropertyMapping,
  categoryName: string,
  categoryTitle: string | undefined,
  branches: BranchData[],
) => {
  if (!branches) {
    return;
  }

  branches.forEach((branch) => {
    if (!branch.active || branch.noIndexing) {
      return;
    }

    const { urlSlug, gitBranchName, versionSelectorLabel } = branch;
    const version = urlSlug || gitBranchName;

    const searchProperty = `${categoryName}-${version}`;

    let versionLabel = versionSelectorLabel;
    // We've typically always labeled non-versioned repos as having the "Latest" version in the search dropdown.
    const hasUnlabeledMainBranch = !versionLabel || versionLabel === 'master' || versionLabel === 'main';
    if ((version === 'master' || version === 'main') && hasUnlabeledMainBranch) {
      versionLabel = 'Latest';
    }

    searchPropertyMapping[searchProperty] = {
      categoryTitle: categoryTitle ?? '',
      versionSelectorLabel: versionLabel,
    };
  });
};

// Look at document of a repo to create search properties for the mapping
const parseRepoForSearchProperties = (searchPropertyMapping: SearchPropertyMapping, repo: ReposBranchesDocument) => {
  const categoryName = repo.search?.categoryName ?? repo.project;
  const categoryTitle = repo.search?.categoryTitle ?? '';

  addSearchProperties(searchPropertyMapping, categoryName, categoryTitle, repo.branches);
};
