import { createContext, useContext } from 'react';
import type { AssetDocument } from '@/services/db/assets';
import type { StaticAsset } from '@/services/db/pages';

export type ImageAsset = Pick<StaticAsset, 'key'> & Pick<AssetDocument, 'data'>;

export type ImageContextType = Record<string, ImageAsset>;

const ImageContext = createContext<ImageContextType>({});

export const useImageContext = () => useContext(ImageContext);

export const ImageContextProvider = ImageContext.Provider;
