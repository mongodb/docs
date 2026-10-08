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
import { runMdxConversionForContentPaths } from "./parse/runMdxConversion";
import { getRepoPaths } from "../../nextjs-extension/src/paths";
import { buildUnifiedTOC } from "../../nextjs-extension/src/util/buildTOC/generateJSON";
import {
	buildPrefixList,
	getProjectVersionPaths,
} from "../../nextjs-extension/src/blobUploads/buildPrefixList";
import { getDirNameToPrefix } from "../../nextjs-extension/src/blobUploads/mapFilesToUrlPaths";
import { resolvePathsToBuild } from "./util/resolvePathsToBuild";
import { handleSearchManifests } from "../../nextjs-extension/src/searchManifests/index";
import { handleOfflineDownloads } from "./offline-docs/index";
import { handleLlmsTxt, handleRootLlmsTxt } from "./llms-txt/index";
import { getFileChanges } from "../../nextjs-extension/src/github/processFileChanges";
import { APP_DIR } from "./constants";
import { logDiskMetrics } from "./util/diskMetrics";

import path from "node:path";
import fs from "node:fs/promises";

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

		await logDiskMetrics(
			"onPreBuild:start",
			"build start, before any content work",
		);

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

		await getParser({
			run: utils.run,
			cache: utils.cache,
			expectedParserVersion: parserVersion,
			environment: configEnvironment.ENV as Environments,
		});

		await logDiskMetrics("onPreBuild:after-parser", "parser fetched and cached");

		const projectNames: ProjectNames =
			await getAllProjectNames(contentDirectories);
		console.log("Retrieved all project names for content paths");

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

		resolvePathsToBuild({
			contentDirectories,
			allContentData,
		});

		await logDiskMetrics(
			"onPreBuild:after-metadata",
			`content metadata processed; ${allContentData.pathsToBuild.length} content path(s) queued`,
		);

		if (allContentData.pathsToBuild) {
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

			await logDiskMetrics(
				"onPreBuild:after-prebuild-modules",
				`prebuild modules ran for ${allContentData.pathsToBuild.length} path(s)`,
			);

			const { mdxOutputDir: mdxOutputPath } = getRepoPaths(undefined, APP_DIR);
			await runMdxConversionForContentPaths({
				allContentData,
				mdxOutputPath,
			});

			await logDiskMetrics(
				"onPreBuild:after-mdx-conversion",
				"AST→MDX conversion complete",
			);

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

		await logDiskMetrics(
			"onPreBuild:after-toc",
			"unified TOC built and toc data written",
		);
	},
);

extension.addBuildEventHandler(
	"onSuccess",
	async ({ netlifyConfig, utils, dbEnvVars }) => {
		const configEnvironment = netlifyConfig.build
			.environment as ConfigEnvironmentVariables;

		await logDiskMetrics(
			"onSuccess:start",
			"deploy succeeded; starting post-build publish steps",
		);

		const gitChangedFiles = utils.git.modifiedFiles;

		if (ENVS_TO_RUN.includes(configEnvironment.ENV ?? "")) {
			console.log(
				`Generating search manifest for version ${JSON.stringify(
					allContentData.pathsToBuild,
				)} (from nextjs SSG Netlify extension)`,
			);

			// A failed search upload must not skip llms.txt or offline docs.
			try {
				await handleSearchManifests({
					allContentData,
					run: utils.run,
					dbEnvVars,
					configEnvironment,
				});
			} catch (error) {
				console.error(
					"[search-manifest] Failed to generate search manifests:",
					error,
				);
			}

			await logDiskMetrics(
				"onSuccess:after-search-manifest",
				"search manifests generated",
			);

			// A stale llms.txt is never a reason to fail a deploy: the
			// weekly root llms.txt pass and a manual `pnpm publish-project`
			// both recover from a skipped publish.
			try {
				await handleLlmsTxt(utils, configEnvironment);
				// Netlify's git.modifiedFiles diffs against the last cached
				// deploy commit and is often empty on landing builds, so read
				// the merged commit directly.
				const headCommitFiles = await getFileChanges({
					run: utils.run,
					git: utils.git,
				});
				await handleRootLlmsTxt(utils, configEnvironment, headCommitFiles);
			} catch (error) {
				console.error("[llms-txt] Failed to publish llms.txt:", error);
			}

			await logDiskMetrics("onSuccess:after-llms-txt", "llms.txt published");

			// this should only run on prod build
			console.log("Generating offline docs ...");
			await handleOfflineDownloads(
				allContentData,
				gitChangedFiles,
				utils,
				dbEnvVars,
				configEnvironment,
			);

			await logDiskMetrics(
				"onSuccess:end",
				"all post-build steps complete",
			);
		} else {
			console.log(
				"Skipping search manifest, offline docs, and llms.txt generation for env ",
				configEnvironment.ENV,
			);
			return;
		}
	},
);

export { extension };