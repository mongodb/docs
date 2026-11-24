import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const diffString = searchParams.get('diff');
  const isStaging = searchParams.get('staging') === 'true';

  const url = `https://raw.githubusercontent.com/mongodb/openapi/${
    isStaging ? 'qa' : 'main'
  }/changelog/version-diff/${diffString}.json`;
  try {
    const resp = await fetch(url);
    const diff = await resp.json();

    return withCORS(NextResponse.json(diff));
  } catch (err) {
    console.error(err);
    return withCORS(
      NextResponse.json({ error: `Failed to fetch OpenAPI Changelog diff from "${url}"` }, { status: 500 }),
    );
  }
}
