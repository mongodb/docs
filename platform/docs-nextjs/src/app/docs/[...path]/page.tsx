import { getPageDocFromParams } from "@/services/db";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const pageDoc = await getPageDocFromParams(params);
  // const Component = getComponent(pageDoc.ast);
  if (!pageDoc) {
    // TODO: create a default 404 page
    return <div>404</div>;
  }
  return <div>Page here
    <Link href={`/docs/drivers/csharp/current/compatibility/`}>
      Go to /docs/drivers/csharp/current/compatibility
    </Link>
  </div>;
}
