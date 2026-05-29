import fs from "node:fs/promises";
import path from "node:path";
import {
	convertZipFileToMdx,
	convertZipImageFiles,
} from "../../../snooty-ast-to-mdx/src/index.js";
import type { AllContentData } from "../contentMetadata/processContentMetadata.js";
import type { BranchEntry } from "../util/databaseConnection/types.js";
import { getRepoPaths } from "../paths.js";

/** Run AST→MDX conversion for each content path using pre-built bundle zips, then list output files. */
export async function runMdxConversionForContentPaths({
	allContentData,
	mdxOutputPath,
}: {
	allContentData: AllContentData;
	mdxOutputPath: string;
}): Promise<string[]> {
	const { absoluteBundlePath } = getRepoPaths();
	const results = await Promise.allSettled(
		allContentData.pathsToBuild.map(async (contentPath) => {
			const bundleZipPath = `${absoluteBundlePath(contentPath)}.zip`;
			const outputDirectory = path.join(mdxOutputPath, contentPath);

			// For versioned projects, objects.inv must be served at two URLs:
			//   /docs/{project}/{version}/objects.inv  (always — e.g. atlas-architecture references this)
			//   /docs/{project}/objects.inv            (stable branch only — e.g. atlas and vector-search reference this)
			// We always write to outputDirectory (version-specific). For the stable
			// branch we also write to the project root directory one level up.
			const docsPath = allContentData.docsPaths[contentPath];
			const isVersioned = !!docsPath?.versionName;
			let additionalInvOutputDirectory: string | undefined;
			if (isVersioned) {
				const branchEntry = allContentData.atlasProjectDocuments[
					docsPath.projectName
				]?.reposBranchesEntry?.branches?.find(
					(b: BranchEntry) =>
				b.urlSlug === docsPath.versionName ||
				b.gitBranchName === docsPath.versionName ||
				b.urlAliases?.includes(docsPath.versionName),
				);
				if (branchEntry?.isStableBranch) {
					additionalInvOutputDirectory = path.join(
						mdxOutputPath,
						docsPath.projectDirName,
					);
				}
			}

			console.log(
				`running mdx conversion for ${contentPath} → ${outputDirectory}`,
			);

			const { assetChecksumToKey } = await convertZipFileToMdx({
				zipPath: bundleZipPath,
				outputDirectory,
				additionalInvOutputDirectory,
			});

			await convertZipImageFiles({
				outputDirectory,
				zipPath: bundleZipPath,
				assetChecksumToKey,
			});
		}),
	);

	for (const [i, result] of results.entries()) {
		if (result.status === "rejected") {
			console.warn(
				`[runMdxConversion] conversion failed for ${allContentData.pathsToBuild[i]}: ${result.reason instanceof Error ? result.reason.message : result.reason}`,
			);
		}
	}

	const entries = await fs.readdir(path.resolve(mdxOutputPath), {
		recursive: true,
	});

	return entries.map(String);
}
