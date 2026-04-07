// get data from atlas: repos branches and docsets

import path from 'node:path';
import fs from 'node:fs/promises';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import { getDocsetsCollection } from '../util/databaseConnection/fetchDocsetsData';
import { getReposBranchesCollection } from '../util/databaseConnection/fetchReposBranchesData';
import type { ConfigEnvironmentVariables } from '../util/extension';
import type {
  DocsetsDocument,
  ReposBranchesDocument,
} from '../util/databaseConnection/types';
import type { ProjectNames } from './readSnootyToml';
import type { Environments } from '../util/databaseConnection/types';

/** key by project name ex: atlas-cli, values are array of repos branches and docsets entries.
 ** projectName : {reposBranchesEntry: ReposBranchesDocument, docsetsEntry: DocsetsDocument}
 **/
export type AtlasProjectDocuments = {
  [projectName: string]: {
    reposBranchesEntry: ReposBranchesDocument;
    docsetsEntry: DocsetsDocument;
  };
};

/**
 * Flattens env-specific fields in an Atlas document. When a field is an object
 * with keys like stg, prd, dotcomstg, etc., replaces it with the value for the
 * current environment. Falls back to 'prd' then 'stg' if env key is missing.
 */
const flattenForEnvironment = (
  docset: DocsetsDocument,
  env: Environments,
): DocsetsDocument => {
  const newDocument = { ...docset } as Record<string, unknown>;
  const envFields = ['prefix', 'url', 'bucket'] as const;

  for (const key of envFields) {
    const fieldValue = newDocument[key] as Record<string, string>;
    if (Object.hasOwn(fieldValue, env)) {
      newDocument[key] = fieldValue[env];
    }
  }
  return newDocument as DocsetsDocument;
};

/** Fetches repos branches and docsets data from Atlas
 * * constructs AtlasProjectDocuments */
export const fetchAtlasData = async ({
  configEnvironment,
  dbEnvVars,
  baseDir,
  projectNames,
}: {
  configEnvironment: ConfigEnvironmentVariables;
  dbEnvVars: StaticEnvVars;
  baseDir: string;
  projectNames: ProjectNames;
}): Promise<AtlasProjectDocuments> => {
  const poolDbName = configEnvironment.POOL_DB_NAME;
  const repoBranchesConnectionInfo = {
    clusterZeroURI: dbEnvVars.ATLAS_CLUSTER0_URI,
    databaseName: poolDbName as string,
    collectionName: dbEnvVars.REPOS_BRANCHES_COLLECTION,
  };
  const reposBranchesOutput = path.join(baseDir, 'reposBranches.json');
  const { count: reposBranchesCount, docs: reposBranchesDocs } =
    await fetchAndPersistReposBranches({
      connectionInfo: repoBranchesConnectionInfo,
      outputPath: reposBranchesOutput,
    });
  console.log(
    `Fetched ${reposBranchesCount} reposBranches documents into ${reposBranchesOutput}`,
  );
  // fetch docsets data
  const docsetsConnectionInfo = {
    clusterZeroURI: dbEnvVars.ATLAS_CLUSTER0_URI,
    databaseName: poolDbName as string,
    collectionName: dbEnvVars.DOCSETS_COLLECTION,
  };
  const docsetsOutput = path.join(baseDir, 'docsets.json');
  const { count: docsetsCount, docs: docsetsDocs } =
    await fetchAndPersistDocsets({
      connectionInfo: docsetsConnectionInfo,
      outputPath: docsetsOutput,
    });
  console.log(
    `Fetched ${docsetsCount} docsets documents into ${docsetsOutput}`,
  );

  const atlasProjectDocuments = await constructAtlasProjectDocuments({
    reposBranchesDocs,
    docsetsDocs,
    projectNames,
    env: configEnvironment.ENV as Environments,
  });
  return atlasProjectDocuments;
};

const fetchAndPersistReposBranches = async ({
  connectionInfo,
  outputPath,
}: {
  connectionInfo: {
    clusterZeroURI: string;
    databaseName: string;
    collectionName: string;
    extensionName?: string;
  };
  outputPath: string;
}): Promise<{
  count: number;
  outputPath: string;
  docs: ReposBranchesDocument[];
}> => {
  const collection = await getReposBranchesCollection(connectionInfo);
  const docs = await collection.find({}).toArray();

  await fs.writeFile(outputPath, JSON.stringify(docs, null, 2), 'utf-8');
  return { count: docs.length, outputPath, docs };
};

/** Fetches docsets data from Atlas and persists to a file at given outputPath */
const fetchAndPersistDocsets = async ({
  connectionInfo,
  outputPath,
}: {
  connectionInfo: {
    clusterZeroURI: string;
    databaseName: string;
    collectionName: string;
    extensionName?: string;
  };
  outputPath: string;
}): Promise<{ count: number; outputPath: string; docs: DocsetsDocument[] }> => {
  const collection = await getDocsetsCollection(connectionInfo);
  const docs = await collection.find({}).toArray();
  await fs.writeFile(outputPath, JSON.stringify(docs, null, 2), 'utf-8');
  return { count: docs.length, outputPath, docs };
};

export const constructAtlasProjectDocuments = async ({
  reposBranchesDocs,
  docsetsDocs,
  projectNames,
  env,
}: {
  reposBranchesDocs: ReposBranchesDocument[];
  docsetsDocs: DocsetsDocument[];
  projectNames: ProjectNames;
  env: Environments;
}): Promise<AtlasProjectDocuments> => {
  const atlasProjectDocuments: AtlasProjectDocuments = {};
  Object.values(projectNames).map((projectName) => {
    const repoBranchesEntry = reposBranchesDocs.find(
      (repo) => repo.project === projectName,
    );
    const docsetEntry = docsetsDocs.find(
      (docset) => docset.project === projectName,
    );
    const atlasDataEntry = {
      reposBranchesEntry: repoBranchesEntry as ReposBranchesDocument,
      docsetsEntry: flattenForEnvironment(docsetEntry as DocsetsDocument, env),
    };
    atlasProjectDocuments[projectName] = atlasDataEntry;
  });

  return atlasProjectDocuments;
};
