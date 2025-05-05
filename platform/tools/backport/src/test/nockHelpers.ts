import { URL } from 'url';
import gql from 'graphql-tag';
import { disableFragmentWarnings } from 'graphql-tag';
import nock from 'nock';
import { getQueryName } from '../lib/github/v4/apiRequestV4';

disableFragmentWarnings();

export function mockGqlRequest<T>({
  name,
  statusCode,
  body,
  headers,
  apiBaseUrl,
}: {
  name: string;
  statusCode: number;
  body?: { data: T } | { errors: any[] };
  headers?: any;
  apiBaseUrl?: string;
}) {
  const { origin, pathname } = new URL(
    // default to localhost as host to avoid CORS issues
    // Remember to set `githubApiBaseUrlV4: 'http://localhost/graphql'` in options
    apiBaseUrl ?? 'http://localhost/graphql',
  );

  const scope = nock(origin)
    .post(pathname, (body) => getQueryName(gql(body.query)) === name)
    .reply(statusCode, body, headers);

  return listenForCallsToNockScope(scope) as {
    query: string;
    variables: string;
  }[];
}

export function listenForCallsToNockScope(scope: nock.Scope) {
  const calls: unknown[] = [];
  scope.on('request', (req, interceptor, body) => {
    calls.push(JSON.parse(body));
  });
  return calls;
}
