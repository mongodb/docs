import type { ReactNode } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Link from '@/components/link';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const LINK_DEPTH_PADDING = 16;

const listItemStyling = ({ isActive }: { isActive: boolean }) => css`
  padding: 6px 0 6px 1px;

  &:hover,
  &:active {
    padding-left: 4px;
  }

  --active-border-color: ${palette.black};
  --border-color: ${palette.gray.light2};

  .dark-theme & {
    --active-border-color: ${palette.gray.light1};
    --border-color: ${palette.gray.dark2};
  }

  @media ${theme.screenSize.largeAndUp} {
    border-left-style: solid;
    border-left-width: ${isActive ? '2px' : '1px'};
    border-left-color: ${isActive ? `var(--active-border-color)` : `var(--border-color)`};
    ${isActive && 'padding-left: 0;'}

    &:hover,
    &:active {
      border-left-width: 2px;
      border-left-color: var(--active-border-color);
      padding-left: 0;
    }
  }
`;

const linkStyling = ({ depth, isActive }: { depth: number; isActive: boolean }) => css`
  color: var(--font-color-primary);
  font-size: ${theme.fontSize.small};
  line-height: ${theme.fontSize.default};
  font-weight: normal;

  ${isActive && ` font-weight: 600;`}

  display: inline-block;
  padding-left: ${`${depth * LINK_DEPTH_PADDING}px`};
  width: 100%;

  @media ${theme.screenSize.largeAndUp} {
    padding-left: calc(14px + ${depth * LINK_DEPTH_PADDING}px);
  }

  :hover,
  :active {
    color: currentColor;
    text-decoration: none;
  }
  span > span {
    position: unset;
  }
`;

const ContentsListItem = ({
  children,
  depth = 0,
  id,
  isActive = false,
}: {
  children: ReactNode;
  id: string;
  depth?: number;
  isActive?: boolean;
}) => {
  return (
    <li className={listItemStyling({ isActive })}>
      <Link
        className={linkStyling({ depth, isActive })}
        to={`#${id}`}
        onClick={() => {
          reportAnalytics('Click', {
            position: 'Right Column',
            position_context: 'On This Page',
            label: id,
            label_text_displayed: id,
            scroll_position: currentScrollPosition(),
            tagbook: 'true',
          });
        }}
      >
        {children}
      </Link>
    </li>
  );
};

export default ContentsListItem;
