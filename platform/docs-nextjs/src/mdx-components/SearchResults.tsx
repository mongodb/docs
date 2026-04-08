'use client';

import { SearchContextProvider } from './search-context';
import SearchResultsInner from '@/components/search-results/search-results';

export const SearchResults = () => {
  return (
    <SearchContextProvider>
      <SearchResultsInner />
    </SearchContextProvider>
  );
};
