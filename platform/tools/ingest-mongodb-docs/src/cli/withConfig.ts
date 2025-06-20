import yargs from "yargs";
import Path from "path";
import { logger } from "../logger";
import { Config } from "./Config";

export type LoadConfigArgs = {
  config?: string;
};

export const loadConfig = async ({
  config: configPathIn,
}: LoadConfigArgs): Promise<Config> => {
  const path = Path.resolve(
    configPathIn === undefined ? "ingest.config.cjs" : configPathIn
  );

  const maybePartialConfig = (await import(path)).default;
  const partialConfig = (maybePartialConfig.default ??
    maybePartialConfig) as Partial<Config>;

  const missingProperties: string[] = [];
  const config: Config = {
    ...partialConfig,
    dataSources: checkRequiredProperty(
      partialConfig,
      "dataSources",
      missingProperties
    ),
    ingestMetaStore: checkRequiredProperty(
      partialConfig,
      "ingestMetaStore",
      missingProperties
    ),
    pageStore: checkRequiredProperty(
      partialConfig,
      "pageStore",
      missingProperties
    ),
  };

  if (missingProperties.length !== 0) {
    throw new Error(
      `Config is missing the following properties: ${missingProperties.join(
        ", "
      )}`
    );
  }

  return config;
};

export const withConfig = async <T>(
  action: (config: ResolvedConfig, args: T) => Promise<void>,
  args: LoadConfigArgs & T
) => {
  const config = await loadConfig(args);
  const [resolvedConfig, cleanup] = await resolveConfig(config);
  try {
    return await action(resolvedConfig, args);
  } finally {
    await Promise.all(
      cleanup.map(async (close) => {
        try {
          await close();
        } catch (error) {
          logger.error(`Cleanup failed: ${(error as Error).message}`);
        }
      })
    );
  }
};

/**
  Apply config options to CLI command.
 */
export const withConfigOptions = <T>(
  args: yargs.Argv<T>
): yargs.Argv<T & LoadConfigArgs> => {
  return args.option("config", {
    string: true,
    description: "Path to config JS file.",
  });
};

/**
  Config with promises resolved.
 */
export type ResolvedConfig = {
  [K in keyof Config]: Constructed<Config[K]>;
};

type Constructed<T> = Awaited<T extends () => infer R ? R : T>;

/**
  Resolve any promises in the config object.
 */
const resolveConfig = async (
  config: Config
): Promise<[ResolvedConfig, CleanupFunc[]]> => {
  const cleanup: CleanupFunc[] = [];
  try {
    return [
      Object.fromEntries(
        await Promise.all(
          Object.entries(config).map(async ([k, v]) => {
            const resolved = await resolve(v);
            const closeable = resolved as unknown as Closeable;
            if (closeable?.close !== undefined) {
              // Save cleanup so that any constructed instances can be cleaned up
              // if subsequent construction fails
              cleanup.push(async () => {
                closeable.close && (await closeable.close());
              });
            }
            return [k, resolved];
          })
        )
      ),
      cleanup,
    ];
  } catch (error) {
    await Promise.all(cleanup.map((close) => close()));
    throw error;
  }
};

const resolve = async <T>(v: T): Promise<Constructed<T>> => {
  if (typeof v === "function") {
    // If v is a function, call it and return the result
    return v() as Constructed<T>;
  } else {
    // If v is not a function, ensure we return the awaited value
    return Promise.resolve(v) as Constructed<T>;
  }
};

/**
  Asserts that the given property is defined in the given object and returns
  that value as a definitely not undefined type.
 */
function checkRequiredProperty<T, K extends keyof T>(
  object: T,
  k: K,
  missingProperties: string[]
): Exclude<T[K], undefined> {
  const value = object[k];
  if (value === undefined) {
    missingProperties.push(k.toString());
    // Hack: this is an invalid value. The caller MUST check the errors
    return undefined as Exclude<T[K], undefined>;
  }
  return value as Exclude<T[K], undefined>;
}

type Closeable = {
  close?(): Promise<void>;
};

type CleanupFunc = () => Promise<void>;
