import fs from 'node:fs/promises';
import { posix as path } from 'node:path';
import unzipper from 'unzipper';
import { BSON } from 'bson';
import { convertJsonAstToMdxFiles } from './convertJsonAstToMdxFiles/convertJsonAstToMdxFiles';
import type { SnootyNode } from './convertSnootyAstToMdast/types';

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
    const outputPath = path.join(zipBaseName, relativePath);

    const { fileCount } = await convertJsonAstToMdxFiles({ ast: astRoot, outputPath, outputRootDir: zipBaseName });

    totalCount += fileCount;
    onFileWrite?.(totalCount);
  }

  return { outputDirectory: zipBaseName, fileCount: totalCount, assetChecksumToKey };
};
