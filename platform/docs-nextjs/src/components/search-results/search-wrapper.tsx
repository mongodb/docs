import { SearchContextProvider } from './search-context';
import SearchResultsInner from './search-results';

// Wraps the main SearchResults component with a context provider to limit scope of data
const SearchResults = () => {
  return (
    <SearchContextProvider>
      <SearchResultsInner />
    </SearchContextProvider>
  );
};

export default SearchResults;
