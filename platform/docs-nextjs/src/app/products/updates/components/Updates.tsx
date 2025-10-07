'use client';
import { Body } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import type { ProductUpdateEntry } from '../services/contentstack';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useScreenSize from '@/hooks/use-screen-size';
import { SearchInput } from '@leafygreen-ui/search-input';
import { theme } from '@/styles/theme';
import type { FilterCategory } from '../consts/filters';
import { PRODUCT_UPDATE_FILTERS } from '../consts/filters';
import Checkbox from '@leafygreen-ui/checkbox';
import Icon from '@leafygreen-ui/icon';
import { Pagination } from './Pagination';
import { getPagination } from '../utils/get-pagination';

interface UpdatesProps {
  updates: ProductUpdateEntry[];
}

const updatesContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 24px;

  @media ${theme.screenSize.xLargeAndUp} {
    flex-direction: row;
    padding: 0 32px;
  }
`;

const newsSectionStyle = css`
  max-width: 1018px;
  width: 100%;
  margin: 0 0 48px 0;

  @media ${theme.screenSize.xLargeAndUp} {
    margin: 0 99px 48px 99px;
  }
`;

const newsContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 902px;
  flex: 1;
  margin-right: 199px;
`;

const newsItemStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  border-bottom: 1px solid ${palette.gray.base};

  :last-child {
    border-bottom: none;
  }

  :hover {
    cursor: pointer;
  }
`;

const newsItemDateStyle = css`
  font-size: 13px;
  line-height: 20px;
  color: var(--whats-new-gray-dark1);
`;

const newsItemTitleStyle = css`
  font-size: 18px;
  line-height: 24px;
  color: var(--whats-new-dark-blue);
  font-weight: 500;
  margin-bottom: 4px;

  @media ${theme.screenSize.mediumAndUp} {
    font-size: 24px;
    line-height: 32px;
  }
`;

const newsItemDescriptionStyle = css`
  font-size: 13px;
  line-height: 20px;
  color: ${palette.black};

  @media ${theme.screenSize.mediumAndUp} {
    font-size: 16px;
    line-height: 28px;
  }
`;

const newsItemsCountStyle = css`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
  margin-top: 7px;
  padding: 16px;
  border-top: 2px solid ${palette.gray.light2};
`;

const searchContainerStyle = css`
  margin-bottom: 7px;
  width: 100%;
`;

const newsItemsCountTextStyle = css`
  font-size: 13px;
  justify-self: center;
  line-height: 20px;
  color: ${palette.black};
`;

const filtersContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
  gap: 16px;

  @media ${theme.screenSize.mediumAndUp} {
    flex-direction: row;
  }

  @media ${theme.screenSize.xLargeAndUp} {
    flex-direction: column;
    width: 224px;
    flex-shrink: 0;
  }
`;

const filterCategoryStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${theme.screenSize.mediumAndUp} {
    flex: 1;
    min-width: 0;
  }
`;

const filterCategoryTitleStyle = css`
  font-size: 16px;
  line-height: 28px;
  font-weight: 600;
  color: ${palette.black};
`;

const filterCheckboxesStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 16px;
`;

const filterCheckboxesExpandedStyle = css`
  /* When expanded, show all items on mobile and tablet */
  @media ${theme.screenSize.upToXLarge} {
    & > * {
      display: flex !important;
    }
  }
`;

const filterToggleContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${palette.blue.base};

  /* Hide toggles on desktop */
  @media ${theme.screenSize.xLargeAndUp} {
    display: none;
  }
`;

const filterToggleTextStyle = css`
  color: ${palette.blue.base};
  font-size: 16px;
  line-height: 28px;
