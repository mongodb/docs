import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { deleteFile } from '@/mdx-utils/blob-upload';
import { CONTENT_MDX_DIR } from '@/mdx-utils/blob-constants';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // We do not want to publicly expose the ability to delete blobs in production.
  // This is meant for use in local development only.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get('path');

  if (!relativePath) {
    return NextResponse.json({ error: 'Missing path query parameter' }, { status: 400 });
  }

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    return NextResponse.json({ error: 'Content directory not found', path: CONTENT_MDX_DIR }, { status: 404 });
  }

  const base = path.resolve(CONTENT_MDX_DIR);
  const absolutePath = path.resolve(base, relativePath);
  if (absolutePath !== base && !absolutePath.startsWith(base + path.sep)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  try {
    const result = await deleteFile(absolutePath);
    if (!result.success && result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
