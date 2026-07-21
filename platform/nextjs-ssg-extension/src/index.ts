import {
	Extension,
	envVarToBool,
	type ConfigEnvironmentVariables,
} from "../../nextjs-extension/src/util/extension";
import { updateConfig } from "../../nextjs-extension/src/contentMetadata/config";
import { findAllContentPaths } from "../../nextjs-extension/src/contentMetadata/findContentPaths";
import type { Environments } from "../../nextjs-extension/src/util/databaseConnection/types";
import { getParser } from "../../nextjs-extension/src/github/getParser";
import { runPrebuildModules } from "../../nextjs-extension/src/parse/runModules";
import {
	getAllProjectNames,
	type ProjectNames,
} from "../../nextjs-extension/src/contentMetadata/readSnootyToml";
import { fetchAtlasData } from "../../nextjs-extension/src/contentMetadata/fetchAndStoreAtlasData";
import {
	processContentMetadata,
	type AllContentData,
} from "../../nextjs-extension/src/contentMetadata/processContentMetadata";
import { getParserVersion } from "../../nextjs-extension/src/parse/runModules";
import { runMdxConversionForContentPaths } from "../../nextjs-extension/src/parse/runMdxConversion";
import { getRepoPaths } from "../../nextjs-extension/src/paths";
import { buildUnifiedTOC } from "../../nextjs-extension/src/util/buildTOC/generateJSON";
import {
	buildPrefixList,
	getProjectVersionPaths,
} from "../../nextjs-extension/src/blobUploads/buildPrefixList";
import { getDirNameToPrefix } from "../../nextjs-extension/src/blobUploads/mapFilesToUrlPaths";
import { resolvePathsToBuild } from "../../nextjs-extension/src/util/resolvePathsToBuild";
import { handleOfflineDownloads } from "./offline-docs/index";

import path from "node:path";
import fs from "node:fs/promises";

const APP_DIR = "docs-site";
const TOML_SEARCH_MAX_DEPTH = 5;
const ENVS_TO_RUN = ["dotcomprd", "dotcomstg"];

const extension = new Extension({
	isEnabled: envVarToBool(process.env.NEXTJS_SSG_EXTENSION_ENABLED),
});

const allContentData: AllContentData = {
	atlasProjectDocuments: {},
	pathsToBuild: [],
	docsPaths: {},
};

extension.addBuildEventHandler(
	"onPreBuild",
	async ({ netlifyConfig, dbEnvVars, utils }) => {
		if (!process.env.BUILD_START_TIME) {
			process.env.BUILD_START_TIME = Date.now().toString();
		}

		const configEnvironment: ConfigEnvironmentVariables =
			netlifyConfig.build.environment;

		await updateConfig({
			configEnvironment: netlifyConfig.build.environment,
			dbEnvVars,
		});

		const parserVersion = await getParserVersion({
			buildEnvironment: configEnvironment.ENV as string,
			dbEnvVars,
		});

		const { contentDir } = getRepoPaths(undefined, APP_DIR);
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

		const projectNames: ProjectNames =
			await getAllProjectNames(contentDirectories);
		console.log("Retrieved all project names for changed content paths");

		const atlasProjectDocuments = await fetchAtlasData({
			configEnvironment,
			dbEnvVars,
			projectNames,
		});

		allContentData.atlasProjectDocuments = atlasProjectDocuments;

		Object.assign(
			allContentData,
			await processContentMetadata({
				projectNames,
				atlasProjectDocuments: allContentData.atlasProjectDocuments,
				clearCache: false,
			}),
		);

		await resolvePathsToBuild({
			utils,
			contentDirectories,
			allContentData,
			validParserCache,
		});

		if (allContentData.pathsToBuild) {
			await runPrebuildModules({
				netlifyPluginUtils: utils,
				allContentData,
				atlasProjectDocuments: allContentData.atlasProjectDocuments,
				branchName: configEnvironment.BRANCH as string,
				prId: configEnvironment.REVIEW_ID
					? Number.parseInt(configEnvironment.REVIEW_ID, 10)
					: undefined,
				shouldRunPersistence: false,
			});

			const { mdxOutputDir: mdxOutputPath } = getRepoPaths(undefined, APP_DIR);
			await runMdxConversionForContentPaths({
				allContentData,
				mdxOutputPath,
			});

			// Write prefix-map.json → docs-site/src/generated/
			const { generatedDir } = getRepoPaths(undefined, APP_DIR);
			await fs.mkdir(generatedDir, { recursive: true });

			const sortedProjectPrefixes = buildPrefixList(allContentData);
			await fs.writeFile(
				path.join(generatedDir, "prefix-map.json"),
				JSON.stringify(sortedProjectPrefixes, null, 2),
			);
			console.log(
				"[ssg-extension] prefix-map.json written:",
				sortedProjectPrefixes,
			);

			// Write dir-name-to-prefix.json → docs-site/src/generated/
			const dirNameToPrefix = getDirNameToPrefix(allContentData);
			await fs.writeFile(
				path.join(generatedDir, "dir-name-to-prefix.json"),
				JSON.stringify(dirNameToPrefix, null, 2),
			);
			console.log(
				"[ssg-extension] dir-name-to-prefix.json written:",
				Object.keys(dirNameToPrefix).length,
				"entries",
			);
		}

		// Build TOC → docs-site/src/context/toc-data/
		const { absoluteContentPath, tocDataDir } = getRepoPaths(
			undefined,
			APP_DIR,
		);
		const tableOfContentsCWD = absoluteContentPath("table-of-contents");
		await buildUnifiedTOC({
			run: utils.run,
			tableOfContentsCWD,
		});

		try {
			const tocJsonPath = path.join(
				tableOfContentsCWD,
				"output",
				"toc.json",
			);
			await fs.mkdir(tocDataDir, { recursive: true });
			const tocJsonContent = await fs.readFile(tocJsonPath, "utf-8");
			const tsContent = `// Auto-generated from toc.json\nexport const tocData = ${tocJsonContent} as const;\n`;
			const outputPath = path.join(tocDataDir, "data.copied.ts");
			await fs.writeFile(outputPath, tsContent, "utf-8");
			console.log(`[ssg-extension] Successfully created ${outputPath}`);
		} catch (error) {
			console.error("[ssg-extension] Error creating tocData export:", error);
		}
	},
);

extension.addBuildEventHandler(
	"onSuccess",
	async ({ netlifyConfig, utils, dbEnvVars }) => {
		const configEnvironment = netlifyConfig.build
			.environment as ConfigEnvironmentVariables;

		const gitChangedFiles = utils.git.modifiedFiles;

		if (ENVS_TO_RUN.includes(configEnvironment.ENV ?? "")) {
			// this should only run on prod build
			console.log("Generating offline docs ...");
			await handleOfflineDownloads(
				allContentData,
				gitChangedFiles,
				utils,
				dbEnvVars,
				configEnvironment,
			);

			console.log(
				`Generating search manifest for version ${JSON.stringify(
					allContentData.pathsToBuild,
				)} (from nextjs Netlify extension)`,
			);

			// await handleSearchManifests({
			// 	allContentData,
			// 	run,
			// 	dbEnvVars,
			// 	configEnvironment,
			// });
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
