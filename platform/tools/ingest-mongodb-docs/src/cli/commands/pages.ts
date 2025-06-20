import { CommandModule } from "yargs";
import { logger } from "../../logger";
import { LoadConfigArgs } from "../withConfig";
import { withConfig, withConfigOptions, ResolvedConfig } from "../withConfig";
import { updatePages } from "../../pageStore/updatePages";

const commandModule: CommandModule<Record<string, unknown>, LoadConfigArgs> = {
  command: "pages <action>",
  describe: "Manage pages data from sources",
  builder(args) {
    return args
      .command({
        command: "init",
        describe: "Initialize page store",
        builder: (updateArgs) => withConfigOptions(updateArgs),
        handler: (updateArgs) => withConfig(doInitPagesCommand, updateArgs),
      })
      .command({
        command: "update",
        describe: "Update pages data from sources",
        builder: (updateArgs) =>
          withConfigOptions(updateArgs).option("source", {
            string: true,
            description:
              "A source name to load. If unspecified, loads all sources.",
          }),
        handler: (updateArgs) => withConfig(doUpdatePagesCommand, updateArgs),
      })
      .command({
        command: "delete [permanent]",
        describe: "Delete pages data from database",
        builder: (deleteArgs) =>
          withConfigOptions(deleteArgs)
            .option("source", {
              string: true,
              description:
                "A source name to delete. If unspecified, deletes all sources.",
            })
            .option("permanent", {
              boolean: true,
              description:
                "If true, permanently deletes the pages. If false or unspecified, marks the pages as deleted without removing them from the collection.",
            }),
        handler: (deleteArgs) => withConfig(doDeleteCommand, deleteArgs),
      })
      .demandCommand(1, "Specify an action for 'pages' command");
  },
  handler: (_args) => {
    logger.error('Specify an action for "pages" command');
  },
};

export default commandModule;

export const doInitPagesCommand = async ({ pageStore }: ResolvedConfig) => {
  if (!pageStore) {
    throw new Error(`Failed to initialize page store.`);
  }
  await pageStore.init?.();
};

type UpdatePagesCommandArgs = {
  source?: string | string[];
};

export const doUpdatePagesCommand = async (
  { pageStore, dataSources, concurrencyOptions }: ResolvedConfig,
  { source }: UpdatePagesCommandArgs
) => {
  const requestedSources = new Set(Array.isArray(source) ? source : [source]);

  const sources =
    source === undefined
      ? dataSources
      : dataSources.filter(({ name }) => requestedSources.has(name));

  if (sources.length === 0) {
    throw new Error(
      `Request at least one valid source. Available sources:\n${dataSources
        .map(({ name }) => `- ${name}`)
        .join("\n")}`
    );
  }

  logger.info(
    `Loaded sources:\n${sources.map(({ name }) => `- ${name}`).join("\n")}`
  );
  await updatePages({
    sources,
    pageStore,
    concurrencyOptions: concurrencyOptions?.pages,
  });
};

type DeletePagesCommandArgs = {
  source?: string | string[];
  permanent?: boolean;
};

export const doDeleteCommand = async (
  { pageStore, dataSources }: ResolvedConfig,
  { source, permanent }: DeletePagesCommandArgs
) => {
  if (source === undefined) {
    logger.info(
      `All sources to be ${
        permanent ? "permanently deleted" : "marked for deletion"
      }`
    );
    await pageStore.deletePages({ permanent: permanent });
    return;
  }
  const sourcesToDelete = new Set(Array.isArray(source) ? source : [source]);
  const validSources = dataSources
    .filter(({ name }) => sourcesToDelete.has(name))
    .map(({ name }) => name);
  const invalidSources = Array.from(sourcesToDelete).filter(
    (source) => !validSources.includes(source)
  );
  if (invalidSources.length) {
    throw new Error(
      `Delete failed because the following invalid sources were requested to be deleted:\n${invalidSources
        .map((source) => `- ${source}`)
        .join(
          "\n"
        )}\nRemove invalid sources from the list and try again.\nAvailable sources:\n${dataSources
        .map(({ name }) => `- ${name}`)
        .join("\n")}`
    );
  }
  logger.info(
    `Sources to be ${
      permanent ? "permanently deleted" : "marked for deletion"
    }:\n${validSources.map((source) => `- ${source}`).join("\n")}`
  );
  await pageStore.deletePages({
    dataSources: validSources,
    permanent: permanent,
  });
};
