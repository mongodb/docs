import path, { normalize } from 'node:path';
import type { StaticEnvVars } from '../util/assertDbEnvVars';
import type { BuildRunner } from '../util/buildUtils';
import type { ConfigEnvironmentVariables } from '../util/configEnvironment';
import {
  getSearchProperties,
  type SearchProperties,
} from './uploadToAtlas/getSearchProperties';
import type {
  SearchDBName,
  SearchClusterConnectionInfo,
} from '../util/databaseConnection/types';
import type { Docset, Version } from '../../../versioning/types';
import { docsUrlForEnv } from '../../../versioning/define';
import { generateManifest } from './generateManifest/index';
import { uploadManifest } from './uploadToAtlas/uploadManifest';
import { deleteStaleProperties } from './uploadToAtlas/deleteStale';
import { closeSearchDb } from '../util/databaseConnection/searchClusterConnector';
import { upload } from '../s3Connection/s3connector';
import {
  getBranchForContentPath,
  type AllContentData,
} from '../contentMetadata/processContentMetadata';
import { getRepoPaths } from '../paths';

const EXTENSION_NAME = 'search-manifest';
export const ENVS_TO_RUN = ['dotcomprd', 'dotcomstg'];

const generateAndUploadManifests = async ({
  configEnvironment,
  run,
  dbEnvVars,
  version,
  docset,
  pathToBundle,
}: {
  configEnvironment: ConfigEnvironmentVariables;
  run: BuildRunner;
  dbEnvVars: StaticEnvVars;
  version: Version;
  docset: Docset;
  pathToBundle: string;
}) => {
  // Get content repo zipfile as AST representation
  await run.command(`unzip -o -q ${pathToBundle}`);

  const versionName = version.versionName;
  const projectName = docset.project;
  if (!projectName || !versionName) {
    throw new Error(
      `Project or version name was not found, manifest for project ${projectName} and version ${versionName} cannot be generated`,
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
    version,
    docset,
    baseUrl: docsUrlForEnv(configEnvironment.ENV),
  });

  console.log(`Search properties for ${docset.project}: active: ${active}, searchProperty: ${searchProperty}, includeInGlobalSearch: ${includeInGlobalSearch}, url: ${url}}: 
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
  run: BuildRunner;
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
      const docset = allContentData.docsetsByProject[bundleData.projectName];
      if (!docset) {
        console.error(`Docset not found for project ${bundleData.projectName}`);
        return;
      }
      const version = getBranchForContentPath(contentPath, allContentData);

      if (!version) {
        console.error(
          `Version ${bundleData.versionName} not found for project ${docset.project}`,
        );
        return;
      }

      // TODO: do we NEVER rebuild for inactive versions? or just the ones that don't need to be rebuilt
      if (bundleData.projectDirName !== process.env.DOCS_PROJECT) {
        console.log('skipping handleSearchManifests for branch: ', version, 'and project: ', bundleData.projectDirName);
        return;
      }

      console.log('handling handleSearchManifests for branch: ', version, 'and project: ', bundleData.projectDirName);
      const { contentDir } = getRepoPaths();
      const pathToBundle = path.join(contentDir, contentPath, 'bundle.zip');
      console.log(`pathToBundle: ${pathToBundle}`);
      try {
        await generateAndUploadManifests({
          configEnvironment,
          run,
          dbEnvVars,
          version,
          docset,
          pathToBundle,
        });
      } catch (e) {
        console.error('Error while creating offline doc for version: ', version);
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
