import path from 'path';

const NETLIFY_IMAGE_API_PATH = '/.netlify/images/?url=';
const INTERNAL_IMAGE_API_PATH = '/api/images?path=';
/** Formats the image url to the api path */
const formatImageUrl = (imagePath: string) => {
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
  const imageUrl = formatImageUrl(fullPath);

  return <img src={imageUrl} width={width} height={height} alt={alt} className={className} style={style} />;
};
