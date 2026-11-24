import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';

interface NavigationData {
  projectName: string;
  breadcrumbs?: {
    title: string;
    path: string;
  }[];
  baseUrl: string;
  slug: string;
}

type NavigationProjection = Pick<NavigationData, 'breadcrumbs' | 'baseUrl' | 'slug'>;

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? 'snooty_dotcomprd';
  const projectName = searchParams.get('project');

  if (!projectName) {
    const errorMsg = 'Failed to retrieve breadcrumbs: project must be specified';
    console.error(errorMsg);
    return withCORS(NextResponse.json({ error: errorMsg }, { status: 400 }));
  }

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<NavigationData>('navigation');

    const query = { projectName };
    const projection = { _id: 0, breadcrumbs: 1, baseUrl: 1, slug: 1 };

    const result: NavigationProjection | null = await collection.findOne(query, { projection: projection });

    if (!result) {
      return withCORS(NextResponse.json(null));
    }

    const propertyUrl = result.slug ? result.baseUrl + result.slug : result.baseUrl;

    return withCORS(
      NextResponse.json({
        breadcrumbs: result.breadcrumbs ?? [],
        propertyUrl,
      }),
    );
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
