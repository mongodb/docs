#!/usr/bin/env node
/**
 * Uploads the hand-maintained root llms.txt (llms-output/llms.txt) to
 * docs/llms.txt, and nothing else.
 *
 * Split out from `pnpm upload` so publishing the root file after a merge
 * doesn't also republish every per-project file. Called by the landing
 * site's deploy when the merge changed that file (see
 * platform/nextjs-ssg-extension/src/llms-txt/index.ts); run by hand to
 * republish it out of band.
 *
 * Defaults to a dry run. Pass --execute to upload.
 *
 * Usage:
 *   pnpm publish-root -- [flags]
 *
 * Flags:
 *   --bucket <name>   S3 bucket (default: $S3_OFFLINE_BUCKET, which is required)
 *   --execute         Actually perform the upload (default: dry run)
 */
import * as dotenv from 'dotenv';
// Must run before s3Client.ts reads process.env.AWS_S3_*, i.e. before the
// import below that pulls it in transitively.
dotenv.config();

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { putTextFile } from './s3Client.js';
import { rootLlmsUploadEntry } from './uploadManifest.js';

async function main(): Promise<void> {
  const argv = process.argv.slice(2).filter((arg) => arg !== '--');
  let bucketFlag: string | undefined;
  let execute = false;

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--bucket':
        bucketFlag = argv[++i];
        break;
      case '--execute':
        execute = true;
        break;
      case '--help':
      case '-h':
        console.log(`Upload only the root llms.txt to docs/llms.txt.

Flags:
  --bucket <name>   S3 bucket (default: $S3_OFFLINE_BUCKET, which is required)
  --execute         Actually perform the upload (default: dry run)`);
        process.exit(0);
        break;
      default:
        throw new Error(`Unknown flag: ${argv[i]}`);
    }
  }

  const bucket = (bucketFlag ?? process.env.S3_OFFLINE_BUCKET)?.trim();
  if (!bucket) {
    throw new Error('No S3 bucket: pass --bucket <name> or set S3_OFFLINE_BUCKET.');
  }

  const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  const entry = await rootLlmsUploadEntry(path.join(packageRoot, 'llms-output'));

  if (!execute) {
    console.log(`[llms-txt] Would upload ${entry.localPath} -> s3://${bucket}/${entry.key}`);
    console.log('\nDry run only; no files were uploaded. Pass --execute to actually upload.');
    return;
  }

  await putTextFile({ bucket, key: entry.key, body: await fs.readFile(entry.localPath, 'utf-8') });
  console.log(`[llms-txt] Uploaded ${entry.localPath} -> s3://${bucket}/${entry.key}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
