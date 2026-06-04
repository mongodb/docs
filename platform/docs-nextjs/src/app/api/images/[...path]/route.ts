import path from 'path';
import { NextResponse, type NextRequest } from 'next/server';
import { getBlobWithFallback } from '@/mdx-utils/blob-read';

const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

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

    const extension = path.extname(imagePath).toLowerCase();
    const contentType = mimeTypes[extension] || 'application/octet-stream';

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error loading image from blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
