import { createContext, useContext } from 'react';

export type ImageAsset = { key: string; data: string };

export type ImageContextType = Record<string, ImageAsset>;

const ImageContext = createContext<ImageContextType>({});

export const useImageContext = () => useContext(ImageContext);

export const ImageContextProvider = ImageContext.Provider;
