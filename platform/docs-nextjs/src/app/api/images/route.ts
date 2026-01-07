import path from 'path';
import { type NextRequest, NextResponse } from 'next/server';
import { getBlob } from '@/mdx-utils/blob-read';
import { IMAGE_PREFIX } from '@/mdx-utils/get-blob-key';

const mimeTypes: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

/**
 * Handles GET requests via path parameters
 * example: /api/images?path=path/to/image.png
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const imagePath = url.searchParams.get('path');
    if (!imagePath) {
      return new NextResponse('Bad Request - path is required', { status: 400 });
    }

    const imageKey = `${IMAGE_PREFIX}/${imagePath}`;
    const blob = await getBlob(imageKey);

    if (!blob) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Get the proper mime type based on the extension
    const extension = path.extname(imagePath).toLowerCase();
    const contentType = mimeTypes[extension] || 'application/octet-stream';

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Set cache to 1 year for images
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error loading image from blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
