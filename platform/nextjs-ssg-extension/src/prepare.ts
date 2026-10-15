import path from "node:path";
import fs from "node:fs/promises";
import type { ConfigEnvironmentVariables } from "../../nextjs-extension/src/util/configEnvironment";
import type { StaticEnvVars } from "../../nextjs-extension/src/util/assertDbEnvVars";
import type { BuildUtils } from "../../nextjs-extension/src/util/buildUtils";
import { updateConfig } from "../../nextjs-extension/src/contentMetadata/config";
import { findAllContentPaths } from "../../nextjs-extension/src/contentMetadata/findContentPaths";
import type { Environments } from "../../nextjs-extension/src/util/databaseConnection/types";
import { getParser } from "../../nextjs-extension/src/github/getParser";
import {
	getParserVersion,
	runPrebuildModules,
} from "../../nextjs-extension/src/parse/runModules";
import {
	getAllProjectNames,
	type ProjectNames,
} from "../../nextjs-extension/src/contentMetadata/readSnootyToml";
import { loadVersioningFromCheckout } from "../../nextjs-extension/src/contentMetadata/loadVersioningFromCheckout";
import {
	processContentMetadata,
	type AllContentData,
} from "../../nextjs-extension/src/contentMetadata/processContentMetadata";
import { getRepoPaths } from "../../nextjs-extension/src/paths";
import { buildUnifiedTOC } from "../../nextjs-extension/src/util/buildTOC/generateJSON";
import { buildPrefixList } from "../../nextjs-extension/src/blobUploads/buildPrefixList";
import { getDirNameToPrefix } from "../../nextjs-extension/src/blobUploads/mapFilesToUrlPaths";
import { runMdxConversionForContentPaths } from "./parse/runMdxConversion";
import { resolvePathsToBuild } from "./util/resolvePathsToBuild";
import { APP_DIR, ENVS_TO_RUN } from "./constants";
import { logDiskMetrics } from "./util/diskMetrics";

const TOML_SEARCH_MAX_DEPTH = 5;

export const createAllContentData = (): AllContentData => ({
	docsetsByProject: {},
	pathsToBuild: [],
	docsPaths: {},
});

/** Parses content, converts it to MDX, and writes the prefix maps and TOC
 *  that docs-site's `next build` reads. Mutates `configEnvironment` and
 *  `allContentData` in place. */
export const prepare = async ({
	configEnvironment,
	dbEnvVars,
	utils,
	allContentData,
}: {
	configEnvironment: ConfigEnvironmentVariables;
	dbEnvVars: StaticEnvVars;
	utils: BuildUtils;
	allContentData: AllContentData;
}) => {
	if (!process.env.BUILD_START_TIME) {
		process.env.BUILD_START_TIME = Date.now().toString();
	}

	await logDiskMetrics(
		"onPreBuild:start",
		"build start, before any content work",
	);

	await updateConfig({ configEnvironment, dbEnvVars });

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

	allContentData.docsetsByProject = await loadVersioningFromCheckout({
		run: utils.run,
	});

	Object.assign(
		allContentData,
		await processContentMetadata({
			projectNames,
			docsetsByProject: allContentData.docsetsByProject,
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
			docsetsByProject: allContentData.docsetsByProject,
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
		const tocJsonPath = path.join(tableOfContentsCWD, "output", "toc.json");
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
};
