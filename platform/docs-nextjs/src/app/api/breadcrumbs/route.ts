import { NextResponse } from 'next/server';
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
      return NextResponse.json(
        {
          error: `Failed to retrieve navigation data for project ${projectName}`,
        },
        { status: 500 }
      );
    }

    const propertyUrl = result.slug
      ? result.baseUrl + result.slug
      : result.baseUrl;

    return NextResponse.json({
      breadcrumbs: result.breadcrumbs ?? [],
      propertyUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}