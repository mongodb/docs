import fs from 'node:fs';
import path from 'node:path';
import { loadConfig } from '../config.js';
import { buildDataset } from '../dataset/rows.js';
import { resolveProject } from '../resolve/run.js';
import { readManifestLatest } from '../run/manifest.js';
import { scrapeProd } from '../scrape/prod.js';
import { scrapeLocal } from '../scrape/local.js';
import { materialize } from '../serve/materialize.js';
import { startServer, stopServer } from '../serve/server.js';

export type FlagBag = Record<string, string | boolean>;
export type CommandHandler = (flags: FlagBag) => Promise<void>;

function readPagesFile(file: string): string[] {
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * Stage registry. Each stage PR registers its handler here, e.g.
 *   resolve: async (flags) => { ... },
 * The seven stages are: resolve, scrape-prod, translate, serve,
 * scrape-local, dataset, eval.
 */
export const COMMANDS: Record<string, CommandHandler> = {
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
    materialize(cfg, project, runId, locale);
    const platformDir = path.resolve(cfg.contentMdxDir, '..', 'platform');
    const child = startServer(platformDir, project, production);
    console.log(
      `run ${runId}: overlaying ${locale} translations, serving ${project} at ${cfg.localOrigin} — press Ctrl-C to stop`,
    );
    for (const sig of ['SIGINT', 'SIGTERM'] as const) {
      process.on(sig, () => stopServer(child));
    }
    const code = await new Promise<number | null>((resolve) => child.on('exit', resolve));
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
    const cfg = loadConfig();
    const project = String(flags.project ?? '');
    if (!project) throw new Error('--project is required');
    const runId = flags.run ? String(flags.run) : readManifestLatest(cfg, project);
    const rows = buildDataset(cfg, project, runId);
    console.log(
      `run ${runId}: ${rows.length} dataset rows written to data/${project}/${runId}/dataset/rows.json`,
    );
  },
};
