import type * as mongodb from 'mongodb';
import { teardown, dbClient } from './clusterConnector';

let searchClusterClient: mongodb.MongoClient;

export const getSearchDb = async ({
  searchURI,
  databaseName,
  appName,
}: {
  searchURI: string;
  databaseName: string;
  appName: string;
}): Promise<mongodb.Db> => {
  if (!searchClusterClient) {
    console.info('Creating new instance of Search Cluster client');
    searchClusterClient = await dbClient({ uri: searchURI, appName });
  }
  return searchClusterClient.db(databaseName);
};

export const closeSearchDb = async () => {
  if (searchClusterClient) await teardown(searchClusterClient);
  else {
    console.info('No client connection open to Search Cluster client');
  }
};
