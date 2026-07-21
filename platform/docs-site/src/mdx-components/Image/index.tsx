'use client';

import { cx, css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import path from 'path';
import { useState } from 'react';
import NextImage from 'next/image';
import { Lightbox } from './Lightbox';
import { Caption } from './Caption';
import { ASSET_PREFIX, INTERNAL_IMAGE_API_PATH } from '@/constants';
import { isOfflineBuild } from '@/utils/isOfflineBuild';

// Online: a static file under _next/static/images (copied there by
// copy-images-to-next-static.ts), referenced via the asset prefix so it rides
// the /docs/docs_static_nextjs/_next/* rewrite + b2k strip and stays out of the
// /docs/* soft-redirect path — no optimizer. Offline (static export) has no
// _next server, so use /docs/images/... which build-offline relativizes. Leading
// slash stripped to avoid a double slash when projectPath is empty (landing page).
const ONLINE_IMAGE_PREFIX = `${ASSET_PREFIX}/_next/static/images/`;
const formatImageUrl = (imagePath: string) => {
  const relativePath = imagePath.replace(/^\//, '');
  return isOfflineBuild ? `${INTERNAL_IMAGE_API_PATH}${relativePath}` : `${ONLINE_IMAGE_PREFIX}${relativePath}`;
};

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
  // Intrinsic pixel dimensions injected at MDX compile time by
  // remark-image-dimensions from image-dimensions.json. Required by next/image;
  // when absent (e.g. an SVG with no intrinsic size), the component falls back
  // to a plain <img>.
  intrinsicWidth?: number | string;
  intrinsicHeight?: number | string;
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
  intrinsicWidth,
  intrinsicHeight,
}: ImageProps) => {
  const [_, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const fullPath = path.join(projectPath, src);
  // See formatImageUrl above: online → _next/static/images asset URL, offline → /docs/images.
  const imageUrl = formatImageUrl(fullPath);

  // next/image requires numeric width+height. Use the injected intrinsic pixel
  // dimensions; fall back to a plain <img> when they are unavailable.
  const numericIntrinsicWidth = Number(intrinsicWidth);
  const numericIntrinsicHeight = Number(intrinsicHeight);
  const hasIntrinsicDimensions =
    Number.isFinite(numericIntrinsicWidth) &&
    numericIntrinsicWidth > 0 &&
    Number.isFinite(numericIntrinsicHeight) &&
    numericIntrinsicHeight > 0;

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

  // Images are unoptimized (see next.config.mjs), so next/image emits a plain
  // <img>; the intrinsic width+height prevent layout shift and the emotion class
  // controls displayed size. Without dimensions, render a bare <img>. All formats
  // (incl. SVG) use the same _next/static URL — no optimizer, no SVG special case.
  const renderImage = (imgClassName: string, onClick?: () => void) =>
    hasIntrinsicDimensions ? (
      <NextImage
        src={imageUrl}
        alt={alt}
        width={numericIntrinsicWidth}
        height={numericIntrinsicHeight}
        className={imgClassName}
        onClick={onClick}
      />
    ) : (
      // Intentional fallback for images without intrinsic dimensions (e.g. SVGs);
      // next/image requires numeric width+height, which we don't have here.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={alt} className={imgClassName} onClick={onClick} />
    );

  if (showLightbox) {
    return (
      <Lightbox
        figure={renderImage(
          cx(figureStyle(normalizeWidth(), normalizeHeight(), hasHeroImageClass), border ? borderStyle : ''),
        )}
        caption={caption}
        figwidth={normalizeWidth()}
      />
    );
  }

  return (
    <>
      {renderImage(
        cx(
          figureStyle(normalizeWidth(), normalizeHeight(), hasHeroImageClass),
          border ? borderStyle : '',
          className,
        ),
        openModal,
      )}
      <Caption caption={caption} />
    </>
  );
};
