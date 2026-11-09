/**
 * @jest-environment node
 *
 * These tests pin that an unauthorized request is rejected before the route
 * makes any outbound call to the Aha API.
 */
import type { NextRequest } from 'next/server';

jest.unmock('next/server');

const TOKEN = 'test-webhook-token';

jest.mock('@/utils/env-config', () => ({
  __esModule: true,
  default: {
    get CONTENTSTACK_WEBHOOK_TOKEN() {
      return process.env.CONTENTSTACK_WEBHOOK_TOKEN ?? '';
    },
    AHA_API_KEY: 'test-aha-key',
  },
}));

import { POST } from './route';

const PUBLISH_PAYLOAD = JSON.stringify({
  event: 'publish',
  data: {
    content_type: { uid: 'product_update' },
    environment: { name: 'prod' },
    entry: { title: 'Some Update', aha_feature_link: 'https://mongodb.aha.io/features/AI-49' },
  },
});

function buildRequest({ body = PUBLISH_PAYLOAD, authorization }: { body?: string; authorization?: string }) {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (authorization !== undefined) headers.set('authorization', authorization);

  return { headers, json: async () => JSON.parse(body) } as unknown as NextRequest;
}

describe('POST /api/products/updates/webhook/contentstack', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    process.env.CONTENTSTACK_WEBHOOK_TOKEN = TOKEN;
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        feature: {
          custom_fields: [{ key: 'whats_new_post_url', value: 'https://www.mongodb.com/products/updates/some-update' }],
        },
      }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete process.env.CONTENTSTACK_WEBHOOK_TOKEN;
  });

  it('updates Aha for a request with a valid bearer token', async () => {
    const response = await POST(buildRequest({ authorization: `Bearer ${TOKEN}` }));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://mongodb.aha.io/api/v1/features/AI-49');
  });

  it('rejects an unauthenticated publish payload', async () => {
    const response = await POST(buildRequest({}));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a wrong token', async () => {
    const response = await POST(buildRequest({ authorization: 'Bearer not-the-token' }));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['unset', undefined],
    ['empty', ''],
    ['whitespace-only', '  '],
  ])('fails closed when CONTENTSTACK_WEBHOOK_TOKEN is %s', async (_label, value) => {
    if (value === undefined) {
      delete process.env.CONTENTSTACK_WEBHOOK_TOKEN;
    } else {
      process.env.CONTENTSTACK_WEBHOOK_TOKEN = value;
    }

    const response = await POST(buildRequest({ authorization: 'Bearer anything' }));

    expect(response.status).toBe(401);
    expect(console.warn).toHaveBeenCalledWith('CONTENTSTACK_WEBHOOK_TOKEN is not set in environment variables');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('authenticates before parsing, so a malformed body is rejected as unauthorized', async () => {
    const response = await POST(buildRequest({ body: 'not json' }));

    expect(response.status).toBe(401);
  });

  it('ignores stray whitespace in the configured token', async () => {
    process.env.CONTENTSTACK_WEBHOOK_TOKEN = `${TOKEN}\n`;

    const response = await POST(buildRequest({ authorization: `Bearer ${TOKEN}` }));

    expect(response.status).toBe(200);
  });
});
