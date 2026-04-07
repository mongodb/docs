import type * as mongodb from 'mongodb';
import { getSearchDb } from './searchClusterConnector';
import type { SearchDocument } from './types';

export const getDocumentsCollection = async ({
  searchURI,
  databaseName,
  collectionName,
  extensionName,
}: {
  searchURI: string;
  databaseName: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<SearchDocument>> => {
  const dbSession = await getSearchDb({
    searchURI,
    databaseName,
    appName: extensionName ?? '',
  });
  return dbSession.collection<SearchDocument>(collectionName);
};
