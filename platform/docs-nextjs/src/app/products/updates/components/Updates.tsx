'use client';
import { Body, Link } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import type { ProductUpdateEntry } from '../services/contentstack';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import { SearchInput } from '@leafygreen-ui/search-input';
import { theme } from '@/styles/theme';
import type { FilterCategory, FilterOptions } from '../consts/filters';
import { Checkbox } from '@leafygreen-ui/checkbox';
import { Icon } from '@leafygreen-ui/icon';
import { Pagination } from './Pagination';
import Button from '@leafygreen-ui/button';
import { generateProductUpdatesSlug } from '@/app/products/updates/utils/generate-product-updates-slug';
import type { RichLinkVariantName } from '@lg-chat/rich-links';
import { RichLink } from '@lg-chat/rich-links';
import LeafyGreenProvider, { useDarkModeContext } from '@leafygreen-ui/leafygreen-provider';
import { stripHtml } from '../utils/strip-html';
import { debounce } from 'lodash';

const containerStyle = css`
  max-width: 1550px;
  margin: 48px auto 0;
  padding: 0 24px;
  @media ${theme.screenSize.xLargeAndUp} {
    padding: 0 32px;
  }
`;

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
  margin-bottom: 16px;
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
  color: ${palette.black};
`;

const filterToggleTextStyle = css`
  color: ${palette.black};
  font-size: 16px;
  line-height: 28px;
`;

const desktopButtonStyle = css`
  display: none;

  @media ${theme.screenSize.xLargeAndUp} {
    display: block;
  }
`;

const tabletButtonStyle = css`
  display: block;
  margin-bottom: 32px;

  @media ${theme.screenSize.xLargeAndUp} {
    display: none;
  }
`;

const linksStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-width: 0;
  max-width: 100%;
`;

export enum LinkTag {
  Docs = 'Docs',
  Blog = 'Blog',
  Tutorial = 'Tutorial',
  Press = 'Press',
  Web = 'Web',
  GitHub = 'GitHub',
}

const mapLinkTagToRichLinkVariant = (label: LinkTag): RichLinkVariantName => {
  if (label === LinkTag.Blog || label == LinkTag.Docs) return label;

  if (label === LinkTag.GitHub) return 'Code';

  return 'Website';
};

interface SubscribeButtonProps {
  className: string;
  selectedFilters: Record<FilterCategory, string[]>;
}

const SubscribeButton = ({ className, selectedFilters }: SubscribeButtonProps) => {
  const handleOpenRSSFeed = () => {
    const params = new URLSearchParams();

    // Add category filters
    if (selectedFilters.category.length > 0) {
      params.append('category', selectedFilters.category.join(','));
    }

    // Add offering filters (RSS route accepts both 'offering' and 'offerings')
    if (selectedFilters.offering.length > 0) {
      params.append('offering', selectedFilters.offering.join(','));
    }

    // Add product filters
    if (selectedFilters.product.length > 0) {
      params.append('product', selectedFilters.product.join(','));
    }

    const queryString = params.toString();
    const url = queryString ? `/products/updates/rss?${queryString}` : '/products/updates/rss';

    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className={cx(className)}>
      <Button onClick={handleOpenRSSFeed}>Subscribe to selected filters</Button>
    </div>
  );
};

interface UpdatesProps {
  updates: ProductUpdateEntry[];
  filterOptions: FilterOptions;
  totalCount: number;
  query: string;
  currentPage: number;
}

