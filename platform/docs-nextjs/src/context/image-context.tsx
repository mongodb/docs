import { createContext, useContext } from 'react';
import type { StaticAsset } from '@/services/db/pages';

export type ImageAsset = Pick<StaticAsset, 'key'> & { data: string };

export type ImageContextType = Record<string, ImageAsset>;

const ImageContext = createContext<ImageContextType>({});

export const useImageContext = () => useContext(ImageContext);

export const ImageContextProvider = ImageContext.Provider;
