import type * as mongodb from 'mongodb';
import { getClusterZeroDb } from './clusterZeroConnector';
import type { ReposBranchesDocument } from './types';

export const getReposBranchesCollection = async ({
  clusterZeroURI,
  databaseName,
  collectionName,
  extensionName,
}: {
  clusterZeroURI: string;
  databaseName: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<ReposBranchesDocument>> => {
  const dbSession = await getClusterZeroDb({
    clusterZeroURI,
    databaseName,
    appName: extensionName ?? '',
  });
  return dbSession.collection<ReposBranchesDocument>(collectionName);
};
