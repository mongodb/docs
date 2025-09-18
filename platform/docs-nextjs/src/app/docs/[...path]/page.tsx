import { getPageDocFromParams } from '@/services/db';
import { Document } from './document';

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const pageDoc = await getPageDocFromParams(params);
  // const Component = getComponent(pageDoc.ast);
  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }

  return <Document pageDoc={pageDoc} />;
}
