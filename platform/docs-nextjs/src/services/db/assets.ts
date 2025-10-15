import type { StaticAsset } from '@/services/db/pages';
import type { ImageAsset } from '@/context/image-context';
import { log } from '@/utils/logger';
import envConfig from '@/utils/env-config';
import { getCollection, getSnootyDbName } from './client';

const ASSETS_COLLECTION_NAME = 'assets';

export interface AssetDocument {
  _id: string;
  data: string;
}

const getAssetsCollection = async () => {
  const dbName = getSnootyDbName(envConfig.DB_ENV);
  return getCollection<AssetDocument>(dbName, ASSETS_COLLECTION_NAME);
};

const getAssetById = async (id: string) => {
  const collection = await getAssetsCollection();
  const asset = await collection.findOne({ _id: id });
  return asset;
};

const fetchAsset = async (asset: StaticAsset) => {
  const assetData = await getAssetById(asset.checksum);

  if (!assetData?.data) {
    log({ level: 'warn', message: `No data found for asset: ${asset.key}` });
  }

  return {
    key: asset.key,
    checksum: asset.checksum,
    data: assetData?.data ?? '',
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
