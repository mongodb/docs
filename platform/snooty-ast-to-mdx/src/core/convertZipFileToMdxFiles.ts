import fs from 'node:fs/promises';
import { posix as path } from 'node:path';
import unzipper from 'unzipper';
import { BSON } from 'bson';
import { convertJsonAstToMdxFiles } from './convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';
import type { SnootyNode } from './convertSnootyAstToMdast/types';
import { type RouteCollision, detectRouteCollisions, resolveRouteCollisions } from './detectRouteCollision';

/** some BSON files are not AST JSON, but rather raw text or RST */
const IGNORED_FILE_SUFFIXES = ['.txt.bson', '.rst.bson'] as const;

interface ConvertZipFileToMdxOptions {
  zipPath: string;
  outputPrefix?: string;
  onFileWrite?: (fileCount: number) => void;
}

type ConvertZipFileToMdx = (args: ConvertZipFileToMdxOptions) => Promise<{
  outputDirectory: string;
  fileCount: number;
  assetChecksumToKey: Map<string, string>;
  routeCollisions: Array<RouteCollision>;
}>;

/** Convert a zip file to a folder of MDX files, preserving the zip's directory structure */
export const convertZipFileToMdx: ConvertZipFileToMdx = async ({ zipPath, outputPrefix, onFileWrite }) => {
  const zipDir = await unzipper.Open.file(zipPath);

  const zipBaseNameRaw = path.basename(zipPath, '.zip');
  const zipBaseName = outputPrefix ? path.join(outputPrefix, zipBaseNameRaw) : zipBaseNameRaw;
  await fs.mkdir(zipBaseName, { recursive: true });

  // Map asset checksum (compressed filename) -> semantic key (e.g., /images/foo.png)
  const assetChecksumToKey = new Map<string, string>();

  let totalCount = 0;
  for (const file of zipDir.files) {
    // skip files that are not BSON files or have ignored suffixes
    if (
      file.type !== 'File' ||
      !file.path.endsWith('.bson') ||
      IGNORED_FILE_SUFFIXES.some((suffix) => file.path.endsWith(suffix))
    ) {
      continue;
    }

    const docs: BSON.Document[] = [];
    try {
      const buffer = await file.buffer();
      let offset = 0;
      while (offset < buffer.length) {
        // Deserialize a single document at the current offset
        offset = BSON.deserializeStream(buffer, offset, 1, docs, docs.length, {
          allowObjectSmallerThanBufferSize: true,
        });
      }
    } catch (error) {
      console.warn(`Skipping '${file.path}' due to BSON deserialize error: ${(error as Error).message}`);
      continue;
    }

    if (!docs.length) {
      continue;
    }
    if (docs.length > 1) {
      console.warn(
        `\nWarning: ${file.path} contains ${docs.length} BSON documents - only the first one will be converted to MDX.\n`,
      );
    }

    if (file.path === 'site.bson') {
      // Write site.bson metadata as _site.json in the base directory
      const siteData = docs[0];
      // Remove static_files property before writing
      delete siteData.static_files;
      const siteJsonPath = path.join(zipBaseName, '_site.json');
      const siteJsonContent = `${JSON.stringify(siteData, null, 2)}\n`;
      await fs.writeFile(siteJsonPath, siteJsonContent, 'utf-8');
      continue;
    }

    const tree = docs[0] as SnootyNode;
    const astRoot = tree.ast ?? tree;
    // Collect static asset mappings for this page, if present
    if (tree && Array.isArray(tree.static_assets)) {
      for (const asset of tree.static_assets) {
        const checksum = asset?.checksum;
        const key = asset?.key;
        if (typeof checksum === 'string' && typeof key === 'string' && checksum && key) {
          assetChecksumToKey.set(checksum, key);
        }
      }
    }
    const relativePath = file.path.replace('.bson', '.mdx');
    // remove the nesting of the "documents" directory from the output path
    const outputPath = path.join(zipBaseName, relativePath).replace('documents/', '');

    const { fileCount } = await convertJsonAstToMdxFiles({ ast: astRoot, outputPath, outputRootDir: zipBaseName });

    totalCount += fileCount;
    onFileWrite?.(totalCount);
  }

  // EDIT: this is commented out for now, since we are trying JSON instead of TS, but haven't fully committed to it yet.
  // cleanup the _references.json file (only used for faster rebuilds during conversion)
  // try {
  //   await fs.rm(path.join(zipBaseName, '_references.json'));
  // } catch (error) {
  //   console.warn(`Skipping '_references.json' cleanup due to error: ${(error as Error).message}`);
  // }

  // Post-processing: detect and resolve route collisions
  // example: a file called `about.mdx` would collide with `about/index.mdx` in Next.js
  const routeCollisions: Array<RouteCollision> = [];

  const collisions = await detectRouteCollisions(zipBaseName);
  for (const [route, files] of collisions.entries()) {
    routeCollisions.push({ route, files });
  }
  await resolveRouteCollisions({ outputDirectory: zipBaseName, collisions });

  return { outputDirectory: zipBaseName, fileCount: totalCount, assetChecksumToKey, routeCollisions };
};
