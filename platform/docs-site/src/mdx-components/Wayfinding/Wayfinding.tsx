'use client';
import React, { Children, isValidElement, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Text } from '@via-ds/components/typography';
import ChevronDown from '@via-ds/icons/ChevronDown';
import ChevronUp from '@via-ds/icons/ChevronUp';
import { NOTRANSLATE_CLASS } from '@/utils/locale';
import styles from './wayfinding.module.scss';

export const MAX_INIT_OPTIONS = 4;

type WayfindingProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const Wayfinding = ({ title, description, children }: WayfindingProps) => {
  const [showAll, setShowAll] = useState(false);
  const optionChildren = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);

  const { showButtonText, ShowButtonGlyph } = showAll
    ? {
        showButtonText: 'Collapse',
        ShowButtonGlyph: ChevronUp,
      }
    : {
        showButtonText: 'Show all',
        ShowButtonGlyph: ChevronDown,
      };

  return (
    <div className={styles.container}>
      <Text elementType="p" textStyle="body" className={styles.title}>
        {title}
      </Text>
      <div className={styles.description}>{description}</div>
      <div className={clsx(styles.optionsContainer, NOTRANSLATE_CLASS)}>
        {optionChildren.map((child, index) => {
          const hideOption = !showAll && index > MAX_INIT_OPTIONS - 1;
          return React.cloneElement(child as ReactElement<{ hideOption?: boolean }>, {
            hideOption,
            key: child.key ?? index,
          });
        })}
      </div>
      {optionChildren.length > MAX_INIT_OPTIONS && (
        <button className={styles.showAllButton} onClick={() => setShowAll((prev) => !prev)}>
          {showButtonText}
          <ShowButtonGlyph role="presentation" />
        </button>
      )}
    </div>
  );
};
