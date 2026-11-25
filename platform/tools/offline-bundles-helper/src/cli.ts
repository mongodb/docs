import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import {
  gitChangedFilesBetween,
  gitChangedFilesSince,
} from './changed-files.js';
import { shardBundles, toBundleJobs } from './bundle-matrix.js';
import { buildAllContentData } from './content-metadata.js';
import { getOfflineBundlesToRebuild } from './offline-bundles-to-rebuild.js';
import type { DocsetsByProject } from './types.js';
import type { Docset } from '../../../versioning/types.js';

const USAGE = `Usage: pnpm select (--since-hours <n> | --base <sha> [--head <sha>] | --all) [--matrix] [--shard-size <n>] [--repo-root <path>]

Prints the offline TOC bundles to rebuild as JSON:
  { "<toc-file>.ts": ["<version>", ...] }   (an empty array means a non-versioned bundle)

  --since-hours  bundles affected by files changed in commits from the last n hours
  --base/--head  bundles affected by the files changed between two commits
  --all          force a full rebuild: every bundle, ignoring git history
  --matrix       print { include: [{ shard, bundles: [{ tocFile, version, contentPaths }] }] } for a GitHub matrix
  --shard-size   bundles per shard with --matrix (default 4)`;

const TOC_DIR = path.join('platform', 'docs-site', 'src', 'context', 'table-of-contents', 'offline-docs');

const defaultRepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');

// Loaded from the checkout so the catalog matches the commit being built
const loadDocsets = async (repoRoot: string): Promise<DocsetsByProject> => {
  const entry = path.join(repoRoot, 'platform', 'versioning', 'index.ts');
  const { docsets } = (await import(pathToFileURL(entry).href)) as { docsets: Docset[] };
  if (!docsets?.length) throw new Error(`No docsets loaded from ${entry}`);
  return Object.fromEntries(docsets.map((docset) => [docset.project, docset]));
};

// Treating every offline TOC file as changed selects all of its active versions
const allTocFiles = (repoRoot: string): string[] =>
  fs
    .readdirSync(path.join(repoRoot, TOC_DIR))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.posix.join(...TOC_DIR.split(path.sep), file));

const main = async (): Promise<void> => {
  const { values } = parseArgs({
    options: {
      base: { type: 'string' },
      'since-hours': { type: 'string' },
      head: { type: 'string', default: 'HEAD' },
      'repo-root': { type: 'string', default: defaultRepoRoot },
      all: { type: 'boolean', default: false },
      matrix: { type: 'boolean', default: false },
      'shard-size': { type: 'string', default: '4' },
      help: { type: 'boolean', default: false },
    },
  });

  const sinceHours = values['since-hours'] ? Number(values['since-hours']) : undefined;
  if (sinceHours !== undefined && !(sinceHours > 0)) {
    console.error('--since-hours must be a positive number');
    process.exit(1);
  }

  if (values.help || (!values.base && !values.all && sinceHours === undefined)) {
    console.error(USAGE);
    process.exit(values.help ? 0 : 1);
  }

  // The selection code logs progress; keep stdout clean for the JSON result
  console.log = console.error;

  const repoRoot = path.resolve(values['repo-root']);
  const gitFiles = values.all
    ? []
    : sinceHours !== undefined
      ? gitChangedFilesSince(repoRoot, sinceHours)
      : gitChangedFilesBetween(repoRoot, values.base as string, values.head);
  const changedFiles = values.all ? allTocFiles(repoRoot) : gitFiles;
  const allContentData = buildAllContentData({
    contentDir: path.join(repoRoot, 'content'),
    docsetsByProject: await loadDocsets(repoRoot),
    gitChangedFiles: changedFiles,
  });

  const bundles = getOfflineBundlesToRebuild({
    allContentData,
    gitChangedFiles: changedFiles,
    offlineDocsDir: path.join(repoRoot, TOC_DIR),
    repoRoot,
  });

  if (!values.matrix) {
    process.stdout.write(`${JSON.stringify(bundles, null, 2)}\n`);
    return;
  }

  const shardSize = Number(values['shard-size']);
  if (!Number.isInteger(shardSize) || shardSize < 1) {
    throw new Error('--shard-size must be a positive integer');
  }
  const jobs = toBundleJobs(bundles, path.join(repoRoot, TOC_DIR), allContentData);
  const include = shardBundles(jobs, shardSize);
  process.stdout.write(`${JSON.stringify({ include })}\n`);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
