'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Card as ViaCard } from '@via-ds/components/card';
import { Link, LinkStyle, Text, TextStyle } from '@via-ds/components/typography';
import { Density } from '@via-ds/components/types';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { CloseButton } from '@/mdx-components/FeedbackWidget/components/close-button';
import { SkillsBadgeIcon } from '@/mdx-components/svg/SkillsBadgeIcon';
import { useCookiesContext } from '@/context/cookies-context';
import { usePageContext } from '@/context/page-context';
import styles from './dismissible-skills-card.module.scss';

export const DISMISSIBLE_SKILLS_CARD_CLASSNAME = 'dismissible-skills-card';

export type DismissibleSkillsCardProps = {
  skill: string;
  url: string;
};

const reportDismissibleSkillsCard = async (skill: string, element?: HTMLElement | null) => {
  const translatedLabel = element?.textContent?.trim() || skill;

  reportAnalytics('Click', {
    position: 'right column',
    position_context: 'dismissible skills card',
    label: skill,
    label_text_displayed: translatedLabel,
    scroll_position: currentScrollPosition(),
    tagbook: 'true',
  });
};

const DismissibleSkillsCard = ({ skill, url }: DismissibleSkillsCardProps) => {
  const { getCookie, setCookie } = useCookiesContext();
  const { slug } = usePageContext();

  const cookieName = `dismissed-skills-${slug
    .split('/')
    .join('-')
    .replace(/[^a-zA-Z0-9-_]/g, '-')}`;

  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (getCookie(cookieName) === 'true') setIsDismissed(true);
  }, [getCookie, cookieName]);

  const onLinkClick = (event: React.MouseEvent) => {
    reportDismissibleSkillsCard(skill, event.currentTarget as HTMLElement);
  };

  const onClose = (event: React.MouseEvent) => {
    reportDismissibleSkillsCard(skill, event.currentTarget as HTMLElement);

    // Save to cookie (expires in 1 year)
    setCookie(cookieName, 'true');

    // Hide the card
    setIsDismissed(true);
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  return (
    <div className={clsx(DISMISSIBLE_SKILLS_CARD_CLASSNAME, styles.container)}>
      <ViaCard className={styles.card} density={Density.Compact}>
        <div className={styles.titleRow}>
          <SkillsBadgeIcon />
          <Text elementType="span" textStyle={TextStyle.heading4}>
            Earn a Skill Badge
          </Text>
        </div>
        <CloseButton onClick={onClose} />
        <Text elementType="p">Master &quot;{skill}&quot; for free!</Text>
        <Link href={url} linkStyle={LinkStyle.Internal} onClick={onLinkClick}>
          Learn more
        </Link>
      </ViaCard>
      <hr className={styles.hr} />
    </div>
  );
};

export { DismissibleSkillsCard };
