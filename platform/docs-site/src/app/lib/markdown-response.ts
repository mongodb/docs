import { NextResponse } from 'next/server';
import { withCORS } from '@/app/lib/with-cors';

/**
 * 200 response for a markdown export, however it was produced.
 *
 * `Netlify-Vary` keys the CDN cache on the tab params, so each requested tab
 * set is stored as its own entry instead of colliding on one body per page.
 */
export function markdownResponse(body: string): NextResponse {
  return withCORS(
    new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400, must-revalidate',
        Vary: 'Accept',
        'Netlify-Vary': 'query=tabs|allTabs,header=Accept',
      },
    }),
  );
}
