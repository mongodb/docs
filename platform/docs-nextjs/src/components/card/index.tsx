'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import LeafyGreenCard from '@leafygreen-ui/card';
import { css, cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import ComponentFactory from '@/components/component-factory';
import ConditionalWrapper from '@/components/conditional-wrapper';
import Link from '@/components/link';
import CommunityPillLink from '@/components/community-pill-link';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { getSuitableIcon } from '@/utils/get-suitable-icon';
import type { CardNode } from '@/types/ast';
import { usePageContext } from '@/context/page-context';

const cardBaseStyles = css`
  display: flex;
  height: 100%;
  background-color: var(--background-color-primary);
  border-color: ${palette.gray.light2};

  .dark-theme & {
    border-color: ${palette.gray.dark2};
  }
`;

const landingStyles = css`
  flex-direction: row;
  padding-left: ${theme.size.medium};
  img {
    width: ${theme.size.xlarge};
    height: fit-content;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: ${theme.size.large};
    p:first-child {
      font-size: ${theme.fontSize.h2};
      font-weight: 500;
      margin: 0px 0px ${theme.size.default} 0px;
    }
  }

  /* Mobile view */
  @media ${theme.screenSize.upToSmall} {
    flex-direction: column;
    img {
      margin-bottom: ${theme.size.medium};
    }
    div {
      margin-left: 0px;
    }
  }
`;

const cardStyling = css`
  flex-direction: column;
  padding: ${theme.size.large};

  p:last-of-type {
    margin-bottom: 0;
  }
`;

const centerContentStyling = css`
  padding: ${theme.size.default} ${theme.size.medium};
  align-items: center;

  // override "height" HTML attribute
  img {
    height: 100%;
  }

  p {
    margin: 0 0 0 18px;
    font-weight: 400;
  }
`;

const largeIconStyling = css`
  p {
    line-height: ${theme.size.medium};
  }
`;

const compactIconStyle = `
  @media ${theme.screenSize.upToSmall} {
    width: 20px;
  }
`;

const headingStyling = ({
  isCompact,
  isExtraCompact,
  isLargeIconStyle,
}: {
  isCompact?: boolean;
  isExtraCompact?: boolean;
  isLargeIconStyle?: boolean;
}) => css`
  font-weight: 500;
  letter-spacing: normal;
  color: var(--font-color-primary);
  margin: ${isCompact || isExtraCompact ? `0 0 ${theme.size.small}` : `${theme.size.default} 0 ${theme.size.small} 0`};
  ${isLargeIconStyle && 'margin-bottom: 36px;'}
`;

const compactCardStyling = css`
  align-items: flex-start;
  flex-direction: row;
  padding: ${theme.size.large} ${theme.size.medium};
`;

const CompactTextWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: ${theme.size.small};
  @media ${theme.screenSize.upToSmall} {
    margin-left: ${theme.size.default};
  }

  p {
    line-height: ${theme.size.medium};
  }
`;

const bodyStyling = css`
  a {
    line-height: unset;
  }
`;

const onCardClick = (url: string, router: ReturnType<typeof useRouter>) => {
  return isRelativeUrl(url) ? router.push(url) : (window.location.href = url);
};

export type CardProps = {
  isCompact?: boolean;
  isExtraCompact?: boolean;
  isCenterContentStyle?: boolean;
  isLargeIconStyle?: boolean;
  nodeChildren: CardNode['children'];
} & CardNode['options'];

const Card = ({
  nodeChildren,
  isCompact,
  isExtraCompact,
  isCenterContentStyle,
  isLargeIconStyle,
  cta,
  headline,
  icon,
  'icon-dark': iconDark,
  'icon-alt': iconAlt,
  tag,
  url,
}: CardProps) => {
  const { template } = usePageContext();
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const isLanding = template === 'landing';

  let imgSize;
  if (isLargeIconStyle) imgSize = '50';
  else if (isLanding) imgSize = '64';
  else if (template === 'product-landing') imgSize = '32';
  else imgSize = '24';

  const useCompactIcon = !['landing', 'product-landing'].includes(template ?? '');

  const styling = [
    cardBaseStyles,
    isCenterContentStyle ? centerContentStyling : cardStyling,
    isCompact || isExtraCompact ? compactCardStyling : '',
    isLargeIconStyle ? largeIconStyling : '',
    isLanding && !isLargeIconStyle ? landingStyles : '', // must come after other styles to override
  ];

  const iconSrc = getSuitableIcon(icon, iconDark, darkMode);

  return (
    <LeafyGreenCard className={cx(styling)} onClick={url ? () => onCardClick(url, router) : undefined}>
      {icon && (
        <Image
          src={iconSrc}
          alt={iconAlt ?? ''}
          width={Number(imgSize)}
          height={Number(imgSize)}
          className={useCompactIcon ? cx(compactIconStyle) : ''}
        />
      )}
      <ConditionalWrapper
        condition={!!(isCompact || isExtraCompact)}
        wrapper={(children) => <CompactTextWrapper>{children}</CompactTextWrapper>}
      >
        {tag && <CommunityPillLink variant="green" text={tag} />}
        <div>
          {headline && (
            <Body className={cx(headingStyling({ isCompact, isExtraCompact, isLargeIconStyle }))} weight="medium">
              {headline}
            </Body>
          )}
          {nodeChildren.map((child, i) => (
            // TODO: DOP-6017 - may need cardRef prop to be passed down to RefRole
            // The cardRef prop's purpose to distinguish wich RefRoles are coming from the Card component (a workaround while we figure out card-ref support in the parser/)
            // <ComponentFactory nodeData={child} key={i} cardRef={true} />
            <ComponentFactory nodeData={child} key={i} />
          ))}

          {cta && (
            <Body className={cx(bodyStyling)}>
              <Link to={url}>{cta}</Link>
            </Body>
          )}
        </div>
      </ConditionalWrapper>
    </LeafyGreenCard>
  );
};

export default Card;
