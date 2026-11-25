import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { buildAllContentData } from './content-metadata.js';
import { getOfflineBundlesToRebuild } from './offline-bundles-to-rebuild.js';
import type { DocsetsByProject } from './types.js';
import type { Docset } from '../../../versioning/types.js';

const USAGE = `Usage: pnpm select --base <sha> [--head <sha>] [--repo-root <path>]

Prints the offline TOC bundles to rebuild for the files changed between two commits as JSON:
  { "<toc-file>.ts": ["<version>", ...] }   (an empty array means a non-versioned bundle)`;

const TOC_DIR = path.join('platform', 'docs-site', 'src', 'context', 'table-of-contents', 'offline-docs');

const defaultRepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');

// Loaded from the checkout so the catalog matches the commit being built
const loadDocsets = async (repoRoot: string): Promise<DocsetsByProject> => {
  const entry = path.join(repoRoot, 'platform', 'versioning', 'index.ts');
  const { docsets } = (await import(pathToFileURL(entry).href)) as { docsets: Docset[] };
  if (!docsets?.length) throw new Error(`No docsets loaded from ${entry}`);
  return Object.fromEntries(docsets.map((docset) => [docset.project, docset]));
};

const gitChangedFiles = (repoRoot: string, base: string, head: string): string[] =>
  execFileSync('git', ['diff', '--name-only', '--no-renames', base, head], {
    cwd: repoRoot,
    encoding: 'utf-8',
  })
    .split('\n')
    .filter(Boolean);

const main = async (): Promise<void> => {
  const { values } = parseArgs({
    options: {
      base: { type: 'string' },
      head: { type: 'string', default: 'HEAD' },
      'repo-root': { type: 'string', default: defaultRepoRoot },
      help: { type: 'boolean', default: false },
    },
  });

  if (values.help || !values.base) {
    console.error(USAGE);
    process.exit(values.help ? 0 : 1);
  }

  // The selection code logs progress; keep stdout clean for the JSON result
  console.log = console.error;

  const repoRoot = path.resolve(values['repo-root']);
  const changedFiles = gitChangedFiles(repoRoot, values.base, values.head);
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

  process.stdout.write(`${JSON.stringify(bundles, null, 2)}\n`);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
