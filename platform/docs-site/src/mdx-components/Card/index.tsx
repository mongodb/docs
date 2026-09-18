'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { Card as ViaCard } from '@via-ds/components/card';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { DarkModeContext } from '@/context/dark-mode-context';
import { ConditionalWrapper } from '@/mdx-components/ConditionalWrapper';
import { Link } from '@/mdx-components/Link';
import { usePageContext } from '@/context/page-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { isRelativeUrl } from '@/utils/is-relative-url';
import { getSuitableIcon } from '@/utils/get-suitable-icon';
import { reportAnalytics } from '@/utils/report-analytics';
import { useVersionContext } from '@/context/version-context';
import { navigateToDocsPath } from '@/utils/navigate-to-docs-path';
import CardGroupContext from './card-group-context';
import styles from './card.module.scss';

const onCardClick = (
  router: ReturnType<typeof useRouter>,
  url?: string,
  headline?: string,
  element?: HTMLElement | null,
) => {
  if (!url) return;
  const headlineElement = element?.querySelector(`.${styles.headline}, .${styles.headlineCompact}`) as HTMLElement;
  const translatedLabel = headlineElement?.textContent?.trim() || headline;
  reportAnalytics('Click', {
    position: 'body',
    position_context: 'Card',
    label: headline,
    label_text_displayed: translatedLabel,
    scroll_position: currentScrollPosition(),
    tagbook: 'true',
  });
  navigateToDocsPath(router, url);
};

export type CardProps = {
  children: React.ReactNode;
  url?: string;
  headline?: string;
  icon?: string;
  'icon-dark'?: string;
  'icon-alt'?: string;
  cta?: string;
};

const CardContext = createContext<boolean | null>(null);

const Card = ({ children, cta, headline, icon, 'icon-dark': iconDark, 'icon-alt': iconAlt, url }: CardProps) => {
  const { template } = usePageContext();
  const { isDarkMode } = useContext(DarkModeContext);
  const { siteBasePrefix, siteBasePrefixWithVersion } = useVersionContext();
  const cardGroupValues = useContext(CardGroupContext);
  const { isCompact, isExtraCompact, isCenterContentStyle, isLargeIconStyle } = cardGroupValues ?? {
    isCompact: false,
    isExtraCompact: false,
    isCenterContentStyle: false,
    isLargeIconStyle: false,
  };

  const router = useRouter();

  const isLanding = template === 'landing';

  let imgSize: string;
  if (isLargeIconStyle) imgSize = '50';
  else if (isLanding) imgSize = '64';
  else if (template === 'product-landing') imgSize = '32';
  else imgSize = '24';

  const useCompactIcon = !['landing', 'product-landing'].includes(template ?? '');

  const headlineClassName = isCompact || isExtraCompact ? styles.headlineCompact : styles.headline;

  const resolvedUrl =
    url && isRelativeUrl(url) && siteBasePrefixWithVersion ? `/${siteBasePrefixWithVersion}${url}` : url;

  const styling = clsx(
    styles.card,
    isCenterContentStyle ? styles.centerContent : styles.default,
    (isCompact || isExtraCompact) && styles.compact,
    isLargeIconStyle && styles.largeIcon,
    // must come after other styles to override
    isLanding && !isLargeIconStyle && styles.landing,
    resolvedUrl && styles.clickable,
  );

  const iconSrc = getSuitableIcon({
    icon,
    iconDark,
    isDarkMode,
    siteBasePrefix,
  });

  return (
    <CardContext.Provider value={true}>
      <ViaCard
        className={styling}
        onClick={
          resolvedUrl
            ? (event) => onCardClick(router, resolvedUrl, headline, event.currentTarget as unknown as HTMLElement)
            : undefined
        }
      >
        {icon && (
          <img
            src={iconSrc}
            alt={iconAlt ?? ''}
            width={Number(imgSize)}
            height={Number(imgSize)}
            className={useCompactIcon ? styles.compactIcon : ''}
            style={{ objectFit: 'contain' }}
          />
        )}
        <ConditionalWrapper
          condition={!!(isCompact || isExtraCompact)}
          wrapper={(children) => <div className={styles.compactTextWrapper}>{children}</div>}
        >
          <div>
            {headline && (
              <Text
                textStyle={TextStyle.heading5}
                className={clsx(headlineClassName, isLargeIconStyle && styles.headlineLargeIcon)}
                elementType="p"
              >
                {headline}
              </Text>
            )}
            {/* TODO: In RefRole - we should now use CardContext (DOP-6666) */}
            {children}
            {cta && (
              <Text textStyle={TextStyle.body} size={Size.Large} elementType="p">
                <Link to={resolvedUrl}>{cta}</Link>
              </Text>
            )}
          </div>
        </ConditionalWrapper>
      </ViaCard>
    </CardContext.Provider>
  );
};

export default Card;
