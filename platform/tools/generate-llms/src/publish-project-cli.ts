#!/usr/bin/env node
/**
 * Generates and uploads the llms.txt file(s) for a single project, without
 * ever touching the root llms.txt (docs/llms.txt). This is what the Netlify
 * SSG extension runs in `onSuccess` on dotcomprd/dotcomstg deploys; run it
 * by hand for a dry run or to republish one project out of band.
 *
 * Defaults to a dry run. Pass --execute to upload, which requires
 * AWS_S3_ACCESS_KEY_ID and AWS_S3_SECRET_ACCESS_KEY (see upload-cli.ts).
 *
 * Usage:
 *   pnpm publish-project -- --for-project <name> [flags]
 *
 * Flags:
 *   --for-project <name>   Content directory, or a DOCS_PROJECT value like
 *                          "pymongo-driver/current" (defaults to $DOCS_PROJECT)
 *   --output-dir <dir>     Directory to generate into (default: llms-build-output/<project>)
 *   --bucket <name>        S3 bucket (default: $S3_OFFLINE_BUCKET, else docs-mongodb-org-dotcomstg)
 *   --execute              Actually upload (default: dry run)
 *
 * Examples:
 *   pnpm publish-project -- --for-project atlas
 *   pnpm publish-project -- --for-project atlas --execute
 *   pnpm publish-project -- --for-project manual --bucket docs-mongodb-org-prd --execute
 */
import * as dotenv from 'dotenv';
// Must run before s3Client.ts reads process.env.AWS_S3_*, i.e. before the
// import below that pulls it in transitively.
dotenv.config();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveMonorepoPath } from './monorepo.js';
import { contentDirFromDocsProject, defaultBuildOutputDir, publishProject } from './publishProject.js';

const DEFAULT_BUCKET = 'docs-mongodb-org-dotcomstg';

interface CliArgs {
  monorepoPath?: string;
  forProject?: string;
  outputDir?: string;
  bucket?: string;
  execute: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { execute: false };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case '--for-project':
        args.forProject = argv[++i];
        break;
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
  console.log(`Generate and upload one project's llms.txt file(s). Never uploads the root llms.txt.

Usage:
  publish-project [monorepo-path] --for-project <name> [flags]

Flags:
  --for-project <name>   Content directory, or a DOCS_PROJECT value like "pymongo-driver/current" (default: $DOCS_PROJECT)
  --output-dir <dir>     Directory to generate into (default: llms-build-output/<project>)
  --bucket <name>        S3 bucket (default: $S3_OFFLINE_BUCKET, else ${DEFAULT_BUCKET})
  --execute              Actually perform the upload (default: dry run, prints the plan only)`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2).filter((arg) => arg !== '--');
  const args = parseArgs(argv);

  const project = contentDirFromDocsProject(args.forProject ?? process.env.DOCS_PROJECT);
  if (!project) {
    throw new Error('No project to publish: pass --for-project <name> or set DOCS_PROJECT.');
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const monorepoPath = await resolveMonorepoPath(args.monorepoPath, __dirname);
  const packageRoot = path.join(__dirname, '..');

  await publishProject({
    monorepoPath,
    project,
    outputDir: args.outputDir ?? defaultBuildOutputDir(project),
    bucket: args.bucket ?? process.env.S3_OFFLINE_BUCKET ?? DEFAULT_BUCKET,
    descriptionsPath: path.join(packageRoot, 'llms-descriptions.json'),
    rootLlmsPath: path.join(packageRoot, 'llms-output', 'llms.txt'),
    dryRun: !args.execute,
  });

  if (!args.execute) {
    console.log('\nDry run only; no files were uploaded. Pass --execute to actually upload.');
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
