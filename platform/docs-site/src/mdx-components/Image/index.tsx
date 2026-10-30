'use client';

import { clsx } from 'clsx';
import path from 'path';
import type { CSSProperties } from 'react';
import NextImage from 'next/image';
import { Lightbox } from './Lightbox';
import { Caption } from './Caption';
import { INTERNAL_IMAGE_API_PATH, ONLINE_IMAGE_PREFIX } from '@/constants';
import { isDevMode } from '@/utils/isDevBuild';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import type { ImageAlign } from './types';
import styles from './image.module.scss';

const formatImageUrl = (imagePath: string) => {
  const relativePath = imagePath.replace(/^\//, '');

  if (isDevMode || isOfflineBuild) {
    return `${INTERNAL_IMAGE_API_PATH}${relativePath}`;
  } else {
    return `${ONLINE_IMAGE_PREFIX}${relativePath}`;
  }
};

const sizeVariables = (width: string, maxHeight: string) =>
  ({
    ...(width !== 'auto' && { '--image-max-width': width }),
    ...(maxHeight !== 'auto' && { '--image-max-height': maxHeight }),
  }) as CSSProperties;

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
  align?: ImageAlign;
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
  align = 'left',
  intrinsicWidth,
  intrinsicHeight,
}: ImageProps) => {
  const fullPath = path.join(projectPath, src);
  // See formatImageUrl above: online → /_next/static/images asset URL, offline → /docs/images.
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
  // <img>; the intrinsic width+height prevent layout shift and the module classes
  // control displayed size. Without dimensions, render a bare <img>. All formats
  // (incl. SVG) use the same _next/static URL — no optimizer, no SVG special case.
  const renderImage = (extraClassName?: string, imageAlt = alt) => {
    const imgClassName = clsx(
      styles.image,
      !hasHeroImageClass && styles.sized,
      border && styles.border,
      extraClassName,
    );
    const style = hasHeroImageClass ? undefined : sizeVariables(normalizeWidth(), normalizeHeight());

    return hasIntrinsicDimensions ? (
      <NextImage
        src={imageUrl}
        alt={imageAlt}
        width={numericIntrinsicWidth}
        height={numericIntrinsicHeight}
        className={imgClassName}
        style={style}
      />
    ) : (
      // Intentional fallback for images without intrinsic dimensions (e.g. SVGs);
      // next/image requires numeric width+height, which we don't have here.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={imageAlt} className={imgClassName} style={style} />
    );
  };

  if (showLightbox) {
    return (
      <Lightbox
        figure={renderImage()}
        // Dialog title already announces alt; an empty alt avoids reading it twice.
        dialogFigure={renderImage(undefined, '')}
        alt={alt}
        caption={caption}
        figwidth={normalizeWidth()}
        align={align}
      />
    );
  }

  const image = renderImage(className);

  // Landing page CSS targets .hero-img as a direct grid child, so it must not be wrapped.
  if (hasHeroImageClass) return image;

  return (
    <div className={clsx(styles.wrapper, styles[align])}>
      {image}
      <Caption caption={caption} align={align} />
    </div>
  );
};
