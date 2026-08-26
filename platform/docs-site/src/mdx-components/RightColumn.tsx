'use client';

import type { CSSProperties, ReactNode } from 'react';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { clsx } from 'clsx';
import styles from './right-column.module.scss';

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
    <div className={clsx(className, styles.rightColumn, hasDismissibleSkillsCard && styles.hasDismissibleSkillsCard)}>
      <div className={styles.stickyContainer} style={{ '--sticky-top': topLarge } as CSSProperties}>
        {children}
      </div>
    </div>
  );
};

export { RightColumn };
