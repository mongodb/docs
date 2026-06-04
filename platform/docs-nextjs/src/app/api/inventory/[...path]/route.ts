import { NextResponse, type NextRequest } from 'next/server';
import { getBlobWithFallback } from '@/mdx-utils/blob-read';

// Serves intersphinx inventory files from the blob store.
// Rewrites map /docs/:path*/objects.inv to this handler.
// example: /api/inventory/atlas/objects.inv
export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const invPath = params.path.join('/');
    const blob = await getBlobWithFallback(invPath);

    if (!blob) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error loading inventory from blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