`;

const Updates = ({ updates }: UpdatesProps) => {
  const { isDesktop, isTablet } = useScreenSize();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterCategory, string[]>>({
    offering: [],
    category: [],
    product: [],
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<FilterCategory, boolean>>({
    offering: false,
    category: false,
    product: false,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  // Get the first 12 initially
  const itemsPerPage = 12;
  const [filteredUpdates, getFilteredUpdates] = useState<ProductUpdateEntry[][]>([[...updates.slice(0, itemsPerPage)]]);

  // Helper function to get available filters for a specific category
  const getAvailableFiltersForCategory = (category: FilterCategory): string[] => {
    const allFilters = PRODUCT_UPDATE_FILTERS[category];

    return allFilters.filter((filter) => {
      return updates.some((update) => {
        let updateTags: string[] = [];

        // Map filter categories to the corresponding tag fields
        switch (category) {
          case 'offering':
            updateTags = update.tags_offerings || [];
            break;
          case 'category':
            updateTags = update.tags_category || [];
            break;
          case 'product':
            updateTags = update.tags_product || [];
            break;
          default:
            updateTags = [];
        }

        // Check if any of the update tags match this filter (case-insensitive)
        return updateTags.some((tag) => tag.toLowerCase() === filter.toLowerCase());
      });
    });
  };

  useEffect(() => {
    // Filter updates based on search term and selected filters
    const filteredResults = updates.filter((update: ProductUpdateEntry) => {
      // Search term filtering
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = update.title.toLowerCase().includes(searchLower);
        const descriptionMatch = (update.multi_line || '').toLowerCase().includes(searchLower);

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // Filter by selected filters (if any are selected)
      const hasActiveFilters = Object.values(selectedFilters).some((filters) => filters.length > 0);

      if (hasActiveFilters) {
        // Check if update matches any of the selected filters using the new tag fields
        return Object.entries(selectedFilters).every(([category, selectedValues]) => {
          if (selectedValues.length === 0) return true; // No filters selected for this category

          let updateTags: string[] = [];

          // Map filter categories to the corresponding tag fields
          switch (category) {
            case 'offering':
              updateTags = update.tags_offerings || [];
              break;
            case 'category':
              updateTags = update.tags_category || [];
              break;
            case 'product':
              updateTags = update.tags_product || [];
              break;
            default:
              updateTags = [];
          }

          // Check if any of the selected values match the update tags
          return selectedValues.some((value) => updateTags.some((tag) => tag.toLowerCase() === value.toLowerCase()));
        });
      }

      return true;
    });

    const pagination = getPagination(filteredResults, itemsPerPage);

    getFilteredUpdates(pagination);
  }, [searchTerm, selectedFilters, updates]);

  // Toggle filter selection
  const toggleFilter = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[category];
      const isSelected = currentFilters.includes(value);

      if (isSelected) {
        return {
          ...prev,
          [category]: currentFilters.filter((filter) => filter !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value],
        };
      }
    });
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (category: FilterCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Check if category should show toggle
  const shouldShowToggle = (filters: readonly string[]) => {
    // Only show toggle on desktop, mobile, and tablet, not on large desktop
    return isDesktop && filters.length > 10;
  };

  // Get limited filters based on screen size and expansion state
  const getLimitedFilters = (filters: readonly string[], category: FilterCategory) => {
    const isExpanded = expandedCategories[category];
    if (isExpanded) return filters;

    // On mobile/tablet, return limited filters for toggle functionality
    if (isTablet) {
      return filters.slice(0, 5);
    }

    // Desktop return limited filters for toggle functionality
    if (isDesktop) {
      return filters.slice(0, 10);
    }

    // On large desktops, always return all filters
    return filters;
  };

  const filteredUpdatesIndex = currentPage - 1;
  const totalFilteredItems = filteredUpdates.flat().length;

  const hasFilteredResultsOnCurrentPage = !!filteredUpdates[filteredUpdatesIndex];
  // checks if there are results if so, use those results, if not default to the first index
  // if all else fails just assign an empty array.
  const currentPageFilteredUpdates = filteredUpdates[filteredUpdatesIndex] ?? filteredUpdates[0] ?? []; // at the end just default to an empty array

  // Used to calculate the start number per page for the pagination
  // if there is no results after filtering or searching while on the current page
  // we result to the first index which represents the first page
  const startOfResultRange = hasFilteredResultsOnCurrentPage
    ? (currentPage - 1) * itemsPerPage + 1
    : 0 * itemsPerPage + 1;
  const validPageToCalculate = hasFilteredResultsOnCurrentPage ? currentPage : 1;
  const endOfResultRange = Math.min(validPageToCalculate * itemsPerPage, totalFilteredItems);

  return (
    <div className={cx(updatesContainerStyle)}>
      <div className={cx(filtersContainerStyle)}>
        {Object.entries(PRODUCT_UPDATE_FILTERS).map(([category]) => {
          const categoryKey = category as FilterCategory;
          const availableFilters = getAvailableFiltersForCategory(categoryKey);
          const limitedFilters = getLimitedFilters(availableFilters, categoryKey);
          const showToggle = shouldShowToggle(availableFilters);
          const isExpanded = expandedCategories[categoryKey];

          return (
            <div key={category} className={cx(filterCategoryStyle)}>
              <Body className={cx(filterCategoryTitleStyle)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Body>
              <div className={cx(filterCheckboxesStyle, isExpanded && filterCheckboxesExpandedStyle)}>
                {limitedFilters.map((filter) => {
                  const isSelected = selectedFilters[categoryKey].includes(filter);
                  return (
                    <Checkbox
                      key={filter}
                      label={filter}
                      checked={isSelected}
                      onChange={() => toggleFilter(categoryKey, filter)}
                    />
                  );
                })}
              </div>
              {showToggle && (
                <div className={cx(filterToggleContainerStyle)} onClick={() => toggleCategoryExpansion(categoryKey)}>
                  <Body className={cx(filterToggleTextStyle)}>
                    {isExpanded
                      ? `Collapse ${
                          category === 'category' ? 'categories' : category === 'product' ? 'products' : 'offerings'
                        }`
                      : `See all ${
                          category === 'category' ? 'categories' : category === 'product' ? 'products' : 'offerings'
                        }`}
                  </Body>
                  <Icon glyph={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={cx(newsSectionStyle)}>
        <div className={cx(newsContainerStyle)}>
          <div className={cx(searchContainerStyle)}>
            <SearchInput
              aria-label="Search updates by title or description..."
              placeholder="Search updates by title or description..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          {currentPageFilteredUpdates.map((update: ProductUpdateEntry) => {
            const created_at = update.beamer_created_at || update.created_at;
            const date = new Date(created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const description = update.multi_line || 'No description available';
            const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

            const slug = update.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');

            return (
              <div
                key={update.uid}
                onClick={() => router.push(`/products/updates/${slug}`)}
                className={cx(newsItemStyle)}
              >
                <Body className={cx(newsItemDateStyle)}>{date}</Body>
                <div className={cx(newsItemTitleStyle)}>{update.title}</div>
                <div className={cx(newsItemDescriptionStyle)}>{truncatedDescription}</div>
              </div>
            );
          })}
        </div>
        <div className={cx(newsItemsCountStyle)}>
          <Body className={cx(newsItemsCountTextStyle)}>
            {totalFilteredItems > 0 ? `${startOfResultRange}-${endOfResultRange}` : '0'} of {totalFilteredItems} items
          </Body>
          <Pagination
            totalFilteredUpdates={filteredUpdates.length}
            setCurrentPage={setCurrentPage}
            currentPage={hasFilteredResultsOnCurrentPage ? currentPage : 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Updates;
