import { withCORS } from '@/app/lib/with-cors';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getDocsetByProject } from '@/services/db/docsets';
import { docsUrlForEnv } from 'versioning';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ project: string }> }) {
  const project = (await params)?.project;

  if (!project) {
    return withCORS(NextResponse.json({ error: 'Project is required' }, { status: 400 }));
  }

  const docset = await getDocsetByProject(project);

  if (!docset) {
    return withCORS(NextResponse.json({ error: 'Docset not found' }, { status: 404 }));
  }

  return withCORS(
    NextResponse.json({
      ...docset,
      url: {
        dotcomprd: docsUrlForEnv('dotcomprd'),
        dotcomstg: docsUrlForEnv('dotcomstg'),
      },
    }),
  );
}
