'use client';

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Overline } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import Tag, { searchTagStyle } from '@/components/tag';
import SearchContext from '@/components/search-results/search-context';
import type { FacetOption, FacetValue } from '@/types/data';
import { initChecked } from './facet-value';
import { getFacetTagVariant } from './utils';

// util to get all current facets, derived from search params
const getActiveFacets = (facetOptions: Array<FacetOption>, searchParams: URLSearchParams) => {
  const res: Array<FacetValue> = [];

  function checkFacetValue(facetValues: Array<FacetValue>) {
    for (const facetValue of facetValues) {
      // if it exists in search params, include
      if (initChecked(searchParams, facetValue.key, facetValue.id)) {
        res.push(facetValue);
      }

      // search its descendant options
      if (facetValue.facets) {
        checkFacetGroup(facetValue.facets);
      }
    }
  }

  function checkFacetGroup(facetOptions: Array<FacetOption>) {
    for (const facetOption of facetOptions) {
      checkFacetValue(facetOption.options);
    }
  }

  checkFacetGroup(facetOptions);

  return res;
};

const extraTagStyles = css`
  column-gap: ${theme.size.small};
`;

const clearButtonStyling = css`
  text-transform: uppercase;
  font-weight: 500;
`;

const MAX_HEIGHT = 30;

const TagsFlexbox = css`
  display: flex;
  flex: 0 1 auto;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
`;

const SelectionsFlexbox = (expanded: boolean) => css`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  max-height: ${expanded ? `${MAX_HEIGHT}px` : 'unset'};
  align-items: center;
`;

const ExpandFlexbox = css`
  display: flex;
  flex: 0 0 fit-content;
`;

const overlineBaseStyling = css`
  margin-right: ${theme.size.small};
`;

const overlineLightStyling = css`
  color: ${palette.gray.dark2};
  ${overlineBaseStyling}
`;

const FacetTag = ({ facet }: { facet: FacetValue }) => {
  const { handleFacetChange } = useContext(SearchContext);
  const { name, key, id, facets } = facet;
  const onClick = useCallback(() => {
    // if the Facet has any sub facet options, include those in change
    const facetsToDeselect: Array<FacetValue> = [{ ...facet, checked: false }];
    for (const subFacet of facets) {
      if (!subFacet.options) {
        continue;
      }
      // Very confused by the naming here. I think these are facetValues not facetOptions
      for (const facetOption of subFacet?.options) {
        facetsToDeselect.push({
          ...facetOption,
          key: facetOption.key,
          id: facetOption.id,
          checked: false,
        });
      }
    }
    handleFacetChange(facetsToDeselect);
  }, [facet, facets, handleFacetChange]);

  return (
    <Tag variant={getFacetTagVariant({ key, id })} onClick={onClick} className={cx(searchTagStyle, extraTagStyles)}>
      {name}
      <Icon glyph="X" />
    </Tag>
  );
};

const ClearFacetsTag = ({ onClick }: { onClick: () => void }) => (
  <Tag variant={'gray'} className={cx(clearButtonStyling, searchTagStyle, extraTagStyles)} onClick={onClick}>
    clear all filters <Icon glyph="X" />
  </Tag>
);

const FacetTags = ({ resultsCount }: { resultsCount?: number }) => {
  const { searchParams, clearFacets, facets } = useContext(SearchContext);
  // don't have to use state since facet filters are
  // derived from URL state (search params)
  const activeFacets = useMemo(() => getActiveFacets(facets, searchParams), [facets, searchParams]);

  const [expanded, setExpanded] = useState(false);

  const [needExpansion, setNeedExpansion] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkMode();

  // resize affect. show/hide `Show More` button if there is no real estate
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      setNeedExpansion(entries[0]?.target?.clientHeight >= MAX_HEIGHT);
    });
    resizeObserver.observe(refContainer.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  const clickHandle = useCallback((newExpanded: boolean) => {
    setExpanded(newExpanded);
  }, []);

  return (
    <div className={cx(TagsFlexbox)}>
      <div className={cx(SelectionsFlexbox(expanded))} ref={refContainer}>
        {Number.isInteger(resultsCount) && (
          <Overline
            className={cx({
              [overlineBaseStyling]: darkMode === true,
              [overlineLightStyling]: darkMode === false,
            })}
          >
            <>{resultsCount} RESULTS</>
          </Overline>
        )}
        {activeFacets.map((facet) => (
          <FacetTag facet={facet} key={facet.id}></FacetTag>
        ))}
        {needExpansion && expanded && (
          <Tag variant={'gray'} onClick={() => clickHandle(false)} className={cx(searchTagStyle, extraTagStyles)}>
            Show Less
          </Tag>
        )}
        {expanded && activeFacets.length > 0 && <ClearFacetsTag onClick={clearFacets}></ClearFacetsTag>}
      </div>
      {!expanded && (
        <div className={cx(ExpandFlexbox)}>
          {needExpansion && (
            <Tag variant={'gray'} onClick={() => clickHandle(true)} className={cx(searchTagStyle, extraTagStyles)}>
              Show More
            </Tag>
          )}
          {activeFacets.length > 0 && <ClearFacetsTag onClick={clearFacets}></ClearFacetsTag>}
        </div>
      )}
    </div>
  );
};

export default FacetTags;
