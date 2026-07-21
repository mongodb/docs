'use client';

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
  figwidth?: number | string;
  width?: number | string;
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
  // Same URL scheme online and offline: build:images (copy-content-images.ts)
  // copies content images to public/docs/images/<fullPath> unconditionally, so
  // the offline static export always has a file there too (see
  // scripts/build-offline.ts's flatten step, which turns out/docs/images/...
  // into out/images/...). getSuitableIcon (card icons) already does the same
  // — this used to diverge with its own "/docs/<fullPath>" offline path,
  // which pointed one segment short of where build:images actually puts files.
  const imageUrl = formatImageUrl(fullPath);

  // Prefer figwidth (the author's intended display width from `:figwidth:`) over
  // width, which Snooty auto-populates with the image's intrinsic pixel dimensions
  // when no explicit `:width:` is set. Using intrinsic width would render images at
  // full size, larger than the author intended.
  // Numbers are pixel dimensions and need a `px` unit; strings already carry
  // their unit (e.g. "50%" from `:figwidth: 50%`) and pass through unchanged.
  const toCssLength = (value?: number | string) =>
    value === undefined || value === null ? 'auto' : typeof value === 'number' ? `${value}px` : value;
  const normalizeWidth = () => toCssLength(figwidth ?? width);
  const normalizeHeight = () => toCssLength(height);
  const hasHeroImageClass = className === 'hero-img';

  // Match Snooty's Figure behavior: auto-enable the lightbox when the figure is
  // scaled to under 90% of the image's intrinsic width, so downscaled images get a
  // "click to enlarge" affordance even without an explicit `:lightbox:` option.
  // Only applies to pixel widths; a percentage figwidth can't be compared to the
  // intrinsic pixel width.
  const showLightbox =
    lightbox || (typeof figwidth === 'number' && typeof width === 'number' && figwidth / width < 0.9);

  if (showLightbox) {
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
