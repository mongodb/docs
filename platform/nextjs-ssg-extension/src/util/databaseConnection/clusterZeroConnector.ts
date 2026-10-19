import type * as mongodb from 'mongodb';
import { teardown, dbClient } from './clusterConnector';

let clusterZeroClient: undefined | mongodb.MongoClient;

export type clusterZeroParams = {
  clusterZeroURI: string;
  databaseName: string;
  appName?: string;
};

export const getClusterZeroDb = async ({
  clusterZeroURI,
  databaseName,
  appName,
}: clusterZeroParams): Promise<mongodb.Db> => {
  if (!clusterZeroClient) {
    console.info('Creating new instance of Cluster Zero client');
    clusterZeroClient = await dbClient({
      uri: clusterZeroURI,
      appName: appName ?? '',
    });
  }
  return clusterZeroClient.db(databaseName);
};

export const closeClusterZeroDb = async () => {
  if (clusterZeroClient) {
    await teardown(clusterZeroClient);
    clusterZeroClient = undefined;
  } else {
    console.info('No client connection open to Cluster Zero client');
  }
};
