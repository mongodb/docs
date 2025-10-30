import type { StaticAsset } from '@/services/db/pages';
import type { ImageAsset } from '@/context/image-context';
import { log } from '@/utils/logger';
import envConfig from '@/utils/env-config';
import { getCollection, getSnootyDbName } from './client';

const ASSETS_COLLECTION_NAME = 'assets';

export interface AssetDocument {
  _id: string;
  data: Buffer;
}

const getAssetsCollection = async () => {
  const dbName = getSnootyDbName(envConfig.DB_ENV);
  return getCollection<AssetDocument>(dbName, ASSETS_COLLECTION_NAME);
};

const getAssetById = async (id: string) => {
  const collection = await getAssetsCollection();
  const asset = await collection.findOne({ _id: id }, { projection: { _id: { $toString: '$_id' }, data: 1 } });
  return asset;
};

const fetchAsset = async (asset: StaticAsset) => {
  const assetData = await getAssetById(asset.checksum);

  if (!assetData?.data) {
    log({ level: 'warn', message: `No data found for asset: ${asset.key}` });
  }

  // Convert Buffer to string to avoid serialization issues with Client Components
  const dataString = assetData?.data ? assetData.data.toString('base64') : '';

  return {
    key: asset.key,
    checksum: asset.checksum,
    data: dataString,
  };
};

export const fetchAllAssets = async (staticAssets?: StaticAsset[]): Promise<Record<string, ImageAsset>> => {
  if (!staticAssets) return {};

  const assetsWithData = await Promise.all(staticAssets.map(fetchAsset));
  const assetMap = assetsWithData.reduce((output, { key, checksum, data }) => {
    output[checksum] = { key, data };
    return output;
  }, {} as Record<string, ImageAsset>);

  return assetMap;
};
