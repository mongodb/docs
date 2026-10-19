import type AdmZip from 'adm-zip';
import type { ObjectId } from 'mongodb';
import { bulkUpsertAll } from '../connector';

const COLLECTION_NAME = 'assets';

// Service responsible for upsertion of any image or blob assets.

const assetsFromZip = (zip: AdmZip) => {
  const assets = zip.getEntries();
  return assets
    .filter((entry) => entry.entryName?.startsWith('assets/'))
    .map((entry) => ({
      _id: entry.entryName.replace('assets/', ''),
      data: entry.getData(),
    }));
};

export const upsertAssets = async (zip: AdmZip, buildId?: ObjectId) => {
  const timerLabel = `asset upsertion - ${buildId?.toString()}`;
  console.time(timerLabel);
  try {
    const assets = assetsFromZip(zip);
    return bulkUpsertAll(assets, COLLECTION_NAME);
  } catch (error) {
    console.error(`Error at upsertion time for ${COLLECTION_NAME}: ${error}`);
    throw error;
  } finally {
    console.timeEnd(timerLabel);
  }
};
