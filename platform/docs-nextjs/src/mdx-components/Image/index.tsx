'use client';

import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { cx, css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import path from 'path';
import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { Caption } from './Caption';

// Netlify's image transformation CDN does not support animated GIFs or SVGs —
// serve those directly through the internal API to avoid broken images.
const NETLIFY_IMAGE_API_PATH = '/.netlify/images/?url=';
const INTERNAL_IMAGE_API_PATH = '/api/images?path=';
const NETLIFY_TRANSFORM_UNSUPPORTED = new Set(['.gif', '.svg']);

// Formats the image url to the api path
const formatImageUrl = (imagePath: string) => {
  const ext = imagePath.slice(imagePath.lastIndexOf('.')).toLowerCase();
  if (NETLIFY_TRANSFORM_UNSUPPORTED.has(ext)) {
    return `${INTERNAL_IMAGE_API_PATH}${imagePath}`;
  }
  return `${NETLIFY_IMAGE_API_PATH}${INTERNAL_IMAGE_API_PATH}${imagePath}`;
};

const figureStyle = (width?: string, height?: string) => css`
  max-width: 100%;
  margin-top: ${theme.size.medium};
  margin-bottom: ${theme.size.medium};
  width: ${width};
  height: ${height};
  border-radius: ${theme.size.default};
  border: 0.5px solid var(--border-color);
`;

export interface ImageProps {
  projectPath: string;
  src: string;
  alt: string;
  lightbox?: boolean;
  figwidth?: number;
  width?: number;
  caption?: string;
  className?: string;
  align?: string;
  scale?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const Image = ({
  projectPath,
  src,
  alt,
  width,
  height,
  figwidth,
  lightbox,
  caption,
  style,
  className,
  align,
  scale,
}: ImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fullPath = path.join(projectPath, src);
  const imageUrl = isOfflineBuild ? `/docs/${fullPath}` : formatImageUrl(fullPath);

  const normalizeWidth = () => (width ?? figwidth ? `${width ?? figwidth}px` : 'auto');
  const normalizeHeight = () => (height ? `${height}` : 'auto');

  if (lightbox) {
    return (
      <Lightbox
        figure={
          <img
            src={imageUrl}
            alt={alt}
            height="500px"
            className={cx(figureStyle(normalizeWidth(), normalizeHeight()))}
          />
        }
        caption={caption}
      />
    );
  }

  return (
    <div>
      <img
        src={imageUrl}
        alt={alt}
        height="500px"
        className={cx(figureStyle(normalizeWidth(), normalizeHeight()))}
        onClick={openModal}
      />
      <Caption caption={caption} />
    </div>
  );
};
