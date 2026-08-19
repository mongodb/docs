#!/usr/bin/env node
/**
 * Uploads every generated llms*.txt file (plus the hand-maintained master
 * index) to S3, at the same path each file is served from in production
 * (e.g. "docs/manual/manual-1-llms.txt" for
 * https://www.mongodb.com/docs/manual/manual-1-llms.txt). See
 * uploadManifest.ts for how each file's key is derived, and its
 * MASTER_INDEX_KEY/EXCLUDED_FROM_UPLOAD comments for why the `landing`
 * project is skipped.
 *
 * Defaults to a dry run: prints what would be uploaded without touching S3.
 * Pass --execute to actually upload, which requires AWS_S3_ACCESS_KEY_ID and
 * AWS_S3_SECRET_ACCESS_KEY to be set (same env vars
 * platform/nextjs-extension/src/s3Connection/s3connector.ts uses). Copy
 * .env.sample to a local .env in this package to set them, following the
 * same convention as platform/tools/cdnLogParser. See README.md for details.
 *
 * Usage:
 *   pnpm upload -- [monorepo-path] [flags]
 *
 * Flags:
 *   --output-dir <dir>   Directory generated llms.txt files were written to (default: llms-output)
 *   --bucket <name>      S3 bucket to upload to (default: docs-mongodb-org-dotcomstg)
 *   --execute            Actually perform the upload (default: dry run, prints the plan only)
 *
 * Examples:
 *   pnpm upload                       # dry run against the default bucket
 *   pnpm upload -- --execute          # actually upload
 *   pnpm upload -- --bucket docs-mongodb-org-prd --execute
 */
import * as dotenv from 'dotenv';
// Must run before s3Client.ts reads process.env.AWS_S3_*, i.e. before the
// import below that pulls it in transitively.
dotenv.config();

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveMonorepoPath } from './monorepo.js';
import { putTextFile } from './s3Client.js';
import { buildUploadManifest, type UploadEntry } from './uploadManifest.js';

const DEFAULT_OUTPUT_DIR = 'llms-output';
const DEFAULT_BUCKET = 'docs-mongodb-org-dotcomstg';

interface CliArgs {
  monorepoPath?: string;
  outputDir: string;
  bucket: string;
  execute: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    outputDir: DEFAULT_OUTPUT_DIR,
    bucket: DEFAULT_BUCKET,
    execute: false,
  };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case '--output-dir':
        args.outputDir = argv[++i];
        break;
      case '--bucket':
        args.bucket = argv[++i];
        break;
      case '--execute':
        args.execute = true;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        if (arg.startsWith('--')) {
          throw new Error(`Unknown flag: ${arg}`);
        }
        if (args.monorepoPath) {
          throw new Error(`Unexpected extra argument: ${arg}`);
        }
        args.monorepoPath = arg;
        break;
    }
    i++;
  }

  return args;
}

function printHelp(): void {
  console.log(`Upload generated llms.txt files (and the master index) to S3.

Usage:
  upload-llms [monorepo-path] [flags]

Flags:
  --output-dir <dir>   Directory generated llms.txt files were written to (default: ${DEFAULT_OUTPUT_DIR})
  --bucket <name>      S3 bucket to upload to (default: ${DEFAULT_BUCKET})
  --execute            Actually perform the upload (default: dry run, prints the plan only)`);
}

function printPlan(entries: UploadEntry[], bucket: string, executed: boolean): void {
  console.log(`${executed ? 'Uploaded' : 'Would upload'} ${entries.length} file(s) to s3://${bucket}:\n`);
  for (const entry of entries) {
    console.log(`  ${entry.localPath} -> s3://${bucket}/${entry.key}`);
  }
  if (!executed) {
    console.log('\nDry run only; no files were uploaded. Pass --execute to actually upload.');
  }
}

async function main(): Promise<void> {
  // `pnpm upload -- --execute` can leak a literal "--" through to us.
  const argv = process.argv.slice(2).filter((arg) => arg !== '--');
  const args = parseArgs(argv);
  const __filename = fileURLToPath(import.meta.url);
  const monorepoPath = await resolveMonorepoPath(args.monorepoPath, path.dirname(__filename));

  // Matches generate's own outputDir handling: relative to CWD, not
  // monorepoPath, so `pnpm upload` picks up the same llms-output/ directory
  // `pnpm generate` just wrote to.
  const entries = await buildUploadManifest(monorepoPath, args.outputDir);

  if (!args.execute) {
    printPlan(entries, args.bucket, false);
    return;
  }

  for (const entry of entries) {
    const body = await fs.readFile(entry.localPath, 'utf-8');
    await putTextFile({ bucket: args.bucket, key: entry.key, body });
    console.log(`Uploaded ${entry.localPath} -> s3://${args.bucket}/${entry.key}`);
  }
  console.log(`\nUploaded ${entries.length} file(s) to s3://${args.bucket}.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
