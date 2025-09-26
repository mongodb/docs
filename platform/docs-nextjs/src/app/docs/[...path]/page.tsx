import { getPageDocFromParams, getSnootyMetadata } from '@/services/db';
import { CustomTemplate } from './custom-template';

interface PageProps {
  params: {
    path?: string[];
  };
}

export default async function Page({ params: { path } }: PageProps) {
  const pageDoc = await getPageDocFromParams({ path });
  const metadata = await getSnootyMetadata(pageDoc?.build_id);

  // const Component = getComponent(pageDoc.ast);
  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }

  return <CustomTemplate pageDoc={pageDoc} metadata={metadata} />;
}
