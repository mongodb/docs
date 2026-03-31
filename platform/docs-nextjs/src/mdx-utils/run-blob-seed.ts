import fs from 'fs/promises';
import path from 'path';
import { ALL_FILE_EXTENSIONS } from './get-blob-key';
import { uploadFile } from './blob-upload';
import { CONTENT_MDX_DIR } from './blob-constants';

async function collectFilePaths(currentDir: string): Promise<string[]> {
  const files = await fs.readdir(currentDir, { withFileTypes: true });
  const filePaths: string[] = [];

  for (const file of files) {
    const fullPath = path.join(currentDir, file.name);

    if (file.isDirectory()) {
      const subDirFiles = await collectFilePaths(fullPath);
      filePaths.push(...subDirFiles);
    } else if (ALL_FILE_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
}

export async function runBlobSeed(contentPath: string = CONTENT_MDX_DIR): Promise<{
  successCount: number;
  failureCount: number;
  total: number;
  durationMs: number;
}> {
  const start = Date.now();
  const stat = await fs.stat(contentPath);
  const filePaths = stat.isFile() ? [contentPath] : await collectFilePaths(contentPath);

  const results = await Promise.all(
    filePaths.map(async (fullPath) => {
      const result = await uploadFile(fullPath);
      return { fullPath, ...result };
    }),
  );

  const successCount = results.filter((r) => !r.error).length;
  const failureCount = results.filter((r) => r.error).length;

  return {
    successCount,
    failureCount,
    total: filePaths.length,
    durationMs: Date.now() - start,
  };
}
