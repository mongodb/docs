import * as dotenv from 'dotenv';
// dotenv.config() should be invoked immediately, before any other imports, to ensure config is present
dotenv.config();

import AdmZip from 'adm-zip';
import * as mongodb from 'mongodb';
import { join } from 'node:path';
import {
  db as snootyDb,
  pool as poolDb,
  teardown as closeDBConnection,
} from './src/services/connector';
import { insertAndUpdatePages } from './src/services/pages';
import {
  insertMetadata,
  deleteStaleMetadata,
  metadataFromZip,
} from './src/services/metadata';
import { upsertAssets } from './src/services/assets';
import type { DocsetsDocument } from '../databaseConnection/types';

export const runPersistenceModule = async (
  path: string,
  docset: DocsetsDocument,
  branchName: string,
  prId?: number,
) => {
  try {
    const zip = new AdmZip(path);
    // atomic buildId for all artifacts read by this module - fundamental assumption
    // that only one build will be used per run of this module.
    const buildId = new mongodb.ObjectId();
    const metadata = await metadataFromZip(zip);

    // initialize db connections to handle shared connections
    // pass client to persistence module
    // TODO 6508: is there a reason we set this in persistence module (multiple db conncections) as opposed to passing it in?
    await snootyDb();
    await poolDb();
    await Promise.all([
      insertAndUpdatePages(
        buildId,
        zip,
        metadata.project,
        docset.prefix,
        branchName,
        prId,
      ),
      insertMetadata(buildId, metadata),
      upsertAssets(zip, buildId),
    ]);
    // DOP-3447 clean up stale metadata
    await deleteStaleMetadata(metadata);
  } catch (error) {
    console.error(`Persistence Module encountered a terminal error: ${error}`);
    throw error;
  }
};

export const closeConnections = async () => {
  await closeDBConnection();
};
