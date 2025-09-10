import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db';

interface NavigationData {
  projectName: string;
  breadcrumbs?: {
    title: string;
    path: string;
  }[];
  baseUrl: string;
  slug: string;
}

type NavigationProjection = Pick<
  NavigationData,
  'breadcrumbs' | 'baseUrl' | 'slug'
>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? 'snooty_dotcomprd';
  const projectName = searchParams.get('project');

  if (!projectName) {
    const errorMsg =
      'Failed to retrieve breadcrumbs: project must be specified';
    console.error(errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<NavigationData>('navigation');

    const query = { projectName };
    const projection = { _id: 0, breadcrumbs: 1, baseUrl: 1, slug: 1 };

    const result: NavigationProjection | null = await collection.findOne(
      query,
      { projection: projection }
    );

    if (!result) {
      const res = NextResponse.json(
        {
          error: `Failed to retrieve navigation data for project ${projectName}`,
        },
        { status: 500 }
      );
      res.headers.set('Access-Control-Allow-Origin', '*');
      return res;
    }

    const propertyUrl = result.slug
      ? result.baseUrl + result.slug
      : result.baseUrl;

    const res = NextResponse.json({
      breadcrumbs: result.breadcrumbs ?? [],
      propertyUrl,
    });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (err) {
    console.error(err);
    const res = NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }
}