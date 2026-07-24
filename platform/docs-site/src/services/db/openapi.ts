import type {
  AtlasAdminApiChangelogDiff,
  AtlasAdminApiChangelogMetadata,
  AtlasAdminApiChangelogType,
  ServerSideChangelogData,
} from '@/types/openapi';
import type { Environments } from '@/utils/env-config';
import { hideChanges, hideDiffChanges } from '@/utils/filter-hidden-changes';

type AtlasAdminSourceBranch = 'qa' | 'main';

const fetchChangelogMetadata = async (branch: AtlasAdminSourceBranch): Promise<AtlasAdminApiChangelogMetadata> => {
  try {
    const metadataResp = await fetch(
      `https://raw.githubusercontent.com/mongodb/openapi/${branch}/changelog/internal/metadata.json`,
    );
    return metadataResp.json();
  } catch (e) {
    throw new Error(`Error while fetching AtlasAdmin API Changelog metadata: ${e}`);
  }
};

const fetchChangelog = async (branch: AtlasAdminSourceBranch): Promise<AtlasAdminApiChangelogType> => {
  try {
    const changelogResp = await fetch(
      `https://raw.githubusercontent.com/mongodb/openapi/${branch}/changelog/changelog.json`,
    );
    const unfilteredChangelog = await changelogResp.json();
    return hideChanges(unfilteredChangelog);
  } catch (e) {
    throw new Error(`Error while fetching Atlas Admin API Changelog data: ${e}`);
  }
};

const fetchMostRecentDiff = async (metadata: AtlasAdminApiChangelogMetadata, branch: AtlasAdminSourceBranch) => {
  const mostRecentResourceVersions = metadata.versions.slice(-2);
  const mostRecentDiffLabel = mostRecentResourceVersions.join('_');

  try {
    const mostRecentDiffResp = await fetch(
      `https://raw.githubusercontent.com/mongodb/openapi/${branch}/changelog/version-diff/${mostRecentDiffLabel}.json`,
    );
    const mostRecentUnfilteredDiffData: AtlasAdminApiChangelogDiff = await mostRecentDiffResp.json();
    const mostRecentDiffData = hideDiffChanges(mostRecentUnfilteredDiffData);

    return {
      mostRecentDiffLabel,
      mostRecentDiffData,
    };
  } catch (e) {
    throw new Error(`Error while fetching most recent AtlasAdmin API diff data: ${e}`);
  }
};

export const getChangelogData = async (): Promise<ServerSideChangelogData> => {
  const env = process.env.NEXT_PUBLIC_ENV as Environments;
  const branch = env === 'dev' || env === 'development' ? 'qa' : 'main';

  const metadata = await fetchChangelogMetadata(branch);
  const changelog = await fetchChangelog(branch);
  const mostRecentDiff = await fetchMostRecentDiff(metadata, branch);

  /* Aggregate all Resources in changelog for frontend filter */
  const resourcesListSet = new Set<string>();
  changelog.forEach((release) =>
    release.paths.forEach(({ httpMethod, path }) => resourcesListSet.add(`${httpMethod} ${path}`)),
  );
  const changelogResourcesList = Array.from(resourcesListSet);

  return {
    changelogMetadata: metadata,
    changelog,
    changelogResourcesList,
    mostRecentDiff,
  };
};
