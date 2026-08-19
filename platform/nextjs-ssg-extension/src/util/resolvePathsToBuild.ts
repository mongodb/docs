import { envVarToBool } from "../../../nextjs-extension/src/util/extension";
import type { AllContentData } from "../../../nextjs-extension/src/contentMetadata/processContentMetadata";

/**
 * SSG-only path selection: rebuild solely from FORCE_REBUILD_PATHS.
 * Unlike the nextjs-extension resolver, this does not inspect git file
 * changes or expand from DOCS_PROJECT — only paths declared in
 * FORCE_REBUILD_PATHS are added to the build queue.
 *
 * FORCE_REBUILD_PATHS may list a docset root (`manual`) or a specific
 * version (`manual/manual`, `node/current`). Matching uses exact equality
 * or a segment-boundary prefix (`manual` matches `manual/v8.0`, not
 * `manual-foo`).
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
		// Only force-build active versions unless ALLOW_INACTIVE_VERSIONS is set
		if (!allowInactiveVersions && !isPathActive(contentPath, allContentData)) {
			console.log(
				`[ssg-extension] Skipping inactive path (set ALLOW_INACTIVE_VERSIONS to include): ${contentPath}`,
			);
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
