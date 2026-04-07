import type * as mongodb from 'mongodb';
import { getClusterZeroDb } from './clusterZeroConnector';
import type { ProjectsDocument } from './types';

// Get Projects collection of Docs_metadata database
export const getProjectsCollection = async ({
  clusterZeroURI,
  databaseName,
  collectionName,
  extensionName,
}: {
  clusterZeroURI: string;
  databaseName: string;
  collectionName: string;
  extensionName?: string;
}): Promise<mongodb.Collection<ProjectsDocument>> => {
  const dbSession = await getClusterZeroDb({
    clusterZeroURI,
    databaseName,
    appName: extensionName ?? '',
  });
  return dbSession.collection<ProjectsDocument>(collectionName);
};
