import { envVarToBool } from "./configEnvironment";
import {
	type AllContentData,
	getBranchForContentPath,
} from "../contentMetadata/processContentMetadata";

/**
 * SSG-only path selection: rebuild solely from FORCE_REBUILD_PATHS.
 * This does not inspect git file changes or expand from
 * DOCS_PROJECT — only paths declared in FORCE_REBUILD_PATHS are added
 * to the build queue.
 *
 * FORCE_REBUILD_PATHS may list a docset root (`manual`) or a specific
 * version (`manual/manual`, `node/current`). Matching uses exact equality
 * or a segment-boundary prefix (`manual` matches `manual/v8.0`, not
 * `manual-foo`).
 *
 * Inactive versions are included only when ALLOW_INACTIVE_VERSIONS is set
 * and the Atlas branch is eolType === 'link' (not 'download').
 */
export function resolvePathsToBuild({
	contentDirectories,
	allContentData,
}: {
	contentDirectories: string[];
	allContentData: AllContentData;
}) {
	const forceRebuildPaths = (process.env.FORCE_REBUILD_PATHS ?? "")
		.split(",")
		.map((p) => p.trim())
		.filter(Boolean);
	const allowInactiveVersions = envVarToBool(
		process.env.ALLOW_INACTIVE_VERSIONS,
	);

	if (forceRebuildPaths.length === 0) {
		console.error(
			"[ssg-extension] FORCE_REBUILD_PATHS must be set for an SSG build",
		);
		return;
	}

	console.log(
		`[ssg-extension] FORCE_REBUILD_PATHS set — forcing rebuild of: ${forceRebuildPaths.join(", ")}`,
	);

	for (const contentPath of contentDirectories) {
		if (
			!forceRebuildPaths.some(
				(p) => contentPath === p || contentPath.startsWith(`${p}/`),
			)
		) {
			continue;
		}
		if (allContentData.pathsToBuild.includes(contentPath)) {
			continue;
		}
		if (!shouldQueueForcedPath(contentPath, allContentData, allowInactiveVersions)) {
			continue;
		}
		console.log(`[ssg-extension] Force-adding to build: ${contentPath}`);
		allContentData.pathsToBuild.push(contentPath);
	}
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

/**
 * Active versions always queue. Inactive versions queue only when
 * ALLOW_INACTIVE_VERSIONS is set and Atlas eolType === 'link' (not 'download').
 */
const shouldQueueForcedPath = (
	contentPath: string,
	allContentData: AllContentData,
	allowInactiveVersions: boolean,
): boolean => {
	if (isPathActive(contentPath, allContentData)) return true;
	if (!allowInactiveVersions) {
		console.log(
			`[ssg-extension] Skipping inactive path (set ALLOW_INACTIVE_VERSIONS to include eolType=link): ${contentPath}`,
		);
		return false;
	}
	const eolType = getBranchForContentPath(contentPath, allContentData)?.eolType;
	if (eolType === "link") return true;
	console.log(
		`[ssg-extension] Skipping inactive path ${contentPath}: eolType is ${eolType ?? "unset"} (ALLOW_INACTIVE_VERSIONS only includes eolType=link)`,
	);
	return false;
};
