'use client';

import InlineDefinition from '@leafygreen-ui/inline-definition';
import { theme } from '@/styles/theme';
import type { AbbrRoleNode } from '@/types/ast';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

export type AbbrProps = {
  nodeChildren: AbbrRoleNode['children'];
};

const Abbr = ({ nodeChildren }: AbbrProps) => {
  const value = nodeChildren[0]?.value;
  if (!value) {
    return null;
  }

  // Abbreviations are written as as "ABBR (Full Name Here)", so separate this into `abbr` and `expansion`
  let [abbr, expansion] = value?.split('(');
  if (expansion) {
    expansion = expansion.split(')')[0];
    abbr = abbr.trim();
  }
  return (
    <InlineDefinition
      popoverZIndex={theme.zIndexes.popovers}
      definition={expansion}
      onClose={() =>
        reportAnalytics('Click', {
          position: 'body',
          position_context: `abbreviation/glossary`,
          label: `${abbr} : ${expansion}`,
          scroll_position: currentScrollPosition(),
          tagbook: 'true',
        })
      }
    >
      {abbr}
    </InlineDefinition>
  );
};

export default Abbr;
