import { withCORS } from '@/app/lib/with-cors';
import { NextResponse } from 'next/server';
import { docsets } from 'versioning';

export type SearchPropertyMapping = {
  [k: string]: {
    categoryTitle: string;
    versionSelectorLabel: string;
  };
};

/** Version names that mean "the only version", and so read as "Latest". */
const UNVERSIONED_NAMES = new Set(['main', 'master']);

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

/**
 * The allowlist of search properties for global search, keyed
 * `${categoryName}-${versionName}`. docs-search-transport consumes the keys;
 * the docs search UI also reads the labels for its filter dropdown.
 */
export async function GET() {
  const searchPropertyMapping: SearchPropertyMapping = {};

  for (const docset of docsets) {
    if (!docset.search) continue;
    const categoryName = docset.search.categoryName ?? docset.project;

    for (const version of docset.versions) {
      if (!version.active || version.noIndexing) continue;

      // Single-version sites have always been labelled "Latest" in the search
      // dropdown rather than showing their stub version name.
      const label =
        UNVERSIONED_NAMES.has(version.versionName) &&
        UNVERSIONED_NAMES.has(version.versionSelectorLabel)
          ? 'Latest'
          : version.versionSelectorLabel;

      searchPropertyMapping[`${categoryName}-${version.versionName}`] = {
        categoryTitle: docset.search.categoryTitle,
        versionSelectorLabel: label,
      };
    }
  }

  return withCORS(NextResponse.json(searchPropertyMapping));
}
