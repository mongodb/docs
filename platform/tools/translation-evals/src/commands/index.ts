import fs from 'node:fs';
import path from 'node:path';
import { loadConfig, type Config } from '../config.js';
import { buildDataset, buildProductionBaselineRows } from '../dataset/rows.js';
import { runEval } from '../eval/run.js';
import { resolveProject } from '../resolve/run.js';
import { readManifestLatest, runDir } from '../run/manifest.js';
import { scrapeProd } from '../scrape/prod.js';
import { scrapeLocal } from '../scrape/local.js';
import { materialize } from '../serve/materialize.js';
import { startServer, stopServer } from '../serve/server.js';
import { restorePristine, snapshotPristine } from '../suite/isolation.js';
import { seedRunDir } from '../suite/run.js';

export type FlagBag = Record<string, string | boolean>;
export type CommandHandler = (flags: FlagBag) => Promise<void>;

function requiredStringFlag(flags: FlagBag, name: string): string {
  const value = flags[name];
  if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
    throw new Error(`--${name} is required`);
  }
  if (typeof value !== 'string') throw new Error(`--${name} must be a string`);
  return value;
}

export function referenceSeed(flags: FlagBag, cfg: Config = loadConfig()): void {
  const project = requiredStringFlag(flags, 'project');
  const baseRunId = requiredStringFlag(flags, 'from');
  const runId = requiredStringFlag(flags, 'run');
  if (fs.existsSync(runDir(cfg, project, runId))) {
    throw new Error(`run "${runId}" already exists — choose a different --run`);
  }
  seedRunDir(cfg, project, baseRunId, runId);
  console.log(`seeded data/${project}/${runId} from ${baseRunId}`);
}

export async function runDataset(flags: FlagBag, cfg: Config = loadConfig()): Promise<void> {
  const project = String(flags.project ?? '');
  if (!project) throw new Error('--project is required');
  if (flags.candidate !== undefined && flags.candidate !== 'production') {
    throw new Error(`unknown --candidate value: ${String(flags.candidate)} (expected "production")`);
  }
  if (flags.candidate === 'production' && flags.run === undefined) {
    throw new Error('--run is required with --candidate production');
  }
  const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
  const rows =
    flags.candidate === 'production'
      ? buildProductionBaselineRows(cfg, project, runId)
      : buildDataset(cfg, project, runId);
  console.log(
    `run ${runId}: ${rows.length} dataset rows written to data/${project}/${runId}/dataset/rows.json`,
  );
}

function readPagesFile(file: string): string[] {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Stage registry, plus the suite orchestrator and the manual production-baseline seed command. */
export const COMMANDS: Record<string, CommandHandler> = {
  'reference-seed': async (flags) => {
    referenceSeed(flags);
  },
  resolve: async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const pages = flags.pages !== undefined ? readPagesFile(String(flags.pages)) : undefined;
    const locales =
      flags.locales !== undefined
        ? String(flags.locales)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;
    const { runId, manifest } = await resolveProject(cfg, project, flags.run ? String(flags.run) : undefined, {
      pages,
      locales,
    });
    console.log(
      `run ${runId}: ${manifest.translatable.pages.length} eval pages, ` +
        `${manifest.pages.length} page refs, ${manifest.translatable.includes.length} includes`,
    );
  },
  'scrape-prod': async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    await scrapeProd(cfg, project, runId, flags.locale ? [String(flags.locale)] : undefined);
  },
  translate: async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    const { translateRun } = await import('../translate/run.js');
    const summary = await translateRun(cfg, project, runId, flags.locale ? [String(flags.locale)] : undefined);
    const failed = Object.values(summary.failures).flat().length;
    console.log(`run ${runId}: ${summary.translated} files translated, ${failed} failed`);
    if (failed > 0) console.log(`see data/${project}/${runId}/translate-failures.json`);
  },
  serve: async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const locale = String(flags.locale ?? '');
    if (!locale) throw new Error('--locale is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    const production = flags.production === true;
    // serve overwrites content-mdx with the translated overlay; snapshot the
    // English tree so dataset still reads English once the server stops.
    snapshotPristine(cfg, project, runId);
    materialize(cfg, project, runId, locale);
    const platformDir = path.resolve(cfg.contentMdxDir, '..', 'platform');
    const child = startServer(platformDir, project, production);
    console.log(
      `run ${runId}: overlaying ${locale} translations, serving ${project} at ${cfg.localOrigin} — press Ctrl-C to stop`,
    );
    const restore = (): void => restorePristine(cfg, project, runId);
    for (const sig of ['SIGINT', 'SIGTERM'] as const) {
      process.on(sig, () => {
        stopServer(child);
        restore();
      });
    }
    const code = await new Promise<number | null>((resolve) => child.on('exit', resolve));
    restore();
    process.exit(code ?? 1);
  },
  'scrape-local': async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    await scrapeLocal(cfg, project, runId, flags.locale ? [String(flags.locale)] : undefined);
  },
  dataset: async (flags) => {
    await runDataset(flags);
  },
  eval: async (flags) => {
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    process.exit(await runEval(project, runId));
  },
  suite: async (flags) => {
    const configFile = flags.config ? String(flags.config) : '';
    if (!configFile) throw new Error('--config is required');
    const { runSuite } = await import('../suite/run.js');
    process.exit(await runSuite({ configFile, force: flags.force === true, dryRun: flags['dry-run'] === true }));
  },
};
