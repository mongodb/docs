import { cache } from 'react';
import type { Filter } from 'mongodb';
import envConfig from '@/utils/env-config';
import { log } from '@/utils/logger';
import type { Root } from '@/types/ast';
import type { PageFacet } from '@/types/data';
import { getCollection, getSnootyDbName } from './client';

export interface ASTDocument {
  buildId: string;
  page_id: string;
  page_path: string;
  filename: string;
  ast: Root;
  static_assets: StaticAsset[];
  facets?: PageFacet[];
}

export interface StaticAsset {
  key: string;
  checksum: string;
  updated_at?: Date;
}

const getPagesDocumentCollection = async () => {
  const dbName = getSnootyDbName(envConfig.DB_ENV);
  return getCollection<ASTDocument>(dbName, 'documents');
};

/**
 * This function retrieves the AST document for a given page path.
 * It uses caching to optimize performance.
 */
const getPageAST = cache(async (path: string | string[], prId?: number) => {
  const collection = await getPagesDocumentCollection();
  const pathString = typeof path === 'string' ? path : path.join('/');
  const query: Filter<ASTDocument> = {
    page_path: pathString.toLowerCase(),
  };
  if (prId) {
    query.pr_id = prId;
  }
  try {
    log({
      message: `Querying db ${collection.namespace} for query ${JSON.stringify(query)}`,
    });
    const pageRes = await collection
      .aggregate<ASTDocument>([
        { $match: query },
        { $sort: { id: -1 } },
        { $limit: 1 },
        {
          $project: {
            _id: 0,
            buildId: { $toString: '$build_id' },
            page_id: 1,
            page_path: 1,
            filename: 1,
            ast: 1,
            static_assets: 1,
            facets: 1,
          },
        },
      ])
      .next();
    if (!pageRes) return;
    return pageRes;
  } catch (e) {
    log({ message: String(e), level: 'error' });
    throw e;
  }
});

interface GetPageDocFromParamsArgs {
  path?: string[];
  prefix?: string;
}

export const getPageDocFromParams = async ({ path, prefix = 'docs' }: GetPageDocFromParamsArgs) => {
  const fullPagePath = path ? [prefix, path.join('/')].join('/') : prefix;
  return getPageAST(fullPagePath);
};
