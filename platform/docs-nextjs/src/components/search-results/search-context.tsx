'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { MarianFilters, SearchPropertyMapping } from '@/hooks/use-marian-manifests';
import { useMarianManifests } from '@/hooks/use-marian-manifests';
import { FACETS_LEVEL_KEY, FACETS_KEY_PREFIX } from '@/utils/search-facet-constants';
import type { FacetOption, FacetValue } from '@/types/data';
import useFacets from '@/components/search-results/facets/use-facets';

export type PartialFacet = { key: string; id: string };
type FacetNameByKey = Record<string, string>;

const combineKeyAndId = (facet: FacetOption | FacetValue | { id: string; key: string }) =>
  `${facet.key}${FACETS_LEVEL_KEY}${facet.id}`;

const constructFacetNamesByKey = (facets: Array<FacetOption>): FacetNameByKey => {
  const res: FacetNameByKey = {};

  function extractKeyIdName(facets: FacetValue[]) {
    for (const facet of facets) {
      res[combineKeyAndId(facet)] = facet.name;
      if (facet?.facets?.length) {
        traverseFacetGroup(facet.facets);
      }
    }
  }

  function traverseFacetGroup(facetGroup: Array<FacetOption>) {
    for (const facet of facetGroup) {
      res[combineKeyAndId(facet)] = facet.name;
      extractKeyIdName(facet.options);
    }
  }

  traverseFacetGroup(facets);

  return res;
};

type SearchContextType = {
  filters: MarianFilters;
  page: number;
  searchFilter: string | null;
  searchPropertyMapping: SearchPropertyMapping;
  searchTerm: string | null;
  selectedVersion: string | null;
  selectedCategory: string | null;
  showMobileFilters: boolean;
  setSearchFilter: (searchProperty?: string | null) => void;
  setSelectedVersion: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
  handleFacetChange: (facets: Array<FacetValue | (PartialFacet & { checked: boolean })>) => void;
  clearFacets: () => void;
  showFacets: boolean;
  searchParams: URLSearchParams;
  facets: Array<FacetOption>;
  facetNamesByKeyId: FacetNameByKey;
  getFacetName: (facet: FacetOption | FacetValue | PartialFacet) => string;
  setPage: (p: string) => void;
  setSearchTerm: (q: string | null, p?: string) => void;
};

// Simple context to pass search results, ref, and filters to children
const SearchContext = createContext<SearchContextType>({
  filters: {},
  page: 1,
  searchFilter: null,
  searchPropertyMapping: {},
  searchTerm: '',
  selectedVersion: null,
  selectedCategory: null,
  showMobileFilters: false,
  setSearchFilter: () => {},
  setSelectedVersion: () => {},
  setSelectedCategory: () => {},
  setShowMobileFilters: () => {},
  handleFacetChange: () => {},
  clearFacets: () => {},
  showFacets: false,
  searchParams: new URLSearchParams(),
  facets: [],
  facetNamesByKeyId: {},
  getFacetName: () => '',
  setPage: () => {},
  setSearchTerm: () => {},
});

export const SearchContextProvider = ({
  children,
  showFacets = false,
}: {
  children: ReactNode;
  showFacets?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { filters, searchPropertyMapping } = useMarianManifests();
  const facets = useFacets();
  const facetNamesByKeyId = useMemo(() => constructFacetNamesByKey(facets), [facets]);

  const getFacetName = useCallback(
    (facet: FacetOption | FacetValue | PartialFacet) => {
      return facetNamesByKeyId?.[combineKeyAndId(facet)];
    },
    [facetNamesByKeyId],
  );
  // get vars from URL
  // state management for Search is within URL.
  const page = parseInt(searchParams.get('page') || '1');
  const searchTerm = searchParams.get('q');
  const searchFilter = searchParams.get('searchProperty');

  // state vars to derive selected category and versions in dropdown
  // changes reflected in UI, not necessarily in URL
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // navigate changes and store state in URL
  const onSearchChange = ({
    searchTerm,
    searchFilter,
    page,
  }: {
    searchTerm: string | null;
    searchFilter?: string | null;
    page?: string;
  }) => {
    const newSearch = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      newSearch.set('q', searchTerm);
    }
    if (searchFilter !== undefined) {
      // searchFilter can be null
      if (searchFilter === null) {
        newSearch.delete('searchProperty');
      } else {
        newSearch.set('searchProperty', searchFilter);
      }
      newSearch.set('page', '1');
    }
    if (page) {
      newSearch.set('page', page);
    }
    router.push(`/docs/search/?${newSearch.toString()}`, { scroll: false });
  };

  const handleFacetChange = useCallback(
    (facets: Array<FacetValue | (PartialFacet & { checked: boolean })>) => {
      const newSearch = new URLSearchParams(searchParams.toString());

      facets.forEach(({ key, id, checked }) => {
        const paramKey = FACETS_KEY_PREFIX + key;
        if (checked) {
          // Avoid duplicate param keys with the same values
          if (!newSearch.getAll(paramKey).includes(id)) {
            newSearch.append(paramKey, id);
          }
        } else {
          newSearch.delete(FACETS_KEY_PREFIX + key, id);
        }
      });
      newSearch.set('page', '1');
      // The navigation might cause a small visual delay when facets are being checked
      router.push(`/docs/search/?${newSearch.toString()}`, { scroll: false });
    },
    [searchParams.toString()], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const clearFacets = useCallback(() => {
    const newSearch = new URLSearchParams();
    newSearch.set('q', searchTerm ?? '');
    newSearch.set('page', '1');
    router.push(`/docs/search/?${newSearch.toString()}`, { scroll: false });
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SearchContext.Provider
      value={{
        filters,
        page,
        setPage: (p: string) => {
          onSearchChange({ searchTerm: searchTerm, page: p });
        },
        searchTerm,
        setSearchTerm: (q, p = '1') => {
          onSearchChange({ searchTerm: q, page: p });
        },
        searchFilter,
        setSearchFilter: (searchProperty) => {
          onSearchChange({ searchTerm: searchTerm, searchFilter: searchProperty });
        },
        searchPropertyMapping,
        selectedCategory,
        setSelectedCategory,
        selectedVersion,
        setSelectedVersion,
        handleFacetChange,
        clearFacets,
        showMobileFilters,
        setShowMobileFilters,
        showFacets,
        searchParams,
        facets,
        facetNamesByKeyId,
        getFacetName,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
