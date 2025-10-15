import path from 'path';
import type { ImageAsset } from '@/context/image-context';

const mimeToBase64Extension: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
};

/**
 * Creates a web renderable base64 string with the correct mime type
 * @param imageData - The image asset object which includes the filename and data
 */
export const makeBase64String = (imageData?: ImageAsset) => {
  if (!imageData) return '';

  const mimeType = path.extname(imageData.key).replace('.', '');

  return `data:${mimeToBase64Extension[mimeType]};base64,${imageData.data}`;
};
