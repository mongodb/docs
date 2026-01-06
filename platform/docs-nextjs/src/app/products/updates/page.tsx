import {
  type ProductUpdateEntry,
  getProductUpdates,
  getFilterOptions,
} from '@/app/products/updates/services/contentstack';
import Header from './components/Header';
import Featured from './components/Featured';
import Updates from './components/Updates';

export const dynamic = 'force-dynamic';

export default async function ProductsUpdatesPage() {
  try {
    // Initialize the Contentstack stack and fetch data
    const [contentStackEntries, filterOptions] = await Promise.all([getProductUpdates(), getFilterOptions()]);

    const featuredEntries: ProductUpdateEntry[] = [];
    // We grab the first 3 is_featured entries as we only want to feature the 3 most recent entries
    const nonFeaturedEntries = contentStackEntries.reduce((entries: ProductUpdateEntry[], entry) => {
      if (featuredEntries.length < 3 && entry.is_featured) {
        featuredEntries.push(entry);
      } else {
        entries.push(entry);
      }
      return entries;
    }, []);

    return (
      <div style={{ width: '100vw' }}>
        <Header />
        <Featured updates={featuredEntries} />
        <Updates updates={nonFeaturedEntries} filterOptions={filterOptions} />
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
