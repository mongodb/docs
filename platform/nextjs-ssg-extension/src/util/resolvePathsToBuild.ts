import { envVarToBool } from "./configEnvironment";
import type { BuildRunner } from "./buildUtils";
import {
	type AllContentData,
	getBranchForContentPath,
} from "../contentMetadata/processContentMetadata";

/**
 * SSG-only path selection: rebuild solely from FORCE_REBUILD_PATHS.
 * Only paths declared in FORCE_REBUILD_PATHS are added to the build
 * queue; the build does not expand from DOCS_PROJECT.
 *
 * FORCE_REBUILD_PATHS may list a docset root (`manual`) or a specific
 * version (`manual/manual`, `node/current`). Matching uses exact equality
 * or a segment-boundary prefix (`manual` matches `manual/v8.0`, not
 * `manual-foo`).
 *
 * Deploy previews of the `manual` docset are the one exception to
 * "a docset root builds every version": when every file changed in the PR
 * belongs to a manual version, only the touched versions are built. A
 * changed file outside the versions, an empty diff, or any failure to read
 * the diff builds all versions.
 *
 * Inactive versions are included only when ALLOW_INACTIVE_VERSIONS is set
 * and the Atlas branch is eolType === 'link' (not 'download').
 */
export async function resolvePathsToBuild({
	contentDirectories,
	allContentData,
	run,
}: {
	contentDirectories: string[];
	allContentData: AllContentData;
	run: BuildRunner;
}) {
	const configuredPaths = (process.env.FORCE_REBUILD_PATHS ?? "")
		.split(",")
		.map((p) => p.trim())
		.filter(Boolean);
	const allowInactiveVersions = envVarToBool(
		process.env.ALLOW_INACTIVE_VERSIONS,
	);

	if (configuredPaths.length === 0) {
		console.error(
			"[ssg-extension] FORCE_REBUILD_PATHS must be set for an SSG build",
		);
		return;
	}

	const forceRebuildPaths = await narrowDeployPreviewPaths({
		forceRebuildPaths: configuredPaths,
		contentDirectories,
		run,
	});

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

/** Returns the version paths that own the changed files, or undefined when
 *  there are no changes or any file sits outside every version. */
export const findChangedVersions = ({
	changedFiles,
	versionPaths,
}: {
	changedFiles: string[];
	versionPaths: string[];
}): string[] | undefined => {
	if (changedFiles.length === 0) return undefined;
	const owners = new Set<string>();
	for (const file of changedFiles) {
		const owner = versionPaths.find((p) => file.startsWith(`content/${p}/`));
		if (!owner) return undefined;
		owners.add(owner);
	}
	return [...owners];
};

const narrowDeployPreviewPaths = async ({
	forceRebuildPaths,
	contentDirectories,
	run,
}: {
	forceRebuildPaths: string[];
	contentDirectories: string[];
	run: BuildRunner;
}): Promise<string[]> => {
	const isManualDeployPreview =
		process.env.CONTEXT === "deploy-preview" &&
		forceRebuildPaths.length === 1 &&
		forceRebuildPaths[0] === "manual";
	if (!isManualDeployPreview) return forceRebuildPaths;

	try {
		await run.command("git fetch --no-tags origin main");
		const { stdout } = await run.command(
			"git diff --name-only --no-renames FETCH_HEAD...HEAD",
			{ stdout: "pipe" },
		);
		const changedFiles = stdout
			.split("\n")
			// TEMPORARY, for testing only: test PRs flip the extension toggles in
			// netlify.toml, which would otherwise always block narrowing. Remove
			// the netlify.toml check before merging.
			.filter((file) => file && file !== "platform/docs-site/netlify.toml");
		const versions = findChangedVersions({
			changedFiles,
			versionPaths: contentDirectories.filter((p) => p.startsWith("manual/")),
		});
		console.log(
			`[ssg-extension] Deploy preview changed: ${changedFiles.slice(0, 10).join(", ")}; building ${versions?.join(", ") ?? "all manual versions"}`,
		);
		if (versions) return versions;
	} catch (error) {
		console.warn(
			"[ssg-extension] Could not determine changed files; building all versions:",
			error,
		);
	}
	return forceRebuildPaths;
};

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
