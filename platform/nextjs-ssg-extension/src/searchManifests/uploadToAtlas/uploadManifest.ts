import assert from 'node:assert';
import type { Manifest } from '../generateManifest/manifest';
import { generateHash, joinUrl } from '../utils';
import { getDocumentsCollection } from '../../util/databaseConnection/fetchSearchData';
import type {
  SearchClusterConnectionInfo,
  SearchDocument,
} from '../../util/databaseConnection/types';

// TODO: implement elapsedMS: number;
type RefreshInfo = {
  deleted: number;
  upserted: number;
  modified: number;
  dateStarted: Date;
};

const composeUpserts = async (
  manifest: Manifest,
  searchProperty: string,
  lastModified: Date,
  hash: string,
) => {
  const documents = manifest.documents;
  return documents.map((document) => {
    assert.strictEqual(typeof document.slug, 'string');
    assert.ok(document.slug || document.slug === '');

    document.strippedSlug = document.slug.replace('/', '');

    const newDocument: SearchDocument = {
      ...document,
      lastModified: lastModified,
      url: joinUrl({ base: manifest.url, path: document.slug }),
      manifestRevisionId: hash,
      searchProperty: [searchProperty],
      includeInGlobalSearch: manifest.includeInGlobalSearch ?? false,
    };

    return {
      updateOne: {
        filter: {
          searchProperty: newDocument.searchProperty,
          slug: newDocument.slug,
        },
        update: { $set: newDocument },
        upsert: true,
      },
    };
  });
};

export const uploadManifest = async ({
  manifest,
  searchProperty,
  connectionInfo,
}: {
  manifest: Manifest;
  searchProperty: string;
  connectionInfo: SearchClusterConnectionInfo;
}) => {
  // Check that manifest documents exist
  //TODO: Should we check for other manifest properties as well?
  if (!manifest?.documents?.length) {
    return Promise.reject(new Error('Invalid manifest'));
  }
  const documentsColl = await getDocumentsCollection(connectionInfo);

  const status: RefreshInfo = {
    deleted: 0,
    upserted: 0,
    modified: 0,
    dateStarted: new Date(),
  };

  const hash = await generateHash(manifest.toString());
  //TODO: should we add a property for createdAt?
  const lastModified = new Date();

  const upserts = await composeUpserts(
    manifest,
    searchProperty,
    lastModified,
    hash,
  );
  const operations = [...upserts];

  //TODO: make sure url of manifest doesn't have excess leading slashes(as done in getManifests)

  // Assert property types
  assert.strictEqual(typeof manifest.includeInGlobalSearch, 'boolean');
  assert.strictEqual(typeof hash, 'string');
  assert.ok(hash);
  assert.ok(manifest.url);
  console.info('Starting transaction');

  try {
    if (operations.length > 0) {
      const bulkWriteStatus = await documentsColl?.bulkWrite(operations, {
        ordered: false,
      });
      status.modified += bulkWriteStatus?.modifiedCount ?? 0;
      status.upserted += bulkWriteStatus?.upsertedCount ?? 0;
    }
    const result = await documentsColl?.deleteMany({
      searchProperty: searchProperty,
      manifestRevisionId: { $ne: hash },
    });
    status.deleted += result?.deletedCount ?? 0;
    return status;
  } catch (e) {
    throw new Error(
      `Error writing upserts to Search.documents collection with error ${e}`,
    );
  }
};