const Updates = ({ updates, filterOptions, totalCount, query, currentPage: initialCurrentPage }: UpdatesProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { contextDarkMode: darkMode = false } = useDarkModeContext();

  const searchQuery = searchParams?.get('query') || query || '';
  const currentPage = Number(searchParams?.get('page')) || initialCurrentPage || 1;

  const [searchInputValue, setSearchInputValue] = useState(searchQuery);

  // Initialize filters from URL params
  const getInitialFilters = (): Record<FilterCategory, string[]> => {
    if (!searchParams) {
      return {
        category: [],
        offering: [],
        product: [],
      };
    }

    const categoryParam = searchParams.get('category');
    const offeringsParam = searchParams.get('offerings') || searchParams.get('offering');
    const productParam = searchParams.get('product');

    return {
      category: categoryParam ? categoryParam.split(',').filter(Boolean) : [],
      offering: offeringsParam ? offeringsParam.split(',').filter(Boolean) : [],
      product: productParam ? productParam.split(',').filter(Boolean) : [],
    };
  };

  const [selectedFilters, setSelectedFilters] = useState<Record<FilterCategory, string[]>>(getInitialFilters());
  const [expandedCategories, setExpandedCategories] = useState<Record<FilterCategory, boolean>>({
    offering: false,
    category: false,
    product: false,
  });

  // Track previous filter state to detect actual changes
  const prevFiltersRef = useRef<Record<FilterCategory, string[]>>(selectedFilters);
  const isInitialMountRef = useRef(true);

  // Get the first 12 initially
  const itemsPerPage = 12;

  // Helper function to get available filters for a specific category
  const getAvailableFiltersForCategory = (category: FilterCategory): string[] => {
    return filterOptions[category];
  };

  const debouncedSearchRef = useRef(
    debounce(
      (
        term: string,
        currentPathname: string,
        currentSearchParams: URLSearchParams | null,
        currentRouter: typeof router,
      ) => {
        if (!currentPathname) return;

        const params = new URLSearchParams(currentSearchParams || undefined);
        params.set('page', '1'); // Reset to first page on new search
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        currentRouter.replace(`${currentPathname}?${params.toString()}`, { scroll: false });
      },
      500,
    ),
  );

  const handleSearch = (term: string) => {
    debouncedSearchRef.current(term, pathname, searchParams, router);
  };

  useEffect(() => {
    setSearchInputValue(searchQuery);
  }, [searchQuery]);

  // Filter updates based on search query and selected filters
  const filteredResults = useMemo(() => {
    return updates.filter((update: ProductUpdateEntry) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = update.title.toLowerCase().includes(searchLower);
        const descriptionText = update.description ? stripHtml(update.description) : '';
        const descriptionMatch = descriptionText.toLowerCase().includes(searchLower);

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // Filter by selected filters (if any are selected)
      const hasActiveFilters = Object.values(selectedFilters).some((filters) => filters.length > 0);

      if (hasActiveFilters) {
        // Check if update matches selected filters
        // Within each category: OR logic (match ANY selected filter)
        // Across categories: AND logic (must satisfy ALL categories with selections)
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

          // Check that ANY selected value matches at least one tag (OR logic within category)
          return selectedValues.some((value) => updateTags.some((tag) => tag.toLowerCase() === value.toLowerCase()));
        });
      }

      return true;
    });
  }, [updates, searchQuery, selectedFilters]);

  // Calculate total pages based on total count (server-side pagination)
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Update URL params when filters change
  useEffect(() => {
    if (!pathname) return;

    // Skip on initial mount - filters are already initialized from URL
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      prevFiltersRef.current = selectedFilters;
      return;
    }

    const filtersChanged =
      JSON.stringify(prevFiltersRef.current.category) !== JSON.stringify(selectedFilters.category) ||
      JSON.stringify(prevFiltersRef.current.offering) !== JSON.stringify(selectedFilters.offering) ||
      JSON.stringify(prevFiltersRef.current.product) !== JSON.stringify(selectedFilters.product);

    if (!filtersChanged) {
      return;
    }

    // Update previous filters reference
    prevFiltersRef.current = selectedFilters;

    const params = new URLSearchParams(searchParams || undefined);

    // Reset page to 1 when filters change
    params.set('page', '1');

    if (selectedFilters.category.length > 0) {
      params.set('category', selectedFilters.category.join(','));
    } else {
      params.delete('category');
    }

    if (selectedFilters.offering.length > 0) {
      params.set('offering', selectedFilters.offering.join(','));
    } else {
      params.delete('offering');
    }

    if (selectedFilters.product.length > 0) {
      params.set('product', selectedFilters.product.join(','));
    } else {
      params.delete('product');
    }

    // Preserve query if it exists
    if (searchQuery) {
      params.set('query', searchQuery);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Only update if the URL has changed
    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  }, [selectedFilters, pathname, router, searchParams, searchQuery]);

  const isFilterClearBtnDisabled = Object.keys(selectedFilters).every((category) => {
    return selectedFilters[category as keyof typeof selectedFilters].length === 0;
  });

  // Clear selected filters
  const onHandleClearFilters = () => {
    if (isFilterClearBtnDisabled) return;

    setSelectedFilters({
      offering: [],
      category: [],
      product: [],
    });

    // Clear URL params as well
    if (pathname) {
      const params = new URLSearchParams();
      params.set('page', '1');
      if (searchQuery) {
        params.set('query', searchQuery);
      }
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  };

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
    return filters.length > 5;
  };

  // Get limited filters based on screen size and expansion state
  const getLimitedFilters = (filters: readonly string[], category: FilterCategory) => {
    const isExpanded = expandedCategories[category];
    if (isExpanded) return filters;

    return filters.slice(0, 5);
  };

  const startOfResultRange = totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endOfResultRange = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className={cx(containerStyle)}>
      <Link
        data-testid="clear_filter_btn"
        as="button"
        disabled={isFilterClearBtnDisabled}
        aria-disabled={isFilterClearBtnDisabled}
        onClick={onHandleClearFilters}
        className={css`
          font-size: 18px;
          font-weight: 600;
          line-height: 24px;
          margin-bottom: ${theme.size.default};
          margin-left: ${theme.size.medium};
          opacity: ${isFilterClearBtnDisabled ? '0.5' : '1'};
          @media ${theme.screenSize.xLargeAndUp} {
            margin-left: ${theme.size.large};
          }
        `}
      >
        Clear Filters
      </Link>
      <div className={cx(updatesContainerStyle)}>
        <div className={cx(filtersContainerStyle)}>
          {Object.entries(filterOptions).map(([category]) => {
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
                    <Icon color={palette.gray.dark1} glyph={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </div>
                )}
              </div>
            );
          })}
          <SubscribeButton className={cx(desktopButtonStyle)} selectedFilters={selectedFilters} />
        </div>
        <SubscribeButton className={cx(tabletButtonStyle)} selectedFilters={selectedFilters} />
        <div className={cx(newsSectionStyle)}>
          <div className={cx(newsContainerStyle)}>
            <div className={cx(searchContainerStyle)}>
              <SearchInput
                aria-label="Search updates by title or description..."
                placeholder="Search updates by title or description..."
                value={searchInputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const term = e.target.value;
                  setSearchInputValue(term);
                  handleSearch(term);
                }}
              />
            </div>
            {filteredResults.map((update: ProductUpdateEntry) => {
              const publishedAt = update.published_date;

              const date = new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              const slug = generateProductUpdatesSlug(update.title);
              const descriptionText = update.description ? stripHtml(update.description) : '';
              const truncatedDescription =
                descriptionText.length > 100 ? descriptionText.substring(0, 100) + '...' : descriptionText;

              return (
                <div
                  key={update.uid}
                  onClick={() => router.push(`/products/updates/${slug}`)}
                  className={cx(newsItemStyle)}
                >
                  <Body className={cx(newsItemDateStyle)}>{date}</Body>
                  <div className={cx(newsItemTitleStyle)}>{update.title}</div>
                  {descriptionText && <div className={cx(newsItemDescriptionStyle)}>{truncatedDescription}</div>}
                  <div className={cx(linksStyle)}>
                    <LeafyGreenProvider darkMode={darkMode} baseFontSize={14}>
                      {update.link_with_label &&
                        update.link_with_label.length > 0 &&
                        [...update.link_with_label]
                          .sort((a, b) => {
                            // Prioritize blogs - if one is Blog and the other isn't, Blog comes first
                            if (a.label === LinkTag.Blog && b.label !== LinkTag.Blog) return -1;
                            if (b.label === LinkTag.Blog && a.label !== LinkTag.Blog) return 1;
                            // Otherwise maintain original order
                            return 0;
                          })
                          .slice(0, 2)
                          .map((link) => (
                            <RichLink
                              key={link.link.href}
                              href={link.link.href}
                              variant={mapLinkTagToRichLinkVariant(link.label as LinkTag)}
                              badgeLabel={link.label}
                            >
                              {link.link.title}
                            </RichLink>
                          ))}
                    </LeafyGreenProvider>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx(newsItemsCountStyle)}>
            <Body className={cx(newsItemsCountTextStyle)}>
              {filteredResults.length > 0 ? `${startOfResultRange}-${endOfResultRange}` : '0'} of {totalCount} items
            </Body>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
