import { getProductUpdates } from '@/app/products/updates/services/contentstack';
import Header from './components/Header';
import Featured from './components/Featured';
import Updates from './components/Updates';

export const dynamic = 'force-dynamic';

export default async function ProductsUpdatesPage() {
  try {
    // Initialize the Contentstack stack and fetch data
    const testEntries = await getProductUpdates();

    const featuredEntries = testEntries.filter((entry) => entry.is_featured === true);
    const nonFeaturedEntries = testEntries.filter((entry) => !entry.is_featured);

    return (
      <div style={{ width: '100vw' }}>
        <Header />
        <Featured updates={featuredEntries} />
        <Updates updates={nonFeaturedEntries} />
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
