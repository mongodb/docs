import type { NetlifyPluginUtils } from '@netlify/build';
import path, { normalize } from 'node:path';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import type { ConfigEnvironmentVariables } from '../util/extension';
import {
  getSearchProperties,
  type SearchProperties,
} from './uploadToAtlas/getSearchProperties';
import type {
  SearchDBName,
  BranchEntry,
  DocsetsDocument,
  ReposBranchesDocument,
  SearchClusterConnectionInfo,
} from '../util/databaseConnection/types';
import { generateManifest } from './generateManifest/index';
import { uploadManifest } from './uploadToAtlas/uploadManifest';
import { deleteStaleProperties } from './uploadToAtlas/deleteStale';
import { closeSearchDb } from '../util/databaseConnection/searchClusterConnector';
import { upload } from '../s3Connection/s3connector';
import type { AllContentData } from '../parse/runModules';

const EXTENSION_NAME = 'search-manifest';
export const ENVS_TO_RUN = ['dotcomstg', 'dotcomprd'];

const generateAndUploadManifests = async ({
  configEnvironment,
  run,
  dbEnvVars,
  branchEntry,
  repoEntry,
  docsetEntry,
  pathToBundle,
}: {
  configEnvironment: ConfigEnvironmentVariables;
  run: NetlifyPluginUtils['run'];
  dbEnvVars: StaticEnvVars;
  branchEntry: BranchEntry;
  repoEntry: ReposBranchesDocument;
  docsetEntry: DocsetsDocument;
  pathToBundle: string;
}) => {
  // Get content repo zipfile as AST representation
  await run.command(`unzip -o -q ${pathToBundle}`);

  const branchName = branchEntry.gitBranchName;
  const repoName = repoEntry.repoName;
  if (!repoName || !branchName) {
    // Check that an environment variable for repo name was set
    throw new Error(
      `Repo or branch name was not found, manifest for repo ${repoName} and branch ${branchName} cannot be generated`,
    );
  }

  const searchConnectionInfo: SearchClusterConnectionInfo = {
    searchURI: dbEnvVars.ATLAS_SEARCH_URI,
    databaseName: configEnvironment.SEARCH_DB_NAME as SearchDBName,
    collectionName: dbEnvVars.DOCUMENTS_COLLECTION,
    extensionName: EXTENSION_NAME,
  };

  // TODO: fix this
  const {
    active,
    url,
    searchProperty,
    includeInGlobalSearch,
  }: SearchProperties = await getSearchProperties({
    branchEntry,
    docsetEntry,
    repoEntry,
  });

  console.log(`Search properties for ${repoEntry.repoName}: active: ${active}, searchProperty: ${searchProperty}, includeInGlobalSearch: ${includeInGlobalSearch}, url: ${url}}: 
    `);

  if (!active) {
    console.log(
      `Version is inactive, search manifest should not be generated for ${JSON.stringify(
        searchProperty,
      )}. Removing all associated manifests from database`,
    );
    await deleteStaleProperties(searchProperty, searchConnectionInfo);
    return;
  }
  const manifest = await generateManifest({ url, includeInGlobalSearch });
  // Remove parser files from unzipped bundle.zip
  await run.command('rm -rf bundle');

  console.log('=========== Finished generating manifests ================');

  console.log('=========== Uploading Manifests to S3 =================');

  const s3Prefix =
    configEnvironment.ENV === 'dotcomprd'
      ? 'search-indexes/prd'
      : 'search-indexes/preprd';

  const key = normalize(path.join(s3Prefix, `${searchProperty}.json`));
  const uploadStatus = await upload({
    Bucket: dbEnvVars.S3_SEARCH_BUCKET,
    Key: key,
    Body: manifest.export(),
  });

  console.log(`S3 upload status: ${uploadStatus.$metadata.httpStatusCode}`);
  console.log(
    `=========== Finished Uploading to S3 ${dbEnvVars.S3_SEARCH_BUCKET}${s3Prefix} ================`,
  );

  try {
    console.log(
      `=========== Uploading Manifests to Atlas database ${configEnvironment.SEARCH_DB_NAME} in collection ${dbEnvVars.DOCUMENTS_COLLECTION} =================`,
    );
    const status = await uploadManifest({
      manifest,
      searchProperty,
      connectionInfo: searchConnectionInfo,
    });
    console.log(status);
    console.log('=========== Manifests uploaded to Atlas =================');
  } catch (e) {
    console.log('Manifest could not be uploaded', e);
  }
};

type SearchManifestJobParams = {
  allContentData: AllContentData;
  run: NetlifyPluginUtils['run'];
  dbEnvVars: StaticEnvVars;
  configEnvironment: ConfigEnvironmentVariables;
};

// expects contentPath as string of versionName or empty string format
export const handleSearchManifests = async ({
  allContentData,
  run,
  dbEnvVars,
  configEnvironment,
}: SearchManifestJobParams) => {
  const promises = Object.entries(allContentData.docsPaths).map(
    async ([contentPath, bundleData]) => {
      const repoEntry =
        allContentData.atlasProjectDocuments[bundleData.projectName]
          ?.reposBranchesEntry;
      const branch: BranchEntry | undefined = repoEntry.branches.find(
        (branch: BranchEntry): boolean =>
          branch.name === bundleData.versionName,
      );

      if (!branch) {
        console.error(
          `Branch ${bundleData.versionName} not found for repo ${repoEntry.repoName}`,
        );
        return;
      }

      // TODO: do we NEVER rebuild for inactive versions? or just the ones that don't need to be rebuilt
      if (!bundleData.shouldRebuild) {
        console.log('skipping handleSearchManifests for branch: ', branch);
        return;
      }

      console.log('handling handleSearchManifests for branch: ', branch);
      const pathToBundle = path.resolve(
        allContentData.relativePathToContent,
        contentPath,
        'bundle.zip',
      );
      console.log(`pathToBundle: ${pathToBundle}`);
      try {
        await generateAndUploadManifests({
          configEnvironment,
          run,
          dbEnvVars,
          branchEntry: branch,
          repoEntry,
          docsetEntry:
            allContentData.atlasProjectDocuments[bundleData.projectName]
              ?.docsetsEntry,
          pathToBundle,
        });
      } catch (e) {
        console.error('Error while creating offline doc for branch: ', branch);
        console.error(e);
      }
    },
  );

  try {
    return Promise.all(promises);
  } finally {
    await closeSearchDb();
  }
};
