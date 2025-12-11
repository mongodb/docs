'use client';

import { useState } from 'react';
import Card from '@leafygreen-ui/card';
import { Body, Link, Subtitle } from '@leafygreen-ui/typography';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { displayNone } from '@/utils/display-none';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import CloseButton from '@/components/widgets/feedback-widget/components/close-button';
import SkillsBadgeIcon from '@/components/svg/skills-badge-icon';
import { useCookiesContext } from '@/context/cookies-context';
import { usePageContext } from '@/context/page-context';

export const DISMISSIBLE_SKILLS_CARD_CLASSNAME = 'dismissible-skills-card';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;

  ${displayNone.onMobileAndTablet};
`;

const cardStyles = css`
  padding: ${theme.fontSize.default};
  border-radius: 12px;
  box-shadow: none;
  background-color: var(--background-color-primary);
  border-color: ${palette.gray.light2};

  .dark-theme & {
    border-color: ${palette.gray.dark2};
  }

  p {
    line-height: 20px;
    font-size: ${theme.fontSize.small};
    color: ${palette.gray.dark1};

    .dark-theme & {
      color: ${palette.gray.light1};
    }
  }
`;

const titleBoxStyles = css`
  display: flex;
  align-items: center;
  gap: ${theme.size.small};
  padding-right: 12px;

  svg > path {
    .dark-theme & {
      fill: ${palette.white};
    }
  }
`;

const titleStyles = css`
  color: var(--font-color-primary);
`;

const hrStyles = css`
  width: 100%;
  margin: ${theme.size.small} 0;
  border-color: ${palette.gray.light2};
`;

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

  // Generate a unique cookie name for this specific skills card
  const cookieName = `dismissed-skills-${slug
    .split('/')
    .join('-')
    .replace(/[^a-zA-Z0-9-_]/g, '-')}`;

  const [isDismissed, setIsDismissed] = useState(getCookie(cookieName) === 'true');

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
    <Box className={cx(DISMISSIBLE_SKILLS_CARD_CLASSNAME, containerStyles)}>
      <Card className={cx(cardStyles)}>
        <Box className={cx(titleBoxStyles)}>
          <SkillsBadgeIcon />
          <Subtitle className={titleStyles}>Earn a Skill Badge</Subtitle>
        </Box>
        <CloseButton onClick={onClose} />
        <Body>Master &quot;{skill}&quot; for free!</Body>
        <Link arrowAppearance={'persist'} baseFontSize={13} href={url} onClick={onLinkClick} hideExternalIcon>
          Learn more
        </Link>
      </Card>
      <hr className={cx(hrStyles)} />
    </Box>
  );
};

export default DismissibleSkillsCard;
