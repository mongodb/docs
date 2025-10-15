import CustomTemplate from './custom-template';
import { getSnootyMetadata } from '@/services/db/snooty-metadata';
import { getPageDocFromParams } from '@/services/db/pages';
import { fetchAllAssets } from '@/services/db/assets';

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function Page({ params: { path } }: PageProps) {
  const pageDoc = await getPageDocFromParams({ path });
  const [metadata, assetMap] = await Promise.all([
    getSnootyMetadata(pageDoc?.build_id),
    fetchAllAssets(pageDoc?.static_assets),
  ]);

  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }

  return <CustomTemplate pageDoc={pageDoc} metadata={metadata} assets={assetMap} />;
}
