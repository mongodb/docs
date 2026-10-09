'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import type { ImageAlign } from './types';

const captionStyle = (align: ImageAlign) => css`
  color: ${palette.gray.dark1};
  /* TODO: Remove !important when mongodb-docs.css is removed */
  margin-top: ${theme.size.default} !important;
  text-align: ${align};

  /* TODO: Remove when mongodb-docs.css is removed */
  & > code {
    color: ${palette.gray.dark1};
  }
`;

interface CaptionProps {
  caption?: string;
  align?: ImageAlign;
}

export const Caption = ({ caption, align = 'center' }: CaptionProps) => {
  if (!caption || caption.trim() === '') return null;
  return <p className={cx(captionStyle(align))}>{caption}</p>;
};
