import fs from 'node:fs/promises';
import { posix as path } from 'node:path';
import unzipper from 'unzipper';
import { renameIncludesToUnderscore } from './convertSnootyAstToMdast/renameIncludesToUnderscore';

interface ConvertZipImageFilesArgs {
  outputDirectory: string;
  zipPath: string;
  assetChecksumToKey: Map<string, string>;
}

export const convertZipImageFiles = async ({
  outputDirectory,
  zipPath,
  assetChecksumToKey,
}: ConvertZipImageFilesArgs) => {
  const zipDir = await unzipper.Open.file(zipPath);

  const assetChecksums = new Set<string>();

  for (const file of zipDir.files) {
    const base = path.basename(file.path);
    const semanticKey = assetChecksumToKey.get(base);

    if (file.type !== 'File' || file.path.endsWith('.bson') || !semanticKey || assetChecksums.has(base)) {
      continue;
    }

    // Read the "static asset" file as a buffer
    const buf = await file.buffer();
    const pathWithoutLeadingSlash = semanticKey.replace(/^\/+/, '').replace(/\\+/g, '/');
    const assetPath = renameIncludesToUnderscore(pathWithoutLeadingSlash);
    const outPath = path.join(outputDirectory, assetPath);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, buf);

    assetChecksums.add(base);
  }

  return assetChecksums;
};
