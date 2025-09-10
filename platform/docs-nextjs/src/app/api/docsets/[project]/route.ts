import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db';
import { Docset } from '@/types/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ project: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const dbName = searchParams.get('dbName') ?? process.env.SNOOTY_DB_NAME;
  const project = (await params)?.project;

  if (!project) {
    const res = NextResponse.json(
      { error: 'Project is required' },
      { status: 400 }
    );
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<Docset>('docsets');

    // query docsets, merge deployable/only repo with docset
    const docsets = await collection
      .aggregate([
        // match by project
        {
          $match: { project },
        },
        // use objectid references to query repos_branches for repo data for each docset
        {
          $lookup: {
            from: 'repos_branches',
            localField: 'repos',
            foreignField: '_id',
            as: 'repos',
          },
        },
        // filter for deployable/only repo within docset
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
              $mergeObjects: [
                { $arrayElemAt: ['$deployableRepo', 0] },
                '$$ROOT',
              ],
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
      const res = NextResponse.json(
        { error: `No docset found for project ${project}` },
        { status: 404 }
      );
      res.headers.set('Access-Control-Allow-Origin', '*');
      return res;
    }

    const res = NextResponse.json(docsets[0]);
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (err) {
    console.error(err);
    const res = NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }
}
