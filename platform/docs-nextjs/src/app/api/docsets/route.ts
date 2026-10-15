import { NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';
import { getAllDocsetsWithVersions } from '@/services/db/docsets';
import { docsUrlForEnv } from 'versioning';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET() {
  try {
    const docsets = await getAllDocsetsWithVersions();

    if (!docsets || docsets.length === 0) {
      return withCORS(NextResponse.json({ error: 'No docsets found' }, { status: 404 }));
    }

    return withCORS(
      NextResponse.json(
        docsets.map((docset) => ({
          ...docset,
          url: {
            dotcomprd: docsUrlForEnv('dotcomprd'),
            dotcomstg: docsUrlForEnv('dotcomstg'),
          },
        })),
      ),
    );
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
