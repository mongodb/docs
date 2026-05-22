// Documentation: https://sdk.netlify.com/docs/
import {
	Extension,
	envVarToBool,
	type ConfigEnvironmentVariables,
} from "./util/extension";
import { updateConfig } from "./contentMetadata/config";
import { findAllContentPaths } from "./contentMetadata/findContentPaths";
import type { Environments } from "./util/databaseConnection/types";
import { getParser } from "./github/getParser";
import { runPrebuildModules } from "./parse/runModules";
import {
	getAllProjectNames,
	type ProjectNames,
} from "./contentMetadata/readSnootyToml";
import { fetchAtlasData } from "./contentMetadata/fetchAndStoreAtlasData";
import {
	processContentMetadata,
	type AllContentData,
} from "./contentMetadata/processContentMetadata";
import { getParserVersion } from "./parse/runModules";
import { runMdxConversionForContentPaths } from "./parse/runMdxConversion";
import { getRepoPaths } from "./paths";
import { buildToc } from "./buildTOC/index";
import { handleOfflineDownloads } from "./offline-docs/index";
import { handleSearchManifests } from "./searchManifests/index";
import { writePathPrefixListToFile, writeDirNameToPrefixMapToFile } from "./blobUploads/buildPrefixList";
import { handleAllBlobUploads } from "./blobUploads/handleAllBlobUploads";
import { deleteOrphanedFilesFromBlobStore } from "./blobUploads/deleteOrphanedFilesFromBlobStore";
import { resolvePathsToBuild } from "./util/resolvePathsToBuild";
import {
	getMdxContentBlobStores,
	MAIN_BRANCH,
} from "./blobUploads/getBlobStores";
// TODO: put back dotcomstg
const ENVS_TO_RUN = ["dotcomprd"];

const extension = new Extension({
	isEnabled: envVarToBool(process.env.NEXTJS_EXTENSION_ENABLED),
});

/** Limit how deep to search below baseDir for snooty.toml (baseDir is depth 0) */
const TOML_SEARCH_MAX_DEPTH = 5;

const allContentData: AllContentData = {
	atlasProjectDocuments: {},
	pathsToBuild: [],
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

		const parserVersion = await getParserVersion({
			buildEnvironment: configEnvironment.ENV as string,
			dbEnvVars,
		});

		const { contentDir } = getRepoPaths();
		const contentDirectories = await findAllContentPaths(
			contentDir,
			TOML_SEARCH_MAX_DEPTH,
			contentDir,
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
			environment: configEnvironment.ENV as Environments,
		});

		await resolvePathsToBuild({
			utils,
			contentDirectories,
			allContentData,
			validParserCache,
		});

		const projectNames: ProjectNames =
			await getAllProjectNames(contentDirectories);
		console.log("Retrieved all project names for changed content paths");

		const atlasProjectDocuments = await fetchAtlasData({
			configEnvironment,
			dbEnvVars,
			projectNames,
		});

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
			const { mdxOutputDir: mdxOutputPath } = getRepoPaths();
			const relativeFilePaths = await runMdxConversionForContentPaths({
				allContentData,
				mdxOutputPath,
			});

			await writePathPrefixListToFile(allContentData);
			await writeDirNameToPrefixMapToFile(allContentData);

			await handleAllBlobUploads({
				mdxOutputPath,
				relativeFilePaths,
				allContentData,
				branchStore,
				productionStore,
			});

			// branchStore always has value on non-main builds; main uses productionStore.
			await deleteOrphanedFilesFromBlobStore({
				relativeFilePaths,
				allContentData,
				store: branchStore || productionStore,
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
	async ({ netlifyConfig, utils: { git, run }, dbEnvVars }) => {
		const configEnvironment = netlifyConfig.build
			.environment as ConfigEnvironmentVariables;

		const gitChangedFiles = git.modifiedFiles;

		if (ENVS_TO_RUN.includes(configEnvironment.ENV ?? "")) {
			// this should only run on prod build
			await handleOfflineDownloads(allContentData, gitChangedFiles, run);

			console.log(
				`Generating search manifest for version ${JSON.stringify(
					allContentData.pathsToBuild,
				)} (from nextjs Netlify extension)`,
			);

			await handleSearchManifests({
				allContentData,
				run,
				dbEnvVars,
				configEnvironment,
			});
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
