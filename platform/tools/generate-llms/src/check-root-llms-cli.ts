#!/usr/bin/env node
/**
 * Reports whether the hand-maintained root llms.txt needs updating, by
 * generating every project's llms.txt, asking the docs site which of
 * those are actually published, and comparing that against the links in
 * the root file.
 *
 * Read-only: it never edits the root file and never uploads. The weekly
 * job feeds --json to an agent that proposes the edit and opens a PR; run
 * it by hand to see the same report.
 *
 * Usage:
 *   pnpm check-root-llms -- [monorepo-path] [flags]
 *
 * Needs no credentials: publication is checked over HTTP rather than by
 * listing the S3 bucket.
 *
 * Flags:
 *   --json              Emit the report as JSON instead of text
 *   --fail-on-drift     Exit 1 when drift is found (for CI gating)
 *
 * Examples:
 *   pnpm check-root-llms
 *   pnpm check-root-llms -- --json
 *   pnpm check-root-llms -- --fail-on-drift
 */
import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate } from './generator.js';
import { resolveMonorepoPath } from './monorepo.js';
import { buildUploadManifest } from './uploadManifest.js';
import { EXCLUDED_PROJECTS } from './exclusions.js';
import { unmappedProjects } from './rootLlmsDrift.js';
import { checkPublished, partitionPublished } from './publishedCheck.js';
import { detectDrift, formatDriftReport, keyToUrl, type LandingPageCandidate } from './rootLlmsDrift.js';
import { currentSourceDir } from './projectInfo.js';
import { PRODUCTION_BASE_URL } from './types.js';

const LANDING_PROJECT = 'landing';
const SNAPSHOT_MAP = 'dir-name-to-prefix.snapshot.json';
const GENERATED_MAP = path.join('platform', 'docs-nextjs', 'src', 'generated', 'dir-name-to-prefix.json');

