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
      // Project only the fields we need, excluding all ObjectIds and unnecessary fields
      {
        $project: {
          _id: { $toString: '$_id' }, // Convert ObjectId to string
          displayName: 1,
          project: 1,
          // Transform branches array to exclude the id field
          branches: {
            $map: {
              input: '$branches',
              as: 'branch',
              in: {
                gitBranchName: '$$branch.gitBranchName',
                active: '$$branch.active',
                urlSlug: '$$branch.urlSlug',
                urlAliases: '$$branch.urlAliases',
                versionSelectorLabel: '$$branch.versionSelectorLabel',
                offlineUrl: '$$branch.offlineUrl',
                noIndexing: '$$branch.noIndexing',
                eol_type: '$$branch.eol_type',
                publishOriginalBranchName: '$$branch.publishOriginalBranchName',
                isStableBranch: '$$branch.isStableBranch',
                buildsWithSnooty: '$$branch.buildsWithSnooty',
              },
            },
          },
          hasEolVersions: 1,
          repoName: 1,
          search: 1,
          internalOnly: 1,
          prodDeployable: 1,
          // Transform groups array to convert id to string
          groups: {
            $map: {
              input: '$groups',
              as: 'group',
              in: {
                id: { $toString: '$$group.id' },
                groupLabel: '$$group.groupLabel',
                includedBranches: '$$group.includedBranches',
                sharedSlugPrefix: '$$group.sharedSlugPrefix',
              },
            },
          },
          prefix: 1,
          url: 1,
          bucket: 1,
        },
      },
    ])
    .toArray();

  return docsets as Docset[];
};

export const getAllDocsetsWithVersionsCached = cache(getAllDocsetsWithVersions);
