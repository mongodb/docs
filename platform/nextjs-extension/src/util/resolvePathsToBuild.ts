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
	const forceRebuildAllActive = envVarToBool(
		process.env.FORCE_REBUILD_ALL_ACTIVE,
	);
	const forceRebuildAllInactive = envVarToBool(
		process.env.FORCE_REBUILD_ALL_INACTIVE,
	);
	const forceRebuildPaths = (process.env.FORCE_REBUILD_PATHS ?? '')
		.split(',')
		.map((p) => p.trim())
		.filter(Boolean);
	const allowInactiveVersions = envVarToBool(
		process.env.ALLOW_INACTIVE_VERSIONS,
	);

	// A cache miss (invalid parser cache) no longer fans out to every active
	// path. We only rebuild paths that changed in the last commit (detected
	// below), plus anything covered by the explicit force-rebuild flags.
	if (!validParserCache) {
		console.log(
			'Parser cache is invalid — rebuilding only changed content paths',
		);
	}

	if (forceRebuildAllActive || forceRebuildAllInactive) {
		if (forceRebuildAllActive) {
			console.log(
				'FORCE_REBUILD_ALL_ACTIVE set — rebuilding all active content paths',
			);
		}
		if (forceRebuildAllInactive) {
			console.log(
				'FORCE_REBUILD_ALL_INACTIVE set — rebuilding all inactive content paths',
			);
		}

		const pathsToAdd = contentDirectories.filter((contentPath) => {
			const isActive = isPathActive(contentPath, allContentData);
			return (isActive && forceRebuildAllActive) || (!isActive && forceRebuildAllInactive);
		});
		allContentData.pathsToBuild.push(...pathsToAdd);

		// If we're rebuilding both active and inactive (effectively "all"), no
		// further work is needed.
		if (forceRebuildAllActive && forceRebuildAllInactive) {
			return;
		}
		// Fall through: when only one of the two is set, we still want to allow
		// FORCE_REBUILD_PATHS and changed-file detection to top up the queue with
		// anything they would normally add on top of git-change detection.
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
	for (const contentPath of changedContentPaths) {
		if (!allContentData.pathsToBuild.includes(contentPath)) {
			allContentData.pathsToBuild.push(contentPath);
		}
	}

	if (forceRebuildPaths.length > 0) {
		console.log(
			`FORCE_REBUILD_PATHS set — forcing rebuild of: ${forceRebuildPaths.join(', ')}`,
		);
		for (const contentPath of contentDirectories) {
			if (
				forceRebuildPaths.some(
					(p) => contentPath === p || contentPath.startsWith(`${p}/`),
				) &&
				!allContentData.pathsToBuild.includes(contentPath)
			) {
				// Only force-build active versions unless ALLOW_INACTIVE_VERSIONS is set to true
				if (!allowInactiveVersions && !isPathActive(contentPath, allContentData)) {
					console.log(
						`Skipping inactive path (set ALLOW_INACTIVE_VERSIONS to include): ${contentPath}`,
					);
					continue;
				}
				console.log(`Force-adding to build: ${contentPath}`);
				allContentData.pathsToBuild.push(contentPath);
			}
		}
	}
	return;
}

/** Looks up a content path's active flag from docsPaths. Defaults to `true` for
 *  unknown paths so we don't silently drop them from builds when metadata is
 *  missing. */
const isPathActive = (
	contentPath: string,
	allContentData: AllContentData,
): boolean => {
	const bundle = allContentData.docsPaths?.[contentPath];
	if (!bundle) return true;
	return bundle.active;
};
