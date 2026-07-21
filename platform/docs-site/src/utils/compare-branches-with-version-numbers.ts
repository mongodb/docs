/**
 * Function to be used with sort() to sort a list of git branch names in the
 * following order:
 * - "current" is the first entry, if applicable
 * - "master" is the second entry, if applicable
 * - Branch version numbers are then provided in most-recent-first order
 */
export const compareBranchesWithVersionNumbers = (branchTitleA: string, branchTitleB: string): number => {
  const branchA = branchTitleA.toLocaleLowerCase();
  const branchB = branchTitleB.toLocaleLowerCase();

  if (branchA === 'current') return -1;
  if (branchB === 'current') return 1;

  const latestNames = new Set(['master', 'latest', 'upcoming']);

  if (latestNames.has(branchA)) return -1;
  if (latestNames.has(branchB)) return 1;

  // We want to account for these strings not having the same number of characters
  // per part of the version number
  return parseVersionBranchForSort(branchB).localeCompare(parseVersionBranchForSort(branchA));
};

// This helper method replaces a number in a version string with it plus 10 to account for single
// digit portions of a version number. It also removes `v` found on some for sort purposes
const parseVersionBranchForSort = (branchString: string): string =>
  branchString.replace(/v/g, '').replace(/\d+/g, (n) => String(+n + 10));
