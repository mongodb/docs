'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
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

function scrollToTopHtml() {
  Promise.resolve().then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0;
      });
    });
  });
}

export type NextPrevLinkProps = {
  pageTitle: ReactNode;
  title: string;
  targetSlug: string;
  direction: string;
  icon: string;
  onClick: (direction: string, targetSlug: string) => void;
  className: string;
};

const NextPrevLink = ({ className, icon, direction, pageTitle, title, targetSlug, onClick }: NextPrevLinkProps) => {
  const isNext = direction.toLowerCase() === 'next';
  const isPrev = direction.toLowerCase() === 'back';
  const router = useRouter();

  const handleClick = () => {
    router.push(targetSlug);
    onClick(direction, targetSlug);
    scrollToTopHtml();
  };

  return (
    <div className={className}>
      <Link href={targetSlug} title={title} onClick={handleClick}>
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
