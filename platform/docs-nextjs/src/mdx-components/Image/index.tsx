'use client';

import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { cx, css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import path from 'path';
import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { Caption } from './Caption';
import { INTERNAL_IMAGE_API_PATH } from '@/constants';

// Formats the image url to the api path
// Strip any leading slash from imagePath to avoid double-slash when projectPath is empty (landing page)
const formatImageUrl = (imagePath: string) => `${INTERNAL_IMAGE_API_PATH}${imagePath.replace(/^\//, '')}`;

const figureStyle = (width?: string, maxHeight?: string, hasHeroImageClass?: boolean) => css`
  display: block;
  width: auto;
  ${!hasHeroImageClass ? `max-width: ${width && width !== 'auto' ? `min(${width}, 100%)` : '100%'};` : ''}
  height: auto;
  ${!hasHeroImageClass && maxHeight && maxHeight !== 'auto' ? `max-height: ${maxHeight};` : ''}
  ${!hasHeroImageClass ? `margin-top: ${theme.size.medium}; margin-bottom: ${theme.size.medium};` : ''}
`;

const borderStyle = css`
  border-radius: ${theme.size.default};
  border: 0.5px solid var(--border-color);
`;

export interface ImageProps {
  projectPath: string;
  src: string;
  alt: string;
  border?: boolean;
  lightbox?: boolean;
  figwidth?: number;
  width?: number;
  caption?: string;
  className?: string;
  height?: number;
}

export const Image = ({
  projectPath,
  src,
  alt,
  border,
  width,
  height,
  figwidth,
  lightbox,
  caption,
  className,
}: ImageProps) => {
  const [_, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const fullPath = path.join(projectPath, src);
  const imageUrl = isOfflineBuild ? `/docs/${fullPath}` : formatImageUrl(fullPath);

  const normalizeWidth = () => (width ?? figwidth ? `${width ?? figwidth}px` : 'auto');
  const normalizeHeight = () => (height ? `${height}px` : 'auto');
  const hasHeroImageClass = className === 'hero-img';

  if (lightbox) {
    return (
      <Lightbox
        figure={
          <img
            src={imageUrl}
            alt={alt}
            className={cx(figureStyle(normalizeWidth(), normalizeHeight(), hasHeroImageClass), border ? borderStyle : '')}
          />
        }
        caption={caption}
        figwidth={normalizeWidth()}
      />
    );
  }

  return (
    <>
      <img
        src={imageUrl}
        alt={alt}
        className={cx(figureStyle(normalizeWidth(), normalizeHeight(), hasHeroImageClass), border ? borderStyle : '', className)}
        onClick={openModal}
      />
      <Caption caption={caption} />
    </>
  );
};
