import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { runBlobSeed } from '@/mdx-utils/run-blob-seed';
import { CONTENT_MDX_DIR } from '@/mdx-utils/blob-constants';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // We do not want to publicly expose the ability to seed blobs in production.
  // This is meant for use in local development only.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    return NextResponse.json({ error: 'Content directory not found', path: CONTENT_MDX_DIR }, { status: 404 });
  }

  try {
    const seedPath = filePath ? path.join(CONTENT_MDX_DIR, filePath) : CONTENT_MDX_DIR;
    const result = await runBlobSeed(seedPath);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
