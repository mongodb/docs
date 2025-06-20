import { CommandModule } from "yargs";
import { logger } from "../../logger";
import { doUpdatePagesCommand as standarddoUpdatePagesCommand } from "./pages";
import {
  ResolvedConfig,
  LoadConfigArgs,
  withConfig,
  withConfigOptions,
} from "../withConfig";

const commandModule: CommandModule<unknown, LoadConfigArgs> = {
  command: "all",
  builder(args) {
    return withConfigOptions(args).option("permanentDeletePages", {
      boolean: true,
      description:
        "If true, permanently deletes the pages associated with a data source that is not on the list of valid data sources. If false or unspecified, marks the pages as deleted without removing them from the collection.",
    });
  },
  async handler(args) {
    return withConfig(doAllCommand, {
      ...args,
      doUpdatePagesCommand: standarddoUpdatePagesCommand,
      permanentlyDeletePages: args.permanentlyDeletePages as
        | boolean
        | undefined,
    });
  },
  describe:
    "Run 'pages' since last successful run. Delete pages for data sources that are no longer in the config.",
};

export default commandModule;

export const doAllCommand = async (
  config: ResolvedConfig,
  {
    doUpdatePagesCommand,
    permanentlyDeletePages,
  }: LoadConfigArgs & {
    doUpdatePagesCommand: typeof standarddoUpdatePagesCommand;
    permanentlyDeletePages?: boolean;
  }
) => {
  const { ingestMetaStore } = config;

  const lastSuccessfulRunDate =
    await ingestMetaStore.loadLastSuccessfulRunDate();

  logger.info(`Last successful run date: ${lastSuccessfulRunDate}`);

  await doUpdatePagesCommand(config, {});

  // cleanup - delete pages and embedded content that are no longer in the data sources
  await config.pageStore.deletePages({
    dataSources: config.dataSources.map(({ name }) => name),
    permanent: !!permanentlyDeletePages,
    inverse: true,
  });

  logger.info(`Updating last successful run date`);
  await ingestMetaStore.updateLastSuccessfulRunDate();
};