async function exists(candidate: string): Promise<boolean> {
  try {
    await fs.access(candidate);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves the content-dir -> URL-prefix map.
 *
 * Prefers the one a local build generated from the docsets database. Falls
 * back to the committed snapshot, because this check runs in CI, which has
 * no database credentials by design (see platform-ci.yml). The snapshot can
 * go stale; `unmappedProjects` below is what stops that being silent.
 *
 * The snapshot exists only because the map is built from the Atlas pool
 * database (see platform/docs-site/scripts/build-prefix-map.ts). It draws
 * on two collections: `repos_branches.branches`, which decides whether a
 * content path's last segment is a version or the project directory and so
 * determines this map's keys (see `splitContentPath`), and
 * `docsets.prefix.dotcomprd`, which supplies its values.
 *
 * DOP-7067 moves both into the repo. Once it lands, the map can be built
 * without credentials, and this snapshot and the fallback below should be
 * deleted rather than kept in sync.
 *
 * Until then, refresh it with `pnpm build:prefix-map` in
 * platform/docs-site.
 */
async function resolveMapPath(monorepoPath: string, packageRoot: string): Promise<{ mapPath: string; fresh: boolean }> {
  const generated = path.join(monorepoPath, GENERATED_MAP);
  if (await exists(generated)) {
    return { mapPath: generated, fresh: true };
  }
  return { mapPath: path.join(packageRoot, SNAPSHOT_MAP), fresh: false };
}

/** Content directories that resolve to a real project source tree. */
async function projectDirs(monorepoPath: string): Promise<string[]> {
  const contentDir = path.join(monorepoPath, 'content');
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const dirs: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (await currentSourceDir(path.join(contentDir, entry.name))) {
      dirs.push(entry.name);
    }
  }
  return dirs;
}

interface CliArgs {
  monorepoPath?: string;
  json: boolean;
  failOnDrift: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { json: false, failOnDrift: false };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case '--json':
        args.json = true;
        break;
      case '--fail-on-drift':
        args.failOnDrift = true;
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
  console.log(`Report whether the root llms.txt needs updating. Read-only.

Usage:
  check-root-llms [monorepo-path] [flags]

Flags:
  --json              Emit the report as JSON instead of text
  --fail-on-drift     Exit 1 when drift is found (for CI gating)`);
}

/**
 * Generates every project once, and returns both halves the check needs:
 * the S3 key (and production URL) of each per-project file, and the page
 * list for content/landing, whose pages are listed directly in the root
 * llms.txt rather than in a file of their own.
 */
async function generateEverything(
  monorepoPath: string,
  descriptionsPath: string,
): Promise<{ urls: string[]; landingPages: LandingPageCandidate[] }> {
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'check-root-llms-'));
  try {
    const results = await generate({
      monorepoPath,
      baseUrl: PRODUCTION_BASE_URL,
      descriptionsPath,
      outputDir,
      // Must match what the publish path generates: descriptions change
      // each file's size, and size decides how many parts a project
      // splits into. Generating without them yields fewer parts and would
      // report live files as dead.
      noDescriptions: false,
    });

    // buildUploadManifest derives the same keys the publish path uploads
    // to, so the URLs checked here are exactly the ones that should exist.
    const entries = await buildUploadManifest(monorepoPath, outputDir, {
      // The root file lives in the repo, not in this throwaway output dir.
      rootLlmsPath: path.join(path.dirname(descriptionsPath), 'llms-output', 'llms.txt'),
    });
    const landing = results.find((result) => result.project === LANDING_PROJECT);

    return {
      urls: entries.map((entry) => keyToUrl(entry.key)),
      landingPages: (landing?.pages ?? []).map((page) => ({ url: page.url, title: page.title })),
    };
  } finally {
    await fs.rm(outputDir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2).filter((arg) => arg !== '--');
  const args = parseArgs(argv);

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const monorepoPath = await resolveMonorepoPath(args.monorepoPath, __dirname);
  const packageRoot = path.join(__dirname, '..');

  // generate() and buildUploadManifest both read the map through
  // loadDirNameToPrefixMap, which honours this env var.
  const { mapPath, fresh } = await resolveMapPath(monorepoPath, packageRoot);
  process.env.LLMS_DIR_NAME_TO_PREFIX_PATH = mapPath;
  if (!fresh) {
    // stderr: --json output must stay machine-readable.
    console.error(`Using the committed prefix-map snapshot (${SNAPSHOT_MAP}); no locally generated map found.`);
  }

  const rootLlmsContent = await fs.readFile(path.join(packageRoot, 'llms-output', 'llms.txt'), 'utf-8');
  const { urls, landingPages } = await generateEverything(
    monorepoPath,
    path.join(packageRoot, 'llms-descriptions.json'),
  );

  const results = await checkPublished(urls);
  const { published, missing } = partitionPublished(results);
  const publishedKeys = published.map((url) => new URL(url).pathname.replace(/^\//, ''));

  const report = detectDrift({ rootLlmsContent, publishedKeys, landingPages });

  const mapped = Object.keys(JSON.parse(await fs.readFile(mapPath, 'utf-8')) as Record<string, string>);
  const unmapped = unmappedProjects(await projectDirs(monorepoPath), mapped, EXCLUDED_PROJECTS);

  // An unmapped project can't be generated, so its file is absent from the
  // published set and its perfectly good link looks dead. Every conclusion
  // here depends on that set being complete, so refuse to report drift at
  // all rather than hand a consumer a result that would delete live links.
  const reliable = unmapped.length === 0;

  if (args.json) {
    // publishedKeys travels with the report so a consumer (the weekly
    // updater) can re-run detectDrift against its own edit without
    // repeating the generate and the HTTP checks.
    console.log(
      JSON.stringify(
        {
          reliable,
          publishedKeys,
          generatedButNotPublished: missing,
          unmappedProjects: unmapped,
          ...report,
          // Suppressed while unreliable: acting on a partial published set
          // would remove links that are actually live.
          ...(reliable ? {} : { unlinkedFiles: [], deadLinks: [], partCountMismatches: [], hasDrift: false }),
        },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `Generated ${urls.length} file(s), ${published.length} published, ` +
        `and ${landingPages.length} landing page(s).\n`,
    );
    if (missing.length > 0) {
      // Not root-file drift: the file is missing from the site, which
      // means that project's deploy hasn't published it yet.
      console.log(`Generated but not served (${missing.length}) - waiting on that project's next prod deploy:`);
      for (const url of missing) {
        console.log(`  ! ${url}`);
      }
      console.log('');
    }
    if (!reliable) {
      console.log(
        `Content directories with no URL prefix (${unmapped.length}) - the prefix map is out of date, so the ` +
          'published file list is incomplete and no drift can be reported:',
      );
      for (const project of unmapped) {
        console.log(`  ! ${project}`);
      }
      console.log(
        `\nRefresh it: run \`pnpm build:prefix-map\` in platform/docs-site (needs MONGODB_URI), then copy ` +
          `src/generated/dir-name-to-prefix.json over ${SNAPSHOT_MAP}.`,
      );
    } else {
      console.log(formatDriftReport(report));
    }
  }

  if (!reliable) {
    console.error('\nRefusing to report drift against an out-of-date prefix map.');
    process.exit(1);
  }

  if (args.failOnDrift && report.hasDrift) {
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
