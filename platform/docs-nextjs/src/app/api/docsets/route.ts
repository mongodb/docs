import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';
import type { Docset } from '@/types/data';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? process.env.SNOOTY_DB_NAME;

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<Docset>('docsets');

    // query docsets, merge deployable/only repo with each docset
    const docsets = await collection
      .aggregate([
        // use objectid references to query repos_branches for repo data for each docset
        {
          $lookup: {
            from: 'repos_branches',
            localField: 'repos',
            foreignField: '_id',
            as: 'repos',
          },
        },
        // filter for deployable/only repo within each docset
        {
          $addFields: {
            deployableRepo: {
              $cond: {
                if: { $gt: [{ $size: '$repos' }, 1] }, // Check if array has more than one element
                then: {
                  $filter: {
                    input: '$repos',
                    as: 'item',
                    cond: { $eq: ['$$item.prodDeployable', true] }, // Filter elements where prodDeployable is true
                  },
                },
                else: '$repos', // Only one repo in the repos array
              },
            },
          },
        },
        // merge/flatten the document
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$deployableRepo', 0] }, '$$ROOT'],
            },
          },
        },
        // ignore unnecessary fields
        {
          $project: {
            repos: 0,
            deployableRepo: 0,
          },
        },
      ])
      .toArray();

    if (!docsets || docsets.length === 0) {
      return withCORS(NextResponse.json({ error: 'No docsets found' }, { status: 404 }));
    }

    return withCORS(NextResponse.json(docsets));
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
