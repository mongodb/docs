'use client';

import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';

const captionStyle = css`
  color: ${palette.gray.dark1};
  /* TODO: Remove !important when mongodb-docs.css is removed */
  margin-top: ${theme.size.default} !important;
  text-align: center;

  /* TODO: Remove when mongodb-docs.css is removed */
  & > code {
    color: ${palette.gray.dark1};
  }
`;

interface CaptionProps {
  caption?: string;
}

export const Caption = ({ caption }: CaptionProps) => {
  if (!caption || caption.trim() === '') return null;
  return <p className={cx(captionStyle)}>{caption}</p>;
};
