import path from 'path';
import { NextResponse, type NextRequest } from 'next/server';
import { getBlobWithFallback } from '@/mdx-utils/blob-read';
import { detectImageContentType } from '@/utils/detect-image-content-type';

/**
 * Handles GET requests via path segments
 * example: /api/images/path/to/image.png
 */
export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const imagePath = params.path.join('/');
    const blob = await getBlobWithFallback(imagePath);

    if (!blob) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Buffer the blob into a fixed-length body. Passing the Blob directly makes
    // NextResponse stream it with `Transfer-Encoding: chunked` and no
    // Content-Length, which browsers truncate for larger images — they arrive as
    // 0-byte bodies and fail to decode (curl tolerates chunked, so it masks the
    // bug). An explicit Content-Length avoids the chunked encoding entirely.
    const bytes = Buffer.from(await blob.arrayBuffer());

    const extension = path.extname(imagePath).toLowerCase();
    const contentType = detectImageContentType(bytes, extension);

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error loading image from blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
