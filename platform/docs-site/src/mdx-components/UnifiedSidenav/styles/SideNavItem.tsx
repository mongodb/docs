'use client';

import { theme } from '@/styles/theme';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const sideNavItemBasePadding = css`
  /* overwrite LG link underlines @leafygreen-ui/typography v13.0.0 */
  &:hover {
    &:after,
    span:after {
      display: none;
    }
  }

  /* && doubles specificity so these outrank Via Link's own styles. Via sets the
     padding shorthand, so restate LG's base here; each level's padding-left
     lands on top of it. */
  && {
    display: flex;
    padding: 6px 16px;

    &:hover {
      color: inherit;
      text-decoration: none;
    }

    &:focus-visible {
      outline: none;
    }
  }
`;

export const l1ItemStyling = ({ isActive }: { isActive: boolean }) => css`
  ${sideNavItemBasePadding}

  /* && doubles specificity so these outrank Via Link's padding and type scale. */
  && {
    padding-left: ${theme.size.medium};
    padding-right: ${theme.size.medium};
    padding-top: ${theme.size.default};
    padding-bottom: ${theme.size.default};
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }

  ${isActive &&
  css`
    font-weight: 600 !important;
    color: ${palette.green.dark1} !important;
    background-color: ${palette.green.light3};

    &:hover {
      background-color: ${palette.green.light3} !important;
    }

    .dark-theme & {
      color: ${palette.green.base} !important;
      background-color: ${palette.green.dark3};

      &:hover {
        background-color: ${palette.green.dark3} !important;
      }
    }
  `}

  ::before {
    color: ${palette.green.dark1} !important;
  }

  .dark-theme & {
    ::before {
      color: ${palette.green.base} !important;
    }
  }
`;

export const groupHeaderStyling = () => css`
  div[data-testid*='side-nav-group-header-label'] > div > div {
    font-weight: 500;
    color: var(--tab-color-primary);
  }

  /* Version Dropdown button */
  button {
    margin-left: -8px;
    height: 28px;
  }
`;

export const l2ItemStyling = ({ level }: { level: number }) => css`
  ${sideNavItemBasePadding}

  /* && doubles specificity so these outrank Via Link's padding and type scale. */
  && {
    line-height: 20px;
    font-size: ${theme.fontSize.small};
    text-transform: none !important;

    padding-left: calc(${theme.size.default} + ${(level - 1) * 25}px);
  }

  &[aria-current='page'] {
    font-weight: 400;
    color: var(--font-color-active) !important;
    background-color: var(--sidenav-active-bg-color);
  }

  /* Hides the left tab on Active Selection */
  ::before {
    display: none;
  }
`;
