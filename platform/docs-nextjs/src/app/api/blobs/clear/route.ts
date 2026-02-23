import { NextResponse } from 'next/server';
import { store } from '@/mdx-utils/blob-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  // We do not want to publicly expose the ability to clear all blobs in production.
  // This is meant for use in local development only
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  try {
    let deletedBlobs: number;
    try {
      const result = await store.deleteAll();
      deletedBlobs = result.deletedBlobs;
    } catch {
      const { blobs } = await store.list();
      deletedBlobs = 0;
      for (const { key } of blobs) {
        await store.delete(key);
        deletedBlobs++;
      }
    }
    return NextResponse.json({ deletedBlobs });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
