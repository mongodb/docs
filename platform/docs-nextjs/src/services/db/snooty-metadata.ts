import { cache } from 'react';
import { ObjectId } from 'mongodb';
import envConfig from '@/utils/env-config';
import { log } from '@/utils/logger';
import type { TextNode, TocTreeEntry } from '@/types/ast';
import type { BreadcrumbType } from '@/types/data';
import { getCollection, getSnootyDbName } from './client';

export interface DBMetadataDocument {
  _id: ObjectId;
  project: string;
  branch: string;
  title: string;
  eol: boolean;
  slugToTitle: Record<string, [TextNode]>;
  toctree: TocTreeEntry;
  toctreeOrder: string[];
  parentPaths: Record<string, BreadcrumbType[]>;
  static_files: Record<string, string>;
}

const getSnootyMetadataCollection = async () => {
  const dbName = getSnootyDbName(envConfig.DB_ENV);
  return getCollection(dbName, 'metadata');
};

/** This will return the snooty metadata for a given build_id, returning the first match (sorted descending _id field) */
const _getSnootyMetadata = async (build_id: string) => {
  // Validate that build_id is a valid ObjectId format
  if (!build_id || build_id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(build_id)) {
    log({ message: `Invalid build_id format: "${build_id}". Expected 24-character hex string.`, level: 'warn' });
    return undefined;
  }

  const collection = await getSnootyMetadataCollection();

  try {
    log({ message: `Querying db ${collection.namespace} for metadata with build_id=${build_id}` });

    // Checking for the build_id to not be an empty string because new ObjectID expects that the input must be a 24 character hex string, 12 byte Uint8Array, or an integer
    const metadataDoc =
      build_id !== ''
        ? await collection
            .aggregate<DBMetadataDocument>([
              { $match: { build_id: new ObjectId(build_id) } },
              { $sort: { _id: -1 } },
              { $limit: 1 },
              {
                $project: {
                  _id: 0,
                  project: 1,
                  branch: 1,
                  title: 1,
                  eol: 1,
                  slugToTitle: 1,
                  toctree: 1,
                  toctreeOrder: 1,
                  parentPaths: 1,
                  // Convert static_files buffers to base64 strings
                  static_files: {
                    $arrayToObject: {
                      $map: {
                        input: { $objectToArray: '$static_files' },
                        as: 'item',
                        in: {
                          k: '$$item.k',
                          v: { $toString: '$$item.v' },
                        },
                      },
                    },
                  },
                },
              },
            ])
            .next()
        : null;

    if (!metadataDoc) return;
    return metadataDoc;
  } catch (e) {
    log({ message: String(e), level: 'error' });
    throw e;
  }
};

/** This will return the snooty metadata for a given build_id, returning the first match (sorted descending _id field) and is cached */
export const getSnootyMetadata = cache(_getSnootyMetadata);
