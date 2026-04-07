// Documentation: https://sdk.netlify.com/docs
import path from 'node:path';
import {
  listStores,
  type Store,
  getDeployStore,
  getStore,
} from '@netlify/blobs';
import {
  Extension,
  envVarToBool,
  type ConfigEnvironmentVariables,
} from './util/extension';
import { updateConfig } from './contentMetadata/config';
import { postGitComment } from './github/createGithubComment';
import { findAllContentPaths } from './contentMetadata/findContentPaths';
import {
  getFileChanges,
  findContentPathsWithChanges,
} from './github/processFileChanges';
import type { Environments } from './util/databaseConnection/types';
import { getParser } from './github/getParser';
import { runPrebuildModules } from './parse/runModules';
import {
  getAllProjectNames,
  type ProjectNames,
} from './contentMetadata/readSnootyToml';
import { fetchAtlasData } from './contentMetadata/fetchAndStoreAtlasData';
import {
  processContentMetadata,
  type AllContentData,
} from './contentMetadata/processContentMetadata';
import { getParserVersion } from './parse/runModules';
import { buildToc } from './buildTOC/index';
import { handleSearchManifests } from './searchManifests/index';

const ENVS_TO_RUN = ['dotcomprd', 'dotcomstg'];
import { handleOfflineDownloads } from './offline-docs/index';

const extension = new Extension({
  isEnabled: envVarToBool(process.env.NEXTJS_EXTENSION_ENABLED),
});

const RELATIVE_PATH_TO_CONTENT = path.resolve(process.cwd(), '..', '..');
const CONTENT_DIR = path.resolve(RELATIVE_PATH_TO_CONTENT, 'content');
/** Limit how deep to search below baseDir for snooty.toml (baseDir is depth 0) */
const TOML_SEARCH_MAX_DEPTH = 5;

const allContentData: AllContentData = {
  atlasProjectDocuments: {},
  pathsToBuild: [],
  baseDir: process.cwd(),
  relativePathToContent: RELATIVE_PATH_TO_CONTENT,
  docsPaths: {},
};

extension.addBuildEventHandler(
  'onPreBuild',
  async ({ netlifyConfig, dbEnvVars, utils }) => {
    // Record build start time
    if (!process.env.BUILD_START_TIME) {
      const startTime = Date.now().toString();
      process.env.BUILD_START_TIME = startTime;
    }

    const configEnvironment: ConfigEnvironmentVariables =
      netlifyConfig.build.environment;

    // add env vars to config environment
    await updateConfig({
      configEnvironment: netlifyConfig.build.environment,
      dbEnvVars,
    });


    // Post initial git comment
    if (!configEnvironment.IS_LOCAL_DEVELOPMENT) {
      await postGitComment({
        configEnvironment,
        status: 'building',
        dbEnvVars,
      });
    } else {
      console.log('Skipping GitHub comment for local development');
    }

    const parserVersion = await getParserVersion({
      buildEnvironment: configEnvironment.ENV,
      dbEnvVars,
    });

    const contentDirectories = await findAllContentPaths(
      CONTENT_DIR,
      TOML_SEARCH_MAX_DEPTH,
    );
    if (!contentDirectories.length) {
      console.warn('No snooty.toml files found');
    } else {
      console.log(`Found ${contentDirectories.length} snooty.toml files`);
    }

    const validParserCache = await getParser({
      run: utils.run,
      cache: utils.cache,
      expectedParserVersion: parserVersion,
      downloadDir: allContentData.baseDir,
      environment: configEnvironment.ENV as Environments,
    });

    if (validParserCache) {
      // TODO: improve file changes detection
      const fileChanges = await getFileChanges({
        run: utils.run,
        git: utils.git,
      });

      const { changedContentPaths } = await findContentPathsWithChanges({
        fileChanges,
        allFullContentPaths: contentDirectories,
      });
      allContentData.pathsToBuild.push(...changedContentPaths);
    } else {
      allContentData.pathsToBuild.push(...contentDirectories);
    }

    const projectNames: ProjectNames =
      await getAllProjectNames(contentDirectories);
    console.log('Retrieved all project names for changed content paths');

    const atlasProjectDocuments = await fetchAtlasData({
      configEnvironment,
      dbEnvVars,
      baseDir: allContentData.baseDir,
      projectNames,
    });

    // todo maybe remove "content" from all paths
    allContentData.atlasProjectDocuments = atlasProjectDocuments;

    // updates allContentData with docsPaths and pathsToBuild
    Object.assign(
      allContentData,
      await processContentMetadata({
        projectNames,
        atlasProjectDocuments: allContentData.atlasProjectDocuments,
        clearCache: false,
      }),
    );

    if (allContentData.pathsToBuild) {
      // run parser, persistence module for each content path (or all if parser version has changed)
      await runPrebuildModules({
        netlifyPluginUtils: utils,
        allContentData,
        parserPath: path.resolve(allContentData.baseDir, 'snooty-parser'),
        atlasProjectDocuments: allContentData.atlasProjectDocuments,
        branchName: configEnvironment.BRANCH as string,
        prId: configEnvironment.REVIEW_ID
          ? Number.parseInt(configEnvironment.REVIEW_ID, 10)
          : undefined,
      });

      //run mdx conversion for each changed content path (or all if conversion script or parser has changed)

      //Check if blob store exists for current branch
      // if not, create it using data from prod

      // const mdxContentStore = getStore('mdx-content');
      // console.log('mdxContentStore: ', mdxContentStore);

      // diff files from blob store with current branch
      // upload only changed files to the blob store (check that this strategy is actually most efficient)
    }

    // build toc
    // TODO: cache this? it shouldn't change often, when should it be invalidated?
    await buildToc({
      allContentData,
      utils,
    });
  },
);

// extension.addBuildEventHandler(
//   'onSuccess',
//   async ({ dbEnvVars, netlifyConfig, utils: { run } }) => {
//     const configEnvironment = netlifyConfig.build
//       .environment as ConfigEnvironmentVariables;
//     // Update GitHub comment with success status

//     await postGitComment({
//       configEnvironment,
//       status: 'success',
//       dbEnvVars,
//     });

// if (!ENVS_TO_RUN.includes(configEnvironment.ENV ?? '')) {
// skip generation for non qa / prod env
//       console.log(
//         'Skipping search manifest and offline docs generation for env ',
//         configEnvironment.ENV,
//       );
//       return;
//     }

//     console.log(
//       `Generating search manifest for version ${JSON.stringify(
//         allContentData.pathsToBuild,
//       )} (from populate-metadata)`,
//     );

//     await handleSearchManifests({
//       allContentData,
//       run,
//       dbEnvVars,
//       configEnvironment,
//     });
//   },
// );

extension.addBuildEventHandler('onSuccess', ({ utils: { git } }) => {
  const gitChangedFiles = git.modifiedFiles;

  // TODO: this should only run on prod build
  handleOfflineDownloads(allContentData, gitChangedFiles);
});

export { extension };
