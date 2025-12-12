'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { theme } from '@/styles/theme';
import Select from '@/components/select';
import { getSortedBranchesForProperty } from '@/utils/parse-marian-manifests';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import SearchContext from './search-context';

export type SearchFiltersChoice = { text: string; value: string };

const FILTER_WIDTH = '175px';

const SelectWrapper = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.size.default};
`;

const MaxWidthSelect = css`
  width: ${FILTER_WIDTH};
  ul {
    width: ${FILTER_WIDTH};
  }
  li {
    padding: 8px 12px;
  }
`;

const filtersButtonStyles = css`
  .dark-theme & {
    background-color: var(--gray-dark1);
    border-color: var(--gray-base);
    color: var(--white);
    box-shadow: var(--gray-dark2) 0px 0px 0px 3px;

    svg {
      color: var(--gray-light2);
    }
  }
`;

const SearchFilters = ({
  manuallyApplyFilters = false,
  onApplyFilters,
  className,
  ...props
}: {
  manuallyApplyFilters?: boolean;
  onApplyFilters?: () => void;
  className?: string;
}) => {
  const {
    filters,
    searchFilter,
    searchPropertyMapping,
    setSearchFilter,
    selectedCategory,
    selectedVersion,
    setSelectedVersion,
    setSelectedCategory,
  } = useContext(SearchContext);

  // Current selectedCategory and selectedVersion for dropdown. If manuallyApplyFilter === true, selectedCategory + selectedVersion
  // will not be set automatically.
  const [categoryChoices, setCategoryChoices] = useState<Array<SearchFiltersChoice>>([]);
  const [versionChoices, setVersionChoices] = useState<Array<SearchFiltersChoice>>([]);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const [mobileVersion, setMobileVersion] = useState<string | null>(null);

  const hasOneVersion = useMemo(() => versionChoices && versionChoices.length === 1, [versionChoices]);

  const updateVersionChoices = useCallback(
    (selectedCategory: string, setDefaultVersion = false) => {
      if (filters && filters[selectedCategory]) {
        const versions = getSortedBranchesForProperty(filters, selectedCategory);
        if (setDefaultVersion) {
          const defaultVersion = versions[0];
          if (manuallyApplyFilters) {
            setMobileVersion(defaultVersion);
          } else {
            setSelectedVersion(defaultVersion);
            setSearchFilter(filters[selectedCategory][defaultVersion]);
          }
        }
        setVersionChoices(versions.map((b) => ({ text: b, value: b })));
      }
    },
    [filters, manuallyApplyFilters, setSearchFilter, setSelectedVersion],
  );

  const onVersionChange = useCallback(
    ({ value }: { value: string }) => {
      if (!manuallyApplyFilters && selectedCategory) {
        setSelectedVersion(value);
        setSearchFilter(filters[selectedCategory][value]);
      } else {
        setMobileVersion(value);
      }
    },
    [filters, manuallyApplyFilters, selectedCategory, setSearchFilter, setSelectedVersion],
  );

  const onCategoryChange = useCallback(
    ({ value }: { value: string }, element?: HTMLElement | null) => {
      const translatedValue = element?.textContent?.trim() || value;
      reportAnalytics('Click', {
        position: 'Search',
        position_context: 'Refined Search Filter',
        label: value,
        label_text_displayed: translatedValue,
        scroll_position: currentScrollPosition(),
        tagbook: 'true',
      });
      if (!manuallyApplyFilters) {
        setSelectedCategory(value);
      } else {
        setMobileCategory(value);
      }
      updateVersionChoices(value, true);
    },
    [manuallyApplyFilters, setSelectedCategory, updateVersionChoices],
  );

  const applyFilters = useCallback(() => {
    const selectedFilter = mobileCategory && mobileVersion ? filters?.[mobileCategory]?.[mobileVersion] : undefined;
    if (manuallyApplyFilters && selectedFilter) {
      setSelectedCategory(mobileCategory);
      setSelectedVersion(mobileVersion);
      setSearchFilter(selectedFilter);
    }

    if (onApplyFilters) {
      onApplyFilters();
    }
  }, [
    filters,
    mobileCategory,
    mobileVersion,
    manuallyApplyFilters,
    onApplyFilters,
    setSelectedCategory,
    setSelectedVersion,
    setSearchFilter,
  ]);

  const resetFilters = useCallback(() => {
    setSearchFilter(null);
    setSelectedCategory(null);
    setSelectedVersion(null);
    setMobileCategory(null);
    setMobileVersion(null);
  }, [setSearchFilter, setSelectedVersion, setSelectedCategory]);

  // when filters are loaded, validate searchFilter from URL
  // against available searchPropertyMapping
  // update selected selectedVersion and selectedCategory automatically, if we're not manually applying filters
  useEffect(() => {
    if (!filters || !Object.keys(filters).length) {
      return;
    }
    const currentFilter = searchFilter ? searchPropertyMapping[searchFilter] : undefined;
    if (!currentFilter) {
      setSelectedCategory(null);
      setSelectedVersion(null);
      return;
    }

    const { categoryTitle, versionSelectorLabel } = currentFilter;
    if (!manuallyApplyFilters) {
      setSelectedCategory(categoryTitle);
      setSelectedVersion(versionSelectorLabel);
    }
  }, [manuallyApplyFilters, setSelectedVersion, setSelectedCategory, filters, searchFilter, searchPropertyMapping]);

  // Update filters to match an existing filter should it exist
  useEffect(() => {
    if (filters && searchFilter) {
      const currentFilter = searchPropertyMapping[searchFilter];
      if (!currentFilter) {
        return;
      }

      const { categoryTitle } = currentFilter;
      updateVersionChoices(categoryTitle);
    }
  }, [filters, searchFilter, searchPropertyMapping, updateVersionChoices]);

  // Update property choices when the filter results from Marian are loaded
  useEffect(() => {
    const properties = Object.keys(filters);
    properties.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    setCategoryChoices(properties.map((p) => ({ text: p, value: p })));
  }, [filters]);

  return (
    <div {...props} className={cx(css(className))}>
      <div className={cx(SelectWrapper)}>
        <Select
          data-testid="category-select"
          className={cx(MaxWidthSelect)}
          choices={categoryChoices}
          onChange={onCategoryChange}
          defaultText="Filter by Category"
          value={(manuallyApplyFilters && mobileCategory ? mobileCategory : selectedCategory) ?? undefined}
        />
      </div>
      <div className={cx(SelectWrapper)}>
        <Select
          data-testid="version-select"
          className={cx(MaxWidthSelect)}
          choices={versionChoices}
          onChange={onVersionChange}
          disabled={!selectedCategory || hasOneVersion}
          defaultText="Filter by Version"
          value={(manuallyApplyFilters && mobileVersion ? mobileVersion : selectedVersion) ?? undefined}
        />
      </div>
      {manuallyApplyFilters ? (
        <Button onClick={applyFilters} className={cx(filtersButtonStyles)}>
          Apply filters
        </Button>
      ) : (
        <Button leftGlyph={<Icon glyph="X" />} onClick={resetFilters} className={cx(filtersButtonStyles)}>
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default SearchFilters;
