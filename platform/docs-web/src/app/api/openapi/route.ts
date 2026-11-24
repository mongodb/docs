import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db/client';

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

interface OpenApiSpec {
  fileContent: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiName = searchParams.get('apiName');
  const dbName = searchParams.get('dbName') ?? 'snooty_dotcomprd';
  const collectionName = 'oas_files';

  if (!apiName) {
    const errorMsg = 'Failed to retrieve open api spec: api name must be specified';
    console.error(errorMsg);
    return withCORS(NextResponse.json({ error: errorMsg }, { status: 400 }));
  }
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection<OpenApiSpec>(collectionName);

    const query = {
      api: apiName,
    };
    const projection = {
      _id: 0,
      fileContent: 1,
    };

    const result: OpenApiSpec | null = await collection.findOne(query, {
      projection,
    });
    if (!result) {
      return withCORS(
        NextResponse.json(
          {
            error: `Failed to retrieve open api spec for  ${apiName}`,
          },
          { status: 500 },
        ),
      );
    }

    const { fileContent } = result;
    if (!fileContent) {
      console.error('Document has no file content.');
      return withCORS(
        NextResponse.json(
          {
            error: `Failed to retrieve open api spec for  ${apiName}, document has no file content`,
          },
          { status: 404 },
        ),
      );
    }

    return withCORS(
      NextResponse.json({
        fileContent,
      }),
    );
  } catch (err) {
    console.error(err);
    return withCORS(
      NextResponse.json(
        {
          error: `Failed to fetch OpenAPI spec from ${apiName}, error: ${err}`,
        },
        { status: 500 },
      ),
    );
  }
}
