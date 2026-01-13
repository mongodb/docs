'use client';

import type { ImgHTMLAttributes } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import type { ImageNode, ImageNodeOptions } from '@/types/ast';
import { useImageContext } from '@/context/image-context';
import { makeBase64String } from './makeBase64String';

const defaultImageStyling = css`
  max-width: 100%;
  height: auto;
`;

const borderStyling = css`
  border-radius: ${theme.size.default};
  border: 0.5px solid var(--border-color);
`;

const borderContainerStyling = css`
  > img {
    ${borderStyling}
  }
`;

const gatsbyContainerStyle = css`
  height: max-content;
  overflow: hidden;
  > img {
    ${defaultImageStyling}
  }
`;

type GetImagePropsProps = {
  width: number;
  height: number;
  hasBorder: boolean;
  darkMode: boolean;
  altText?: string;
  customAlign?: string;
  className?: string;
  directiveClass?: string;
  srcSet?: string;
  loading?: string;
};

function getImageProps({
  altText,
  width,
  height,
  hasBorder,
  darkMode,
  customAlign,
  className,
  directiveClass,
  loading,
}: GetImagePropsProps) {
  const borderColor = darkMode && hasBorder ? palette.gray.dark2 : darkMode ? 'transparent' : palette.gray.light1;

  const imageProps: Partial<ImgHTMLAttributes<HTMLImageElement>> = {
    alt: altText ?? '',
    style: {
      borderColor,
      maxWidth: '100%',
      height: 'auto',
    },
  };

  if (width) {
    imageProps['width'] = width;
  }
  if (height) {
    imageProps['height'] = height;
  }

  if (loading === 'lazy') {
    imageProps['className'] = cx(
      gatsbyContainerStyle,
      directiveClass,
      customAlign,
      className,
      hasBorder ? borderContainerStyling : '',
    );
  } else {
    imageProps['className'] = cx(
      defaultImageStyling,
      hasBorder ? borderStyling : '',
      directiveClass,
      customAlign,
      className,
    );
  }

  return imageProps;
}

export type ImageProps = {
  argument: ImageNode['argument'];
  options: ImageNodeOptions;
  className?: string;
};

const Image = ({ argument, options, className }: ImageProps) => {
  const { darkMode } = useDarkMode();
  const imageAssets = useImageContext();
  const imageToRender = imageAssets[options.checksum ?? ''];

  const scale = parseInt(options.scale ?? '100', 10) / 100;
  const width = parseInt(options.width ?? '0', 10) * scale;
  const height = parseInt(options.height ?? '0', 10) * scale;

  const loading = options.loading;
  const directiveClass = options.class;

  const imgSrc = argument?.[0]?.value;
  const altText = options.alt || imgSrc;
  const imgAlignment = options.align;
  const hasBorder = !!options.border;

  const customAlign = imgAlignment ? `align-${imgAlignment}` : '';

  const imageProps = getImageProps({
    altText,
    width,
    height,
    hasBorder,
    darkMode,
    customAlign,
    className,
    directiveClass,
    loading,
  });

  const src = makeBase64String(imageToRender);

  // eslint-disable-next-line @next/next/no-img-element -- images are pre-optimized via build pipeline
  return <img {...imageProps} src={src} alt={altText} />;
};

export default Image;
