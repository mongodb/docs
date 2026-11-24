import { getProductUpdateBySlug } from '@/app/products/updates/services/contentstack';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductUpdateDetail from '@/app/products/updates/components/ProductUpdateDetail';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ProductUpdatePage({ params }: PageProps) {
  const { slug } = await params;

  try {
    // Fetch all product updates to find the one matching the slug
    const entry = await getProductUpdateBySlug(slug);

    if (!entry) {
      notFound();
    }
    return <ProductUpdateDetail update={entry} />;
  } catch (error) {
    console.error('Error fetching product update:', error);
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>Failed to load the product update. Please try again.</p>
        <Link
          href="/products/updates"
          style={{
            color: '#0066cc',
            textDecoration: 'none',
          }}
        >
          ← Back to Products Updates
        </Link>
      </div>
    );
  }
}
