/**
 * A layout is UI that is shared all pages prepended by /docs/<path>. 
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */

import { getPageDocFromParams } from "@/services/db";
import Template from "./custom-template";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  console.log('docs layout');
  const pageDoc = await getPageDocFromParams(params);

  return (
    <div className="docs-layout" style={{ gridArea: 'contents' }}>
      <Template pageDoc={pageDoc!}>
        {children}
      </Template>
    </div>)
}
