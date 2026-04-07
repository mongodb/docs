import type * as mongodb from 'mongodb';
import { getClusterZeroDb } from './clusterZeroConnector';
import type { OASFilesDocument, ReposBranchesDocument } from './types';

// Get OAS collection of Snooty_<xyz> database
export const getOASCollection = async ({
  clusterZeroURI,
  databaseName,
  collectionName,
  extensionName,
}: {
  clusterZeroURI: string;
  databaseName: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<OASFilesDocument>> => {
  const dbSession = await getClusterZeroDb({
    clusterZeroURI,
    databaseName,
    appName: extensionName ?? '',
  });
  return dbSession.collection<OASFilesDocument>(collectionName);
};
