import { withCORS } from '@/app/lib/with-cors';
import type { Sort } from 'mongodb';
import { NextResponse, type NextRequest } from 'next/server';
import { getClient } from '@/services/db/client';

interface ProductNavigationData {
  title: string;
  baseUrl: string;
  slug: string;
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? process.env.SNOOTY_DB_NAME;

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<ProductNavigationData>('navigation');

    const query = { showInProductsList: true };
    const projection = { _id: 0, title: 1, baseUrl: 1, slug: 1 };
    const sortParam: Sort = { title: 1 };

    // eslint-disable-next-line prefer-const
    let result = await collection.find(query, { projection }).sort(sortParam).toArray();

    // Custom ordering: "Atlas for Government" before "Atlas Kubernetes Operator"
    const atlasForGovtIdx = result.findIndex((el) => el.title === 'Atlas for Government');
    const atlasForGovtObj = result[atlasForGovtIdx];
    const atlasK8sIdx = result.findIndex((el) => el.title === 'Atlas Kubernetes Operator');

    if (atlasForGovtIdx !== -1 && atlasK8sIdx !== -1) {
      result.splice(atlasForGovtIdx, 1);
      result.splice(atlasK8sIdx, 0, atlasForGovtObj);
    }

    return withCORS(NextResponse.json(result.filter(Boolean)));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
