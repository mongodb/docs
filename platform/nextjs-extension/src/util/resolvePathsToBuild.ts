import type { NetlifyPluginOptions } from "@netlify/build";
import { envVarToBool } from "./extension";
import {
	getFileChanges,
	findContentPathsWithChanges,
} from "../github/processFileChanges";
import type { AllContentData } from "../contentMetadata/processContentMetadata";

export async function resolvePathsToBuild({
	utils,
	contentDirectories,
	allContentData,
	validParserCache,
}: {
	utils: NetlifyPluginOptions["utils"];
	contentDirectories: string[];
	allContentData: AllContentData;
	validParserCache: boolean;
}) {
	const forceRebuildAll = envVarToBool(process.env.FORCE_REBUILD_ALL);
	const forceRebuildPaths = (process.env.FORCE_REBUILD_PATHS ?? '')
		.split(',')
		.map((p) => p.trim())
		.filter(Boolean);

	if (forceRebuildAll || !validParserCache) {
		if (forceRebuildAll) {
			console.log('FORCE_REBUILD_ALL set — rebuilding all content paths');
		}
		if (!validParserCache) {
			console.log('Parser cache is invalid — rebuilding all content paths');
		}
		allContentData.pathsToBuild.push(...contentDirectories);
		return;
	}
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

	if (forceRebuildPaths.length > 0) {
		console.log(
			`FORCE_REBUILD_PATHS set — forcing rebuild of: ${forceRebuildPaths.join(', ')}`,
		);
		for (const contentPath of contentDirectories) {
			if (
				forceRebuildPaths.some(
					(p) => contentPath === p || contentPath.startsWith(p),
				) &&
				!allContentData.pathsToBuild.includes(contentPath)
			) {
				console.log(`Force-adding to build: ${contentPath}`);
				allContentData.pathsToBuild.push(contentPath);
			}
		}
	}
	return;
}
