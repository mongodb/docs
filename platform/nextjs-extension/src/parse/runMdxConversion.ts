import fs from "node:fs/promises";
import path from "node:path";
import {
	convertZipFileToMdx,
	convertZipImageFiles,
} from "../../../snooty-ast-to-mdx/src/index.js";
import {
	getBundlePathForContent,
	type AllContentData,
} from "../contentMetadata/processContentMetadata.js";

/** Run AST→MDX conversion for each content path using pre-built bundle zips, then list output files. */
export async function runMdxConversionForContentPaths({
	allContentData,
	mdxOutputPath,
}: {
	allContentData: AllContentData;
	mdxOutputPath: string;
}): Promise<string[]> {
	const results = await Promise.allSettled(
		allContentData.pathsToBuild.map(async (contentPath) => {
			const { projectDirName, versionName, relativePathToContent } =
				// relativePathToContent lives on allContentData, not on the bundle entry
				{
					...allContentData.docsPaths[contentPath],
					relativePathToContent: allContentData.relativePathToContent,
				};

			const bundleZipPath = `${getBundlePathForContent({
				relativePathToContent,
				projectDirName,
				versionName,
			})}.zip`;

			const outputDirectory = versionName
				? path.join(mdxOutputPath, projectDirName, versionName)
				: path.join(mdxOutputPath, projectDirName);

			console.log(
				`running mdx conversion for ${contentPath} → ${outputDirectory}`,
			);

			const { assetChecksumToKey } = await convertZipFileToMdx({
				zipPath: bundleZipPath,
				outputDirectory,
			});

			await convertZipImageFiles({
				outputDirectory,
				zipPath: bundleZipPath,
				assetChecksumToKey,
			});
		}),
	);

	for (const [i, result] of results.entries()) {
		if (result.status === 'rejected') {
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
