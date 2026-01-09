import type { Collection, Document } from 'mongodb';
import { MongoClient } from 'mongodb';
import { log } from '@/utils/logger';
import type { SnootyEnv } from '@/types/data';
import envConfig, { type Environments } from '@/utils/env-config';

const URI = envConfig.MONGODB_URI as string;
if (!URI) throw new Error('MONGODB_URI is missing as an env variable');

let client: MongoClient | undefined;

export const getClient = (): MongoClient => {
  if (!client) {
    client = new MongoClient(URI, {
      appName: `docs-nextjs-${envConfig.DB_ENV}`,
    });
  }

  return client;
};

export const getSnootyDbName = (env: Environments) => {
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
};

export const getFeedbackDbName = (env: SnootyEnv) => {
  switch (env) {
    case 'dotcomstg':
    case 'staging':
      return 'feedback_stage';
    case 'production':
    case 'dotcomprd':
      return 'feedback_prod';
    case 'development':
    default:
      return 'feedback_test';
  }
};

export const getPoolDbName = (env: Environments) => {
  switch (env) {
    case 'production':
    case 'dotcomprd':
      return 'pool';
    case 'dotcomstg':
    default:
      return 'pool_test';
  }
};

export const getCollection = async <Type extends Document>(
  dbName: string,
  collectionName: string,
  logMessage?: string,
): Promise<Collection<Type>> => {
  log({
    message: logMessage || `Connecting to MongoDB ${collectionName} collection in db: ${dbName}`,
  });

  const client = getClient();
  return client.db(dbName).collection<Type>(collectionName);
};

async function clearClient(signal?: string) {
  if (signal) {
    log({ message: `${signal} received. Closing MongoDB connection...` });
  }
  if (client) {
    await client.close();
    client = undefined;
  }
  process.exit(0);
}

process.on('SIGINT', async () => clearClient('SIGINT'));
process.on('SIGTERM', async () => clearClient('SIGTERM'));
// ============================================================
