// util function to mock window properties for testing
// extend to add additional properties as needed

export const mockLocation = ({ hash, search, pathname }: { hash?: string; search?: string; pathname?: string }) => {
  const normalizedPathname = pathname ?? '/';
  const normalizedSearch = search ? (search.startsWith('?') ? search : `?${search}`) : '';
  const normalizedHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  const url = `${normalizedPathname}${normalizedSearch}${normalizedHash}`;

  // Use History API so jsdom updates window.location properly
  window.history.pushState({}, '', url);
};
