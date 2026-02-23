import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import { runBlobSeed } from '@/mdx-utils/run-blob-seed';
import { CONTENT_MDX_DIR } from '@/mdx-utils/blob-upload';

export const dynamic = 'force-dynamic';

export async function GET() {
  // We do not want to publicly expose the ability to seed blobs in production.
  // This is meant for use in local development only.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  try {
    await fs.access(CONTENT_MDX_DIR);
  } catch {
    return NextResponse.json({ error: 'Content directory not found', path: CONTENT_MDX_DIR }, { status: 404 });
  }

  try {
    const result = await runBlobSeed(CONTENT_MDX_DIR);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
