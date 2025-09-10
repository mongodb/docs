import ComponentFactory from '@/components/component-factory';
import { getPageDocFromParams } from '@/services/db';

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const pageDoc = await getPageDocFromParams(params);
  // const Component = getComponent(pageDoc.ast);
  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }
  return <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />;
}
