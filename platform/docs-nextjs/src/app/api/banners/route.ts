import { withCORS } from '@/app/lib/with-cors';
import { type NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/services/db';

interface BannerData {
  isEnabled: boolean;
  altText: string;
  imgPath?: string;
  tabletImgPath?: string;
  mobileImgPath?: string;
  bgColor?: string;
  text?: string;
  pillText?: string;
  url: string;
}

export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isStaging = searchParams.get('staging') === 'true';
  const dbName = isStaging ? 'snooty_dotcomstg' : 'snooty_dotcomprd';

  try {
    const client = getClient();
    const db = client.db(dbName);

    const collection = db.collection<BannerData>('banners');

    const result: BannerData | null = await collection.findOne({});

    if (!result) {
      return withCORS(
        NextResponse.json(
          {
            error: 'Failed to retrieve banner data',
          },
          { status: 500 },
        ),
      );
    }

    if (!result.isEnabled) {
      return withCORS(NextResponse.json(null));
    }

    return withCORS(
      NextResponse.json({
        isEnabled: result.isEnabled,
        altText: result.altText,
        imgPath: result.imgPath,
        tabletImgPath: result.tabletImgPath,
        mobileImgPath: result.mobileImgPath,
        bgColor: result.bgColor,
        text: result.text,
        pillText: result.pillText,
        url: result.url,
      }),
    );
  } catch (err) {
    console.error(err);
    return withCORS(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
  }
}
