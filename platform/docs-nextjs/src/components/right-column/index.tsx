'use client';

import type { ReactNode } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { displayNone } from '@/utils/display-none';
import { theme } from '@/styles/theme';
import { DISMISSIBLE_SKILLS_CARD_CLASSNAME } from '@/components/dismissable-skills-card';

const RightColumn = ({
  hasDismissibleSkillsCard,
  children,
  className,
}: {
  hasDismissibleSkillsCard: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const { topLarge } = useStickyTopValues();

  return (
    <div
      className={cx(
        className,
        css`
          margin: 70px ${theme.size.medium} 40px 5px;
          min-width: ${hasDismissibleSkillsCard ? '250px' : '180px'};
          max-width: 250px;
          z-index: ${theme.zIndexes.content + 2};

          ${displayNone.onMobileAndTablet};
        `,
      )}
    >
      <div
        className={cx(css`
          height: calc(100vh - 120px);
          position: sticky;
          top: calc(${topLarge} + ${theme.size.medium});

          & > *:not(.${DISMISSIBLE_SKILLS_CARD_CLASSNAME}) {
            margin-bottom: 30px;
            margin-right: 24px;
          }
        `)}
      >
        {children}
      </div>
    </div>
  );
};

export default RightColumn;
