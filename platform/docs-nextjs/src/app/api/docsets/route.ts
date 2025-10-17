import { type NextRequest, NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { getAllDocsetsWithVersions } from '@/services/db/docsets';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? process.env.SNOOTY_DB_NAME;

  try {
    const docsets = await getAllDocsetsWithVersions(dbName);

    if (!docsets || docsets.length === 0) {
      return withCORS(NextResponse.json({ error: 'No docsets found' }, { status: 404 }));
    }

    return withCORS(NextResponse.json(docsets));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
