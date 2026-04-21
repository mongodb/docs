import type { NetlifyPluginUtils } from "@netlify/build";
import { parse, type ParserCommandArgs } from "../parse/parse";
import { runPersistenceModule } from "../persistence/index";
import type { DocsetsDocument } from "../util/databaseConnection/types";
import { closeConnections } from "../persistence/index";
import path from "node:path";
import { constructParserLogs, displayParserLogs } from "./handleParseLogs";
import type { StaticEnvVars } from "../util/assertDbEnvVars";
import {
	getBundlePathForContent,
	type AllContentData,
	constructFullPath,
} from "../contentMetadata/processContentMetadata";
import type { AtlasProjectDocuments } from "../contentMetadata/fetchAndStoreAtlasData";

/** Get the desired parser version for the build environment
 * @param buildEnvironment - the build environment
 * @param dbEnvVars - the database environment variables
 * @returns the desired parser version
 */
export const getParserVersion = async ({
	buildEnvironment,
	dbEnvVars,
}: {
	buildEnvironment: string;
	dbEnvVars: StaticEnvVars;
}): Promise<string> => {
	if (buildEnvironment === "dotcomstg") {
		return dbEnvVars.DOTCOMSTG_PARSER_VERSION;
	}
	return dbEnvVars.PARSER_VERSION;
};

export type prepAndRunModulesParams = {
	netlifyPluginUtils: NetlifyPluginUtils;
	allContentData: AllContentData;
	parserPath: string;
	branchName: string;
	atlasProjectDocuments: AtlasProjectDocuments;
	prId?: number;
	shouldRunPersistence: boolean;
};

/** Runs the parser and persistence module for each content path
 * @param netlifyPluginUtils - the Netlify plugin utils
 * @param parserPath - the path to the parser
 * @param branchName - the name of the branch
 * @param allContentData - allContentData object containing all content data for the build
 * @param atlasProjectDocuments - Atlas document entries for each project
 * @param prId - the pull request id
 * @returns the duration of the parser and persistence module in milliseconds
 */
export const runPrebuildModules = async ({
	netlifyPluginUtils,
	parserPath,
	branchName,
	allContentData,
	atlasProjectDocuments,
	prId,
	shouldRunPersistence,
}: prepAndRunModulesParams): Promise<number> => {
	if (!allContentData.pathsToBuild) return 0;
	const startMs = Date.now();
	// iterate over each project and then iterate over each version to build
	const contentPathsToBuild = allContentData.pathsToBuild;
	const buildPromises = contentPathsToBuild.map(async (contentPath: string) => {
		const contentBundleData = allContentData.docsPaths[contentPath];
		try {
			const projectName = contentBundleData.projectName;
			// opt/build/repo/content/<dirName>/<versionName>/bundle.zip
			// TODO: fix this
			// TODO 6459: should be able to just use the content path + relative path to content here??
			const bundlePath = getBundlePathForContent({
				relativePathToContent: allContentData.relativePathToContent,
				projectDirName: contentBundleData.projectDirName,
				versionName: contentBundleData.versionName,
			});
			const parserArgs = {
				parserPath,
				parsedOutputPath: bundlePath,
				// TODO 6508: do we want it to be main if non-versioned?? that is what it was before
				// For docs-frontend-stg, version will be the repo name because that is where the content lives
				// We set main as a version for non-versioned sites to prevent the "Not Feature Available" for rendering for non-versioned sites
				version: contentBundleData.versionName || "main",
				contentPath: constructFullPath({
					relativePathToContent: allContentData.relativePathToContent,
					projectDirName: contentBundleData.projectDirName,
					versionName: contentBundleData.versionName,
				}),
			};

			const parserLogs = await runPrebuildModulesPerPath({
				parserArgs,
				bundlePath,
				netlifyPluginUtils,
				docsetEntry:
					atlasProjectDocuments[projectName]?.docsetsEntry ||
					({} as DocsetsDocument),
				branchName,
				prId,
				shouldRunPersistence,
			});
			return `${contentPath}: Success \n${parserLogs} \n \n ${breakMessage} \n`;
		} catch (e) {
			return `${contentPath}: Failed \n${e} \n \n ${breakMessage} \n `;
		}
	});
	const currentMax = process.stdout.getMaxListeners();
	process.stdout.setMaxListeners(contentPathsToBuild.length + currentMax);
	const parserLogs = constructParserLogs(
		await Promise.allSettled(buildPromises),
	);
	process.stdout.setMaxListeners(currentMax);
	await displayParserLogs({
		parserLogs,
		...netlifyPluginUtils,
		numVersionsParsed: allContentData.pathsToBuild.length || 0,
	});
	await closeConnections();
	const endMs = Date.now();
	const parseAndPersistDurationMs = endMs - startMs;
	return parseAndPersistDurationMs;
};

const breakMessage =
	"================================================================================================== \n";

/**
 * Runs the parser and persistence module
 * Logs both bothmodules
 * Will return parser logs as string for propagation
 **/
export const runPrebuildModulesPerPath = async ({
	parserArgs,
	bundlePath,
	netlifyPluginUtils,
	docsetEntry,
	branchName,
	prId,
	shouldRunPersistence,
}: {
	docsetEntry: DocsetsDocument;
	parserArgs: ParserCommandArgs;
	bundlePath: string;
	netlifyPluginUtils: Pick<NetlifyPluginUtils, "run" | "status" | "cache">;
	branchName: string;
	prId?: number;
	shouldRunPersistence: boolean;
}): Promise<string> => {
	const parserLogs = await parse({
		...parserArgs,
		netlifyPluginUtils,
	});

	if (shouldRunPersistence) {
		try {
			console.log(
				`========================================================================== Running persistence module for ${parserArgs.version}... ==========================================================================`,
			);
			await runPersistenceModule(
				`${bundlePath}.zip`,
				docsetEntry,
				branchName,
				prId,
			);
		} catch (e) {
			console.error(
				`Running persistence module for ${parserArgs.version} failed with error ${e}`,
			);
		}
	}
	return parserLogs;
};
