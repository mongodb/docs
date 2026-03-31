import { isOfflineBuild } from '@/utils/isOfflineBuild';
import path from 'path';

const NETLIFY_IMAGE_API_PATH = '/.netlify/images/?url=';
const INTERNAL_IMAGE_API_PATH = '/api/images?path=';
// Netlify's image transformation CDN does not support animated GIFs or SVGs —
// serve those directly through the internal API to avoid broken images.
const NETLIFY_TRANSFORM_UNSUPPORTED = new Set(['.gif', '.svg']);
/** Formats the image url to the api path */
const formatImageUrl = (imagePath: string) => {
  const ext = imagePath.slice(imagePath.lastIndexOf('.')).toLowerCase();
  if (NETLIFY_TRANSFORM_UNSUPPORTED.has(ext)) {
    return `${INTERNAL_IMAGE_API_PATH}${imagePath}`;
  }
  return `${NETLIFY_IMAGE_API_PATH}${INTERNAL_IMAGE_API_PATH}${imagePath}`;
};

interface ImageProps {
  projectPath: string;
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const Image = async ({ projectPath, src, alt, width, height, className, style }: ImageProps) => {
  const fullPath = path.join(projectPath, src);
  const imageUrl = isOfflineBuild ? `/docs/${fullPath}` : formatImageUrl(fullPath);

  return <img src={imageUrl} width={width} height={height} alt={alt} className={className} style={style} />;
};
