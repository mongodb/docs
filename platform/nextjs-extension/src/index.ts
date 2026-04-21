// Documentation: https://sdk.netlify.com/docs
import path from "node:path";
import {
	Extension,
	envVarToBool,
	type ConfigEnvironmentVariables,
} from "./util/extension";
import { updateConfig } from "./contentMetadata/config";
import { postGitComment } from "./github/createGithubComment";
import { findAllContentPaths } from "./contentMetadata/findContentPaths";
import {
	getFileChanges,
	findContentPathsWithChanges,
} from "./github/processFileChanges";
import type { Environments } from "./util/databaseConnection/types";
import { getParser } from "./github/getParser";
import { runPrebuildModules } from "./parse/runModules";
import {
	getAllProjectNames,
	getDocsMonorepoRoot,
	type ProjectNames,
} from "./contentMetadata/readSnootyToml";
import { fetchAtlasData } from "./contentMetadata/fetchAndStoreAtlasData";
import {
	processContentMetadata,
	type AllContentData,
} from "./contentMetadata/processContentMetadata";
import { getParserVersion } from "./parse/runModules";
import { runMdxConversionForContentPaths } from "./parse/runMdxConversion";
import { buildToc } from "./buildTOC/index";
import { handleOfflineDownloads } from "./offline-docs/index";
import { writePathPrefixListToFile } from "./blobUploads/buildPrefixList";
import { handleAllBlobUploads } from "./blobUploads/handleAllBlobUploads";
import {
	getMdxContentBlobStores,
	MAIN_BRANCH,
} from "./blobUploads/getBlobStores";

const ENVS_TO_RUN = ["dotcomprd", "dotcomstg"];

const extension = new Extension({
	isEnabled: envVarToBool(process.env.NEXTJS_EXTENSION_ENABLED),
});

const RELATIVE_PATH_TO_CONTENT = path.resolve(process.cwd(), "..", "..");
const CONTENT_DIR = path.resolve(RELATIVE_PATH_TO_CONTENT, "content");
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
	"onPreBuild",
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
				status: "building",
				dbEnvVars,
			});
		} else {
			console.log("Skipping GitHub comment for local development");
		}

		const parserVersion = await getParserVersion({
			buildEnvironment: configEnvironment.ENV as string,
			dbEnvVars,
		});

		const monorepoRoot = getDocsMonorepoRoot(RELATIVE_PATH_TO_CONTENT);
		const contentDirectories = await findAllContentPaths(
			CONTENT_DIR,
			TOML_SEARCH_MAX_DEPTH,
			monorepoRoot,
		);
		if (!contentDirectories.length) {
			console.warn("No snooty.toml files found");
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
			await getAllProjectNames(contentDirectories, monorepoRoot);
		console.log("Retrieved all project names for changed content paths");

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
				parserPath: path.resolve(allContentData.baseDir, "snooty-parser"),
				atlasProjectDocuments: allContentData.atlasProjectDocuments,
				branchName: configEnvironment.BRANCH as string,
				prId: configEnvironment.REVIEW_ID
					? Number.parseInt(configEnvironment.REVIEW_ID, 10)
					: undefined,
				shouldRunPersistence: ENVS_TO_RUN.includes(configEnvironment.ENV ?? ""),
			});

			const isMain = process.env.HEAD === MAIN_BRANCH;
			const { branchStore, productionStore } = getMdxContentBlobStores({
				branchName: configEnvironment.BRANCH as string,
				siteId: process.env.NETLIFY_SITE_ID,
				token: process.env.NETLIFY_ACCESS_TOKEN,
				isMain,
			});

			// run mdx conversion for each changed content path (or all if conversion script or parser has changed)
			const mdxOutputPath = path.resolve("/opt/build/repo/content-mdx/");
			const relativeFilePaths = await runMdxConversionForContentPaths({
				allContentData,
				mdxOutputPath,
			});

			await writePathPrefixListToFile(allContentData);

			await handleAllBlobUploads({
				mdxOutputPath,
				relativeFilePaths,
				allContentData,
				branchStore,
				productionStore,
			});
		}

		// build toc
		// TODO: cache this? it shouldn't change often, when should it be invalidated?
		await buildToc({
			allContentData,
			utils,
		});
	},
);

extension.addBuildEventHandler(
	"onSuccess",
	({ netlifyConfig, utils: { git } }) => {
		const configEnvironment = netlifyConfig.build
			.environment as ConfigEnvironmentVariables;
		// Update GitHub comment with success status

		//     await postGitComment({
		//       configEnvironment,
		//       status: 'success',
		//       dbEnvVars,
		//     });

		const gitChangedFiles = git.modifiedFiles;

		if (ENVS_TO_RUN.includes(configEnvironment.ENV ?? "")) {
			// this should only run on prod build
			handleOfflineDownloads(allContentData, gitChangedFiles);

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
		} else {
			console.log(
				"Skipping search manifest and offline docs generation for env ",
				configEnvironment.ENV,
			);
			return;
		}
	},
);

export { extension };
