import CustomTemplate from './custom-template';
import { getSnootyMetadata } from '@/services/db/snooty-metadata';
import { getPageDocFromParams } from '@/services/db/pages';

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function Page({ params: { path } }: PageProps) {
  const pageDoc = await getPageDocFromParams({ path });
  const metadata = await getSnootyMetadata(pageDoc?.build_id);

  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }

  return <CustomTemplate pageDoc={pageDoc} metadata={metadata} />;
}
