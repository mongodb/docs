import type * as mongodb from 'mongodb';
import { getClusterZeroDb } from './clusterZeroConnector';
import type { DocumentsDocument } from './types';

// Get Documents collection of Snooty_<xyz> database
export const getDocumentsCollection = async ({
  clusterZeroURI,
  databaseName,
  collectionName,
  extensionName,
}: {
  clusterZeroURI: string;
  databaseName: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<DocumentsDocument>> => {
  const dbSession = await getClusterZeroDb({
    clusterZeroURI,
    databaseName,
    appName: extensionName ?? '',
  });
  return dbSession.collection<DocumentsDocument>(collectionName);
};
