'use client';

import { palette } from '@leafygreen-ui/palette';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';

const baseStyle = css`
  align-items: center;
  border-radius: ${theme.size.tiny};
  display: inline-flex;
  padding: ${theme.size.tiny} ${theme.size.small};
`;

export const tagHeightStyle = css`
  height: 26px;
`;

export const searchTagStyle = css`
  cursor: pointer;
  ${tagHeightStyle};
  padding: 4px 11px 4px 11px;
  border-radius: 12px;
  font-size: ${theme.fontSize.tiny};
  margin-right: ${theme.size.small};
`;

type TagVariant = 'blue' | 'green' | 'purple' | 'gray';

const VARIANTS: Record<Theme, Record<TagVariant, string>> = {
  [Theme.Light]: {
    blue: css`
      background-color: ${palette.blue.light3};
      border: 1px solid ${palette.blue.light2};
      color: ${palette.blue.dark1};
    `,
    green: css`
      background-color: ${palette.green.light3};
      border: 1px solid ${palette.green.light2};
      color: ${palette.green.dark2};
    `,
    purple: css`
      background-color: ${palette.purple.light3};
      border: 1px solid ${palette.purple.light2};
      color: ${palette.purple.dark2};
    `,
    gray: css`
      background-color: ${palette.gray.light3};
      border: 1px solid ${palette.gray.light1};
      color: ${palette.gray.dark2};
    `,
  },
  [Theme.Dark]: {
    blue: css`
      background-color: ${palette.blue.dark3};
      border: 1px solid ${palette.blue.dark2};
      color: ${palette.blue.light1};
    `,
    green: css`
      background-color: ${palette.green.dark3};
      border: 1px solid ${palette.green.dark2};
      color: ${palette.green.light1};
    `,
    purple: css`
      background-color: ${palette.purple.dark3};
      border: 1px solid ${palette.purple.dark2};
      color: ${palette.purple.light2};
    `,
    gray: css`
      background-color: ${palette.gray.dark3};
      border: 1px solid ${palette.gray.dark2};
      color: ${palette.gray.light1};
    `,
  },
};

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant: TagVariant;
}

const Tag = ({ children, variant, className, ...rest }: TagProps) => {
  const { theme: siteTheme } = useDarkMode();
  const variantStyle = VARIANTS[siteTheme][variant] || VARIANTS[siteTheme]['green'];

  return (
    <span className={cx(baseStyle, variantStyle, className)} {...rest}>
      {children}
    </span>
  );
};

export default Tag;
