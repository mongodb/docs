import type * as mongodb from 'mongodb';
import { getClusterZeroDb } from './clusterZeroConnector';
import type { EntitledDocument } from './types';

export const getEntitledCollection = async ({
  clusterZeroURI,
  collectionName,
  extensionName,
}: {
  clusterZeroURI: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<EntitledDocument>> => {
  const dbSession = await getClusterZeroDb({
    clusterZeroURI,
    databaseName: 'pool',
    appName: extensionName ?? '',
  });
  return dbSession.collection<EntitledDocument>(collectionName);
};
