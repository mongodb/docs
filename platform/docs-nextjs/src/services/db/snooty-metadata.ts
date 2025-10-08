import { cache } from 'react';
import { ObjectId, type Filter, type FindOptions, type Document } from 'mongodb';
import envConfig from '@/utils/env-config';
import { log } from '@/utils/logger';
import type { TextNode, TocTreeEntry } from '@/types/ast';
import type { BreadcrumbType } from '@/types/data';
import { getCollection, getSnootyDbName } from './client';

interface DBMetadataDocument {
  _id: ObjectId;
  project: string;
  branch: string;
  title: string;
  eol: boolean;
  slugToTitle: Record<string, [TextNode]>;
  toctree: TocTreeEntry;
  toctreeOrder: string[];
  parentPaths: Record<string, BreadcrumbType[]>;
  static_files: Record<string, Buffer>;
}

const getSnootyMetadataCollection = async () => {
  const dbName = getSnootyDbName(envConfig.DB_ENV);
  return getCollection(dbName, 'metadata');
};

/** This will return the snooty metadata for a given build_id, returning the first match (sorted descending _id field) */
const _getSnootyMetadata = async (build_id: string) => {
  const collection = await getSnootyMetadataCollection();
  const query: Filter<Document> = { build_id: new ObjectId(build_id) };
  const options: FindOptions = { sort: { _id: -1 } };

  try {
    log({ message: `Querying db ${collection.namespace} for metadata with build_id=${build_id}` });

    const metadataDoc = await collection.findOne<DBMetadataDocument>(query, options);
    if (!metadataDoc) return;
    // we need to parse then stringify the metadataDoc to ensure it's a plain object (handles ObjectIds, etc.)
    return JSON.parse(JSON.stringify(metadataDoc)) as DBMetadataDocument;
  } catch (e) {
    log({ message: String(e), level: 'error' });
    throw e;
  }
};

/** This will return the snooty metadata for a given build_id, returning the first match (sorted descending _id field) and is cached */
export const getSnootyMetadata = cache(_getSnootyMetadata);
