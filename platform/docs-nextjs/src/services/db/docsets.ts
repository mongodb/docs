import { cache } from 'react';
import type { DocsetDocument, Docset } from '@/types/data';
import envConfig from '@/utils/env-config';
import { getCollection, getPoolDbName } from './client';

export const getDocsetsCollection = async (dbNameOverride?: string) => {
  const dbName = dbNameOverride ?? getPoolDbName(envConfig.DB_ENV);
  return getCollection<DocsetDocument>(dbName, 'docsets');
};

export const getAllDocsetsWithVersions = async (dbNameOverride?: string): Promise<Docset[]> => {
  const collection = await getDocsetsCollection(dbNameOverride);

  // query docsets, merge deployable/only repo with each docset
  const docsets = await collection
    .aggregate([
      // use objectid references to query repos_branches for repo data for each docset
      {
        $lookup: {
          from: 'repos_branches',
          localField: 'repos',
          foreignField: '_id',
          as: 'repos',
        },
      },
      // filter for deployable/only repo within each docset
      {
        $addFields: {
          deployableRepo: {
            $cond: {
              if: { $gt: [{ $size: '$repos' }, 1] }, // Check if array has more than one element
              then: {
                $filter: {
                  input: '$repos',
                  as: 'item',
                  cond: { $eq: ['$$item.prodDeployable', true] }, // Filter elements where prodDeployable is true
                },
              },
              else: '$repos', // Only one repo in the repos array
            },
          },
        },
      },
      // merge/flatten the document
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$deployableRepo', 0] }, '$$ROOT'],
          },
        },
      },
      // ignore unnecessary fields
      {
        $project: {
          repos: 0,
          deployableRepo: 0,
        },
      },
    ])
    .toArray();

  return docsets as Docset[];
};

export const getAllDocsetsWithVersionsCached = cache(getAllDocsetsWithVersions);
