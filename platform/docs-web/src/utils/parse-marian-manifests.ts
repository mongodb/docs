import type { MarianFilters, MarianManifestResponse, SearchPropertyMapping } from '@/hooks/use-marian-manifests';
import { compareBranchesWithVersionNumbers } from '@/utils/compare-branches-with-version-numbers';

export const getSortedBranchesForProperty = (parsedManifest: MarianFilters, property: string) => {
  const branches = Object.keys(parsedManifest[property]);
  branches.sort(compareBranchesWithVersionNumbers);
  return branches;
};

// Parses a list of manifest strings from Marian
export const parseMarianManifests = (
  manifests: MarianManifestResponse['manifests'],
  searchPropertyMapping: SearchPropertyMapping = {},
) => {
  const result: MarianFilters = {};

  manifests.forEach((manifest) => {
    // We should only include categories and versions in the filter dropdowns if they
    // have category/version data associated with them. This will prevent unexpected
    // or new manifests without proper titles from appearing in the dropdowns.
    if (!searchPropertyMapping[manifest]) {
      return;
    }

    const { categoryTitle: category, versionSelectorLabel: version } = searchPropertyMapping[manifest];
    // organize by property / category (ex. { Atlas : { Latest : atlas-master }})
    if (!(category in result)) {
      result[category] = {};
    }
    result[category][version] = manifest;
  });

  // Explicit type needed by test suites (sigh)
  return result as MarianFilters;
};
