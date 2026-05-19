'use client';

import { Suspense } from 'react';
import { SearchContextProvider } from './search-context';
import SearchResultsInner from './search-results/search-results';

export const SearchResults = () => {
  return (
    <Suspense>
      <SearchContextProvider>
        <SearchResultsInner />
      </SearchContextProvider>
    </Suspense>
  );
};
