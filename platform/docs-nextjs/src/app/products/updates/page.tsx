import {
  getProductUpdates,
  getFilterOptions,
  getFeaturedProductUpdates,
} from '@/app/products/updates/services/contentstack';
import Header from './components/Header';
import Featured from './components/Featured';
import Updates from './components/Updates';

export const dynamic = 'force-dynamic';

export default async function ProductsUpdatesPage(props: {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  try {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const itemsPerPage = 12;
    const skip = (currentPage - 1) * itemsPerPage;

    // Initialize the Contentstack stack and fetch data for current page
    const [{ entries, totalCount }, filterOptions, featuredEntries] = await Promise.all([
      getProductUpdates({ limit: itemsPerPage, skip: skip, search: query }),
      getFilterOptions(),
      getFeaturedProductUpdates(),
    ]);

    return (
      <div style={{ width: '100vw' }}>
        <Header />
        <Featured updates={featuredEntries} />
        <Updates
          updates={entries}
          filterOptions={filterOptions}
          totalCount={totalCount}
          query={query}
          currentPage={currentPage}
        />
      </div>
    );
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Failed to initialize Contentstack stack';
    console.error('Error initializing Contentstack stack:', err);

    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }
}
