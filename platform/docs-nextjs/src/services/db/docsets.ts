import type { Collection } from 'mongodb';
import type { DocsetDocument } from '@/types/data';
import envConfig from '@/utils/env-config';
import { getCollection, getPoolDbName } from './client';

export async function getDocsetsCollection(): Promise<Collection<DocsetDocument>> {
  const dbName = getPoolDbName(envConfig.DB_ENV);
  return getCollection<DocsetDocument>(dbName, 'docsets');
}
