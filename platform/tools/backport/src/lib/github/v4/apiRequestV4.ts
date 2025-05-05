import axios, { AxiosError, AxiosResponse } from 'axios';
import apm from 'elastic-apm-node';
import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';
import { isObject } from 'lodash';
import { BackportError } from '../../BackportError';
import { logger } from '../../logger';

interface GithubError {
  type?: string;
  path?: string[];
  locations?: {
    line: number;
    column: number;
  }[];
  message: string;
}

export interface GithubV4Response<DataResponse> {
  data: DataResponse;
  errors?: GithubError[];
}

type Variables = Record<string, string | number | null>;

// Define a discriminating type
type ApiRequestOptions = {
  githubApiBaseUrlV4?: string;
  accessToken: string;
  query: DocumentNode;
  variables?: Variables;
};

export async function apiRequestV4<DataResponse>(
  opts: ApiRequestOptions,
): Promise<AxiosResponse<GithubV4Response<DataResponse>, any>> {
  const {
    githubApiBaseUrlV4 = 'https://api.github.com/graphql',
    accessToken,
    query,
    variables,
  } = opts;

  const gqlQueryName = getQueryName(query);
  const span = apm.startSpan(
    `GraphQL: ${gqlQueryName}`,
    'external',
    'graphql',
    'query',
  );

  //@ts-expect-error
  span?.setDbContext({ type: 'graphql', statement: print(query) });

  try {
    const response = await axios.post<GithubV4Response<DataResponse>>(
      githubApiBaseUrlV4,
      { query: print(query), variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
      },
    );

    if (response.data.errors) {
      throw new GithubV4Exception(response);
    }

    addDebugLogs({
      githubApiBaseUrlV4,
      query,
      variables,
      githubResponse: response,
    });

    span?.setOutcome('success');

    return response;
  } catch (e) {
    span?.setOutcome('failure');

    apm.captureError(e as Error);

    if (isAxiosGithubError(e) && e.response) {
      addDebugLogs({
        githubApiBaseUrlV4,
        query,
        variables,
        githubResponse: e.response,
        didThrow: true,
      });
      throw new GithubV4Exception(e.response, e.message);
    }

    throw e;
  } finally {
    span?.end();
  }
}

function isAxiosGithubError(
  e: unknown,
): e is AxiosError<GithubV4Response<unknown>, any> {
  return (
    axios.isAxiosError(e) &&
    e.response !== undefined &&
    isObject(e.response.data)
  );
}

type AxiosGithubResponse<DataResponse> = AxiosResponse<
  GithubV4Response<DataResponse | null>,
  any
>;

export class GithubV4Exception<DataResponse> extends Error {
  githubResponse: AxiosGithubResponse<DataResponse> & { request: undefined };

  constructor(
    githubResponse: AxiosGithubResponse<DataResponse>,
    errorMessage?: string,
  ) {
    const githubMessage = githubResponse.data.errors
      ?.map((error) => error.message)
      .join(',');

    const message = `${
      errorMessage ?? githubMessage ?? 'Unknown error'
    } (Github API v4)`;

    super(message);
    Error.captureStackTrace(this, BackportError);
    this.name = 'GithubV4Exception';
    this.message = message;
    this.githubResponse = { ...githubResponse, request: undefined };
  }
}

export function getQueryName(query: DocumentNode): string {
  //@ts-expect-error
  return query.definitions[0].name?.value;
}

function addDebugLogs({
  githubApiBaseUrlV4,
  query,
  variables,
  githubResponse,
  didThrow = false,
}: {
  githubApiBaseUrlV4: string;
  query: DocumentNode;
  variables?: Variables;
  githubResponse: AxiosResponse<unknown>;
  didThrow?: boolean;
}) {
  const gqlQueryName = getQueryName(query);
  logger.info(
    `POST ${githubApiBaseUrlV4} (name:${gqlQueryName}, status: ${
      githubResponse.status
    }${didThrow ? ', EXCEPTION THROWN' : ''})`,
  );

  logger.verbose(`Query: ${print(query)}`);
  logger.verbose('Variables:', variables);
  logger.verbose('Response headers:', githubResponse.headers);
  logger.verbose('Response data:', githubResponse.data);
}
