import fs from 'node:fs';
import { loadConfig } from '../config.js';
import { resolveProject } from '../resolve/run.js';

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
};
