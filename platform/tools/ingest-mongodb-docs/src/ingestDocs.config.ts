import { assertEnvVars } from "./assertEnvVars";
import { Config } from "./cli/Config";
import { makeIngestMetaStore } from "./cli/IngestMetaStore";
import { makeMongoDbPageStore } from "./pageStore/MongoDbPageStore";
import {
  makeSnootyDataSources,
  snootyDataApiBaseUrl,
  snootyProjectConfig,
} from "./sources/snootySources";

const { MONGODB_CONNECTION_URI, MONGODB_DATABASE_NAME } = assertEnvVars({
  MONGODB_CONNECTION_URI: "",
  MONGODB_DATABASE_NAME: "",
});

const config: Config = {
  // Reading from via data api
  dataSources: async () => {
    return makeSnootyDataSources(snootyDataApiBaseUrl, snootyProjectConfig, {
      includeLinks: true,
      includeRefAnchors: true,
    });
  },
  // Write to:
  pageStore: () =>
    makeMongoDbPageStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
    }),
  ingestMetaStore: () =>
    makeIngestMetaStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
      entryId: "ingest_meta",
    }),
};

export default config;
