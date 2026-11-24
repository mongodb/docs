import type { NextRequest } from 'next/server';
import { log } from '@/utils/logger';

// Observability only, to identify the remaining consumers of these routes
// before they are removed (DOP-7244). Netlify's Splunk drain records the
// referrer at origin granularity, and the browsers calling these routes are
// cross-origin, so the referring page's path never reaches us. The request
// body is what actually identifies the caller: snooty's query filter carries
// the project and branch.
//
// Logged at 'warn' because getEnvLevel() drops anything below warn on
// dotcomprd, which is why this traffic was invisible until now.
const QUERY_PREVIEW_LIMIT = 500;

const describe = (value: unknown) => (typeof value === 'string' ? value : typeof value);

const logCaller = (request: NextRequest, route: string, body: Record<string, unknown>) => {
  const headers = request.headers;

  let queryPreview: string;
  try {
    queryPreview = JSON.stringify(body?.query ?? null).slice(0, QUERY_PREVIEW_LIMIT);
  } catch {
    queryPreview = 'unserializable';
  }

  log({
    level: 'warn',
    message: 'document-api-caller',
    route,
    dbName: describe(body?.dbName),
    collectionName: describe(body?.collectionName),
    query: queryPreview,
    referer: headers.get('referer') ?? headers.get('referrer'),
    origin: headers.get('origin'),
    secFetchSite: headers.get('sec-fetch-site'),
    userAgent: headers.get('user-agent'),
    forwardedFor: headers.get('x-forwarded-for'),
  });
};

export { logCaller };
