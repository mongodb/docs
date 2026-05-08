import { create } from "tar";

export async function createOfflineTarball({
    sourceDir,        // the per-bundle out dir, e.g. offline-bundle-output/<bundleStem>/<version>/
    outputPath,       // absolute path where the .tar.gz should be written
  }: {
    sourceDir: string;
    outputPath: string;
  }): Promise<void> {
    console.log(`[offline-docs] Creating tarball from ${sourceDir} to ${outputPath}`);
    await create(
      {
        gzip: true,
        file: outputPath,
        cwd: sourceDir,
      },
      ['./'],
    );
  }