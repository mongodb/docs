import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ALLOWED_CDN_HOSTNAMES = ['mongodbcom-cdn.staging.corp.mongodb.com', 'www.mongodb.com'];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse('Invalid url parameter', { status: 400 });
  }

  if (!ALLOWED_CDN_HOSTNAMES.includes(parsed.hostname)) {
    return new NextResponse('URL not allowed', { status: 403 });
  }

  const upstream = await fetch(url);

  if (!upstream.ok) {
    return new NextResponse(`Upstream error: ${upstream.status}`, {
      status: upstream.status,
    });
  }

  const filename = parsed.pathname.split('/').pop() ?? 'download';

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Access-Control-Allow-Origin': '*',
    },
  });
}
