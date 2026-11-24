/**
 * Generates the prefix to be used for a version's URL. The prefix will typically consist of the docs repo's
 * set prefix, with the new version appended at the end.
 *
 * Use this when the target URL needs to point to a version
 * of the docs site that does not use the same exact path prefix (i.e. an aliased docs site needs its exact URL slug).
 * @param {string} version The version to include at the end of the prefix.
 * @param {string} siteBasePrefix The current docs site's base prefix to append the version to.
 */
export const generateVersionedPrefix = (siteBasePrefix: string, version?: string) => {
  let versionedPrefix = `/${siteBasePrefix}`;
  if (version) versionedPrefix += `/${version}`;
  return versionedPrefix;
};
