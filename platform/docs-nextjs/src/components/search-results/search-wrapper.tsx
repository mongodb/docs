import { SearchContextProvider } from './search-context';
import SearchResults from './search-results';

// Wraps the main SearchResults component with a context provider to limit scope of data
const SearchWrapper = () => {
  return (
    <SearchContextProvider>
      <SearchResults />
    </SearchContextProvider>
  );
};

export default SearchWrapper;
