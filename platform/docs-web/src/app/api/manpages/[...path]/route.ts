import { NextResponse, type NextRequest } from 'next/server';
import { getBlob } from '@/mdx-utils/blob-read';
import { getBlobKey } from '@/mdx-utils/get-blob-key';

// Serves manpages.tar.gz bundles from the blob store.
// Rewrites map /docs/:path*/manpages.tar.gz to this handler.
// example: /api/manpages/v8.0/manpages.tar.gz
export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const manpagesPath = params.path.join('/');
    const blob = await getBlob(getBlobKey(manpagesPath));

    if (!blob) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Buffer into a fixed-length body so browsers get Content-Length instead of
    // chunked encoding (same rationale as the images API route).
    const bytes = Buffer.from(await blob.arrayBuffer());

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/gzip',
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error loading manpages from blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
