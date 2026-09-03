'use client';

import { InlineDefinition } from '@via-ds/components/inline-definition';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Tooltip } from '@via-ds/components/tooltip';
import { Size } from '@via-ds/components/types';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { onlyText } from 'react-children-utilities';
import styles from './abbr.module.scss';

export type AbbrProps = {
  children: React.ReactNode;
  tooltip?: string;
};

export const Abbr = ({ children, tooltip }: AbbrProps) => {
  const value = onlyText(children);

  if (!value || !tooltip) {
    return null;
  }

  return (
    <InlineDefinition
      onOpenChange={(open: boolean) => {
        if (!open) {
          reportAnalytics('Click', {
            position: 'body',
            position_context: `abbreviation/glossary`,
            label: `${value} : ${tooltip}`,
            scroll_position: currentScrollPosition(),
            tagbook: 'true',
          });
        }
      }}
    >
      <Text size={Size.Large}>{value}</Text>
      <Tooltip>
        <Text textStyle={TextStyle.body} size={Size.Large} elementType="span" className={styles.tooltipText}>
          {tooltip}
        </Text>
      </Tooltip>
    </InlineDefinition>
  );
};
