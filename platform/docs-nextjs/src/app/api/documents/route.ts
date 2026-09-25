import type { FindOptions } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';
import { withCORS } from '@/app/lib/with-cors';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dbName, collectionName, query, options } = body;

    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const defaultProjections: FindOptions = {
      projection: {
        source: 0,
      },
    };
    // set defaults
    const queryFilter = query ?? {};
    const queryOptions = options ?? {};

    const cursor = collection.find(queryFilter, defaultProjections);

    if (queryOptions.sort) {
      cursor.sort(queryOptions.sort);
    }
    if (queryOptions.limit) {
      cursor.limit(queryOptions.limit);
    }

    return withCORS(NextResponse.json(await cursor.toArray()));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
