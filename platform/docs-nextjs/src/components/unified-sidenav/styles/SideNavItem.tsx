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
`;

export const l1ItemStyling = ({ isActive, isAccordion }: { isActive: boolean; isAccordion: boolean }) => css`
  ${sideNavItemBasePadding}
  padding-left: ${theme.size.medium};
  padding-right: ${theme.size.medium};
  padding-top: ${theme.size.default};
  padding-bottom: ${isActive && isAccordion ? theme.size.small : theme.size.default};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;

  ${isActive &&
  css`
    font-weight: 600 !important;

    ${isAccordion
      ? css`
          /* Hides the left tab on Active Selection */
          background-color: unset !important;
          color: unset;

          ::before {
            display: none;
          }
        `
      : css`
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

export const groupHeaderStyling = ({ isAccordion }: { isAccordion: boolean }) => css`
  div[data-testid*='side-nav-group-header-label'] > div > div {
    ${isAccordion &&
    css`
      padding-left: 4px;
      button {
        margin-left: -8px;
      }
    `}
    font-weight: 500;
    color: var(--tab-color-primary);
  }

  /* Version Dropdown button */
  button {
    margin-left: ${!isAccordion && '-8px'};
    height: 28px;
  }
`;

export const l2ItemStyling = ({ level, isAccordion }: { level: number; isAccordion: boolean }) => css`
  ${sideNavItemBasePadding}
  line-height: 20px;
  font-size: ${theme.fontSize.small};
  text-transform: none !important;

  ${isAccordion
    ? css`
        padding-left: calc(20px + ${(level - 1) * 25}px);
      `
    : css`
        padding-left: calc(${theme.size.default} + ${(level - 1) * 25}px);
      `}

  /* Hides the left tab on Active Selection */
  
  ${isAccordion
    ? css`
        &[aria-current='page'] {
          color: var(--sidenav-active-before-color) !important;
          background-color: var(--sidenav-active-bg-color);
        }
      `
    : css`
        &[aria-current='page'] {
          font-weight: 400;
          color: var(--font-color-active) !important;
          background-color: var(--sidenav-active-bg-color);
        }

        ::before {
          display: none;
        }
      `}
`;
