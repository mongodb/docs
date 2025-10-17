import CustomTemplate from './custom-template';
import { getSnootyMetadata } from '@/services/db/snooty-metadata';
import { type ASTDocument, getPageDocFromParams } from '@/services/db/pages';
import { getPageMetadata, getLocaleLinks } from '@/utils/seo';
import { type DBMetadataDocument } from '@/services/db/snooty-metadata';
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

  if (!pageDoc || !metadata) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }

  // Get locale links with custom className for Smartling
  // NOTE: this is done manual vs within generateMetadata for Smartling no-translate classes
  const localeLinks = getLocaleLinks(pageDoc);

  return (
    <>
      {localeLinks}
      <CustomTemplate pageDoc={pageDoc} metadata={metadata} assets={assetMap} />;
    </>
  );
}

export async function generateMetadata({ params: { path } }: PageProps) {
  const pageDoc = (await getPageDocFromParams({ path })) as ASTDocument;
  const snootyMetadata = (await getSnootyMetadata(pageDoc?.build_id)) as DBMetadataDocument;

  const metadata = getPageMetadata({ pageDoc, snootyMetadata });
  return metadata;
}
