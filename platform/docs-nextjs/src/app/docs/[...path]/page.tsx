import { log } from '@/utils/logger';
import { notFound } from 'next/navigation';
import { getSnootyMetadata } from '@/services/db/snooty-metadata';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import { type ASTDocument, getPageDocFromParams } from '@/services/db/pages';
import { getPageMetadata, getLocaleLinks } from '@/utils/seo';
import { type DBMetadataDocument } from '@/services/db/snooty-metadata';
import { fetchAllAssets } from '@/services/db/assets';
import { CustomTemplate } from './custom-template';
import envConfig from '@/utils/env-config';

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function Page({ params: { path } }: PageProps) {
  const [pageDoc, docsets] = await Promise.all([getPageDocFromParams({ path }), getAllDocsetsWithVersionsCached()]);
  const [metadata, assetMap] = await Promise.all([
    getSnootyMetadata(pageDoc?.buildId ?? ''),
    fetchAllAssets(pageDoc?.static_assets),
  ]);
  const env = envConfig.DB_ENV;

  if (pageDoc && metadata) {
    // Get locale links with custom className for Smartling
    // NOTE: this is done manual vs within generateMetadata for Smartling no-translate classes
    const localeLinks = getLocaleLinks(pageDoc);

    return (
      <>
        {localeLinks}
        <CustomTemplate pageDoc={pageDoc} metadata={metadata} assets={assetMap} docsets={docsets} env={env} />;
      </>
    );
  }

  // If pageDoc and metadata are falsy
  // trigger the not-found via the notFound method
  // which throws a NEXT_HTTP_ERROR_FALLBACK;404
  const error = new Error(
    `pageDoc and metadata returned with the following values, pageDoc: ${JSON.stringify(
      pageDoc,
    )}, metadata: ${JSON.stringify(metadata)}`,
  );
  log({ message: String(error), level: 'error' });
  notFound();
}

export async function generateMetadata({ params: { path } }: PageProps) {
  const pageDoc = (await getPageDocFromParams({ path })) as ASTDocument;
  const snootyMetadata = (await getSnootyMetadata(pageDoc?.buildId ?? '')) as DBMetadataDocument;

  let metadata = null;
  if (pageDoc) {
    metadata = getPageMetadata({ pageDoc, snootyMetadata });
  }
  return metadata;
}
