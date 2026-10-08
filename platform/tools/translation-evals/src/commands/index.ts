export type FlagBag = Record<string, string | boolean>;
export type CommandHandler = (flags: FlagBag) => Promise<void>;

/**
 * Stage registry. Each stage PR registers its handler here, e.g.
 *   resolve: async (flags) => { ... },
 * The seven stages are: resolve, scrape-prod, translate, serve,
 * scrape-local, dataset, eval.
 */
export const COMMANDS: Record<string, CommandHandler> = {};
