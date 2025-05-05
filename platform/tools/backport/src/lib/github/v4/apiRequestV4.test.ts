import gql from 'graphql-tag';
import nock from 'nock';
import { mockGqlRequest } from '../../../test/nockHelpers';
import { BackportError } from '../../BackportError';
import { apiRequestV4 } from './apiRequestV4';

describe('apiRequestV4', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('when request succeeds', () => {
    let res: unknown;
    let commitsByAuthorCalls: ReturnType<typeof mockGqlRequest>;
    beforeEach(async () => {
      commitsByAuthorCalls = mockGqlRequest<any>({
        name: 'MyQuery',
        statusCode: 200,
        body: { data: { viewer: { login: 'sorenlouv' } } },
      });

      res = await apiRequestV4({
        accessToken: 'myAccessToken',
        githubApiBaseUrlV4: 'http://localhost/graphql',
        query: gql`
          query MyQuery {
            viewer {
              login
            }
          }
        `,
        variables: { foo: 'bar' },
      });
    });

    it('should return correct response', async () => {
      // @ts-expect-error
      expect(res.data.data).toEqual({ viewer: { login: 'sorenlouv' } });
    });

    it('should call with correct args', async () => {
      expect(commitsByAuthorCalls).toMatchInlineSnapshot(`
        [
          {
            "query": "query MyQuery {
          viewer {
            login
          }
        }",
            "variables": {
              "foo": "bar",
            },
          },
        ]
      `);
    });
  });

  describe('when request fails with error messages', () => {
    beforeEach(() => {
      mockGqlRequest({
        name: 'MyQuery',
        statusCode: 200,
        body: {
          errors: [{ message: 'some error' }, { message: 'some other error' }],
        },
      });
    });

    it('should return error containing the error messages', async () => {
      return expect(
        apiRequestV4({
          accessToken: 'myAccessToken',
          githubApiBaseUrlV4: 'http://localhost/graphql',
          query: gql`
            query MyQuery {
              viewer {
                login
              }
            }
          `,
          variables: {
            foo: 'bar',
          },
        }),
      ).rejects.toThrow(
        new BackportError(`some error,some other error (Github API v4)`),
      );
    });
  });

  describe('when request fails without error messages', () => {
    beforeEach(() => {
      mockGqlRequest({
        name: 'MyQuery',
        statusCode: 500,
        body: { data: { foo: 'bar' } },
      });
    });

    it('should return parsed github error', async () => {
      return expect(
        apiRequestV4({
          accessToken: 'myAccessToken',
          githubApiBaseUrlV4: 'http://localhost/graphql',
          query: gql`
            query MyQuery {
              viewer {
                login
              }
            }
          `,
          variables: {
            foo: 'bar',
          },
        }),
      ).rejects.toThrow('Request failed with status code 500');
    });
  });
});
