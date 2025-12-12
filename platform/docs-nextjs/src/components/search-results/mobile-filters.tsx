'use client';

import { useContext, useCallback } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import type { FacetOption } from '@/types/data';
import SearchContext from './search-context';
import SearchFilters from './search-filters';
import { Facets } from './facets';

const Container = css`
  background-color: var(--background-color-primary);
  padding-top: ${theme.size.large};
  width: 100%;
`;

const BackButton = css`
  align-items: center;
  color: ${palette.gray.dark1};
  cursor: pointer;
  display: flex;
  gap: 0 ${theme.size.small};
  font-size: ${theme.fontSize.default};
  line-height: ${theme.size.medium};

  .dark-theme & {
    color: ${palette.gray.light1};
  }
`;

const Label = css`
  font-size: 18px;
  font-weight: 500;
  margin: ${theme.size.small} 0 ${theme.size.medium} 0;
`;

const MobileFilters = ({ facets }: { facets: Array<FacetOption> }) => {
  const { setShowMobileFilters, showFacets } = useContext(SearchContext);

  const closeMobileFilters = useCallback(() => {
    setShowMobileFilters(false);
  }, [setShowMobileFilters]);

  return (
    <div className={cx(Container)}>
      <div className={cx(BackButton)} onClick={closeMobileFilters}>
        <Icon glyph="ArrowLeft" />
        Back to search results
      </div>
      <div className={cx(Label)}>Refine your search</div>
      {showFacets ? (
        <Facets facets={facets} />
      ) : (
        <SearchFilters manuallyApplyFilters={true} onApplyFilters={closeMobileFilters} />
      )}
    </div>
  );
};

export default MobileFilters;
