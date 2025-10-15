import { cache } from 'react';
import type { Filter, FindOptions, WithId, Document } from 'mongodb';
import envConfig from '@/utils/env-config';
import { log } from '@/utils/logger';
import type { Root } from '@/types/ast';
import type { PageFacet } from '@/types/data';
import { getCollection, getSnootyDbName } from './client';

export interface ASTDocument extends WithId<Document> {
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
    page_path: pathString,
  };
  if (prId) {
    query['pr_id'] = prId;
  }
  const DEFAULT_SORT: FindOptions = { sort: { id: -1 } };
  try {
    log({
      message: `Querying db ${collection.namespace} for query ${JSON.stringify(query)}`,
    });
    const pageRes = await collection.findOne<ASTDocument>(query, DEFAULT_SORT);
    if (!pageRes) return;
    // we need to parse then stringify the pageRes to ensure it's a plain object (handles ObjectIds, etc.)
    return JSON.parse(JSON.stringify(pageRes)) as ASTDocument;
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
  const fullPagePath = [prefix, path?.join('/') ?? ''].join('/');
  return getPageAST(fullPagePath);
};
