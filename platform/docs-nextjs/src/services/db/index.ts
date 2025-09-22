/**
 * Module to secure MDB connections
 * DB connections credentials should be sourced from env file
 * Intended be called from Server Components, or Route Handlers
 */

import { cache } from 'react';
import type { Collection, Filter, FindOptions, Document } from 'mongodb';
import { MongoClient } from 'mongodb';
import type { DocsetDocument } from '@/types/data';
import type {
  ASTDocument,
  FeedbackDocument,
  ProjectDocument,
  SlackChannelDocument,
  TeamDocument,
} from '@/services/db/types';
import envConfig, { type Environments } from '@/utils/env-config';
import { log } from '@/utils/logger';
import type { FeedbackDbType } from '../feedback/feedback-types';
import type { SnootyEnv } from '@/types/data';

const URI = envConfig.MONGODB_URI as string;
const COLLECTION_NAME = 'documents';

if (!URI) {
  throw new Error('MONGODB_URI is missing as an env variable');
}

let client: MongoClient | null;

export function getClient() {
  if (!client) {
    client = new MongoClient(URI, {
      appName: `docs-nextjs-${envConfig.DB_ENV}`,
    });
  }
  return client;
}

function getDbName(env: Environments) {
  switch (env) {
    case 'production':
      return 'snooty_prod';
    case 'dotcomstg':
      return 'snooty_dotcomstg';
    case 'dotcomprd':
      return 'snooty_dotcomprd';
    default:
      return 'snooty_dev';
  }
}

export function getFeedbackDbName(env: SnootyEnv): FeedbackDbType {
  switch (env) {
    case 'development':
      return 'feedback_test';
    case 'dotcomstg':
    case 'staging':
      return 'feedback_stage';
    case 'production':
    case 'dotcomprd':
      return 'feedback_prod';
    default:
      throw new Error(`Unknown snootyEnv: ${env}`);
  }
}

async function getCollection<T extends Document = Document>(
  dbName: string,
  collectionName: string,
  logMessage?: string,
): Promise<Collection<T>> {
  const client = getClient();
  log({
    message: logMessage || `Connecting to MongoDB ${collectionName} collection in db: ${dbName}`,
  });
  return client.db(dbName).collection<T>(collectionName);
}

export async function getFeedbackResponsesCollection(env: SnootyEnv): Promise<Collection<FeedbackDocument>> {
  const dbName = getFeedbackDbName(env);
  return getCollection<FeedbackDocument>(dbName, 'responses');
}

export async function getProjectsCollection(): Promise<Collection<ProjectDocument>> {
  return getCollection<ProjectDocument>('docs_metadata', 'projects');
}

export async function getTeamsCollection(): Promise<Collection<TeamDocument>> {
  return getCollection<TeamDocument>('docs_metadata', 'teams');
}

export async function getSlackChannelsCollection(): Promise<Collection<SlackChannelDocument>> {
  return getCollection<SlackChannelDocument>('docs_metadata', 'slack_channels');
}

async function getPagesDocumentCollection(): Promise<Collection<ASTDocument>> {
  return getCollection<ASTDocument>(getDbName(envConfig.DB_ENV), COLLECTION_NAME);
}

export async function getDocsetsCollection(): Promise<Collection<DocsetDocument>> {
  return getCollection<DocsetDocument>('pool', 'docsets');
}

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
    const pageRes: ASTDocument | null = await collection.findOne(query, DEFAULT_SORT);
    return pageRes;
  } catch (e) {
    log({ message: String(e), level: 'error' });
    throw e;
  }
});

export async function getPageDocFromParams(params: Promise<{ path?: string[] }>, prefix = 'docs') {
  const { path } = await params;
  const fullPagePath = [prefix, path?.join('/') ?? ''].join('/');
  return getPageAST(fullPagePath);
}

// TODO: revisit this logic when deploying Next on Netlify.
// see if we have to clear sockets to MDB connections, or if Netlify handles these
async function clearClient(signal?: string) {
  if (signal) {
    log({ message: `${signal} received. Closing MongoDB connection...` });
  }
  if (client) {
    await client.close();
    client = null;
  }
  process.exit(0);
}

process.on('SIGINT', async () => clearClient('SIGINT'));
process.on('SIGTERM', async () => clearClient('SIGTERM'));
