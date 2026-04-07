import { getDocumentsCollection } from '../../util/databaseConnection/fetchSearchData';
import type { SearchClusterConnectionInfo } from '../../util/databaseConnection/types';
import type { DeleteResult } from 'mongodb';

export const deleteStaleDocuments = async ({
  searchProperty,
  manifestRevisionId,
}: {
  searchProperty: string;
  manifestRevisionId: string;
}) => {
  console.log(
    `Removing stale documents with search property ${searchProperty} `,
  );
  return {
    deleteMany: {
      filter: {
        searchProperty: searchProperty,
        manifestRevisionId: { $ne: manifestRevisionId },
      },
    },
  };
};

export const deleteStaleProperties = async (
  searchProperty: string,
  connectionInfo: SearchClusterConnectionInfo,
): Promise<DeleteResult | undefined> => {
  const documentsColl = await getDocumentsCollection(connectionInfo);
  console.info(
    `Removing all documents with stale property ${JSON.stringify(searchProperty)}`,
  );
  const query = { searchProperty: { $regex: searchProperty } };
  try {
    const status = await documentsColl.deleteMany(query);
    return status;
  } catch (e) {
    console.info(
      `Error removing stale property ${searchProperty} in database ${connectionInfo.databaseName}, collection ${connectionInfo.collectionName}: ${e}`,
    );
  }
};
