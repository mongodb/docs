'use client';

import InlineDefinition from '@leafygreen-ui/inline-definition';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { onlyText } from 'react-children-utilities';

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
      popoverZIndex={theme.zIndexes.popovers}
      definition={tooltip}
      onClose={() =>
        reportAnalytics('Click', {
          position: 'body',
          position_context: `abbreviation/glossary`,
          label: `${value} : ${tooltip}`,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        })
      }
    >
      {value}
    </InlineDefinition>
  );
};
