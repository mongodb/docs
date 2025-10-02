'use client';

import type { ReactNode } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import Link from '../link';
import { navLinkButtonStyle } from './styles';

const commonTextStyles = css`
  font-size: ${theme.fontSize.small};
  line-height: 20px;
`;

const nextPrevTextStyling = css`
  ${commonTextStyles}
  font-weight: 500;
  color: var(--font-color-primary);
`;

const nextTextStyling = css`
  text-align: end;
`;

const prevTextStyling = css`
  text-align: start;
`;

const nextPrevTitleTextStyling = css`
  ${commonTextStyles}
  color: ${palette.gray.base};

  .dark-theme & {
    color: ${palette.gray.light1};
  }
`;

const commonLinkContentContainerStyling = css`
  align-items: center;
  display: flex;
  column-gap: 14px;
`;

const nextLinkContainerStyling = css`
  ${commonLinkContentContainerStyling}
  flex-direction: row-reverse;
`;

const prevLinkContainerStyling = css`
  ${commonLinkContentContainerStyling}
  flex-direction: row;
`;

const baseButtonStyle = css`
  width: 52px;
  height: 48px;

  @media ${theme.screenSize.mediumAndUp} {
    width: 40px;
    height: 36px;
  }
`;

export type NextPrevLinkProps = {
  pageTitle: ReactNode;
  title: string;
  targetSlug: string;
  direction: string;
  icon: string;
  contentSite?: string | null | undefined;
  onClick: (direction: string, targetSlug: string) => void;
  className: string;
};

const NextPrevLink = ({
  className,
  icon,
  direction,
  pageTitle,
  targetSlug,
  title,
  // contentSite,
  onClick,
}: NextPrevLinkProps) => {
  const isNext = direction.toLowerCase() === 'next';
  const isPrev = direction.toLowerCase() === 'back';

  return (
    <div className={className} onClick={() => onClick(direction, targetSlug)}>
      {/* TODO: add back prop when ready for unified TOC: contentSite={contentSite} */}
      <Link to={targetSlug} {...{ title }}>
        <div className={cx({ [nextLinkContainerStyling]: isNext, [prevLinkContainerStyling]: isPrev })}>
          <Button className={cx(baseButtonStyle, navLinkButtonStyle)}>
            <Icon glyph={icon} />
          </Button>
          <div className={cx({ [nextTextStyling]: isNext }, { [prevTextStyling]: isPrev })}>
            <Body className={cx(nextPrevTextStyling)}>{direction}</Body>
            <Body className={cx(nextPrevTitleTextStyling)}>{pageTitle}</Body>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NextPrevLink;
