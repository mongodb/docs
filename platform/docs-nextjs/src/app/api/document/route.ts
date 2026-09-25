import type { FindOptions } from 'mongodb';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';
import { withCORS } from '@/app/lib/with-cors';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return withCORS(NextResponse.json({ error: 'Request body is required and must be valid JSON' }, { status: 400 }));
    }

    const { dbName, collectionName, query, sortOptions } = body;

    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const defaultProjections: FindOptions = {
      projection: {
        source: 0,
      },
    };
    // set default query and projection
    const queryFilter = query || {};

    if (sortOptions) {
      const DEFAULT_SORT = { _id: -1 };
      const sort = sortOptions.sort ?? DEFAULT_SORT;

      const result = await collection.find(queryFilter, defaultProjections).sort(sort).limit(1).toArray();

      if (!result || !result[0]) {
        return withCORS(NextResponse.json(null));
      }
      return withCORS(NextResponse.json(result[0]));
    } else {
      const result = await collection.findOne(queryFilter, defaultProjections);

      if (!result) {
        return withCORS(NextResponse.json(null));
      }

      return withCORS(NextResponse.json(result));
    }
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
