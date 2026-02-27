import { log } from '@/utils/logger';
import { notFound } from 'next/navigation';
import { getSnootyMetadata } from '@/services/db/snooty-metadata';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import { getPageDocFromParams } from '@/services/db/pages';
import { getPageMetadata, getLocaleLinks } from '@/utils/seo';
import type { DBMetadataDocument } from '@/services/db/snooty-metadata';
import { fetchAllAssets } from '@/services/db/assets';
import { CustomTemplate } from './custom-template';
import { cookies } from 'next/headers';
import envConfig from '@/utils/env-config';
import type { ServerSideChangelogData } from '@/types/openapi';
import { getChangelogData } from '@/services/db/openapi';
import DocsLandingSD from '@/components/structured-data/docs-landing-sd';
import TechArticleSd from '@/components/structured-data/tech-article-sd';
import type { Docset } from '@/types/data';

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function Page({ params: { path } }: PageProps) {
  const cookieStore = cookies();
  const cookieArray = cookieStore.getAll();

  // Convert array of cookie objects to key-value pairs object
  const cookieValues = cookieArray.reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);

  const [pageDoc, docsets] = await Promise.all([getPageDocFromParams({ path }), getAllDocsetsWithVersionsCached()]);
  const [metadata, assetMap] = await Promise.all([
    getSnootyMetadata(pageDoc?.buildId ?? ''),
    fetchAllAssets(pageDoc?.static_assets),
  ]);
  const env = envConfig.DB_ENV;

  const template = pageDoc?.ast?.options?.template;
  let changelogData: ServerSideChangelogData | undefined;
  if (template === 'changelog') {
    changelogData = await getChangelogData();
  }

  if (!pageDoc) {
    notFound();
  }

  if (pageDoc && metadata) {
    // Get locale links with custom className for Smartling
    // NOTE: this is done manual vs within generateMetadata for Smartling no-translate classes
    const localeLinks = getLocaleLinks(pageDoc);
    const slug = pageDoc.filename.split('.')[0];
    const isDocsLandingHomepage = metadata.project === 'landing' && template === 'landing' && slug === '/';

    return (
      <>
        {localeLinks}
        <TechArticleSd pageDoc={pageDoc} metadata={metadata} />
        {isDocsLandingHomepage && <DocsLandingSD />}

        <CustomTemplate
          cookies={cookieValues}
          pageDoc={pageDoc}
          metadata={metadata}
          assets={assetMap}
          docsets={docsets}
          changelogData={changelogData}
          env={env}
        />
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
  const [pageDoc, docsets] = await Promise.all([getPageDocFromParams({ path }), getAllDocsetsWithVersionsCached()]);
  const snootyMetadata = (await getSnootyMetadata(pageDoc?.buildId ?? '')) as DBMetadataDocument;
  const docset = docsets.find((docset: Docset) => docset.project === snootyMetadata.project);

  let metadata = null;
  if (pageDoc && docset) {
    metadata = getPageMetadata({ pageDoc, snootyMetadata, docset });
  }
  return metadata;
}
