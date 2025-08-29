import { NextResponse } from 'next/server';
import type { Sort } from 'mongodb';
import { getClient } from '@/services/db';

interface ProductNavigationData {
  title: string;
  baseUrl: string;
  slug: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dbName = searchParams.get('dbName') ?? process.env.SNOOTY_DB_NAME;

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<ProductNavigationData>('navigation');

    const query = { showInProductsList: true };
    const projection = { _id: 0, title: 1, baseUrl: 1, slug: 1 };
    const sortParam: Sort = { title: 1 };

    // eslint-disable-next-line prefer-const
    let result = await collection
      .find(query, { projection })
      .sort(sortParam)
      .toArray();

    // Custom ordering: "Atlas for Government" before "Atlas Kubernetes Operator"
    const atlasForGovtIdx = result.findIndex(
      (el) => el.title === 'Atlas for Government'
    );
    const atlasForGovtObj = result[atlasForGovtIdx];
    const atlasK8sIdx = result.findIndex(
      (el) => el.title === 'Atlas Kubernetes Operator'
    );

    if (atlasForGovtIdx !== -1 && atlasK8sIdx !== -1) {
      result.splice(atlasForGovtIdx, 1);
      result.splice(atlasK8sIdx, 0, atlasForGovtObj);
    }

    return NextResponse.json(result.filter(Boolean));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}