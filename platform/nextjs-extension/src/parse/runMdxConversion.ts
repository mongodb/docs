import fs from "node:fs/promises";
import path from "node:path";
import {
	convertZipFileToMdx,
	convertZipImageFiles,
} from "../../../snooty-ast-to-mdx/src/index.js";
import type { AllContentData } from "../contentMetadata/processContentMetadata.js";
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
